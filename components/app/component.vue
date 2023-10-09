<script lang="ts" setup>

defineProps<{ name: string | string[] }>()

</script>

<template>
	<ui-affix-modal>
		<template #header>
			<div class="py-2 px-3 text-4 font-bold border-b-1 primary-border-color">{{ name }}</div>
		</template>
		<div class="flex-1">123</div>
	</ui-affix-modal>
</template>
