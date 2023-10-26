<script setup lang="ts">
import { NConfigProvider, NMessageProvider } from 'naive-ui'
import { isClient } from '@vueuse/core'
import { themeOverrides } from '../theme'
import { animate } from "popmotion"

const value = ref(0)
const { y } = useWindowScroll()

onMounted(() => {
  if (!import.meta.browser) return
  animate({
    from: 1,
    to: 2,
    repeat: Infinity,
    velocity: 100,
    duration: 5000,
    repeatType: 'mirror',
    onUpdate(latest) {
      value.value = latest
    },
  })
})


</script>

<template>
  <NConfigProvider abstract :inline-theme="isClient" :theme-overrides="themeOverrides">
    <NMessageProvider>
      <div :style="{'--base-size': `${value}` }" class="min-h-screen default-page-box" ref="el">
        <AppHeader class="backdrop-blur-md sticky top-0 z-99"
          :class="{ 'border-b-1 border-slate-50/10': y !== 0 }" />
        <main class="app-main">
          <slot />
        </main>
        <AppFooter class="border-t-1 border-slate-50/10" />
      </div>
    </NMessageProvider>
  </NConfigProvider>
</template>

<style lang="scss">
.app-main {
  min-height: $dt('page.common.defaultMinHeight');
}

.default-page-box {
  background: rgb(29, 10, 36);

  background: radial-gradient(
    circle, 
    rgba(29, 10, 36, 0.6) calc(10% * var(--base-size)), 
    rgba(0, 0, 0, 1) calc(30% * var(--base-size)), 
    rgba(0, 0, 0, 1) calc(40% * var(--base-size))
  );

  background-attachment: fixed;
}
</style>