<script setup lang="ts">

withDefaults(defineProps<{ center?: boolean }>(), {
	center: false
})

</script>

<template>
	<ul class="flex flex-wrap gap-8" :class="{ 'justify-center': center }">
		<slot />
	</ul>
</template>