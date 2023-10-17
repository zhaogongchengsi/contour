<script setup lang="ts">
import CardTag from '../card-tag.vue'
</script>

<template>
	<card-tag class="flex flex-col justify-between items-end gap-x-[var(--card-gap-x)]">
		<div class="card-layout-two-four_image">
			<slot name="image" />
		</div>
		<div class="w-full flex justify-center items-center">
			<div class="text-white font-bold w-full text-center overflow-hidden truncate">
				<slot />
			</div>
		</div>
		<div class="w-10">
			<slot name="icon" />
		</div>
	</card-tag>
</template>

<style>
.card-layout-two-four_image {
	--width: calc(calc(var(--card-size) * 2) + calc(var(--card-gap-x) * 2));
	width: 100%;
	height: calc(calc(var(--card-size) * 2) - calc(var(--card-gap-x) * 2));
}
</style>