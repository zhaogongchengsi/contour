<script setup lang="ts">
import CardTag from "../card-tag.vue";
</script>

<template>
  <CardTag
    class="block h-full w-full px-[var(--card-gap-x)] py-[var(--card-gap-y)]"
  >
    <slot name="icon" />
  </CardTag>
</template>
