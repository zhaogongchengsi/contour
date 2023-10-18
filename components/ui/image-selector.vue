<script setup lang="ts">
import { useLoadingBar } from 'naive-ui'

const images = ref(['github.webp', 'grid_01.webp', 'grid_10.webp', 'grid.webp', 'img2.webp'].map(i => `/images/${i}`))

const props = withDefaults(defineProps<{ value: string, prefix?: string, separator?: string }>(), {
	prefix: '',
	separator: ':'
})

const m = 1024 * 1024
const loadingBar = useLoadingBar()
const emit = defineEmits(["update:value", 'change'])
const data = useVModel(props, 'value', emit)
const { files, open, reset, onChange } = useFileDialog({
	accept: 'image/*',
	multiple: false
})

const format = (value: string): string => {
	return [props.prefix, value].filter(Boolean).join(props.separator)
}

const itemClick = (value: string) => {
	data.value = format(value)
}

onChange(async (files) => {
	const file = files![0]
	console.log(file.size / m);
	
	const url = URL.createObjectURL(file)
	images.value.push(url)
})

</script>

<template>
	<div class="flex flex-col gap-3 py-2">
		<div class="flex gap-2 justify-center items-center rounded-xl bg-gray-200 py-1 cursor-pointer" @click="open()">
			<div class="md-icon i-carbon:cloud-upload" />
			<span>上传</span>
		</div>
		<ul class="grid grid-cols-3 gap-2 auto-rows-auto">
			<li v-for="url of images" class="h-24 p-2 hover:bg-gray-200/80 cursor-pointer rounded-md" :key="url"
				:class="{ 'bg-gray-200/80': data === format(url) }" @click="itemClick(url)">
				<div class="h-full">
					<img class="w-full h-full object-cover rounded-md" :src="url" alt="">
				</div>
			</li>
		</ul>
	</div>
</template>