<script setup lang="ts">

definePageMeta({
	layout: 'edit',
	// middleware: ['auth'],
});

</script>

<template>
	<RenderPlane :name="$route.params.name" />
</template>
