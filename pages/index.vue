<script setup lang="ts">
import { ref } from 'vue'

const router = useRouter()
const name = ref<string>('')

const submit = () => {
	const url = unref(name)
	if (!url) {
		alert('不得为空')
		return
	}
	if (url.length < 3) {
		alert('最短不得小于3个字母')
		return
	}
	if (url.length > 20) {
		alert('最长大得20个字母')
		return
	}

	router.push(`/edit/${url}`)
}

</script>

<template>
	<div class="flex flex-col items-center py-10">
		<h3 class="text-8 sm:text-12 md:text-15 lg:text-20 font-bold">开始吧！ 🤳</h3>
		<div class="mt-20 h-15 sm:h-18 md:h-20 bg-purple-100 px-4 py-2 flex gap-3 rounded-md shadow-md">
			<input v-model="name"
				class="w-50 sm:w-70 md:w-90 h-full rounded-md bg-transparent outline-none text-4 md:text-6" type="text"
				placeholder="输入你的名称或者昵称">
			<button @click="submit"
				class="rounded-md h-full bg-purple-400 w-20 md:w-30 text-white text-4 md:text-6 shadow-lg flex items-center gap-2 justify-center">
				<div class="md-icon i-carbon-edit" />
				<span>提交</span>
			</button>
		</div>
	</div>
</template>

