<script lang="ts" setup>
import { NInput } from 'naive-ui'

defineProps<{ name: string | string[] }>()

const store = useEditDataStore()

</script>

<template>
	<ui-affix-modal>
		<template #header>
			<div class="py-2 px-3 text-4 font-bold">{{ name }}</div>
		</template>
		<div class="flex-1 flex flex-col gap-3 px-3 pb-2">
			<h4 class="text-4 font-bold text-gray-400">描述</h4>
			<n-input size="small" v-model:value="store.description" placeholder="请输入描述" />
			<div class="grid grid-cols-4 justify-items-center gap-3">
				<ui-icon-card name="github" theme="apple">
					<div class="w-full h-full flex justify-center items-center bg-black">
						<div class="w-8 h-8 i-uiw:github" />
					</div>
				</ui-icon-card>
				<ui-icon-card name="github" theme="android">
					<div class="w-full h-full flex justify-center items-center bg-black">
						<div class="w-8 h-8 i-uiw:github" />
					</div>
				</ui-icon-card>
				<ui-icon-card name="github" theme="windows">
					<div class="w-full h-full flex justify-center items-center bg-black">
						<div class="w-8 h-8 i-uiw:github" />
					</div>
				</ui-icon-card>
				<ui-icon-card name="github" theme="windows">
					<div class="w-full h-full flex justify-center items-center bg-black">
						<div class="w-8 h-8 i-uiw:github" />
					</div>
				</ui-icon-card>
				<ui-icon-card name="github" theme="windows">
					<div class="w-full h-full flex justify-center items-center bg-black">
						<div class="w-8 h-8 i-uiw:github" />
					</div>
				</ui-icon-card>
			</div>
		</div>
	</ui-affix-modal>
</template>
