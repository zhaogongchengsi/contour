<script lang="ts" setup>
import { NConfigProvider, NGlobalStyle, NMessageProvider, NDialogProvider } from 'naive-ui'
import { isClient } from '@vueuse/core'
import { themeOverrides } from '../theme'
</script>

<template>
  <NConfigProvider class="app-container" :inline-theme="isClient" :theme-overrides="themeOverrides">
    <NGlobalStyle />
    <NMessageProvider>
      <n-dialog-provider>
        <slot />
      </n-dialog-provider>
    </NMessageProvider>
  </NConfigProvider>
</template>
