<script setup lang="ts">

withDefaults(defineProps<{
	theme?: 'apple' | 'android' | 'windows',
	name?: string
}>(), {
	theme: 'apple',
	name: ''
})

</script>

<template>
	<div class="flex flex-col">
		<div class="overflow-hidden w-14 h-14 flex justify-center items-center cursor-pointer" :class="{
			'rounded-xl': theme === 'apple',
			'rounded-full': theme === 'android',
			'rounded-md': theme === 'windows',
		}">
			<slot />
		</div>
		<div v-if="name" class="w-14 text-3 text-gray-400 truncate text-center">{{ name }}</div>
	</div>
</template>
