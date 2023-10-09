<script setup lang="ts">

definePageMeta({
	layout: 'edit',
});

const store = useEditDataStore()

const route = useRoute()
store.setName(route.params.name as string)

</script>

<template>
	<app-component :name="$route.params.name" />
	<render-plane :frosted="store.styles!.includes('frosted')" :center="store.styles?.includes('center')"
		:blur="store.styles?.includes('blur')" :ltalic="store.styles?.includes('ltalic')" :avatar="store.avatar"
		:name="store.name" :background="store.background" />
	<app-style />
</template>
