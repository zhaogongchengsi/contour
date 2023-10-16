<script setup lang="ts">
import draggable from "vuedraggable";
import { isClient } from '@vueuse/core'

const data = usePlaneData()

</script>

<template>
	<div class="w-full">
		<draggable tag="div" v-if="isClient && data.edit" :animation="500" :list="data.cards" class="card-wrapper-grid"
			item-key="id">
			<template #item="{ element }">
				<ui-card-size :row="element.row" :col="element.col">
					<div class="w-full h-full bg-purple-900">
						{{ element.id }}
					</div>
				</ui-card-size>
			</template>
		</draggable>
		<div v-else class="card-wrapper-grid">
			<template v-for="element of data.cards" :key="element.id">
				<ui-card-size  :row="element.size.row" :col="element.size.col">
					<div class="w-full h-full bg-purple-900" :class="`card-size_${element.size.row}-${element.size.col}`">
						{{ element.id }}
					</div>
				</ui-card-size>
			</template>
		</div>
	</div>
</template>

<style>
.card-wrapper-grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, var(--card-size));
	grid-template-rows: repeat(auto-fill, var(--card-size));
	grid-auto-flow: dense;
	grid-gap: var(--card-gap-x) var(--card-gap-y);
}
</style>