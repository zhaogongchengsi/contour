<script setup lang="ts">
import {
  NConfigProvider,
  NDialogProvider,
  NMessageProvider,
  darkTheme,
} from "naive-ui";
import { isClient } from "@vueuse/core";
import { themeOverrides } from "~/composables/constants";
</script>

<template>
  <NConfigProvider
    class="app-container"
    :theme="darkTheme"
     inline-theme-disabled
    :theme-overrides="themeOverrides"
  >
    <NMessageProvider>
      <NDialogProvider>
        <section>
          <AppHeader class="sticky top-0 z-99 backdrop-blur-md" />
          <slot />
        </section>
      </NDialogProvider>
    </NMessageProvider>
  </NConfigProvider>
</template>
