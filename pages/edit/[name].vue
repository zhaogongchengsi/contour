<script setup lang="ts">

definePageMeta({
	layout: 'edit',
});

const store = useEditDataStore()

</script>

<template>
	<app-component :name="$route.params.name" />
	<render-plane
		edit
		:frosted="store.styles.includes('frosted')" 
		:center="store.styles.includes('center')"
		:blur="store.styles.includes('blur')" 
		:ltalic="store.styles.includes('ltalic')" 
		:avatar="store.avatar"
		:name="store.name"
		:background="store.background"
		:description="store.description"
	/>
	<app-style />
</template>
