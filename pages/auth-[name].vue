<script setup lang="ts">

</script>

<template>
	<div class="container mx-auto py-10 sm:my-15 md:my-20 px-3 md:px-0">
		<OkuTabs :default-value="$route.params.name" class="rounded-md max-w-200 mx-auto">
			<OkuTabsList class="h-10 md:h-12 flex gap-2 md:gap-4 border-b-1 mb-2">
				<OkuTabsTrigger value="register" class="tabs-trigger">注册</OkuTabsTrigger>
				<OkuTabsTrigger value="login" class="tabs-trigger">登陆</OkuTabsTrigger>
			</OkuTabsList>
			<OkuTabsContent value="register" class="tabs-content">
				<AppAuthForm buttonText="注册" icon="i-carbon:request-quote" />
			</OkuTabsContent>
			<OkuTabsContent value="login" class="tabs-content">
				<AppAuthForm buttonText="登陆" />
			</OkuTabsContent>
		</OkuTabs>
	</div>
</template>

<style scoped>
.tabs-trigger {
	@apply px-2 md:px-6 h-full text-3 md:text-5 rounded-md hover:text-purple-7
}

.tabs-trigger[data-state='active'] {
	@apply bg-purple-500 text-white
}

.tabs-content {
	@apply px-3 py-5
}
</style>
