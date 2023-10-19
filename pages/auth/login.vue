<script setup lang="ts">
import { isClient, useInterval } from '@vueuse/core'
import { NForm, NFormItem, NInput, useMessage } from 'naive-ui'
import type { FormInst, FormRules, FormItemRule } from 'naive-ui'
import { onMounted, reactive, ref, watch } from 'vue';
import { account, password, code as codeRole } from '~/utils/rules';
import { emailReg, phoneReg } from '~/utils/reg';

import { debounce } from 'perfect-debounce'


const loading = ref(false)
const code = ref('')

const { success, error } = useMessage()
const { counter, reset, pause, resume } = useInterval(1000, { controls: true, immediate: false })
const formRef = ref<FormInst>()
const fromValue = reactive({
	account: '',
	password: '',
	code: '',
	id: ''
})


const getCode = async (oid?: string) => {
	loading.value = true
	const { id, data } = await (await fetch(`/api/security${oid ? `?id=${oid}` : ''}`)).json() as { id: string, data: string }
	fromValue.id = id
	code.value = data
	loading.value = false
}

onMounted(async () => {
	if (isClient) {
		await getCode()
	}
})

const resetForm = () => {
	fromValue.code = ''
	fromValue.account = ''
	fromValue.password = ''
}

const rules: FormRules = {
	account,
	password,
	code: codeRole,
}

const submit = async () => {
	formRef.value?.validate((errors) => {
		if (!errors) {
			success('验证成功')
		} else {
			console.log(errors)
			error('验证失败')
		}
	})
}

const seconds = 10
watch(counter, (value) => {
	if (value < seconds) return
	pause()
	reset()
})

const resetCode = async () => {
	resume()
	await getCode()
}

</script>

<template>
	<div class="container mx-auto my-10 px-5 flex justify-center">
		<div class="w-full max-w-200">
			<n-form ref="formRef" :label-width="80" :model="fromValue" :rules="rules">
				<n-form-item label="邮箱" path="account">
					<n-input v-model:value="fromValue.account" placeholder="请输入邮箱" />
				</n-form-item>
				<n-form-item label="密码" path="password">
					<n-input type="password" current-password v-model:value="fromValue.password" placeholder="请输入密码" />
				</n-form-item>
				<n-form-item label="验证码" path="code">
					<div class="flex h-full w-full gap-3">
						<n-input class="flex-1" v-model:value="fromValue.code" placeholder="请输入验证码" />
						<div class="w-50 rounded flex gap-3 justify-center items-center">
							<div v-if="!loading" class="w-full h-full bg-white/90" v-html="code"></div>
							<div v-else-if="loading" class="md-icon i-carbon-rotate-180 animate-spin" />
							<div class="w-10 h-10 flex justify-center items-center">
								<span v-if="counter" class="text-6">{{ counter }}</span>
								<div v-else class="w-8 h-8 i-carbon:rotate-360 cursor-pointer" @click="resetCode" />
							</div>
						</div>
					</div>
				</n-form-item>
				<div class="flex gap-5">
					<button attr-type="button" @click="submit">登录</button>
					<button @click="resetForm">重置</button>
				</div>
			</n-form>
		</div>
	</div>
</template>
