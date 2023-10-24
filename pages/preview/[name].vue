<script setup lang="ts">

definePageMeta({
	layout: 'edit',
});

const store = useEditDataStore()

const route = useRoute()
store.setName(route.params.name as string)

</script>

<template>
	<render-plane :background="store.background" :frosted="store.styles.includes('frosted')"
		:center="store.styles.includes('center')" :blur="store.styles.includes('blur')"
		:ltalic="store.styles.includes('ltalic')" :color="store.color">
		<template #avatar>
			<ui-picture-selector v-model:value="store.avatar" :name="($route.params.name as string)">
				<ui-avatar :src="store.avatar"></ui-avatar>
			</ui-picture-selector>
		</template>
		<template #name>
			{{ store.name }}
		</template>
		<template #desc>
			{{ store.description }}
		</template>
		<template #contact>
			<ui-contact-wrapper>
				<ui-contact-item v-for="contact of store.contacts" :key="contact.value" :value="contact.value"
					:type="contact.type" />
			</ui-contact-wrapper>
		</template>
		<template #card>
			<draggable tag="div" :animation="500" :list="store.cards" class="card-wrapper-grid" item-key="id">
				<template #item="{ element }">
					<card edit :icon="element.icon" :background="element.background" :button-style="element.buttonStyle"
						:col="element.size.col" :row="element.size.row">
						<template #image>
							<ui-picture-selector v-model:value="element.image" :name="($route.params.name as string)">
								<div class="w-full h-full">
									<ui-picture :src="element.image" :alt="String(element.id)" />
								</div>
							</ui-picture-selector>
						</template>
						{{ element.label }}
					</card>
				</template>
			</draggable>
		</template>
	</render-plane>
	<div class="fixed right-10 top-5 bg-white dark:bg-dark-800 p-3 rounded-md flex flex-col gap-3 z-999 print:hidden">
		<button :to="`/preview/${route.params.name}`" @click="$router.back()"
			class="flex gap-3 px-2 justify-center items-center bg-purple-500 h-8 hover:bg-purple-400 text-white rounded-md">
			<div class="md-icon i-carbon:reply" />
			<span class="text-4">编辑</span>
		</button>
	</div>
</template>
