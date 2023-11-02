<script setup lang="ts">
import { NModal } from 'naive-ui'
import card from '~/components/card/card.vue'
import draggable from "vuedraggable";
import { cloneDeep } from 'lodash';
import type { AvatarUri, CardButtonStyle, CardSizeString, ContactInfo, IconInfo } from '~/types';
import { useStorage } from "@vueuse/core";

definePageMeta({
  layout: 'edit',
})

const editMode = ref<'create' | 'change'>('create')
const route = useRoute()

const isShow = ref(false);
const title = ref("");

interface FormValue {
  icon: IconInfo | undefined;
  size: CardSizeString;
  link: string;
  buttonStyle: CardButtonStyle
  image: string
  background: string;
}

const formValue = shallowReactive<FormValue>({
  link: '',
  background: '#fff',
  buttonStyle: 'windows',
  size: '1-1',
  image: 'url:/images/grid.webp',
  icon: undefined
})

const defineStorageKey = (key: string) => `contour-edit-${key}`;

const cardCurredId = useStorage<number>(defineStorageKey("id"), 0);

const name = useStorage<string>(defineStorageKey("name"), route.params.name as string);
const description = useStorage<string>(defineStorageKey("description"), "");
const background = useStorage(defineStorageKey("background"), "");
const color = useStorage<string>(defineStorageKey("color"), "");
const avatar = useStorage<AvatarUri>(defineStorageKey("avatar"), "emoji:😎");
const style = useStorage<string>(defineStorageKey("style"), '');
const contacts = useStorage<ContactInfo[]>(defineStorageKey("contact"), []);

const cards = useStorage<FormValue[]>(defineStorageKey("cards"), []);

const init = async () => {
  const { code, data } = await getResume(route.params.name as string)
  if (code) {

    avatar.value = data!.avatar as AvatarUri
    background.value = data!.background
    style.value = data!.styles
    color.value = data!.color
    description.value = data!.description || '没有介绍'
    contacts.value = JSON.parse(data!.contact)

    cards.value = (data?.cards || []).map((card) => {
      return {
        ...card,
        icon: JSON.parse(card.icon),
      }
    })
  }
}

// 服务端先预渲染防止水合不一致
if (import.meta.server) {
  const logged = await loggedByServer(route.params.name as string)
  logged && await init()
}

const config = computed(() => {
  const list = style.value.split('-')
  return {
    frosted: list.includes('frosted'),
    center: list.includes('center'),
    blur: list.includes('blur'),
    ltalic: list.includes('ltalic'),
  }
})

// if (import.meta.browser) {
//   if (user.logged()) {
//     await init()
//   }
// }


const addCard = (icon: IconInfo) => {
  title.value = icon.name
  formValue.icon = icon
  isShow.value = true
}

const createCard = () => {

  console.log('创建', formValue)

  // store.cards.push({
  //   id: store.getId(),
  //   icon: toValue(modalStore.icon!),
  //   ...cloneDeep(modalStore.formValue)
  // });

}

const handleRightClick = (item: FormValue, event: PointerEvent) => {
  event.preventDefault();
  const { background, image, buttonStyle, link, size } = cloneDeep(item)
  formValue.background = background
  formValue.image = image
  formValue.buttonStyle = buttonStyle
  formValue.link = link
  formValue.size = size
}

</script>

<template>
  <app-component @add-card="addCard" v-model:desc="description" v-model:contacts="contacts"
    v-model:background="background" v-model:color="color" v-model:style="style" />
  <render-plane :background="background" :frosted="config.frosted" :center="config.center"
    :blur="config.blur" :ltalic="config.ltalic" :color="color">
    <template #avatar>
      <ui-picture-selector v-model:value="avatar" :name="($route.params.name as string)">
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
        <ui-contact-item v-for="contact of contacts" :key="contact.value" :value="contact.value" :type="contact.type" />
      </ui-contact-wrapper>
    </template>
    <template #card>
      <draggable tag="div" :animation="500" :list="cards" class="card-wrapper-grid" item-key="id">
        <template #item="{ element }">
          <card edit :icon="element.icon" @contextmenu="handleRightClick(element, $event)"
            :background="element.background" :button-style="element.buttonStyle" :col="element.size.col"
            :row="element.size.row">
            <template #image>
              <ui-picture-selector v-model:value="element.image" :name="($route.params.name as string)">
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
  <n-modal v-model:show="isShow">
    <div class="w-250 bg-white border border-white/30 rounded-md">
      <div class="flex justify-between items-center border-b-1 primary-border-color px-2 py-1">
        <h3>创建<span class="mx-1 font-bold text-purple-500">{{ title }}</span>卡片</h3>
        <div class="w-6 h-6 i-carbon:close cursor-pointer hover:text-purple-500" @click="isShow = false" />
      </div>
      <div class="flex justify-between items-center gap-3 bg-zinc-100">
        <div class="w-1/2 h-full flex justify-center items-center">
          <card edit :icon="formValue.icon" :background="formValue.background"
            :button-style="(formValue.buttonStyle as CardButtonStyle)" :size="(formValue.size as CardSizeString)">
            <template #image>
              <ui-picture-selector v-model:value="formValue.image" :name="($route.params.name as string)">
                <ui-picture :src="formValue.image" />
              </ui-picture-selector>
            </template>
            {{ title }}
          </card>
        </div>
        <app-card-from v-model:link="formValue.link" v-model:background="formValue.background"
          v-model:size="formValue.size" v-model:style="(formValue.buttonStyle as CardButtonStyle)"
          class="flex-1 p-3 bg-white" @cancel="isShow = false" @commit="createCard" />
      </div>
    </div>
  </n-modal>
</template>
