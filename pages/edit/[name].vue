<script setup lang="ts">
import { NModal, NScrollbar, NPopover } from "naive-ui";
import card from "~/components/card/card.vue";
import draggable from "vuedraggable";
import { cloneDeep } from "lodash";
import type { AvatarUri, CardButtonStyle, CardSizeString, ContactInfo, IconInfo } from "~/types";
import { useStorage } from "@vueuse/core";

definePageMeta({
  layout: "edit",
});

const editMode = ref<"create" | "change">("create");
const route = useRoute();

const isShow = ref(false);
const title = ref("");

interface FormValue {
  icon: IconInfo | undefined;
  size: CardSizeString;
  link: string;
  buttonStyle: CardButtonStyle;
  image: string;
  background: string;
}

const formValue = shallowReactive<FormValue>({
  link: "",
  background: "#fff",
  buttonStyle: "windows",
  size: "1-1",
  image: "url:/images/grid.webp",
  icon: undefined,
});

const defineStorageKey = (key: string) => `contour-edit-${key}`;

const cardCurredId = useStorage<number>(defineStorageKey("id"), 0);

const name = useStorage<string>(defineStorageKey("name"), route.params.name as string);
const description = useStorage<string>(defineStorageKey("description"), "");
const background = useStorage(defineStorageKey("background"), "");
const color = useStorage<string>(defineStorageKey("color"), "");
const avatar = useStorage<AvatarUri>(defineStorageKey("avatar"), "emoji:😎");
const style = useStorage<string>(defineStorageKey("style"), "");
const contacts = useStorage<ContactInfo[]>(defineStorageKey("contact"), []);

const cards = useStorage<FormValue[]>(defineStorageKey("cards"), []);

const stretch = useStorage(defineStorageKey("stretch"), false);

const stretchToggle = useToggle(stretch);

const init = async () => {
  const { code, data } = await getResume(route.params.name as string);
  if (code) {
    avatar.value = data!.avatar as AvatarUri;
    background.value = data!.background;
    style.value = data!.styles;
    color.value = data!.color;
    description.value = data!.description || "没有介绍";
    contacts.value = JSON.parse(data!.contact);

    cards.value = (data?.cards || []).map((card) => {
      return {
        ...card,
        icon: JSON.parse(card.icon),
      };
    });
  }
};

// 服务端先预渲染防止水合不一致
if (import.meta.server) {
  const logged = await loggedByServer(route.params.name as string);
  logged && (await init());
}

const config = computed(() => {
  const list = style.value.split("-");
  return {
    frosted: list.includes("frosted"),
    center: list.includes("center"),
    blur: list.includes("blur"),
    ltalic: list.includes("ltalic"),
  };
});

const addCard = (icon: IconInfo) => {
  title.value = icon.name;
  formValue.icon = icon;
  isShow.value = true;
};

const createCard = () => {
  console.log("创建", formValue);

  // store.cards.push({
  //   id: store.getId(),
  //   icon: toValue(modalStore.icon!),
  //   ...cloneDeep(modalStore.formValue)
  // });
};

const handleRightClick = (item: FormValue, event: PointerEvent) => {
  event.preventDefault();
  const { background, image, buttonStyle, link, size } = cloneDeep(item);
  formValue.background = background;
  formValue.image = image;
  formValue.buttonStyle = buttonStyle;
  formValue.link = link;
  formValue.size = size;
};
</script>

