<script setup lang="ts">
</script>

<template>
	<div>
		<h1>Color mode: {{ $colorMode.value }}</h1>
		<OkuToggleGroup type="single" v-model="$colorMode.preference" class="flex gap-2 items-center">
			<OkuToggleGroupItem value="system">System</OkuToggleGroupItem>
			<OkuToggleGroupItem value="light">light</OkuToggleGroupItem>
			<OkuToggleGroupItem value="dark">dark</OkuToggleGroupItem>
			<OkuToggleGroupItem value="sepia">sepia</OkuToggleGroupItem>
		</OkuToggleGroup>
	</div>
</template>