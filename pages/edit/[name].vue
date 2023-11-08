<script setup lang="ts">
import { NModal, NScrollbar, NPopover, useMessage, NSkeleton } from "naive-ui";
import card from "~/components/card/card.vue";
import draggable from "vuedraggable";
import { cloneDeep } from "lodash";
import type { AvatarUri, CardButtonStyle, CardConfig, CardSizeString, ContactInfo, IconInfo } from "~/types";

definePageMeta({
  layout: "edit",
});

const route = useRoute();

if (!route.params.name) {
  await navigateTo("/");
}

const editMode = ref<"create" | "change">("create");

const nameStore = useGlobalName();
const isShow = ref(false);
const title = ref("");
const logged = ref(false);
const { warning, success, error } = useMessage();

const formValue = reactive<CardConfig>({
  link: "",
  background: "#fff",
  buttonStyle: "windows",
  size: "1-1",
  image: "url:/images/grid.webp",
  icon: undefined,
  uid: undefined,
});

const name = ref<string>(route.params.name as string);
nameStore.value = name.value;

const description = ref<string>("");
const background = ref("");
const color = ref<string>("");
const avatar = ref<AvatarUri>("emoji:😎");
const style = ref<CardButtonStyle>("windows");
const contacts = ref<ContactInfo[]>([]);

const cards = ref<CardConfig[]>([]);

const stretch = ref(true);

const stretchToggle = useToggle(stretch);

const init = async () => {
  const { code, data } = await getResume(route.params.name as string);
  if (code) {
    avatar.value = data!.avatar as AvatarUri;
    background.value = data!.background;

    data.styles && (style.value = data.style);
    
    color.value = data!.color;
    description.value = data?.description || "没有介绍";
    contacts.value = JSON.parse(data?.contact) || [];

    cards.value = (data?.cards || []).map((card: any) => {
      return {
        ...card,
        icon: JSON.parse(card.icon),
        id: card.sort,
      };
    });
  }
};

logged.value = await loggedByServer(name.value);
logged.value && (await init());

const config = computed(() => {
  const list = style?.value?.split("-") || [];
  return {
    frosted: list.includes("frosted"),
    center: list.includes("center"),
    blur: list.includes("blur"),
    ltalic: list.includes("ltalic"),
  };
});

const addCard = (icon: IconInfo) => {
  title.value = icon.name;
  editMode.value = "create";
  formValue.icon = icon;
  isShow.value = true;
};

const createCard = () => {
  if (editMode.value === "change") {
    cards.value = cards.value.map((item) => {
      if (item.uid === formValue.uid) {
        return cloneDeep(formValue);
      }
      return item;
    });
  }

  if (editMode.value === "create") {
    cards.value.push(cloneDeep(formValue));
  }

  isShow.value = false;
};

const handleRightClick = (item: CardConfig, event: PointerEvent) => {
  event.preventDefault();

  editMode.value = "change";

  const { background, image, buttonStyle, link, size, icon, uid } = cloneDeep(item);
  formValue.background = background;
  formValue.image = image;
  formValue.buttonStyle = buttonStyle;
  formValue.link = link;
  formValue.size = size;
  formValue.icon = icon;
  formValue.uid = uid;
  isShow.value = true;
};

const save = async () => {
  if (!logged) {
    warning("请先登录");
    return;
  }

  // 保存
  const { code, message } = await noteSave({
    name: name.value,
    color: color.value,
    background: background.value,
    styles: style.value,
    avatar: avatar.value,
    contacts: contacts.value,
    cards: cards.value.map((item, index) => {
      return {
        ...item,
        id: index,
      };
    }),
  });

  code ? success(message) : error(message);
};

