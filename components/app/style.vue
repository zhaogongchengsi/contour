<script setup lang="ts">
import { NTooltip, NTabs, NTabPane, NCheckboxGroup, NCheckbox, NGrid, NGi, NScrollbar, NColorPicker, NRadioGroup, NRadioButton, NInput } from 'naive-ui'

const store = useEditDataStore()

</script>

<template>
	<ui-affix-modal direction="right">
		<template #header>
			<div class="flex py-2 px-3 items-center justify-between">
				<h3 class="text-4 font-bold">样式</h3>
				<RouterLink :to="`/preview/${store.name}`" class="flex items-center">
					<n-tooltip trigger="hover">
						<template #trigger>
							<button class="md-icon i-carbon:view"></button>
						</template>
						预览
					</n-tooltip>
				</RouterLink>
			</div>
		</template>
		<div class="flex-1 flex flex-col gap-3">
			<h4 class="text-4 font-bold px-3 text-gray-400">按钮风格</h4>
			<n-radio-group class="w-full justify-center px-3">
				<n-radio-button label="Apple" />
				<n-radio-button label="Android" />
				<n-radio-button label="Windows" />
			</n-radio-group>
			<h4 class="text-4 font-bold px-3 text-gray-400">背景颜色</h4>
			<div class="px-3">
				<n-tabs type="segment" animated size="small">
					<n-tab-pane name="color" tab="纯颜色">
						<n-scrollbar class="h-50 max-h-80">
							<div class="w-full grid grid-cols-4 gap-3">
								<ui-bg-card @click="store.setBackground(item)" :active="store.background === item"
									v-for="item of swatches" :key="item" :value="item" />
							</div>
						</n-scrollbar>
					</n-tab-pane>
					<n-tab-pane name="gradientColor" tab="渐变色">
						<n-scrollbar class="h-50 max-h-80">
							<div class="w-full grid grid-cols-4 gap-3">
								<ui-bg-card @click="store.setBackground(item)" :active="store.background === item"
									v-for="item of generateColor" :key="item" :value="item" />
							</div>
						</n-scrollbar>
					</n-tab-pane>
					<n-tab-pane name="image" tab="图片">
						<n-scrollbar class="min-h-50 max-h-80 px-3">
							<div class="w-full grid grid-cols-3 gap-3">
								<ui-bg-card @click="store.setBackground(item)" :active="store.background === item"
									v-for="item of images" :key="item" :value="item + '/ 100% 100%'" />
							</div>
						</n-scrollbar>
					</n-tab-pane>
				</n-tabs>
			</div>
			<h4 class="text-4 font-bold px-3 text-gray-400">设置</h4>
			<n-checkbox-group class="px-3" v-model:value="store.styles" @update-value="store.setStyles">
				<n-grid :y-gap="8" :cols="2">
					<n-gi><n-checkbox size="medium" label="磨砂" value="frosted" /></n-gi>
					<n-gi><n-checkbox size="medium" label="模糊" value="blur" /></n-gi>
					<n-gi><n-checkbox size="medium" label="居中" value="center" /></n-gi>
					<n-gi><n-checkbox size="medium" label="斜体" value="ltalic" /></n-gi>
				</n-grid>
			</n-checkbox-group>
		</div>
		<!-- <template #footer>
			<div class="p-3">
				<AppDarkToggle />
			</div>
		</template> -->
	</ui-affix-modal>
</template>
