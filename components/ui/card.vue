<script setup lang="ts">
import { CardButtonStyle, IconInfo, LinearGradient } from '~/types';

const props = withDefaults(defineProps<{
	row?: number | string,
	col?: number | string,
	icon?: IconInfo;
	link?: string
	buttonStyle?: CardButtonStyle
	image?: string
	background?: string | LinearGradient
}>(), {
	row: 1,
	col: 1,
	link: '#',
	background: '#fff',
	buttonStyle: 'apple',
})

const background = computed(() => {
	return typeof props.background === 'string' ? props.background : `linear-gradient(${props.background?.direction}, ${props.background?.colors.join(', ')})`
})

const buttonClass = computed(() => {
	switch (props.buttonStyle) {
		case 'windows':
			return 'rounded-xl'
		case 'android':
			return 'rounded-full'
		case 'apple':
			return 'rounded-8'
	}
})
const size = computed(() => {
	const _row = Number(props.row)
	const _col = Number(props.col)
	return {
		row: _row,
		col: _col,
		area: _row * _col
	}
})

</script>

<template>
	<ui-card-size 
		:row="size.row" 
		:col="size.col"
		:style="{ background: background, width: `calc(var(--card-size) * ${row})`, height: `calc(var(--card-size) * ${col})` }"
		:class="buttonClass" 
		class="w-full h-full overflow-hidden"
	>
		<a :href="link" class="flex w-full h-full px-[var(--card-gap-x)] py-[var(--card-gap-y)]" target="_blank">
			<div v-if="icon" :style="{ background: icon.background || 'transparent' }"
				class="flex items-center justify-center overflow-hidden" :class="[
					buttonClass,
					{
						'w-full h-full': size.area === 1,
						'w-[var(--card-size)] h-[var(--card-size)]': size.area > 1
					}
				]">
				<img :src="icon.image" class="object-contain" :alt="icon.name">
			</div>
		</a>
	</ui-card-size>
</template>
