<script setup lang="ts">
import { isClient, useInterval } from '@vueuse/core'
import { NForm, NFormItem, NInput, NButton, type FormInst } from 'naive-ui'

interface AuthFormProps {
	buttonText: string
	icon?: string
}

const seconds = 10

const { counter, reset, pause, resume } = useInterval(1000, { controls: true, immediate: false })
const formRef = ref<FormInst>()
const id = ref<undefined | string>('')
const fromValue = reactive({
	email: '',
	password: '',
	code: ''
})

withDefaults(defineProps<AuthFormProps>(), {
	icon: 'i-carbon-login'
})

const { data, refresh, loading, execute } = useVerifyCode()

onMounted(async () => {
	if (isClient) {
		await execute()
	}
})

watch(data, (newData) => {
	id.value = newData.id
})

watch(counter, (newCounter) => {
	if (newCounter === seconds) {
		// 暂停计时器 重制计时器 请求新验证码
		pause()
		reset()
		refresh(id.value)
	}
})

</script>

<template>
	<div class="space-y-5">
		<n-form ref="formRef" :label-width="80" :model="fromValue">
			<n-form-item label="邮箱" v-model:value="fromValue.email">
				<n-input placeholder="请输入邮箱" />
			</n-form-item>
			<n-form-item label="密码" v-model:value="fromValue.password">
				<n-input placeholder="请输入密码" />
			</n-form-item>
			<n-form-item label="验证码" v-model:value="fromValue.code">
				<div class="flex h-full w-full gap-3">
					<n-input class="flex-1" placeholder="请输入验证码" />
					<div @click="resume()" class="w-30 border rounded flex justify-center items-center cursor-pointer">
						<span v-if="counter" class="text-4">{{ counter }}</span>
						<div v-else-if="loading" class="md-icon i-carbon-rotate-180 animate-spin" />
						<div v-else-if="data && !loading" class="w-full h-full" v-html="data.data"></div>
					</div>
				</div>
			</n-form-item>
			<n-form-item>
				<n-button attr-type="button">
					{{ buttonText }}
				</n-button>
			</n-form-item>
		</n-form>
	</div>
</template>
