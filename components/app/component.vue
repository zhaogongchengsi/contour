<script lang="ts" setup>
import { NInput, NDynamicInput, NInputGroup, NSelect, SelectOption } from 'naive-ui'
import { VNodeChild, h } from 'vue';
import { ContactInfo } from '~/types';

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
		</div>
	</ui-affix-modal>
</template>