<template>
  <transition name="stretch">
    <section v-show="stretch" class="w-65 overflow-hidden shrink-0 edit-stretch-warper">
      <div class="w-65 h-full edit-stretch-warper_content">
        <n-scrollbar class="h-screen w-full">
          <div class="flex p-3 justify-between sticky top-0 z-5 edit-stretch-header">
            <router-link to="/" class="flex items-center gap-3">
              <img src="/logo.svg" alt="logo" class="w-6 h-6" />
              <span class="max-w-25 truncate">{{ name }}</span>
            </router-link>
            <n-popover trigger="click" placement="right-start" class="edit-stretch-popover">
              <template #trigger>
                <button>
                  <i class="block w-5 h-5 i-carbon:user-avatar" />
                </button>
              </template>
              <div class="w-30 flex flex-col p-2 gap-2">
                <button class="edit-stretch-popover_button">
                  <i class="edit-stretch-popover_button_icon i-carbon:save" />
                  <span class="edit-stretch-popover_button_text">保存</span>
                </button>
                <button class="edit-stretch-popover_button">
                  <i class="edit-stretch-popover_button_icon i-carbon:view" />
                  <span class="edit-stretch-popover_button_text">查看</span>
                </button>
              </div>
            </n-popover>
          </div>
          <client-only>
            <app-component
              @add-card="addCard"
              v-model:desc="description"
              v-model:contacts="contacts"
              v-model:background="background"
              v-model:color="color"
              v-model:style="style"
            />
          </client-only>
        </n-scrollbar>
      </div>
    </section>
  </transition>
  <section class="flex-1 relative">
    <button class="edit-nail-button" @click="stretchToggle()">
      <i class="text-xl i-carbon:caret-right duration-300 transition" :class="{ 'rotate-180': stretch }" />
    </button>
    <render-plane
      :background="background"
      :frosted="config.frosted"
      :center="config.center"
      :blur="config.blur"
      :ltalic="config.ltalic"
      :color="color"
    >
      <template #avatar>
        <ui-picture-selector v-model:value="avatar" :name="$route.params.name as string">
          <ui-avatar :src="avatar" class="text-5 sm:text-8 md:text-12 lg:text-16" />
        </ui-picture-selector>
      </template>
      <template #name>
        {{ name }}
      </template>
      <template #desc>
        {{ description }}
      </template>
      <template #contact>
        <ui-contact-wrapper>
          <ui-contact-item
            v-for="contact of contacts"
            :key="contact.value"
            :value="contact.value"
            :type="contact.type"
          />
        </ui-contact-wrapper>
      </template>
      <template #card>
        <draggable tag="div" :animation="500" :list="cards" class="card-wrapper-grid" item-key="id">
          <template #item="{ element }">
            <card
              edit
              :icon="element.icon"
              @contextmenu="handleRightClick(element, $event)"
              :background="element.background"
              :button-style="element.buttonStyle"
              :col="element.size.col"
              :row="element.size.row"
            >
              <template #image>
                <ui-picture-selector v-model:value="element.image" :name="$route.params.name as string">
                  <div class="w-full h-full">
                    <ui-picture :src="element.image" :alt="String(element.id)" />
                  </div>
                </ui-picture-selector>
              </template>
              {{ element.icon.label }}
            </card>
          </template>
        </draggable>
      </template>
    </render-plane>
  </section>
  <n-modal v-model:show="isShow">
    <div class="w-250 bg-white border border-white/30 rounded-md">
      <div class="flex justify-between items-center border-b-1 primary-border-color px-2 py-1">
        <h3>
          创建
          <span class="mx-1 font-bold text-purple-500">{{ title }}</span>
          卡片
        </h3>
        <div class="w-6 h-6 i-carbon:close cursor-pointer hover:text-purple-500" @click="isShow = false" />
      </div>
      <div class="flex justify-between items-center gap-3 bg-zinc-100">
        <div class="w-1/2 h-full flex justify-center items-center">
          <card
            edit
            :icon="formValue.icon"
            :background="formValue.background"
            :button-style="formValue.buttonStyle"
            :size="formValue.size"
          >
            <template #image>
              <ui-picture-selector v-model:value="formValue.image" :name="$route.params.name as string">
                <ui-picture :src="formValue.image" />
              </ui-picture-selector>
            </template>
            {{ title }}
          </card>
        </div>
        <app-card-from
          v-model:link="formValue.link"
          v-model:background="formValue.background"
          v-model:size="formValue.size"
          v-model:style="formValue.buttonStyle"
          class="flex-1 p-3 bg-white"
          @cancel="isShow = false"
          @commit="createCard"
        />
      </div>
    </div>
  </n-modal>
</template>

<style lang="scss">
.edit-nail-button {
  @apply w-8 h-8 text-white absolute bottom-1 left-0 z-20 rounded-r-full text-xl flex justify-center items-center pr-1;
  background-color: $dt("color.black");
}

.edit-stretch-warper {
  .edit-stretch-warper_content {
    border-right: 1px solid $dt("border.primary");
  }
}

.edit-stretch-header {
  background-color: $dt("color.black");
}

.edit-stretch-popover {
  border: 1px solid $dt("border.primary");
  &_button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.3rem 0.5rem;
    border-radius: 8px;
    &:hover {
      background-color: rgb(27, 27, 27);
    }

    &_icon {
      @apply block w-4 h-4;
    }
    &_text {
      @apply text-3;
    }
  }
}

.stretch-enter-active,
.stretch-leave-active {
  transition: width 0.3s ease;
}

.stretch-enter-from,
.stretch-leave-to {
  width: 0 !important;
}
</style>
