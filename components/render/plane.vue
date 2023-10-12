<script setup lang="ts">
import { RenderPlaneProps } from '~/types';

const props = withDefaults(defineProps<RenderPlaneProps>(), {
	center: false,
	blur: false,
	frosted: false,
	ltalic: false,
	description: ''
})

provide<RenderPlaneProps>(editDataProviderKey, props)

</script>

<template>
	<main class="w-full min-h-screen relative flex px-3 sm:px-10 md:px-30 lg:px-50 xl:px-80 2xl:px-150"
		:style="{ background: props.background }">
		<div class="w-full py-15 z-20 flex flex-col gap-5">
			<render-header />
			<render-contact />
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

.bg-frosted {
	background: url(/noise.svg);
}
</style>