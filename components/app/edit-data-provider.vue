<script setup lang="ts">

const data = reactive({})
provide(editDataProviderKey, data)

</script>

<template>
	<div class="w-full relative min-h-screen py-10">
		<slot />
	</div>
</template>