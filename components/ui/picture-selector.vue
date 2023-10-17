<script setup lang="ts">
import { NPopover, NTabs, NTabPane, NScrollbar } from 'naive-ui'

const emoji = ref('money-mouth-face')

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
						abcasdasd
					</n-scrollbar>
				</n-tab-pane>
				<n-tab-pane name="emoji" tab="表情">
					<n-scrollbar class="h-80">
						<ui-emoji-selector v-model:value="emoji" />
					</n-scrollbar>
				</n-tab-pane>
			</n-tabs>
		</div>
	</n-popover>
</template>
