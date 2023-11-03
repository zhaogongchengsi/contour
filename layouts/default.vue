<script setup lang="ts">
import { NConfigProvider, NMessageProvider } from 'naive-ui'
import { animate } from 'popmotion'
import { themeOverrides } from '../theme'

const value = ref(0)
const { y } = useWindowScroll()

onMounted(() => {
  if (!import.meta.browser)
    return
  animate({
    from: 1,
    to: 2,
    repeat: Number.POSITIVE_INFINITY,
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
  <NConfigProvider abstract :theme-overrides="themeOverrides">
    <NMessageProvider>
      <div ref="el" :style="{ '--base-size': `${value}` }" class="default-page-box min-h-screen">
        <AppHeader class="sticky top-0 z-99 backdrop-blur-md border-b-1 border-slate-50/10" />
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

  background: radial-gradient(circle,
      rgba(29, 10, 36, 0.6) calc(10% * var(--base-size)),
      rgba(0, 0, 0, 1) calc(30% * var(--base-size)),
      rgba(0, 0, 0, 1) calc(40% * var(--base-size)));

  background-attachment: fixed;
}
</style>
