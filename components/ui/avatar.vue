<script setup lang="ts">
import { AvatarUri } from '~/types';


const props = defineProps<{
	src: AvatarUri
	alt?: string,
	edit?: boolean
}>()

const avatar = computed(() => {
	const info = props.src.split(':')
	// url:https://xx -> [url, https, //xxx]
	const value = info.slice(1).join(':')
	return { type: info[0], value }
})

// 字符串多 字体越小 最大 30 最小 20
const maxSize = 30;
const minSize = 20;
const textSize = (text: string) => {
	const length = text.length;
	const fontSize = Math.max(minSize, maxSize - length);
	return { fontSize: `${fontSize}px` }
}

</script>

<template>
	<div class="w-30 h-30 bg-white overflow-hidden rounded-full flex justify-center items-center" :class="{
		'p-1': avatar.type === 'url',
	}">
		<span v-if="avatar.type === 'emoji'" class="text-16">{{ avatar.value }}</span>
		<span v-else-if="avatar.type === 'text'" :style="textSize(avatar.value)" class="w-full font-bold text-purple-500">{{ avatar.value }}</span>
		<img v-else :src="avatar.value" class="w-full h-full rounded-full" />
	</div>
</template>
