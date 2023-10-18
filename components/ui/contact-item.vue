<script setup lang="ts">

const props = withDefaults(defineProps<{ type?: 'mail' | 'phone' | 'qq', value?: string }>(), {
	type: 'phone',
	value: ''
})

const href = computed(() => {
	switch (props.type) {
		case 'mail':
			return `mailto:${props.value}`
		case 'phone':
			return `tel:${props.value}`
		case 'qq':
			return `mqqwpa://im/chat?chat_type=wpa&uin=${props.value}`
	}
})

</script>

<template>
	<li class="flex items-center gap3">
		<div v-if="type === 'mail'" class="print:hidden i-uiw:mail h-5 w-5" />
		<div v-else-if="type === 'phone'" class="print:hidden i-uiw:android h-5 w-5" />
		<div v-else="type === 'qq'" class="print:hidden i-uiw:qq h-5 w-5" />
		<div class="hidden print:block">{{ type }}</div>
		<div class="link">
			<a :href="href">{{ value }}</a>
		</div>
	</li>
</template>
