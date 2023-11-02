<script setup lang="ts">
import card from '~/components/card/card.vue'

definePageMeta({
	layout: 'edit',
});

const store = useEditDataStore()

const route = useRoute()

store.name = route.params.name as string

</script>

<template>
	<render-plane :background="store.background" :frosted="store.styles.includes('frosted')"
		:center="store.styles.includes('center')" :blur="store.styles.includes('blur')"
		:ltalic="store.styles.includes('ltalic')" :color="store.color">
		<template #avatar>
			<ui-avatar :src="store.avatar" class="text-5 sm:text-8 md:text-12 lg:text-16" />
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
			<div class="card-wrapper-grid">
				<card v-for="element of store.cards" :key="element.id" :icon="element.icon" :background="element.background"
					:button-style="element.buttonStyle" :col="element.size.col" :row="element.size.row">
					<template #image>
						<div class="w-full h-full">
							<ui-picture :src="element.image" :alt="String(element.id)" />
						</div>
					</template>
				</card>
			</div>
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
