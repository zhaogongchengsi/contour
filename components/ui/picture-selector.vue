<script setup lang="ts">
import { NPopover, NTabs, NTabPane, NScrollbar } from 'naive-ui'

const value = ref('')
const props = defineProps<{ value?: string }>()
const emit = defineEmits(["update:value", 'change'])
const data = useVModel(props, 'value', emit)

watch(value, (newValue) => {	
	data.value = newValue
	emit('change', newValue)
})

provide('ui-picture-selector', value)

</script>

<template>
	<n-popover trigger="click">
		<template #trigger>
			<slot />
		</template>
		<div class="w-110">
			<n-tabs type="bar" animated placement="bottom" size="small">
				<n-tab-pane name="image" tab="图片">
					<n-scrollbar class="h-80">
						<ui-image-selector prefix="url" v-model:value="value" />
					</n-scrollbar>
				</n-tab-pane>
				<n-tab-pane name="emoji" tab="表情">
					<n-scrollbar class="h-80">
						<ui-emoji-selector prefix="emoji" v-model:value="value" />
					</n-scrollbar>
				</n-tab-pane>
			</n-tabs>
		</div>
	</n-popover>
</template>
