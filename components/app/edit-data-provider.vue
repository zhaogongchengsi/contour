<script setup lang="ts">
const data = reactive({})
provide(editDataProviderKey, data)
</script>

<template>
  <div class="relative min-h-screen w-full py-10">
    <slot />
  </div>
</template>
