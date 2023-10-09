<script setup lang="ts">
import { RenderPlaneProps } from '~/types';

const props = withDefaults(defineProps<RenderPlaneProps>(), {
	background: '#fff',
	center: false,
	blur: false,
	frosted: false,
	ltalic: false
})

provide<RenderPlaneProps>(editDataProviderKey, props)

</script>

<template>
	<main class="w-full min-h-screen relative flex" :style="{ background: props.background }">
		<div class="w-300 mx-auto py-15 z-20">
			<render-header />
		</div>
		<div class="render-bg z-10" :class="{
			'bg-frosted': props.frosted,
			'backdrop-blur-sm': props.blur
		}" />
	</main>
</template>

<style>
.render-bg {
	position: fixed;
	width: 100%;
	height: 100vh;
	top: 0;
	left: 0;
	inset: 0;
	pointer-events: none;
}

.bg-frosted::after {
	content: '';
	display: block;
	position: absolute;
	background: url(/noise.svg);
	z-index: -10;
	@apply w-full h-full top-0 left-0 inset-0;
}
</style>