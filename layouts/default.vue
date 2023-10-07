<script setup lang="ts">
import { NConfigProvider, NGlobalStyle, darkTheme, lightTheme } from 'naive-ui'
import { isClient } from '@vueuse/core'
import { themeOverrides } from '../theme'

const colorMode = useColorMode()

const theme = computed(() => {
	return colorMode.value === 'dark' ? darkTheme : lightTheme
})

</script>

<template>
	<n-config-provider class="app-container" :theme="theme" :inline-theme="isClient" :theme-overrides="themeOverrides">
		<n-global-style />
		<AppHeader />
		<main class="app-main min-h-screen">
			<slot />
		</main>
		<AppFooter />
	</n-config-provider>
</template>

<style>

</style>
