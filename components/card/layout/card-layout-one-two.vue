<script setup lang="ts">
import CardTag from '../card-tag.vue'
</script>

<template>
  <CardTag class="card-two-two flex flex-col justify-between gap-x-[var(--card-gap-x)]">
    <div class="w-full">
      <slot name="icon" />
    </div>
    <div class="flex flex-1 items-center justify-center">
      <div class="w-full rotate-45 overflow-hidden truncate text-center font-bold text-white">
        <slot />
      </div>
    </div>
  </CardTag>
</template>
