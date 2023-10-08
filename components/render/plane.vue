<script setup lang="ts">
import { type RenderPlaneProps } from './props'

const props = defineProps<RenderPlaneProps>()

</script>

<template>
	<div class="max-w-300 mx-auto">
		{{ props.name }}
	</div>
</template>
