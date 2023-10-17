<script setup lang="ts">
import CardTag from '../card-tag.vue'
</script>

<template>
	<card-tag class="card-two-two flex flex-col justify-between gap-x-[var(--card-gap-x)]">
		<div class="w-full">
			<slot name="icon" />
		</div>
		<div class="flex-1 flex justify-center items-center">
			<div class="text-white font-bold w-full text-center rotate-45 overflow-hidden truncate">
				<slot />
			</div>
		</div>
	</card-tag>
</template>