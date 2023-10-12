<script setup lang="ts">

const data = usePlaneData()

</script>

<template>
	<header
		class="flex gap-5 h-30" 
		:class="{
			'flex-col justify-center items-center h-auto': data.center
		}"
	>
		<ui-avatar v-if="data.avatar" :src="data.avatar!" :edit="data.edit" />
		<div class="flex-1 h-full flex flex-col w-full" :class="data.description ? 'justify-between' : 'justify-center'">
			<h1 
				class="text-13 text-zinc-900 w-full dark:text-gray-200 font-bold text-center" 
				:class="{ 'italic': data.ltalic }"
			>
				{{ data.name }}
			</h1>
			<p v-if="data?.description" class="outline-none text-6 text-center" :class="{ 'italic': data.ltalic }">{{ data!.description }}</p>
		</div>
	</header>
</template>

