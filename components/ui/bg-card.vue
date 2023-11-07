<script setup lang="ts">
withDefaults(defineProps<{ active?: boolean }>(), {
  active: false,
});
</script>

<template>
  <div class="relative h-12 rounded-md cursor-pointer overflow-hidden bg-card-wrapper">
    <div class="w-full h-full rounded-md">
      <slot />
    </div>
    <div
      v-if="active"
      class="absolute left-0 w-full h-full top-0 text-purple-500 flex justify-center items-center bg-black/50"
    >
      <div class="md-icon i-carbon:checkmark font-bold text-white" />
    </div>
  </div>
</template>

<style lang="scss">
.bg-card-wrapper {
  border: 1px solid $dt('border.primary');
}
</style>