const logout = async () => {
  await logoutByServer(name.value);
  logged.value = false;
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
                  <i class="block w-5 h-5" :class="{ 'i-carbon:settings': !logged, 'i-carbon:user-avatar': logged }" />
                </button>
              </template>
              <div class="w-30 flex flex-col p-2 gap-2">
                <button class="edit-stretch-popover_button" @click="save">
                  <i class="edit-stretch-popover_button_icon i-carbon:save" />
                  <span class="edit-stretch-popover_button_text">保存</span>
                </button>
                <div class="edit-stretch-header_space" />
                <button v-if="logged" class="edit-stretch-popover_button" @click="logout">
                  <i class="edit-stretch-popover_button_icon i-carbon:logout" />
                  <span class="edit-stretch-popover_button_text">注销登录</span>
                </button>
                <button v-else class="edit-stretch-popover_button" @click="navigateTo('/login')">
                  <i class="edit-stretch-popover_button_icon i-carbon:login" />
                  <span class="edit-stretch-popover_button_text">去登陆</span>
                </button>
              </div>
            </n-popover>
          </div>
          <client-only>
            <template #fallback>
              <div class="space-y-2 px-3">
                <n-skeleton height="30px" round :repeat="2" />
                <n-skeleton height="30px" round width="80%" :repeat="2" />
              </div>
            </template>
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
      <i class="text-xl i-carbon:caret-right text-white" :class="{ 'rotate-180': stretch }" />
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
        <ui-picture-selector v-model:value="avatar" :name="name">
          <ui-avatar :src="avatar" class="text-8 md:text-12" />
        </ui-picture-selector>
      </template>
      <template #name>
        {{ name }}
      </template>
      <template #desc>
        {{ description }}
      </template>
      <template #contact>
        <ui-contact-wrapper :center="config.center">
          <ui-contact-item
            v-for="contact of contacts"
            :key="contact.value"
            :value="contact.value"
            :type="contact.type"
          />
        </ui-contact-wrapper>
      </template>
      <template #card>
        <draggable tag="div" :animation="500" :list="cards" class="card-wrapper-grid" item-key="uid">
          <template #item="{ element }">
            <card
              edit
              :icon="element.icon"
              @contextmenu="handleRightClick(element, $event)"
              :background="element.background"
              :button-style="element.buttonStyle"
              :size="element.size"
            >
              <template #image>
                <ui-picture-selector v-model:value="element.image" :name="name">
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
    <div class="w-250 border border-white/30 rounded-md edit-modal-warper">
      <div class="flex justify-between items-center px-2 py-1 edit-modal-warper_header">
        <h3>
          创建
          <span class="mx-1 font-bold text-purple-500">{{ title }}</span>
          卡片
        </h3>
        <div class="w-6 h-6 i-carbon:close cursor-pointer hover:text-purple-500" @click="isShow = false" />
      </div>
      <div class="flex justify-between items-center gap-3">
        <div class="w-1/2 h-full flex justify-center items-center">
          <card
            edit
            :icon="formValue.icon"
            :background="formValue.background"
            :button-style="formValue.buttonStyle"
            :size="formValue.size"
          >
            <template #image>
              <ui-picture-selector v-model:value="formValue.image" :name="name">
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
          class="flex-1 p-3"
          @cancel="isShow = false"
          @commit="createCard"
        />
      </div>
    </div>
  </n-modal>
</template>

<style lang="scss">
.edit-nail-button {
  @apply w-8 h-8 text-white rounded-r-full text-xl flex justify-center items-center pr-1;

  @apply transition duration-300;
  @apply absolute bottom-5 left-0 z-20;

  background-color: $dt("color.black");
  border: 1px solid $dt("border.primary");
  border-left: 0;
  transition-property: left, border-radius;

  &:hover {
    border-left: 1px solid $dt("border.primary");
    @apply rounded-full left-2 mix-blend-plus-lighter;
  }
}

.edit-modal-warper {
  background-color: $dt("color.black");
  &_header {
    border-bottom: 1px solid $dt("border.primary");
  }
}

.edit-stretch-warper {
  .edit-stretch-warper_content {
    border-right: 1px solid $dt("border.primary");
  }
}

.edit-stretch-header {
  background-color: $dt("color.black");

  &_space {
    height: 1px;
    background-color: $dt("border.primary");
  }
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
