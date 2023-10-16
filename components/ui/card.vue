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
const cardStyle = computed(() => {
	return {
		background: background.value, 
		width: `calc(var(--card-size) * ${props.row})`, 
		height: `calc(var(--card-size) * ${props.col})`
	}
})

</script>

<template>
	<ui-card-size :row="size.row" :col="size.col" :style="cardStyle" :class="buttonClass" class="w-full h-full overflow-hidden">
		<a :href="link" class="flex w-full h-full px-[var(--card-gap-x)] py-[var(--card-gap-y)]" target="_blank">
			<div v-if="icon" :style="{ background: icon.background || 'transparent' }" :class="[
				buttonClass,
				`card-icon_${row}x${col}`
			]">
				<img :src="icon.image" class="w-full h-full object-contain" :alt="icon.name">
			</div>
		</a>
	</ui-card-size>
</template>

<style>
.card-icon_1x1 {
	width: 100%;
	height: 100%;
}

.card-icon_2x2 {
	width: var(--card-size);
	height: var(--card-size);
}

.card-icon_1x2 {
	width: calc(var(--card-size) - calc(var(--card-gap-x) * 2));
	height: var(--card-size);
}

.card-icon_2x1 {
	height: calc(var(--card-size) - calc(var(--card-gap-x) * 2));
	width: var(--card-size);
}

.card-icon_2x4 {
	width: 100%;
	height: calc(var(--card-size) * 2);
}

.card-icon_4x2 {
	height: calc(calc(var(--card-size) * 2) - calc(var(--card-gap-x) * 2));
	width: calc(var(--card-size) * 2);
}

.card-icon_4x4 {
	width: calc(var(--card-size) * 2);
	height: calc(var(--card-size) * 2);
}
</style>