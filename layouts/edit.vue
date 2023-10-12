<script lang="ts" setup>
import { NConfigProvider, NGlobalStyle, NMessageProvider } from 'naive-ui'
import { isClient } from '@vueuse/core'
import { themeOverrides } from '../theme'

</script>

<template>
	<n-config-provider class="app-container" :inline-theme="isClient" :theme-overrides="themeOverrides">
		<n-global-style />
		<NMessageProvider>
				<slot />
			</NMessageProvider>
	</n-config-provider>
</template>