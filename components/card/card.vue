<script setup lang="ts">
import { computed, provide } from 'vue';
import { options, key } from './props'
import cardIcon from './card-icon.vue'
import cardInner from './card-inner.vue'
import cardImageUpload from './card-image-upload.vue'

const props = defineProps(options)


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

provide(key, props)

</script>

<template>
	<ui-card-size :row="size.row" :col="size.col" :style="cardStyle" :class="buttonClass"
		class="w-full h-full overflow-hidden">
		<card-inner>
			<template #icon>
				<card-icon :image="$props.icon?.image!" :background="$props.icon?.background" :class="buttonClass" :name="$props.icon?.name" />
			</template>
			<template #image>
				<card-image-upload  v-if="!$props.image" />
				<div v-else class="w-full h-full">
					<img :src="$props.image" alt="">
				</div>
			</template>
		</card-inner>
	</ui-card-size>
</template>

<style>
.card-inner_1x1 {
	grid-template-rows: 1fr;
	grid-template-columns: 1fr;
	grid-template-areas: 'icon';
}

.card-inner_2x2 {
	width: 100%;
	height: 100%;
	grid-template-rows: repeat(4, 1fr);
	grid-template-columns: repeat(4, 1fr);

	grid-template-areas:
		'image image image icon'
		"image image image ."
		"image image image ."
		"name name name name";
}

.card-inner_icon {
	grid-area: icon;
}

.card-inner_image,
.card-inner_image_upload {
	grid-area: image;
}

.card-inner_name {
	grid-area: name;
}

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