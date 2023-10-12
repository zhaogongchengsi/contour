<script setup lang="ts">
import draggable from "vuedraggable";
import draggablex from "~/components/ui/draggable-v.vue";

import { isClient } from '@vueuse/core'

const list = ref([
	{ id: 0 },
	{ id: 1 },
	{ id: 2 },
	{ id: 16 },
	{ id: 17 },
	{ id: 18 },
	{ id: 19, row: 2, col: 2 },
	{ id: 20 },
	{ id: 21 },
	{ id: 25 },
	{ id: 26, row: 4, col: 2 },
	{ id: 27 },
	{ id: 28, row: 2, col: 4 },
	{ id: 29 },
	{ id: 30 },
])

</script>

<template>
	<div class="w-full">
		<component :is="isClient ? draggable : draggablex" :animation="500" :list="list" class="card-wrapper-grid"
			item-key="id">
			<template #item="{ element }">
				<ui-card-size :row="element.row" :col="element.col">
					<div class="w-full h-full bg-purple-900">
						{{ element.id }}
					</div>
				</ui-card-size>
			</template>
		</component>
	</div>
</template>

<style>
.card-wrapper-grid {
	--card-size: 80px;
	--card-gap-x: 10px;
	--card-gap-y: 10px;

	display: grid;
	grid-template-columns: repeat(auto-fill, var(--card-size));
	grid-template-rows: repeat(auto-fill, var(--card-size));
	grid-auto-flow: dense;
	grid-gap: var(--card-gap-x) var(--card-gap-y);
}
</style>