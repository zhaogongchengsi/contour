<script lang="ts" setup>
import { NInput, NDynamicInput, NInputGroup, NSelect } from 'naive-ui'
import type { SelectOption } from 'naive-ui'
import { VNodeChild, h } from 'vue';
import icons from '~/assets/icons.json'
import { useCardFormModal } from '~/stores/cardForm';
import type { IconInfo } from '~/types';

const store = useEditDataStore()
const modalStore = useCardFormModal()

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

const addCard = (icon: IconInfo) => {
	modalStore.icon = icon
	modalStore.title = icon.label
	
	modalStore.reset()
	modalStore.show()
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
				<template #action="{ index, create, remove }">
					<div class="flex items-center gap-3 ml-3">
						<div class="sm-icon cursor-pointer opacity-80 hover:opacity-100 i-uiw:plus"
							@click="() => create(index)" />
						<div class="sm-icon cursor-pointer opacity-80 hover:opacity-100 i-uiw:minus"
							@click="() => remove(index)" />
					</div>
				</template>
			</n-dynamic-input>
			<h4 class="text-4 font-bold text-gray-400">小组件</h4>
			<div class="grid grid-cols-5 gap-3">
				<div v-for="icon of (icons as IconInfo[])" @click="addCard(icon)" :key="icon.name"
					class="h-full flex flex-col items-center cursor-pointer">
					<div :style="{ background: icon.background || 'transparent' }"
						class="flex-col rounded-md py-1 w-full flex items-center justify-center">
						<img :src="icon.image" class="object-contain" :alt="icon.name">
					</div>
					<span class="text-3">{{ icon.label }}</span>
				</div>
			</div>
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
