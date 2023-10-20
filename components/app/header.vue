<script setup lang="ts">
import { NDropdown, NAvatar } from 'naive-ui'

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

const createIcon = (name: string) => () => h('div', { class: ['md-icon', name] })


const options = computed(() => {
  return [
    {
      icon: createIcon('i-carbon:user-admin'),
      key: 'user-name',
      label: browser ? (user && user.value?.account)  : '',
      disabled: true
    },
    {
      key: 'divider-user',
      type: 'divider'
    },
    {
      icon: createIcon('i-carbon:magic-wand-filled'),
      label: '配置主页',
      key: 'page',
    },
    {
      key: 'divider-setting',
      type: 'divider'
    },
    {
      icon: createIcon('i-carbon:logout'),
      label: '注销登陆',
      key: 'logout'
    },
  ]
})


const select = (key: string) => {
  if (key === 'logout') {
     userStore.logout()
     user.value = null     
  }

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
      <n-dropdown v-if="user != null" :options="options" trigger="hover" @select="select">
        <n-avatar round size="medium" :src="user.avatar" />
      </n-dropdown>
      <div v-if="user === null" class="flex items-center gap-5">
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
