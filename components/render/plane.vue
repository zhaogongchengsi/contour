<script setup lang="ts">
import { RenderPlaneProps } from '~/types';

const props = defineProps<RenderPlaneProps>()

provide<RenderPlaneProps>(editDataProviderKey, props)

</script>

<template>
	<main class="w-full min-h-screen" :style="{background: props.background }">
		<div class="max-w-300 mx-auto py-15">
			<ui-resume-header />
		</div>
	</main>
</template>
