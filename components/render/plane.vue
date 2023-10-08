<script setup lang="ts">
import { type RenderPlaneProps } from './props'

const props = defineProps<RenderPlaneProps>()

</script>

<template>
	<main class="w-full min-h-screen" :style="`background: ${props.background}`">
		<div class="max-w-300 mx-auto">
			{{ props.name }}
		</div>
	</main>
</template>
