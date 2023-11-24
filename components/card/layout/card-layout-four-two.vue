<script setup lang="ts">
import CardTag from "../card-tag.vue";
</script>

<template>
  <CardTag class="flex items-center">
    <div class="card-layout-four-two_image">
      <slot name="image" />
    </div>
    <div class="mx-auto h-full flex items-center justify-center">
      <div
        class="w-full overflow-hidden truncate text-center font-bold text-white"
      >
        <slot />
      </div>
    </div>
    <div class="w-10 self-start">
      <slot name="icon" />
    </div>
  </CardTag>
</template>

<style>
.card-layout-four-two_image {
  width: calc(calc(var(--card-size) * 2) - calc(var(--card-gap-x) * 2));
  height: calc(calc(var(--card-size) * 2) - calc(var(--card-gap-y) * 2));
  flex-shrink: 0;
}
</style>
