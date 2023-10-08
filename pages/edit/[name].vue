<script setup lang="ts">

definePageMeta({
	layout: 'edit',
	// middleware: ['auth'],
});

const store = useEditDataStore()

const route = useRoute()
store.setName(route.params.name as string)

</script>

<template>
	<RenderLeftPlane />
	<RenderPlane :name="store.name" :background="store.background" />
	<RenderRightPlane />
</template>
