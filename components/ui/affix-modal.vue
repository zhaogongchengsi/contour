<script setup lang="ts">
import { NScrollbar } from 'naive-ui'

withDefaults(defineProps<{ direction?: 'left' | 'right' }>(), {
	direction: 'left'
})

</script>

<template>
	<div class="fixed top-0 h-screen p-8 w-100 pointer-events-none z-99"
		:class="{ 'left-0': direction === 'left', 'right-0': direction === 'right' }">
		<div
			class="w-full h-full border primary-border-color bg-gray-50 dark:bg-zinc-800/80 rounded-md pointer-events-auto">
			<n-scrollbar style="height: calc(100vh - 48px)" class="affix-modal-container_scrollbar">
				<slot name="header" />
				<slot />
				<slot name="footer" />
			</n-scrollbar>
		</div>
	</div>
</template>

<style>
.affix-modal-container_scrollbar .n-scrollbar-content {
	@apply flex flex-col justify-between gap-3 min-h-full
}
</style>
