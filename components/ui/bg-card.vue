<script setup lang="ts">

withDefaults(
	defineProps<{ value: string, active?: boolean }>(),
	{
		active: false
	}
)

</script>

<template>
	<div class="relative h-12 rounded-md cursor-pointer border">
		<div class="w-full h-full rounded-md" :style="{ background: value }" />
		<div v-if="active"
			class="absolute left-0 w-full h-full top-0 text-purple-500 flex justify-center items-center bg-black/50">
			<div class="md-icon i-carbon:checkmark font-bold text-white" />
		</div>
	</div>
</template>
