<script setup lang="ts">
import { NConfigProvider, NMessageProvider } from 'naive-ui'
import { isClient } from '@vueuse/core'
import { themeOverrides } from '../theme'
import { animate } from "popmotion"

const value = reactive([10, 30, 60])
const { y } = useWindowScroll()

onMounted(() => {
  if (!import.meta.browser) return

  const repeat = Infinity
  const velocity = 100
  const duration = 3000
  const repeatType = 'mirror'

  animate({
    from: 10,
    to: 20,
    repeat,
    velocity,
    duration,
    repeatType,
    onUpdate(latest) {
      value[0] = latest
    },
  })

  animate({
    from: 30,
    to: 50,
    repeat,
    duration,
    repeatType,
    onUpdate(latest) {
      value[1] = latest
    }
  })

  animate({
    from: 50,
    to: 75,
    repeat,
    duration,
    repeatType,
    onUpdate(latest) {
      value[2] = latest
    }
  })

})

const style = computed(() => {
  return {
    '--size-a': `${value[0]}%`,
    '--size-b': `${value[1]}%`,
    '--size-c': `${value[2]}%`
  }
})

</script>

<template>
  <NConfigProvider abstract :inline-theme="isClient" :theme-overrides="themeOverrides">
    <NMessageProvider>
      <div :style="style" class="min-h-screen default-page-box" ref="el">
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
  --size-a: 10%;
  --size-b: 50%;
  --size-c: 80%;

  background: rgb(29, 10, 36);

  // background: radial-gradient(circle, rgba(29, 10, 36, 0.6) var(--size-a), $dt('color.black') var(--size-b),  $dt('color.black') var(--size-c));

  background: radial-gradient(circle, rgba(29, 10, 36, 0.6) var(--size-a), rgba(0, 0, 0, 1) var(--size-b), rgba(0, 0, 0, 1) var(--size-c));

  background-attachment: fixed;
}
</style>