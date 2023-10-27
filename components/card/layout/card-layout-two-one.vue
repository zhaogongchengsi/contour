<script setup lang="ts">
import CardTag from '../card-tag.vue'
</script>

<template>
  <CardTag class="card-two-two flex justify-between gap-x-[var(--card-gap-x)]">
    <div class="two-one-layout_icon h-full">
      <slot name="icon" />
    </div>
    <div class="max-w-25 flex flex-1 items-center justify-center">
      <div class="w-full% overflow-hidden truncate text-center font-bold text-white">
        <slot />
      </div>
    </div>
  </CardTag>
</template>

<style>
.two-one-layout_icon .card-icon {
	height: 100%;
}
</style>
