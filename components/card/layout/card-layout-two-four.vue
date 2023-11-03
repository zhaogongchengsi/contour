<script setup lang="ts">
import CardTag from "../card-tag.vue";
</script>

<template>
  <CardTag
    class="flex flex-col items-end justify-between gap-x-[var(--card-gap-x)]"
  >
    <div class="card-layout-two-four_image">
      <slot name="image" />
    </div>
    <div class="w-full flex items-center justify-center">
      <div
        class="w-full overflow-hidden truncate text-center font-bold text-white"
      >
        <slot />
      </div>
    </div>
    <div class="w-10">
      <slot name="icon" />
    </div>
  </CardTag>
</template>

<style>
.card-layout-two-four_image {
  --width: calc(calc(var(--card-size) * 2) + calc(var(--card-gap-x) * 2));
  width: 100%;
  height: calc(calc(var(--card-size) * 2) - calc(var(--card-gap-x) * 2));
}
</style>
