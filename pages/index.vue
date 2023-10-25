<script setup lang="ts">
import { ref } from 'vue'
import { isName } from '~/composables/schema';
import { message } from '~/composables/discrete'

const router = useRouter()
const name = ref<string>('')
const edit = useEditDataStore()

const userInfo = useUserInfo()

watch(userInfo.user, (u) => {
	if (isEmpty(u)) {
		name.value = ''
		edit.setName('')
	}
})

onMounted(() => {
	if (!import.meta.browser || !userInfo.logged()) {
		return
	}

	if (userInfo.user) {
		const n = (userInfo.user.value as User).name!
		name.value = n
		edit.setName(n)
	}

})

const submit = async () => {
	const url = unref(name)
	const { success, message: msg } = await isName(url)

	if (!success) {
		message.error(msg!)
		return
	}

	edit.setName(url)
	router.push(`/edit/${url}`)
}

</script>

<template>
	<div
		class="flex flex-col items-center pt-30 container mx-auto overflow-hidden min-h-100 sm:min-h-125  md:min-h-150 relative">
		<h3 class="text-8 sm:text-12 md:text-15 lg:text-20 font-bold z-10">定制个人专属页面</h3>
		<div
			class="w-full px-5 sm:px-0 max-w-100  md:max-w-150 mx-auto mt-20 h-12 sm:h-15 md:h-18 flex gap-3 rounded-md shadow-lg z-10">
			<div
				class="bg-white/10 rounded-lg focus-within:bg-white/20 text-4 md:text-6 backdrop-blur focus-within:backdrop-blur-sm flex-1 h-full flex items-center px-4 gap-2">
				<span class="block shrink-0">Talent :</span>
				<input v-model="name" :disabled="edit.name != ''"
					class="flex-1 h-full rounded-lg px-2 outline-none bg-transparent" type="text" placeholder="输入你的名称或者昵称">
			</div>
			<button @click="submit"
				class="rounded-lg h-full bg-white/80 hover:bg-white w-25 md:w-40 text-black text-4 md:text-6 flex items-center gap-4 justify-center">
				<div class="w-5 h-5 md:w-7 md:h-7 i-carbon-edit" />
				<span class="font-bold">提交</span>
			</button>
		</div>
	</div>
	<div
		class="container mx-auto px-3 my-5 sm:my-10 md:my-20 flex flex-col md:flex-row md:items-start items-center justify-between">
		<h4 class="text-6 sm:text-8 md:text-10 font-bold">马上行动</h4>
		<div class="w-full md:w-1/2 flex flex-col items-center md:items-start mt-10 md:mt-0">
			<span class="text-5 text-white/60">现在就开始使用我的APP吧！</span>
			<div class="flex mt-5 md:mt-8 gap-6 justify-center items-center sm:gap-7 md:gap-8">
				<router-link class="primary-button primary-button-text primary-button-color" to="/auth/register">立即注册</router-link>
				<router-link class="~ h-full primary-button-text-flip" to="/auth/login">立即登录</router-link>
			</div>
		</div>
	</div>
</template>