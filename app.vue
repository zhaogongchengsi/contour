<script setup lang="ts">
import { NConfigProvider } from 'naive-ui'
import { isClient } from '@vueuse/core'

</script>

<template>
  <n-config-provider :inline-theme="isClient">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </n-config-provider>
</template>
