<script setup lang="ts">
import CardTag from '../card-tag.vue'
</script>

<template>
	<card-tag class="flex justify-start items-start">
		<div class="h-full card-layout-four-two_image">
			<slot name="image" />
		</div>
		<div class="w-35 mx-auto h-full flex justify-center items-center">
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
.card-layout-four-two_image {
	width: calc(calc(var(--card-size) * 2) - calc(var(--card-gap-x) * 2));
	flex-shrink: 0;
}
</style>