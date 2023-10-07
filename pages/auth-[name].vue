<script setup lang="ts">
import { NTabs, NTabPane } from 'naive-ui'

const name = useRoute().params.name as string

</script>

<template>
	<div class="container mx-auto py-10 sm:my-15 md:my-20 px-3 md:px-0">
		<n-tabs class="max-w-150 mx-auto" :default-value="name" animated>
			<n-tab-pane name="login" tab="登录">
				<AppAuthForm button-text="登录" />
			</n-tab-pane>
			<n-tab-pane name="register" tab="注册">
				<AppAuthForm button-text="注册" />
			</n-tab-pane>
		</n-tabs>
	</div>
</template>
