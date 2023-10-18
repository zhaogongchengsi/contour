<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { emojiFaces } from '~/composables/emoji';

const props = withDefaults(defineProps<{ value: string, prefix?: string, separator?: string }>(), {
	prefix: '',
	separator: ':'
})

const emit = defineEmits(["update:value"])

const data = useVModel(props, 'value', emit)

const emoji = [...emojiFaces]

const format = (value: string): string => {
	return [props.prefix, value].filter(Boolean).join(props.separator)
}

const itemClick = (value: string) => {
	data.value = format(value)
}

</script>

<template>
	<div class="py-2">
		<ul class="grid grid-cols-7 gap-3 auto-rows-auto">
			<li v-for="item of emoji" :key="item" :class="{ 'bg-gray-200/80': data === format(item) }"
				class="h-10 flex justify-center items-center px-1 cursor-pointer rounded-md hover:bg-gray-200/80"
				@click="itemClick(item)">
				<div class="text-7"> {{ item }} </div>
			</li>
		</ul>
	</div>
</template>

<style>
.emoji-family {
	font-family: 'Noto Color Emoji', sans-serif;
}
</style>