<script setup lang="ts">
</script>

<template>
	<div>
		<h1>Color mode: {{ $colorMode.value }}</h1>
		<OkuToggleGroup type="single" v-model="$colorMode.preference" class="flex gap-2 items-center">
			<OkuToggleGroupItem class="item" value="system">System</OkuToggleGroupItem>
			<OkuToggleGroupItem class="item" value="light">light</OkuToggleGroupItem>
			<OkuToggleGroupItem class="item" value="dark">dark</OkuToggleGroupItem>
			<OkuToggleGroupItem class="item" value="sepia">sepia</OkuToggleGroupItem>
		</OkuToggleGroup>
	</div>
</template>

<style lang="ts">
css({
	'.item': {
		border: '1px solid {color.blue.500}'
	}
})
</style>