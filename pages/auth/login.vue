<script setup lang="ts">
import { useMessage } from 'naive-ui'
import type { FormInst, FormRules } from 'naive-ui'
import { account, password, code as codeRole } from '~/utils/rules';
import { debounce } from 'perfect-debounce'

const config = useRuntimeConfig()
const store = useEditDataStore()
const router = useRouter()
const userStore = useUserInfo()
const { success, error } = useMessage()
const formRef = ref<FormInst>()
const fromValue = reactive({
	name: store.name || '',
	account: import.meta.dev ? config.public.init.user : '',
	password: import.meta.dev ? config.public.init.pass : '',
	code: '',
	id: ''
})

const resetForm = () => {
	fromValue.code = ''
	fromValue.account = ''
	fromValue.password = ''
}

const rules: FormRules = {
	name: [
		{
			required: true,
			message: '请输入名称'
		}
	],
	account,
	password,
	code: codeRole,
}

const submit = async () => {

	formRef.value?.validate((errors) => {
		if (errors) return

		store.setName(fromValue.name)

		loginApi(fromValue).then(({ code, data, message }) => {
			if (!code) {
				error(message)
				return
			}

			const { authorization, user } = data!
			userStore.logging(user, authorization)

			success('登陆成功')

			router.push(`/edit/${fromValue.name}`)

		}).catch(err => {
			console.log(err);
		})

	})
}

const loginHandle = debounce(() => {
	console.log('login')
}, 300)

</script>

<template>
	<div class="container login-page-container mx-auto max-w-100 md:max-w-120 px-4 py-20 sm:py-30 md:py-30">
		<h4 class="text-5 sm:text-8 md:text-10 font-bold mb-10 sm:mb-12 md:mb-15 text-center">登录</h4>
		<ui-big-form class="w-full max-w-200 flex flex-col gap-5 sm:gap-8 md:gap-10">
			<ui-big-input error type="text" v-model:value="fromValue.name" placeholder="请输入名称" />
			<ui-big-input warning type="text" v-model:value="fromValue.account" placeholder="请输入账号" />
			<ui-big-input success type="password" v-model:value="fromValue.password" placeholder="请输入密码" />
			<div class="flex gap-2">
				<ui-big-input wrapper-class="w-2/3" type="text" v-model:value="fromValue.code" placeholder="请输入验证码" />
				<app-code class="flex-1" />
			</div>
			<ui-big-button @click="loginHandle"
				class="w-full h-10 sm:h-12 md:h-15 bg-white text-black rounded-lg">登录</ui-big-button>
			<div class="flex justify-end gap-4">
				<span class="text-3 sm:text-4 text-zinc-400">忘记密码？</span>
				<router-link to="/auth/register" class="text-3 sm:text-4 text-zinc-400 hover:text-zinc-300">没有账号
					先去注册</router-link>
			</div>
		</ui-big-form>
	</div>
</template>

<style lang="scss">
.login-page-container {
	height: $dt('page.common.defaultMinHeight');
}
</style>