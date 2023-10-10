<script lang="ts" setup>
import { NInput, NDynamicInput, NInputGroup, NSelect, NUpload, type SelectOption, type UploadFileInfo } from 'naive-ui'
import { VNodeChild, h } from 'vue';

const store = useEditDataStore()

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

const fileList = ref<UploadFileInfo[]>([
	// {
	// 	id: 'c',
	// 	name: '我是自带url的图片.png',
	// 	status: 'finished',
	// 	url: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
	// }
])


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
			<n-upload class="app-file-upload"
				:default-file-list="fileList" list-type="image-card">
				<div class="md-icon i-carbon:upload" />
			</n-upload>
		</div>
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
