<script setup lang="ts">
import { NTabs, NTabPane, useMessage } from 'naive-ui'
import { loginApi } from '~/composables/api';

const name = useRoute().params.name as string

const messageApi = useMessage()

const login = async (value: any) => {
	const { code, message } = await loginApi(value)
	if (code) {
		messageApi.success('登陆成功')
		return
	}
	messageApi.error(message)
}

const register = async (value: any) => {
	const { code, message } = await registerApi(value)
	if (code) {
		messageApi.success('注册成功')
		return
	}
	messageApi.error(message)
}

</script>

<template>
	<div class="container mx-auto py-10 sm:my-15 md:my-20 px-3 md:px-0">
		<n-tabs class="max-w-150 mx-auto" :default-value="name" animated>
			<n-tab-pane name="login" tab="登录">
				<AppAuthForm button-text="登录" @submit="login" />
			</n-tab-pane>
			<n-tab-pane name="register" tab="注册">
				<AppAuthForm button-text="注册" @submit="register" />
			</n-tab-pane>
		</n-tabs>
	</div>
</template>
