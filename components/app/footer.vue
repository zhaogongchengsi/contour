<script setup lang="ts">
const app = useAppConfig()


</script>

<template>
	<footer class="border-t border-color-gray-200">
		<div class="container mx-auto flex justify-between items-center px-3 py-3">
			<h3>{{ app.title }}</h3>
		</div>
	</footer>
</template>
