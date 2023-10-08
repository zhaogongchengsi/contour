<script setup lang="ts">

</script>

<template>
	<ui-affix-modal direction="right">
		<template #header>
			<div class="py-2 px-3 text-4 font-bold border-b-1 primary-border-color">样式</div>
		</template>
		<div class="flex-1">123</div>
		<template #footer>
			<div class="p-3">
				<AppDarkToggle />
			</div>
		</template>
	</ui-affix-modal>
</template>