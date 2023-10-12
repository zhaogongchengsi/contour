<script setup lang="ts">
const app = useAppConfig()
</script>

<template>
  <header class="border-b border-color-gray-200 dark:border-color-gray-800">
    <div class="mx-auto flex items-center justify-between px-3 py-3 container md:py-5">
      <div class="flex items-center gap-3">
        <AppLogo />
        <h1 class="title text-2 font-bold md:text-6 sm:text-4">
          {{ app.title }}
        </h1>
      </div>
      <div class="flex items-center gap-5">
        <RouterLink class="link" to="/auth-register">
          注册
        </RouterLink>
        <RouterLink class="font-bold link" to="/auth-login">
          登陆
        </RouterLink>
      </div>
    </div>
  </header>
</template>
