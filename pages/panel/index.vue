<script setup lang="ts">

definePageMeta({
	layout: 'panel',
})

const user = useUserInfo()

// if (import.meta.browser) {
// 	if (!user.logged()) {
// 		navigateTo('/auth/login')
// 	}
// }

</script>

<template>
	<section class="container mx-auto flex flex-col lg:flex-row items-start px-3 lg:px-0 py-10 gap-5">

		<div class="w-full lg:w-80 flex flex-col items-center gap-8">
			<div class="w-20 h-20">
				<ui-avatar src="url:/avatar.png" />
			</div>
			<h2 class="text-5 font-bold">zhaozunhong</h2>
		</div>

		<div class="lg:flex-1 flex-auto w-full">
			<div class="flex gap-3 sm:gap-5 md:gap-8 lg:gap-10 flex-wrap justify-center lg:justify-start">
				<ui-statistic label="总访问时长"> 1,234,123 </ui-statistic>
				<ui-statistic label="月访问时长"> 1,234,123 </ui-statistic>
				<ui-statistic label="周访问时长"> 1,234,123 </ui-statistic>
				<ui-statistic label="日访问时长"> 1,234,123 </ui-statistic>
			</div>
		</div>

	</section>
</template>
