<script setup lang="ts">
defineProps<{
  label: string;
}>();
</script>

<template>
  <div class="flex flex-col gap-2 sm:gap-3 md:gap-4">
    <span class="text-2 sm:text-3 md:text-4 text-zinc-300">{{ label }}</span>
    <div class="text-3 sm:text-5 md:text-6 text-zinc-100">
      <slot />
    </div>
  </div>
</template>
