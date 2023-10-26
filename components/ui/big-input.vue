<script setup lang="ts">
import { ShallowRef } from 'vue';
import { createValidate } from '~/utils/rules'
import type { RuleName } from '~/utils/rules'

defineOptions({
	inheritAttrs: false
})

const errorMessage = ref('')

const props = withDefaults(
	defineProps<{ value: string; error?: boolean; warning?: boolean; success?: boolean; wrapperClass?: string; validator?: RuleName }>(),
	{
		error: false,
		warning: false,
		success: false,
		wrapperClass: ''
	}
)

const emit = defineEmits(['update:value'])
const { value } = useVModels(props, emit)
const validatorList = inject<ShallowRef<(() => Promise<unknown>)[]>>('big-form-key')


if (props.validator && validatorList) {
	const validator = createValidate(props.validator)
	const validate = () => {
		const v = { [props.validator as RuleName]: unref(value) }
		return new Promise((resolve, reject) =>{
			validator(v).then(val => resolve(val)).catch(err => {
				errorMessage.value = err[0].message
				reject(err)
			})
		})
	}
	validatorList.value.push(validate)
}

</script>

<template>
	<div class="h-10 sm:h-12 md:h-15 bg-zinc-800 px-1 rounded-lg relative focus-within:bg-purple-700/30 focus-within:ring-2 focus-within:ring-purple-900"
		:class="[
			wrapperClass,
			{
				'bg-rose-500/50! ring-2 ring-rose-500!': error || errorMessage != '',
				'bg-amber-500/50! ring-2 ring-amber-500!': warning,
				'bg-blue-500/50! ring-2 ring-blue-500!': success
			}
		]">
		<input v-bind="$attrs" v-model="value" @focus="errorMessage = ''"
			class="text-white w-full h-full bg-transparent outline-none p-1 text-3 sm:text-4 md:text-5" />
		<div class="text-rose-600 absolute bottom-0 left-0 text-3 sm:text-4 message" v-if="errorMessage != ''">{{ errorMessage }}</div>
	</div>
</template>
<style>
.message {
	transform: translateY(130%);
}
</style>