<script setup lang="ts">

</script>

<template>
	<OkuPopover>
		<OkuPopoverTrigger as-child class="px-3 py-2 cursor-pointer">
			<span class="text-3">{{ $colorMode.value }}</span>
		</OkuPopoverTrigger>
		<OkuPopoverPortal>
			<OkuPopoverContent>
				<OkuToggleGroup type="single" v-model="$colorMode.preference"
					class="flex gap-2 items-center flex-col border divide-y border-gray-400/40 divide-gray-400/40">
					<OkuToggleGroupItem class="theme-option" value="System">
						<div class="i-carbon-cics-system-group md-icon" />
						<span class="title">system</span>
					</OkuToggleGroupItem>
					<OkuToggleGroupItem class="theme-option" value="light">
						<div class="i-carbon-cics-system-group md-icon" />
						<span class="title">light</span>
					</OkuToggleGroupItem>
					<OkuToggleGroupItem class="theme-option" value="dark">
						<div class="i-carbon-cics-system-group md-icon" />
						<span class="title">dark</span>
					</OkuToggleGroupItem>
					<!-- <OkuToggleGroupItem class="theme-option" value="sepia">
						<div class="i-carbon-cics-system-group md-icon" />
						<span class="title">sepia</span>
					</OkuToggleGroupItem> -->
				</OkuToggleGroup>
				<OkuPopoverArrow class="fill-white" />
			</OkuPopoverContent>
		</OkuPopoverPortal>
	</OkuPopover>
</template>

<style>
.theme-option {
	@apply w-full flex items-center gap-2 px-2 py-2 hover:bg-blue
}
.theme-option .title {
	@apply text-4
}
</style>