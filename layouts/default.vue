<script setup lang="ts">
import { NConfigProvider, NGlobalStyle, NMessageProvider } from 'naive-ui'
import { isClient } from '@vueuse/core'
import { themeOverrides } from '../theme'
</script>

<template>
  <NConfigProvider class="app-container" :inline-theme="isClient" :theme-overrides="themeOverrides">
    <NGlobalStyle />
    <NMessageProvider>
      <AppHeader class="sticky top-0" />
      <main class="app-main">
        <slot />
      </main>
      <AppFooter />
    </NMessageProvider>
  </NConfigProvider>
</template>

<style>
.app-container {
  --direction: 110deg;

  --color-a: #c4e0e571;
  --color-b: #4ca2af67;

  min-height: 100vh;

  /* todo: 做一个好看的渐变色 */
  background: var(--color-b);
  background: -webkit-linear-gradient(var(--direction), var(--color-a), var(--color-b));
  background: linear-gradient(var(--direction), var(--color-a), var(--color-b));
}

.app-main {
  height: calc(100vh - 50px);
}
</style>