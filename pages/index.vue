<script setup lang="ts">
</script>

<template>
	<div>
		<h1>Color mode: {{ $colorMode.value }}</h1>
		<select v-model="$colorMode.preference">
			<option value="system">System</option>
			<option value="light">Light</option>
			<option value="dark">Dark</option>
			<option value="sepia">Sepia</option>
		</select>
		<OkuToggleGroup type="single">
			<OkuToggleGroupItem value="left">123</OkuToggleGroupItem>
			<OkuToggleGroupItem value="right">123</OkuToggleGroupItem>
		</OkuToggleGroup>
	</div>
</template>