<script setup lang="ts">
import { NConfigProvider, NMessageProvider, darkTheme } from "naive-ui";
import { themeOverrides } from "~/composables/constants";
</script>

<template>
  <NConfigProvider :theme="darkTheme" abstract  inline-theme-disabled :theme-overrides="themeOverrides">
    <NMessageProvider>
      <div class="min-h-screen default-page-box">
        <AppHeader class="sticky top-0 z-99 backdrop-blur-md border-b-1 border-slate-50/10" />
        <main class="app-main clear-both">
          <slot />
        </main>
        <AppFooter class="border-t-1 border-slate-50/10" />
      </div>
    </NMessageProvider>
  </NConfigProvider>
</template>

<style lang="scss">
.app-main {
  min-height: $dt("page.common.defaultMinHeight");
}

.default-page-box {
  background: radial-gradient(ellipse 80% 50% at 50% -20%, rgba(111, 110, 192, 0.3), hsla(0, 0%, 100%, 0));
}
</style>
