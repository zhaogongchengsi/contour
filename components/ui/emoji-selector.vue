<script setup lang="ts">

const props = withDefaults(defineProps<{ value?: string }>(), {
	value: ''
})

const emit = defineEmits(["update:value", "change"])

const { list } = useEmoji()

const itemClick = (value: { name: string, body: string }) => {
	emit("update:value", value.name)
	emit("change", value)
}

</script>

<template>
	<ul class="grid grid-cols-9 gap-3 auto-rows-auto">
		<li v-for="item of list" :key="item.name" :class="{ 'bg-gray-200/80': props.value === item.name }"
			class="h-10 flex justify-center items-center px-1 cursor-pointer rounded-md hover:bg-gray-200/80"
			@click="itemClick(item)">
			<div class="h-8 w-8" v-html="item.body" />
		</li>
	</ul>
</template>