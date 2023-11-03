<script setup lang="ts">
const app = useAppConfig()



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
      <client-only>
        <app-header-right />
      </client-only>
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
  background-color: hsla(10, 10%, 96%, .5);
  border-radius: 0.5rem;
  backdrop-filter: blur(12px);
  color: #fff;
}
</style>