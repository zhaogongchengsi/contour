<script setup lang="ts">
const route = useRoute()
</script>

<template>
	<ui-affix-modal direction="right">
		<template #header>
			<div class="flex py-2 px-3 items-center justify-between border-b-1 primary-border-color">
				<h3 class="text-4 font-bold">样式</h3>
				<RouterLink :to="`/preview/${route.params.name}`">
					<button class="md-icon i-carbon:view" title="预览"></button>
				</RouterLink>
			</div>
		</template>
		<div class="flex-1">123</div>
		<template #footer>
			<div class="p-3">
				<AppDarkToggle />
			</div>
		</template>
	</ui-affix-modal>
</template>
