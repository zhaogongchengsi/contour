<script setup lang="ts">
import { NDropdown, NAvatar } from 'naive-ui'
import { AvatarUri } from '~/types';

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
      label: browser ? (user && user.value?.account) : '',
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
  <header class="app-default-header">
    <div class="mx-auto h-full flex items-center justify-between px-3 py-3 container md:py-5">
      <div class="flex items-center gap-3">
        <AppLogo />
        <h1 class="title text-4 font-bold md:text-8 sm:text-6">
          {{ app.title }}
        </h1>
      </div>
      <n-dropdown v-if="user != null" :options="options" trigger="hover" @select="select">
        <div class="w-15 h-15 p-2 bg-white rounded-full">
          <ui-avatar :src="(user.avatar as AvatarUri)" class="text-8" :alt="`${user.name} avatar`" />
        </div>
      </n-dropdown>
    </div>
  </header>
</template>

<style lang="scss">
.app-default-header {
  height: $dt('page.header.height');
}
</style>