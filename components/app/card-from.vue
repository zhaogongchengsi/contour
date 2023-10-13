<script setup lang="ts">
import { NForm, NFormItem, NButton, NTabs, NTabPane, NScrollbar, NRadioGroup, NRadioButton, NInput } from 'naive-ui'
import type { FormInst } from 'naive-ui'

const material = useMaterial()
const formRef = ref<FormInst | null>(null)
const formValue = ref({})

</script>

<template>
	<div>
		<n-form class="flex-1" ref="formRef" :label-width="80" :model="formValue">
			<n-form-item label="链接">
				<NInput placeholder="请输入链接" />
			</n-form-item>
			<n-form-item label="按钮大小">
				<n-radio-group class="w-full justify-center">
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
				<n-radio-group class="w-full justify-center">
					<NRadioButton label="Apple" value="apple" />
					<NRadioButton label="Android" value="android" />
					<NRadioButton label="Windows" value="windows" />
				</n-radio-group>
			</n-form-item>
			<n-form-item label="背景">
				<NTabs type="segment" animated size="small">
					<NTabPane name="color" tab="纯颜色">
						<NScrollbar class="h-50 max-h-80">
							<div class="grid grid-cols-8 w-full gap-3">
								<ui-bg-card v-for="item of material.colors" :key="item" :value="item" />
							</div>
						</NScrollbar>
					</NTabPane>
					<NTabPane name="gradientColor" tab="渐变色">
						<NScrollbar class="h-50 max-h-80">
							<div class="grid grid-cols-8 w-full gap-3">
								<ui-bg-card v-for="(item, index) of material.generateColor" :key="index"
									:value="material.generateColorStyle(item)" />
							</div>
						</NScrollbar>
					</NTabPane>
				</NTabs>
			</n-form-item>
			<div class="flex gap-3">
				<n-button attr-type="button">
					创建
				</n-button>
				<n-button attr-type="button">
					取消
				</n-button>
			</div>
		</n-form>
	</div>
</template>