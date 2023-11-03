<script setup lang="ts">
import { inject } from "vue";
import { key, options } from "./props";

const props = inject<Required<typeof options>>(key)!;
</script>

<template>
  <component
    :is="props?.edit ? 'div' : 'a'"
    :href="props?.link"
    class="w-full h-full px-[var(--card-gap-x)] py-[var(--card-gap-y)]"
    target="_blank"
  >
    <slot />
  </component>
</template>
