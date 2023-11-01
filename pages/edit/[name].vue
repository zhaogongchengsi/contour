<script setup lang="ts">
import { NModal } from 'naive-ui'
import { useCardFormModal } from '~/stores/cardForm';
import card from '~/components/card/card.vue'
import draggable from "vuedraggable";
import { cloneDeep } from 'lodash';
import { AvatarUri } from '~/types';

definePageMeta({
  layout: 'edit',
})

const store = useEditDataStore()
const modalStore = useCardFormModal()
const route = useRoute()
// const user = useUserInfo()

const init = async () => {
  store.name = route.params.name as string
  const { code, data } = await getResume(route.params.name as string)
  if (code) {
    const { avatar, background, styles, color, description, contact, cards } = data!

    store.avatar = avatar as AvatarUri
    store.background = background
    store.styles = styles?.split('-') || []
    store.color = color
    store.description = description || '没有介绍'
    store.contacts = JSON.parse(contact)

    store.cards = (cards || []).map((card) => {
      const [row, col] = card.size.split('-').map(Number)
      return {
        ...card,
        icon: JSON.parse(card.icon),
        size: {
          row,
          col
        }
      }
    })
  }
}

// 服务端先预渲染防止水合不一致
if (import.meta.server) {
  const logged = await loggedByServer(route.params.name as string)
  logged && await init()
}

// if (import.meta.browser) {
//   if (user.logged()) {
//     await init()
//   }
// }

const createCard = () => {

  store.cards.push({
    id: store.getId(),
    icon: toValue(modalStore.icon!),
    ...cloneDeep(modalStore.formValue)
  });

  modalStore.close()

}

</script>

<template>
  <app-component />
  <render-plane :background="store.background" :frosted="store.styles.includes('frosted')"
    :center="store.styles.includes('center')" :blur="store.styles.includes('blur')"
    :ltalic="store.styles.includes('ltalic')" :color="store.color">
    <template #avatar>
      <ui-picture-selector v-model:value="store.avatar" :name="($route.params.name as string)">
        <ui-avatar :src="store.avatar" class="text-5 sm:text-8 md:text-12 lg:text-16" />
      </ui-picture-selector>
    </template>
    <template #name>
      {{ store.name }}
    </template>
    <template #desc>
      {{ store.description }}
    </template>
    <template #contact>
      <ui-contact-wrapper>
        <ui-contact-item v-for="contact of store.contacts" :key="contact.value" :value="contact.value"
          :type="contact.type" />
      </ui-contact-wrapper>
    </template>
    <template #card>
      <draggable tag="div" :animation="500" :list="store.cards" class="card-wrapper-grid" item-key="id">
        <template #item="{ element }">
          <card edit :icon="element.icon" :background="element.background" :button-style="element.buttonStyle"
            :col="element.size.col" :row="element.size.row">
            <template #image>
              <ui-picture-selector v-model:value="element.image" :name="($route.params.name as string)">
                <div class="w-full h-full">
                  <ui-picture :src="element.image" :alt="String(element.id)" />
                </div>
              </ui-picture-selector>
            </template>
            {{ element.label }}
          </card>
        </template>
      </draggable>
    </template>
  </render-plane>
  <app-style />
  <n-modal v-model:show="modalStore.isShow">
    <div class="w-250 bg-white border border-white/30 rounded-md">
      <div class="flex justify-between items-center border-b-1 primary-border-color px-2 py-1">
        <h3>创建<span class="mx-1 font-bold text-purple-500">{{ modalStore.title }}</span>卡片</h3>
        <div class="w-6 h-6 i-carbon:close cursor-pointer hover:text-purple-500" @click="modalStore.close" />
      </div>
      <div class="p-3 flex items-center justify-between gap-3">
        <div class="w-1/2 h-full flex justify-center items-center">
          <card edit :icon="modalStore.icon" :background="modalStore.formValue.background"
            :button-style="modalStore.formValue.buttonStyle" :col="modalStore.formValue.size.col"
            :row="modalStore.formValue.size.row">
            <template #image>
              <ui-picture-selector v-model:value="modalStore.formValue.image" :name="($route.params.name as string)">
                <ui-picture :src="modalStore.formValue.image" />
              </ui-picture-selector>
            </template>
            {{ modalStore.icon?.label }}
          </card>
        </div>
        <app-card-from class="flex-1" @cancel="modalStore.close" @commit="createCard" />
      </div>
    </div>
  </n-modal>
</template>
