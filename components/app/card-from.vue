<script setup lang="ts">
import { useMessage, NForm, NFormItem, NButton, NTabs, NTabPane, NScrollbar, NRadioGroup, NRadioButton, NInput, NUpload } from 'naive-ui'
import type { FormInst } from 'naive-ui'
import { useCardFormModal } from '~/stores/cardForm';
import type { LinearGradient } from '~/types';

const messageApi = useMessage()
const material = useMaterial()
const formRef = ref<FormInst | null>(null)

const size = ref('1-1')

const modalStore = useCardFormModal()

const emit = defineEmits<{
	(e: 'commit'): void
	(e: 'cancel'): void
}>()

const bgIsActive = (value: string | LinearGradient): boolean => {
	return typeof value === "string" ? value === modalStore.formValue.background : value.id === (modalStore.formValue.background as LinearGradient).id
}

const sizeUpdate = (value: string) => {
	if (size.value === '1-1') {
		modalStore.formValue.image = ''
	}
	const [row, col] = size.value.split('-')
	modalStore.formValue.size.row = Number(row)
	modalStore.formValue.size.col = Number(col)
}

</script>

<template>
	<div>
		<n-form class="flex-1" ref="formRef" :label-width="80" :model="modalStore.formValue">
			<n-form-item label="链接">
				<NInput placeholder="请输入链接" v-model:value="modalStore.formValue.link">
					<template #prefix>
						<i class="w-4 h-4 block i-carbon:attachment" />
					</template>
				</NInput>
			</n-form-item>
			<n-form-item label="按钮大小">
				<n-radio-group class="w-full justify-center" v-model:value="size" @update:value="sizeUpdate">
					<NRadioButton label="1x1" value="1-1" />
					<NRadioButton label="2x2" value="2-2" />
					<NRadioButton label="1x2" value="1-2" />
					<NRadioButton label="2x1" value="2-1" />
					<NRadioButton label="2x4" value="2-4" />
					<NRadioButton label="4x2" value="4-2" />
				</n-radio-group>
			</n-form-item>
			<n-form-item label="按钮风格">
				<n-radio-group class="w-full justify-center" v-model:value="modalStore.formValue.buttonStyle">
					<NRadioButton label="Apple" value="apple" />
					<NRadioButton label="Android" value="android" />
					<NRadioButton label="Windows" value="windows" />
				</n-radio-group>
			</n-form-item>
			<n-form-item label="背景">
				<NTabs type="segment" animated size="small">
					<NTabPane name="color" tab="纯颜色">
						<NScrollbar class="h-50 max-h-50">
							<div class="grid grid-cols-8 w-full gap-3">
								<ui-bg-card v-for="item of material.colors" @click="modalStore.formValue.background = item"
									:active="bgIsActive(item)" :key="item">
									<div class="w-full h-full" :style="{ background: item }" />
								</ui-bg-card>
							</div>
						</NScrollbar>
					</NTabPane>
					<NTabPane name="gradientColor" tab="渐变色">
						<NScrollbar class="h-50 max-h-50">
							<div class="grid grid-cols-8 w-full gap-3">
								<ui-bg-card v-for="(item, index) of material.generateColor"
									@click="modalStore.formValue.background = item" :active="bgIsActive(item)" :key="index">
									<div class="w-full h-full" :style="{ background: material.generateColorStyle(item) }" />
								</ui-bg-card>
							</div>
						</NScrollbar>
					</NTabPane>
				</NTabs>
			</n-form-item>
			<div class="flex gap-3">
				<n-button attr-type="button" @click="emit('commit')"> 创建 </n-button>
				<n-button attr-type="button" @click="emit('cancel')"> 取消 </n-button>
			</div>
		</n-form>
	</div>
</template>
