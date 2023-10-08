<script lang="ts" setup>
import { NConfigProvider, NGlobalStyle, darkTheme, lightTheme, NMessageProvider } from 'naive-ui'
import { isClient } from '@vueuse/core'
import { themeOverrides } from '../theme'

const colorMode = useColorMode()

const theme = computed(() => {
	return colorMode.preference === 'dark' ? darkTheme : lightTheme
})
</script>

<template>
	<n-config-provider class="app-container" :theme="theme" :inline-theme="isClient" :theme-overrides="themeOverrides">
		<n-global-style />
		<NMessageProvider>
			<slot />
		</NMessageProvider>
	</n-config-provider>
</template>