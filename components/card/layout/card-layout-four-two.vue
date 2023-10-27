<script setup lang="ts">
import CardTag from '../card-tag.vue'
</script>

<template>
  <CardTag class="flex items-start justify-start">
    <div class="card-layout-four-two_image h-full">
      <slot name="image" />
    </div>
    <div class="mx-auto h-full w-35 flex items-center justify-center">
      <div class="w-full overflow-hidden truncate text-center font-bold text-white">
        <slot />
      </div>
    </div>
    <div class="w-10">
      <slot name="icon" />
    </div>
  </CardTag>
</template>

<style>
.card-layout-four-two_image {
	width: calc(calc(var(--card-size) * 2) - calc(var(--card-gap-x) * 2));
	flex-shrink: 0;
}
</style>
