<script setup lang="ts">
import { NSwitch } from 'naive-ui'

const active = ref(false)
const colorMode = useColorMode()

watchEffect(() => {
	active.value ? colorMode.value = 'dark' : colorMode.value = 'light'
})

</script>

<template>
	<n-switch v-model:value="active" size="small">
		<template #checked-icon>
			<div class="md-icon i-carbon:moon" />
		</template>
		<template #unchecked-icon>
			<div class="md-icon i-carbon:sun" />
		</template>
	</n-switch>
</template>