<script setup lang="ts">
import { NConfigProvider, NGlobalStyle, NMessageProvider } from 'naive-ui'
import { isClient } from '@vueuse/core'
import { themeOverrides } from '../theme'
</script>

<template>
  <NConfigProvider class="app-container" :inline-theme="isClient" :theme-overrides="themeOverrides">
    <NGlobalStyle />
    <NMessageProvider>
      <AppHeader />
      <main class="app-main min-h-screen">
        <slot />
      </main>
      <AppFooter />
    </NMessageProvider>
  </NConfigProvider>
</template>
