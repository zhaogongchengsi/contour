<script setup lang="ts">
const app = useAppConfig()

</script>

<template>
	<header class="border-b border-color-gray-200 dark:border-color-gray-800">
		<div class="container mx-auto flex items-center justify-between px-3 py-3 md:py-5">
			<div class="flex items-center gap-3">
				<AppLogo />
				<h1 class="text-2 sm:text-4 md:text-6 font-bold title">{{ app.title }}</h1>
			</div>
			<div class="flex items-center gap-5">
				<RouterLink class="link" to="/auth-register">注册</RouterLink>
				<RouterLink class="link font-bold" to="/auth-login">登陆</RouterLink>
			</div>
		</div>
	</header>
</template>