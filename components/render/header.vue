<script setup lang="ts">

const data = usePlaneData()

</script>

<template>
	<header class="flex gap-5 h-30">
		<ui-avatar v-if="data.avatar" :src="data.avatar!" :edit="data.edit" />
		<div class="flex-1 h-full flex flex-col" :class="data.description ? 'justify-between' : 'justify-center'">
			<h1 class="text-13 text-zinc-900 dark:text-gray-200 font-bold">{{ data.name }}</h1>
			<p v-if="data?.description">{{ data!.description }}</p>
		</div>
	</header>
</template>

