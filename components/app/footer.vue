<script setup lang="ts">
const app = useAppConfig()
</script>

<template>
  <footer
    class="app-default-footer w-full">
    <div class="mx-auto h-full flex items-center justify-between px-3 py-3 container">
      <h3>{{ app.title }}</h3>
    </div>
  </footer>
</template>

<style lang="scss">
.app-default-footer {
  height: $dt('page.footer.height.default');

  @md {
    height: $dt('page.footer.height.md');
  }

  @lg {
    height: $dt('page.footer.height.lg');
  }
}
</style>