<script setup lang="ts">
import { isClient, useInterval } from '@vueuse/core'
import { NForm, NFormItem, NInput, NButton, type FormInst, useMessage } from 'naive-ui'

interface AuthFormProps {
	buttonText: string
	icon?: string
}

const seconds = 10

const messageApi = useMessage()
const { counter, reset, pause, resume } = useInterval(1000, { controls: true, immediate: false })
const formRef = ref<FormInst>()
const fromValue = reactive({
	account: '',
	password: '',
	code: '',
	id: ''
})

withDefaults(defineProps<AuthFormProps>(), {
	icon: 'i-carbon-login'
})

const emit = defineEmits<{
	(e: 'submit', value: typeof fromValue): void
}>()

const { data, refresh, loading, execute } = useVerifyCode()

onMounted(async () => {
	if (isClient) {
		await execute()
	}
})

watch(data, (newData) => {
	fromValue.id = newData.id
})

watch(counter, (newCounter) => {
	if (newCounter === seconds) {
		// 暂停计时器 重制计时器 请求新验证码
		pause()
		reset()
		refresh(fromValue.id)
	}
})


const resetForm = () => {
	fromValue.code = ''
	fromValue.account = ''
	fromValue.password = ''
}

const submit = async () => {

	const { success, message } = await isUserInfo(fromValue)

	if (success) {
		emit('submit', fromValue)
		return
	}

	messageApi.error(message!)

}

</script>

<template>
	<div class="space-y-5">
		<n-form ref="formRef" :label-width="80" :model="fromValue">
			<n-form-item label="邮箱">
				<n-input v-model:value="fromValue.account" placeholder="请输入邮箱" />
			</n-form-item>
			<n-form-item label="密码">
				<n-input type="password" current-password v-model:value="fromValue.password" placeholder="请输入密码" />
			</n-form-item>
			<n-form-item label="验证码">
				<div class="flex h-full w-full gap-3">
					<n-input class="flex-1" v-model:value="fromValue.code" placeholder="请输入验证码" />
					<div @click="resume()" class="w-30 border rounded flex justify-center items-center cursor-pointer">
						<span v-if="counter" class="text-4">{{ counter }}</span>
						<div v-else-if="loading" class="md-icon i-carbon-rotate-180 animate-spin" />
						<div v-else-if="data && !loading" class="w-full h-full bg-white" v-html="data.data"></div>
					</div>
				</div>
			</n-form-item>
			<n-form-item>
				<div class="flex gap-3">
					<n-button attr-type="button" @click="submit">{{ buttonText }}</n-button>
					<n-button @click="resetForm">重置</n-button>
				</div>
			</n-form-item>
		</n-form>
	</div>
</template>
