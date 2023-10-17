<script setup lang="ts">
import CardTag from '../card-tag.vue'
</script>

<template>
	<card-tag class="card-two-two flex justify-between gap-x-[var(--card-gap-x)]">
		<div class="h-full two-one-layout_icon">
			<slot name="icon" />
		</div>
		<div class="flex-1 flex max-w-25 justify-center items-center">
			<div class="text-white font-bold w-full% text-center overflow-hidden truncate">
				<slot />
			</div>
		</div>
	</card-tag>
</template>

<style>
.two-one-layout_icon .card-icon {
	height: 100%;
}
</style>