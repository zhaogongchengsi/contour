<script lang="ts" setup>
import { NInput } from 'naive-ui'

defineProps<{ name: string | string[] }>()

const store = useEditDataStore()

</script>

<template>
	<ui-affix-modal>
		<template #header>
			<div class="py-2 px-3 text-4 font-bold border-b-1 primary-border-color">{{ name }}</div>
		</template>
		<div class="flex-1 flex flex-col gap-3 px-3 pb-2">
			<h4 class="text-4 font-bold text-gray-400">描述</h4>
			 <n-input size="small" v-model:value="store.description" placeholder="请输入描述" />
		</div>
	</ui-affix-modal>
</template>
