<script setup lang="ts">
import { NPopover } from "naive-ui";

const name = useGlobalName();
const logged = await loggedByServer(name.value);
</script>

<template>
  <div class="h-full flex items-center gap-5 text-3">
    <n-popover v-if="logged" trigger="click" class="header-right-popover">
      <template #trigger>
        <span :to="`/talent/${name}`" class="flex gap-3 items-center bg-purple-500 px-3 py-1 rounded-md">
          <span class="max-w-25 truncate">{{ name }}</span>
          <i class="block i-carbon:code w-3 h-3" />
        </span>
      </template>
      <div class="gap-2 flex flex-col">
        <router-link class="header-right_button" :to="`/talent/${name}`">
          <i class="block i-carbon:home w-3 h-3" />
          <span class="max-w-25 truncate">{{ name }}</span>
        </router-link>
        <button class="header-right_button">
          <i class="block i-carbon:email w-3 h-3" />
          <span>更改邮箱</span>
        </button>
        <button class="header-right_button">
          <i class="block i-carbon:password w-3 h-3" />
          <span>更改密码</span>
        </button>
        <button class="header-right_button">
          <i class="block i-carbon:logout w-3 h-3" />
          <span>注销登陆</span>
        </button>
      </div>
    </n-popover>
    <router-link v-else to="/auth/login" class="hover:underline underline-offset-5">登录</router-link>
    <router-link
      :to="logged ? `/edit/${name}` : '/auth/register'"
      class="flex items-center px-3 py-1 bg-zinc-100 rounded-md text-zinc-800 hover:bg-zinc-200"
    >
      {{ logged ? "编辑" : "注册" }}
    </router-link>
  </div>
</template>

<style lang="scss">
.header-right-popover {
  padding: 4px !important;
  list-style-type: none;
  background-color: $dt("color.gray.800") !important;
  background-clip: padding-box;
  border-radius: 10px;
  outline: none;
  box-shadow:
    0 6px 16px 0 rgba(0, 0, 0, 0.08),
    0 3px 6px -4px rgba(0, 0, 0, 0.12),
    0 9px 28px 8px rgba(0, 0, 0, 0.05);
}

.header-right_button {
  margin: 0;
  padding: 5px 12px;
  color: #fff;
  transition: all 0.2s;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;

  &:hover {
    background-color: $dt("color.gray.700");
  }
}
</style>
