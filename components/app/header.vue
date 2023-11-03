<script setup lang="ts">
const app = useAppConfig()

const userStore = useUserInfo()
const name = useGlobalName()
const logged = await loggedByServer(name.value)


</script>

<template>
  <header class="app-default-header">
    <div class="mx-auto h-full flex items-center justify-between px-3 md:px-0 container">
      <div class="flex items-center gap-3">
        <router-link class="flex items-center justify-center gap-3" to="/">
          <img class="block h-5 w-5 sm:h-8 sm:w-8" src="/logo.svg" alt="Talent Logo">
          <h1 class="text-4 font-bold sm:text-6">
            {{ app.title }}
          </h1>
        </router-link>
      </div>
      <div class="h-full flex items-center gap-5 text-3">
        <router-link to="/auth/login" class="hover:underline underline-offset-5"> 登录 </router-link>
        <router-link to="/auth/register"
          class="flex items-center px-3 py-1 bg-zinc-100 rounded-md text-zinc-800 hover:bg-zinc-200">注册</router-link>
      </div>
    </div>
  </header>
</template>

<style lang="scss">
.app-default-header {
  height: $dt('page.header.height');
}

.header-right_link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.2rem 0.4rem;
  background-color: hsla(10,10%,96%,.5);
  border-radius: 0.5rem;
  backdrop-filter: blur(12px);
  color: #fff;
}

</style>