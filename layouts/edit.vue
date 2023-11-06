<script lang="ts" setup>
import {
  NConfigProvider,
  NDialogProvider,
  NGlobalStyle,
  NMessageProvider,
  darkTheme
} from "naive-ui";
import { isClient } from "@vueuse/core";
import { themeOverrides } from "~/composables/constants";
</script>

<template>
  <NConfigProvider
    class="flex w-full h-full"
    :inline-theme="isClient"
    :theme="darkTheme"
    :theme-overrides="themeOverrides"
  >
    <NGlobalStyle />
    <NMessageProvider>
      <NDialogProvider>
        <slot />
      </NDialogProvider>
    </NMessageProvider>
  </NConfigProvider>
</template>
