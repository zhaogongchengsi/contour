<script setup lang="ts">
const name = useGlobalName();
const logged = await loggedByServer(name.value);
</script>

<template>
  <div class="h-full flex items-center gap-5 text-3">
    <router-link
      :to="logged ? `/talent/${name}` : '/auth/login'"
      class="hover:underline underline-offset-5"
    >
      {{ logged ? name : "登录" }}
    </router-link>
    <router-link
      :to="logged ? `/edit/${name}` : '/auth/register'"
      class="flex items-center px-3 py-1 bg-zinc-100 rounded-md text-zinc-800 hover:bg-zinc-200"
    >
      {{ logged ? "编辑" : "注册" }}
    </router-link>
  </div>
</template>

<style lang="scss">
.header-right_link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.2rem 0.4rem;
  background-color: hsla(10, 10%, 96%, 0.5);
  border-radius: 0.5rem;
  backdrop-filter: blur(12px);
  color: #fff;
}
</style>
