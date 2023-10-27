<script setup lang="ts">
import CardTag from '../card-tag.vue'
</script>

<template>
  <CardTag class="card-two-two flex gap-x-[var(--card-gap-x)]">
    <div class="left-wrapper flex flex-col justify-between">
      <div class="h-[var(--width)] w-full">
        <slot name="image" />
      </div>
      <div class="w-full flex items-center justify-center overflow-hidden truncate font-bold text-white">
        <slot />
      </div>
    </div>
    <div class="right-wrapper">
      <slot name="icon" />
    </div>
  </CardTag>
</template>

<style lang="scss">
.card-two-two {

	.left-wrapper {
		--width: calc(100% - 2.5rem - var(--card-gap-x));
		width: var(--width);
	}

	.right-wrapper {
		width: 2.5rem;
		height: 2.5rem;
		margin-left: auto;
	}

}
</style>
