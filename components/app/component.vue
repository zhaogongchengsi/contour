<script lang="ts" setup>
import { NInput, NDynamicInput, NInputGroup, NSelect, NUpload, useMessage, NModal } from 'naive-ui'
import type { SelectOption, UploadFileInfo, UploadCustomRequestOptions } from 'naive-ui'
import { VNodeChild, h } from 'vue';
import { lyla } from 'lyla'
import { UploadInfo } from '~/types';
import { removeFileApi } from '~/composables/api';
import { icons } from '~/composables/constants'

const store = useEditDataStore()
const messageApi = useMessage()
const showModal = ref(false)

const selectOptions = ref([
	{
		label: "i-uiw:qq",
		value: "qq"
	},
	{
		label: "i-uiw:mail",
		value: "mail"
	},
	{
		label: "i-uiw:android",
		value: "phone"
	}
])

const renderLabel = (option: SelectOption): VNodeChild => {
	return h('div', { class: ["sm-icon", option.label] })
}

const customRequest = ({
	file,
	headers,
	withCredentials,
	action,
	onFinish,
	onError,
	onProgress
}: UploadCustomRequestOptions) => {
	const formData = new FormData()
	formData.append(store.name, file.file as File)

	lyla
		.post(action as string, {
			withCredentials,
			headers: headers as Record<string, string>,
			body: formData,
			onUploadProgress: ({ percent }) => {
				onProgress({ percent: Math.ceil(percent) })
			}
		})
		.then(({ json }) => {
			const { code, data, message } = json as AppResponse<UploadInfo[]>

			if (!code) {
				messageApi.error(message)
				console.log(message)
				onError()
				return
			}

			data && store.setQRCode(data[0])

			onFinish()
		})
		.catch((error) => {
			onError()
		})

}

const removeFile = async ({ file }: { file: UploadFileInfo, fileList: UploadFileInfo[] }) => {
	const { code, message, data } = await removeFileApi(file.name, store.name)
	if (!code) {
		messageApi.error(message)
		return
	}

	data && store.removeQRCode(data)
}

</script>

<template>
	<ui-affix-modal>
		<template #header>
			<div class="py-2 px-3 text-4 font-bold">{{ store.name }}</div>
		</template>
		<div class="flex-1 flex flex-col gap-3 px-3 pb-2">
			<h4 class="text-4 font-bold text-gray-400">描述</h4>
			<n-input size="small" v-model:value="store.description" placeholder="请输入描述" />
			<h4 class="text-4 font-bold text-gray-400">联系方式</h4>
			<n-dynamic-input v-model:value="store.contacts" :on-create="store.createContact">
				<template #create-button-default>
					随便加点联系方式
				</template>
				<template #default="{ value }">
					<div class="w-full flex items-center gap-3">
						<n-input-group>
							<n-select size="tiny" class="w-30" v-model:value="value.type" :options="selectOptions"
								:render-label="renderLabel" />
							<n-input size="tiny" v-model:value="value.value" type="text" />
						</n-input-group>
					</div>
				</template>
				<template #action="{ index, create, remove, move }">
					<div class="flex items-center gap-3 ml-3">
						<div class="sm-icon cursor-pointer opacity-80 hover:opacity-100 i-uiw:plus"
							@click="() => create(index)" />
						<div class="sm-icon cursor-pointer opacity-80 hover:opacity-100 i-uiw:minus"
							@click="() => remove(index)" />
					</div>
				</template>
			</n-dynamic-input>
			<h4 class="text-4 font-bold text-gray-400">二维码</h4>
			<n-upload :max="3" class="app-file-upload" action="/api/file/upload" accept="image/*" @remove="removeFile"
				:custom-request="customRequest" list-type="image-card">
				<div class="md-icon i-carbon:upload" />
			</n-upload>
			<h4 class="text-4 font-bold text-gray-400">小组件</h4>
			<div class="grid grid-cols-5 gap-3">
				<div v-for="icon of icons" @click="showModal = true" :key="icon.label"
					class="h-full flex flex-col items-center cursor-pointer">
					<component :is="icon.component" class="h-12" />
					<span class="text-3">{{ icon.label }}</span>
				</div>
			</div>
		</div>
		<n-modal v-model:show="showModal">
			<div class="w-230 bg-white/80 border border-white/30 rounded-md backdrop-blur-md" >
				<div class="flex justify-between items-center border-b-1 primary-border-color px-2 py-1">
					<h3>创建小卡片</h3>
					<div class="w-6 h-6 i-carbon:close cursor-pointer hover:text-purple-500" @click="showModal = false" />
				</div>
				<div class="p-3">
					<app-card-from />
				</div>
			</div>
		</n-modal>
	</ui-affix-modal>
</template>

<style>
.app-file-upload .n-upload-file-list {
	--image-size: 52px;
	grid-template-columns: repeat(auto-fill, var(--image-size));
}

.app-file-upload .n-upload-file-list .n-upload-file {
	width: var(--image-size);
	height: var(--image-size);
}

.app-file-upload .n-upload-trigger {
	width: var(--image-size);
	height: var(--image-size);
}
</style>
