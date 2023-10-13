<script setup lang="ts">
import { useMessage, NForm, NFormItem, NButton, NTabs, NTabPane, NScrollbar, NRadioGroup, NRadioButton, NInput, NUpload } from 'naive-ui'
import type { FormInst, UploadInst } from 'naive-ui'
import { CardConfig, CardFormValue, LinearGradient } from '~/types';

const messageApi = useMessage()
const material = useMaterial()
const formRef = ref<FormInst | null>(null)
const uploadRef = ref<UploadInst | null>(null)


const formValue = reactive<CardFormValue>({
	size: '1-1',
	link: '',
	buttonStyle: 'windows',
	image: '',
	background: '#fff'
})

const emit = defineEmits<{
	(e: 'commit', value: typeof formValue): void
	(e: 'cancel'): void
}>()

const bgIsActive = (value: string | LinearGradient) :boolean => {
	return typeof value === "string" ? value === formValue.background : value.id === (formValue.background as LinearGradient).id
}


</script>

<template>
	<div>
		<n-form class="flex-1" ref="formRef" :label-width="80" :model="formValue">
			<n-form-item label="链接">
				<NInput placeholder="请输入链接" v-model:value="formValue.link" />
			</n-form-item>
			<n-form-item label="按钮大小">
				<n-radio-group class="w-full justify-center" v-model:value="formValue.size">
					<NRadioButton label="1x1" value="1-1" />
					<NRadioButton label="2x2" value="2-2" />
					<NRadioButton label="1x2" value="1-2" />
					<NRadioButton label="2x1" value="2-1" />
					<NRadioButton label="2x4" value="2-4" />
					<NRadioButton label="4x2" value="4-2" />
					<NRadioButton label="4x4" value="4-4" />
				</n-radio-group>
			</n-form-item>
			<n-form-item label="按钮风格">
				<n-radio-group class="w-full justify-center" v-model:value="formValue.buttonStyle">
					<NRadioButton label="Apple" value="apple" />
					<NRadioButton label="Android" value="android" />
					<NRadioButton label="Windows" value="windows" />
				</n-radio-group>
			</n-form-item>
			<n-form-item label="图片">
				<n-upload ref="uploadRef" :default-upload="false" :max="3" class="app-file-upload" action="/api/file/upload"
					accept="image/*" list-type="image-card">
					<div class="md-icon i-carbon:upload" />
				</n-upload>
			</n-form-item>
			<n-form-item label="背景">
				<NTabs type="segment" animated size="small">
					<NTabPane name="color" tab="纯颜色">
						<NScrollbar class="h-50 max-h-80">
							<div class="grid grid-cols-8 w-full gap-3">
								<ui-bg-card v-for="item of material.colors" :active="bgIsActive(item)" :key="item" :value="item" @click="formValue.background = item">
									<div class="w-full h-full" :style="{ background: item }" />
								</ui-bg-card>
							</div>
						</NScrollbar>
					</NTabPane>
					<NTabPane name="gradientColor" tab="渐变色">
						<NScrollbar class="h-50 max-h-80">
							<div class="grid grid-cols-8 w-full gap-3">
								<ui-bg-card v-for="(item, index) of material.generateColor" :active="bgIsActive(item)" :key="index" @click="formValue.background = item" >
									<div class="w-full h-full" :style="{ background: material.generateColorStyle(item) }" />
								</ui-bg-card>
							</div>
						</NScrollbar>
					</NTabPane>
				</NTabs>
			</n-form-item>
			<div class="flex gap-3">
				<n-button attr-type="button" @click="emit('commit', formValue)"> 创建 </n-button>
				<n-button attr-type="button" @click="emit('cancel')"> 取消 </n-button>
			</div>
		</n-form>
	</div>
</template>
