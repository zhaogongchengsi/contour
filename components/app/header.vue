<script setup lang="ts">
import { NDropdown, NAvatar } from 'naive-ui'

const app = useAppConfig()

const user = ref<User | null>(null)
const useUserStore = useUserInfo()

onMounted(() => {
  if (import.meta.browser && useUserStore.logged()) {
    user.value = useUserStore.user.value as User
  }
})

const createIcon = (name: string) => () => h('div', { class: ['md-icon', name] })


const options = [
  // {
  //   icon: createIcon('i-carbon:user-admin'),
  //   key: 'user-name',
  //   label: useUserStore.user.value.account,
  //   disabled: true
  // },
  // {
  //   key: 'divider-user',
  //   type: 'divider'
  // },
  {
    icon: createIcon('i-carbon:logout'),
    label: '注销登陆',
    key: 'logout'
  },
  {
    icon: createIcon('i-carbon:magic-wand-filled'),
    label: '创建主页',
    key: 'create',
    // show: !!user.value?.name
  },
  {
    icon: createIcon('i-carbon:settings'),
    label: '设置主页',
    key: 'setting',
    // show: user.value?.name
  },
]

const select = (key: string) => {
  console.log(key);
}

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
      <n-dropdown v-if="user" :options="options" trigger="hover" @select="select">
        <n-avatar round size="medium" :src="user.avatar" />
      </n-dropdown>
      <div v-else class="flex items-center gap-5">
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
