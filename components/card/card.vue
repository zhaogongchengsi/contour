<script setup lang="ts">
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
			return 'rounded-lg'
		case 'android':
			return 'rounded-2xl'
		case 'apple':
			return 'rounded-xl'
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
	}
})

provide(key, props)

</script>

<template>
	<ui-card-size :row="size.row" :col="size.col" :style="cardStyle" :class="buttonClass"
		class="w-full h-full overflow-hidden">
		<card-inner>
			<template #icon>
				<card-icon :image="$props.icon?.image!" :background="$props.icon?.background" :class="buttonClass"
					:name="$props.icon?.name" />
			</template>
			<template #image>
				<slot  name="image" />
			</template>
			<slot>
				{{ $props.icon?.label }}
			</slot>
		</card-inner>
	</ui-card-size>
</template>
