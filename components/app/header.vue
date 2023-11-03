<script setup lang="ts">
const app = useAppConfig()

const user = ref<User | null>(null)
const userStore = useUserInfo()

const browser = import.meta.browser

onMounted(() => {
  if (browser && userStore.logged()) {
    user.value = userStore.user.value as User
  }
})

watch(userStore.user, (u) => {
  user.value = isEmpty(u) ? null : u as User
})

const name = useGlobalName()

enum Action {
  setting = 'setting',
  statistics = 'statistics',
  logout = 'logout'
}

const select = (key: string) => {
  if (key === Action.logout) {
    userStore.logout()
    user.value = null
  }

  if (key === Action.statistics) {
    navigateTo('/panel')
  }

}

</script>

<template>
  <header class="app-default-header">
    <div class="mx-auto h-full flex items-center justify-between px-3 container">
      <div class="flex items-center gap-3">
        <router-link class="flex items-center justify-center gap-3" to="/">
          <img class="block h-5 w-5 sm:h-8 sm:w-8" src="/logo.svg" alt="Talent Logo">
          <h1 class="text-4 font-bold sm:text-6">
            {{ app.title }}
          </h1>
        </router-link>
      </div>
      <div class="h-full flex items-center gap-5 text-3">
        <router-link to="/auth/login" class="hover:underline underline-offset-5">登录</router-link>
        <router-link to="/auth/register" class="flex items-center px-3 py-1 bg-zinc-100 rounded-md text-zinc-800 hover:bg-zinc-200">注册</router-link>
      </div>
    </div>
  </header>
</template>

<style lang="scss">
.app-default-header {
  height: $dt('page.header.height');
}
</style>