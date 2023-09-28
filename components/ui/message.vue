<script setup lang="ts">
import { useTimeoutFn } from '@vueuse/core'
import { MessageProps } from './props';

const visible = ref(false)
const messageRef = ref<HTMLDivElement>()

const props = withDefaults(defineProps<MessageProps>(), {
	type: 'info',
	intervalClose: 2000,
	topOffset: 40,
	selfClose: true
})


const style = computed(() => {
	switch (props.type) {
		case 'error':
			return 'border-color-red-500 bg-red-5/50'
		case 'info':
			return 'border-purple-500 bg-purple-5/50'
		case 'success':
			return 'border-color-emerald-500 bg-emerald-5/50'
		case 'warning':
			return 'border-color-yellow-500 bg-yellow-5/50'
	}
})

let stopTimer: (() => void) | undefined = undefined

const startTiming = () => {
	if (props.selfClose) {
		stopTimer && stopTimer()
		const { start, stop } = useTimeoutFn(close, props.intervalClose)
		stopTimer = stop
		start()
	}
}

const close = () => {
	stopTimer && stopTimer()
	visible.value = false
}

const open = () => {
	stopTimer && stopTimer()
	visible.value = true
	startTiming()
}

defineExpose({
	close,
	open,
	messageRef
})

</script>

<template>
	<teleport to="body">
		<transition name="message">
			<div v-if="visible" ref="messageRef" :style="{ top: `${props.topOffset}px` }"
				class="max-w-100 rounded-md fixed right-0 left-0 mx-auto bg-white">
				<div class="p-2 flex gap-3 text-white rounded-md border-2" :class="style">
					<div v-if="type === 'info'" class="message-icon-close text-purple-8 i-carbon-information" />
					<div v-if="type === 'success'" class="message-icon-close text-emerald-9 i-carbon-checkmark-outline" />
					<div v-if="type === 'error'" class="message-icon-close text-red-8 i-carbon-checkmark-outline-error" />
					<div v-if="type === 'warning'"
						class="message-icon-close text-yellow-8 i-carbon-checkmark-outline-warning" />
					<div class="flex-1 line-clamp-4" :class="`message-content-${type}`">
						<slot />
					</div>
					<div @click="close"
						class="i-carbon-close ml-auto message-icon-close cursor-pointer opacity-80 hover:opacity-100"
						:class="`message-close-icon-${type}`" />
				</div>
			</div>
		</transition>
	</teleport>
</template>

<style scoped>
.message-enter-active,
.message-leave-active {
	transition-property: top, opacity;
	transition-duration: 150ms;
}

.message-enter-from {
	top: 0 !important;
	opacity: 0;
}

.message-leave-to {
	opacity: 0;
}

.message-icon-close {
	@apply w-6 h-6 border-1
}

.message-content-success {
	@apply text-emerald-8
}

.message-content-error {
	@apply text-red-8
}

.message-content-info {
	@apply text-purple-8
}

.message-content-warning {
	@apply text-yellow-8
}


.message-close-icon-success {
	@apply text-emerald-9
}

.message-close-icon-error {
	@apply text-red-9
}

.message-close-icon-info {
	@apply text-purple-9
}

.message-close-icon-warning {
	@apply text-yellow-9
}
</style>
