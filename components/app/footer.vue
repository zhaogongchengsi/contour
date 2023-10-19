<script setup lang="ts">
const app = useAppConfig()
</script>

<template>
  <footer class="border-t border-color-gray-200 dark:border-color-gray-800">
    <div class="mx-auto flex items-center justify-between px-3 py-3 container">
      <h3>{{ app.title }}</h3>
    </div>
  </footer>
</template>
