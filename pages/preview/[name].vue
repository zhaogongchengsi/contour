<script setup lang="ts">

definePageMeta({
	layout: 'edit',
});

const store = useEditDataStore()

const route = useRoute()
store.setName(route.params.name as string)

</script>

<template>
	<render-plane :color="store.color" :frosted="store.styles.includes('frosted')" :center="store.styles.includes('center')"
		:blur="store.styles.includes('blur')" :ltalic="store.styles.includes('ltalic')" :avatar="store.avatar"
		:name="store.name" :background="store.background" :description="store.description" :contacts="store.contacts"
		:cards="store.cards" />
	<div class="fixed right-10 top-5 bg-white dark:bg-dark-800 p-3 rounded-md flex flex-col gap-3 z-999 print:hidden">
		<button :to="`/preview/${route.params.name}`" @click="$router.back()"
			class="flex gap-3 px-2 justify-center items-center bg-purple-500 h-8 hover:bg-purple-400 text-white rounded-md">
			<div class="md-icon i-carbon:reply" />
			<span class="text-2">编辑</span>
		</button>
	</div>
</template>
