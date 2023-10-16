<script setup lang="ts">
import { NModal } from 'naive-ui'
import { useCardFormModal } from '~/stores/cardForm';
import card from '~/components/card/card.vue'

definePageMeta({
  layout: 'edit',
})

const store = useEditDataStore()
const modalStore = useCardFormModal()

</script>

<template>
  <app-component />
  <render-plane edit :frosted="store.styles.includes('frosted')" :center="store.styles.includes('center')"
    :blur="store.styles.includes('blur')" :ltalic="store.styles.includes('ltalic')" :avatar="store.avatar"
    :name="store.name" :background="store.background" :color="store.color" :description="store.description"
    :contacts="store.contacts" :cards="store.cards" />
  <app-style />
  <n-modal v-model:show="modalStore.isShow">
    <div class="w-250 bg-white border border-white/30 rounded-md">
      <div class="flex justify-between items-center border-b-1 primary-border-color px-2 py-1">
        <h3>创建<span class="mx-1 font-bold text-purple-500">{{ modalStore.title }}</span>卡片</h3>
        <div class="w-6 h-6 i-carbon:close cursor-pointer hover:text-purple-500" @click="modalStore.close" />
      </div>
      <div class="p-3 flex items-center justify-center gap-3">
        <div class="flex-1 flex justify-center items-center">
          <card edit :icon="modalStore.icon" :background="modalStore.formValue.background" :image="modalStore.formValue.image" :button-style="modalStore.formValue.buttonStyle" :col="modalStore.formValue.size.col" :row="modalStore.formValue.size.row" />
        </div>
        <app-card-from @cancel="modalStore.close" @commit="modalStore.close" />
      </div>
    </div>
  </n-modal>
</template>
