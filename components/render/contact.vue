<script setup lang="ts">
const data = usePlaneData()
</script>

<template>
  <ul class="flex flex-wrap gap-8" :class="{ 'justify-center': data.center }">
    <li v-for="contact in data.contacts" class="flex items-center gap3">
      <div v-if="contact.type === 'mail'" class="i-uiw:mail h-5 w-5" />
      <div v-else-if="contact.type === 'phone'" class="i-uiw:android h-5 w-5" />
      <div v-else="contact.type === 'qq'" class="i-uiw:qq h-5 w-5" />
      <div class="link">
        <a v-if="contact.type === 'mail'" :href="`mailto:${contact.value}`">{{ contact.value }}</a>
        <a v-if="contact.type === 'phone'" :href="`tel:${contact.value}`">{{ contact.value }}</a>
        <a v-if="contact.type === 'qq'" :href="`mqqwpa://im/chat?chat_type=wpa&uin=${contact.value}`">{{ contact.value }}</a>
      </div>
    </li>
  </ul>
</template>
