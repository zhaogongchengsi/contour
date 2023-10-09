<script setup lang="ts">

definePageMeta({
	layout: 'edit',
});

const store = useEditDataStore()

const route = useRoute()
store.setName(route.params.name as string)

</script>

<template>
	<render-plane :avatar="store.avatar" :name="store.name" :background="store.background" />
</template>
