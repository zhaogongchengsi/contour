<script setup lang="ts">
const app = useAppConfig()

</script>

<template>
	<header class="border-b border-color-gray-200">
		<div class="container mx-auto flex items-center px-3 py-3 md:py-5">
			<div class="flex items-center gap-3">
				<AppLogo />
				<h1 class="text-2 sm:text-4 md:text-6 font-bold title">{{ app.title }}</h1>
			</div>
		</div>
	</header>
	<main class="container min-h-screen mx-auto">
		<slot />
	</main>
	<footer class="border-t border-color-gray-200">
		<div class="container mx-auto flex justify-between items-center px-3 py-3">
			<h3>{{ app.title }}</h3>
			<!-- <AppDarkToggle /> -->
		</div>
	</footer>
</template>
