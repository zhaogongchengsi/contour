<script setup lang="ts">

withDefaults(defineProps<{ direction?: 'left' | 'right' }>(), {
	direction: 'left'
})

</script>

<template>
	<div class="fixed top-0 h-screen p-8 w-100 pointer-events-none" :class="{ 'left-0': direction === 'left', 'right-0': direction === 'right' }">
		<div class="w-full h-full border bg-white dark:bg-black rounded-md pointer-events-auto">
			<slot />
		</div>
	</div>
</template>
