<script setup lang="ts">
import { ref } from 'vue'
import { isName } from '~/composables/schema';
import { message } from '~/composables/discrete'

const router = useRouter()
const name = ref<string>('')
const edit = useEditDataStore()
const appConfig = useAppConfig()

interface FooterLink {
	title: string;
	nav: { title: string, link: string }[]
}

const footerLinks = computed(() => {
	return ((appConfig.footer as any).links as FooterLink[]) || []
})

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
		class="flex flex-col items-center pt-20 sm:pt-30 md:pt-40 container mx-auto overflow-hidden min-h-80 sm:min-h-100  md:min-h-200 relative">
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
			<span class="text-4 sm:text-5 text-white/60">现在就开始使用我的APP吧！</span>
			<div class="flex mt-5 md:mt-8 gap-6 justify-center items-center sm:gap-7 md:gap-8">
				<router-link class="primary-button primary-button-text primary-button-color"
					to="/auth/register">立即注册</router-link>
				<router-link class="~ h-full primary-button-text-flip" to="/auth/login">立即登录</router-link>
			</div>
		</div>
	</div>
	<section class="container mx-auto h-150 text-center">没想好这里放啥</section>
	<section
		class="container mx-auto px-3 md:px-0 flex flex-col sm:flex-row sm:items-start justify-between items-center gap-10 my-15 sm:my-20 md:my-30">
		<div class="flex items-center gap-3">
			<i class="block i-carbon:favorite-filled w-6 h-6" />
			<span class="text-zinc-300 text-5 font-bold sm:text-6 md:text-7">个人专属页面</span>
		</div>
		<nav class="flex flex-col items-start sm:flex-row text-3 gap-5 sm:gap-10 md:gap-20 w-full sm:w-1/2">
			<dl
				v-for="item of footerLinks" 
				:key="item.title"
				class="w-full sm:w-auto grid grid-cols-3 gap-1 md:gap-2"
			>
				<dt class="col-span-3 text-4 sm:text-5 md:text-6 mb-2 sm:mb-3 md:mb-5 text-zinc-300">{{ item.title }}</dt>
				<dd class="flex sm:col-span-3 text-3 sm:text-4 md:text-5" v-for="i of item.nav" :key="i.title">
					<a :href="i.link" class="text-zinc-400 hover:text-zinc-300">
						{{ i.title }}
					</a>
				</dd>
			</dl>
		</nav>
	</section>
</template>
