<script setup lang="ts">

const props = withDefaults(defineProps<{
	src?: string
	alt?: string
}>(), {
	src: '',
	alt: ''
})

const value = inject('ui-picture-selector')

const info = computed(() => {
	const src = unref(props.src || value) as string

	console.log(src);
	
	const info = src.split(':')
	// url:https://xx -> [url, https, //xxx]
	return { type: info[0], value: info.slice(1).join(':') }
})

</script>

<template>
	<div class="w-full h-full overflow-hidden rounded-full flex justify-center items-center" :class="{
		'p-1': info.type === 'url',
	}">
		<span v-if="info.type === 'emoji'" class="text-8 sm:text-10 md:text-12 lg:text-16">{{ info.value }}</span>
		<img v-else :src="info.value" class="w-full h-full rounded-full" />
	</div>
</template>