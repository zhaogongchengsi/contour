<script setup lang="ts">

withDefaults(defineProps<{ direction?: 'left' | 'right' }>(), {
	direction: 'left'
})

</script>

<template>
	<div class="fixed top-0 h-screen p-8 w-100 pointer-events-none"
		:class="{ 'left-0': direction === 'left', 'right-0': direction === 'right' }">
		<div
			class="w-full h-full border primary-border-color bg-gray-50 dark:bg-zinc-800/80 rounded-md pointer-events-auto flex flex-col justify-between h-full gap-3">
			<slot name="header" />
			<slot />
			<slot name="footer" />
		</div>
	</div>
</template>
