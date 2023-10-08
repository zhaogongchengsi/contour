<script setup lang="ts">

defineProps<{
	name: string
	avatar?: `url:${string}` | `text:${string}` | `emoji:${string}`,
	description?: string,
	edit?: boolean
}>()

</script>

<template>
	<header class="flex gap-5 h-30">
		<ui-resume-avatar v-if="avatar" :src="avatar" :edit="edit" />
		<div class="flex-1 h-full flex flex-col" :class="description ? 'justify-between' : 'justify-center'">
			<h1 class="text-13 text-zinc-900 dark:text-gray-200 font-bold">{{ name }}</h1>
			<p v-if="description">{{ description }}</p>
		</div>
	</header>
</template>
