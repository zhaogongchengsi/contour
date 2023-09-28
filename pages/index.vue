<script setup lang="ts">
import { ref } from 'vue'
import { MessageInstance } from '~/components/ui/instance';
import { isName } from '~/composables/schema';

const message = ref('')
const messageInstance = ref<MessageInstance>()
const router = useRouter()
const name = ref<string>('')

const submit = async () => {
	const url = unref(name)
	const { success, message: msg } = await isName(url)

	if (!success) {
		message.value = msg!
		messageInstance.value?.open()
		return
	}

	router.push(`/edit/${url}`)
}

const open = () => {
	messageInstance.value?.open()
}

</script>

<template>
	<div class="flex flex-col items-center py-10 container mx-auto">
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

		<UiMessage type="error" ref="messageInstance">{{ message }}</UiMessage>
	</div>
</template>

