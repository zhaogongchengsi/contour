<script setup lang="ts">
import CardTag from '../card-tag.vue'
</script>

<template>
	<card-tag class="card-two-two flex gap-x-[var(--card-gap-x)]">
		<div class="left-wrapper flex flex-col justify-between">
			<div class="w-full h-[var(--width)]">
				<slot name="image" />
			</div>
			<div class="w-full flex justify-center items-center text-white font-bold overflow-hidden truncate">
				<slot />
			</div>
		</div>
		<div class="right-wrapper">
			<slot name="icon" />
		</div>
	</card-tag>
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