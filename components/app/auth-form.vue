<script setup lang="ts">
import { isClient } from '@vueuse/core'

interface AuthFormProps {
	buttonText: string
	icon?: string
}

const id = ref<undefined | string>('')

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

</script>

<template>
	<div class="space-y-5">
		<div class="from-item">
			<label class="w-25 h-full inline-flex items-center">账号</label>
			<input class="primary-input" placeholder="请输入账号" />
		</div>
		<div class="from-item">
			<label class="w-25 h-full inline-flex items-center">密码</label>
			<input class="primary-input" placeholder="请输入密码" />
		</div>
		<div class="from-item">
			<label class="w-25 h-full inline-flex items-center">验证码</label>
			<input class="primary-input" placeholder="请输入密码" />
			<div class="w-40 h-full flex justify-center items-center border-x-1 border-t-1 cursor-pointer"
				@click="refresh(id)">
				<div v-if="loading" class="md-icon i-carbon-rotate-180 animate-spin" />
				<div v-else-if="data && !loading" class="w-full h-full" v-html="data.data"></div>
			</div>
		</div>
		<button class="primary-button flex gap-4 justify-center items-center">
			<div v-if="icon" class="primary-icon" :class="icon" />
			<span class="primary-text">{{ buttonText }}</span>
		</button>
	</div>
</template>
