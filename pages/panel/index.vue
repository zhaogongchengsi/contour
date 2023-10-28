<script setup lang="ts">
import { NLayout, NLayoutSider, NLayoutContent, NLayoutFooter, NLayoutHeader } from 'naive-ui'

definePageMeta({
	layout: 'panel',
})

if (import.meta.server) {

	console.log('server')
}

</script>

<template>
	<n-layout has-sider class="h-screen">
		<n-layout-sider>
			海淀桥
		</n-layout-sider>
		<n-layout>
			<n-layout-header>颐和园路</n-layout-header>
			<n-layout-content>
				平山道
			</n-layout-content>
			<n-layout-footer>成府路</n-layout-footer>
		</n-layout>
	</n-layout>
</template>
