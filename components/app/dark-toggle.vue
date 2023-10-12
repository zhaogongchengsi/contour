<script setup lang="ts">
import { NSwitch } from 'naive-ui'
</script>

<template>
	<n-switch size="small">
		<template #checked-icon>
			<div class="md-icon i-carbon:moon" />
		</template>
		<template #unchecked-icon>
			<div class="md-icon i-carbon:sun" />
		</template>
	</n-switch>
</template>