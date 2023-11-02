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
  <section class="mx-auto flex flex-col items-start gap-5 px-3 py-10 container lg:flex-row lg:px-0">
    <div class="w-full flex flex-col items-center gap-8 lg:w-80">
      <div class="h-20 w-20">
        <ui-avatar src="url:/avatar.png" />
      </div>
      <h2 class="text-5 font-bold">
        zhaozunhong
      </h2>
    </div>

    <div class="w-full flex-auto lg:flex-1">
      <div class="flex flex-wrap justify-center gap-3 lg:justify-start lg:gap-10 md:gap-8 sm:gap-5">
        <ui-statistic label="总访问时长">
          1,234,123
        </ui-statistic>
        <ui-statistic label="月访问时长">
          1,234,123
        </ui-statistic>
        <ui-statistic label="周访问时长">
          1,234,123
        </ui-statistic>
        <ui-statistic label="日访问时长">
          1,234,123
        </ui-statistic>
      </div>
      <div class="mt-5 h-50 w-full md:mt-12 sm:mt-8">
        <client-only>
          <template #fallback>
            <ui-line-skeleton />
          </template>
          <div class="h-full w-full">
            <ui-line />
          </div>
        </client-only>
      </div>
    </div>
  </section>
</template>
