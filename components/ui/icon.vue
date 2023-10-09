<script setup lang="ts">

withDefaults(
	defineProps<{ name: string, size?: 'sm' | 'lg' | 'md' | 'xl' }>(),
	{
		size: 'md'
	}
)

</script>

<template>
	<div :class="[name, {
		'sm-icon': size === 'sm',
		'lg-icon': size === 'lg',
		'md-icon': size === 'md',
		'xl-icon': size === 'lg'
	}]" />
</template>
