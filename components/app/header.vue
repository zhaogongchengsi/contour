<script setup lang="ts">
const app = useAppConfig()
</script>

<template>
  <header class="bg-white/08 backdrop-blur-md">
    <div class="mx-auto flex items-center justify-between px-3 py-3 container md:py-5">
      <div class="flex items-center gap-3">
        <AppLogo />
        <h1 class="title text-4 font-bold md:text-8 sm:text-6">
          {{ app.title }}
        </h1>
      </div>
      <div class="flex items-center gap-5">
        <RouterLink class="link" to="/auth/register">
          注册
        </RouterLink>
        <RouterLink class="font-bold link" to="/auth/login">
          登陆
        </RouterLink>
      </div>
    </div>
  </header>
</template>
