<script setup lang="ts">

defineOptions({
	inheritAttrs: false
})

const props = withDefaults(defineProps<{ value: string, error?: boolean, warning?: boolean, success?: boolean, wrapperClass?: string }>(), {
	error: false,
	warning: false,
	success: false,
	wrapperClass: ''
})

const emit = defineEmits(['update:value'])
const { value } = useVModels(props, emit)

</script>

<template>
	<div class="h-10 sm:h-12 md:h-15 bg-zinc-800 px-1 rounded-lg" :class="[
		wrapperClass,
		{
			'bg-rose-500/50! ring-2 ring-rose-500': error,
			'bg-amber-500/50! ring-2 ring-amber-500': warning,
			'bg-blue-500/50! ring-2 ring-blue-500': success
		}
	]">
		<input v-bind="$attrs" v-model="value"
			class="text-white w-full h-full bg-transparent outline-none p-1 text-3 sm:text-4 md:text-5" />
	</div>
</template>