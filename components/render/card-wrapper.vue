<script setup lang="ts">
import draggable from "vuedraggable";

const list = ref([
	{ name: "John 0", id: 0 },
	{ name: "Joao 1", id: 1 },
	{ name: "Jean 2", id: 2 },
	{ name: "Jean 3", id: 3 },
	{ name: "Jean 4", id: 4 },
	{ name: "Jean 5", id: 5 },
	{ name: "Jean 6", id: 6 },
	{ name: "Jean 7", id: 7 },
	{ name: "Jean 8", id: 8 },
	{ name: "Jean 9", id: 9 },
	{ name: "Jean 10", id: 10 },
	{ name: "Jean 11", id: 11 },
	{ name: "Jean 12", id: 12 },
	{ name: "Jean 13", id: 13 },
	{ name: "Jean 14", id: 14 },
	{ name: "Jean 15", id: 15 },
	{ name: "Jean 16", id: 16 },
	{ name: "Jean 17", id: 17 },
	{ name: "Jean 18", id: 18, col: 2, row: 4 },
	{ name: "Jean 19", id: 19 },
	{ name: "Jean 20", id: 20 },
	{ name: "Jean 21", id: 21 },
	{ name: "Jean 22", id: 22 },
	{ name: "Jean 23", id: 23 },
	{ name: "Jean 24", id: 24 },
	{ name: "Jean 25", id: 25 },
	{ name: "Jean 26", id: 26 },
	{ name: "Jean 27", id: 27 },
	{ name: "Jean 28", id: 28 },
	{ name: "Jean 29", id: 29 },
	{ name: "Jean 30", id: 30 },
])

</script>

<template>
	<div class="w-full">
		<ClientOnly fallback-tag="span" fallback="Loading comments...">
			<draggable :list="list" class="card-wrapper-grid w-full gap-5" item-key="id">
				<template #item="{ element }">
					<div class="flex card-wrapper-grid_item items-center justify-center bg-purple-400">
						<div class="w-full h-full bg-purple-900">
							{{ element.name }}
						</div>
					</div>
				</template>
			</draggable>
		</ClientOnly>
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

.card-wrapper-grid_item {
	width: var(--card-size);
	height: var(--card-size);
}

</style>