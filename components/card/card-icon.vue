<script setup lang="ts">
withDefaults(defineProps<{
	background?: string,
	name?: string
	buttonClass?: string
	image: string
}>(), {
	background: 'transparent',
	name: ''
})


</script>

<template>
	<div :style="{ background: background }" class="card-icon">
		<img :src="image" class="w-full h-full object-contain" :alt="name">
	</div>
</template>