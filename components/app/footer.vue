<script setup lang="ts">
const app = useAppConfig()
</script>

<template>
  <footer
    class="app-default-footer w-full">
    <div class="mx-auto h-full flex items-center justify-between px-3 md:px-0 container">
      <h3 class="text-3 sm:text-4 md:text-5 text-zinc-300">{{ app.title }}</h3>
      <div class="flex items-center gap-3 text-3 sm:text-4 md:text-5">
        <span class="text-zinc-400 hover:text-zinc-300">隐私政策</span>
        <span class="text-zinc-400 hover:text-zinc-300">服务条款</span>
        <span class="text-zinc-400 hover:text-zinc-300">Cookie设置</span>
      </div>
    </div>
  </footer>
</template>

<style lang="scss">
.app-default-footer {
  height: $dt('page.footer.height');
}
</style>