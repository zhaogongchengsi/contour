<script setup lang="ts">
withDefaults(defineProps<{ center?: boolean }>(), {
  center: false,
});
</script>

<template>
  <ul class="flex flex-wrap gap-3 sm:gap-4 md:gap-6" :class="{ 'justify-center': center }">
    <slot />
  </ul>
</template>
