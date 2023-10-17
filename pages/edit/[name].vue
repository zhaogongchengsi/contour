<script setup lang="ts">
import { NModal } from 'naive-ui'
import { useCardFormModal } from '~/stores/cardForm';
import card from '~/components/card/card.vue'

definePageMeta({
  layout: 'edit',
})

</script>

<template>
  <render-plane background="rgb(74 222 128)">
    <template #avatar>
      <div class="w-full h-full bg-purple-600">avatar</div>
    </template>
    <template #name>
      一个名字
    </template>
    <template #desc>
      一段描述
    </template>
    <template #contact>
      联系方式
    </template>
    <template #card>
      卡片
    </template>
  </render-plane>
</template>
