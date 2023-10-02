<script setup lang="ts">
import { NConfigProvider, NGlobalStyle } from 'naive-ui'
import { isClient } from '@vueuse/core'
import { themeOverrides } from './theme'

</script>

<template>
  <n-config-provider :inline-theme="isClient" :theme-overrides="themeOverrides">
    <n-global-style />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </n-config-provider>
</template>
