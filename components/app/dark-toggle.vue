<script setup lang="ts">
import { NSwitch } from 'naive-ui'

const colorMode = useColorMode()
const active = ref(false)

watchEffect(() => {
	active.value ? colorMode.preference = 'dark' : colorMode.preference = 'light'
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