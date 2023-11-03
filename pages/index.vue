<script setup lang="ts">
import { useMessage } from "naive-ui";
import { isName } from "~/composables/schema";

const router = useRouter();
const appConfig = useAppConfig();

const { error } = useMessage();

interface FooterLink {
  title: string;
  nav: { title: string; link: string }[];
}

const name = useGlobalName();

const footerLinks = computed(() => {
  return ((appConfig.footer as any).links as FooterLink[]) || [];
});

const userInfo = useUserInfo();

watch(userInfo.user, (u) => {
  if (isEmpty(u)) {
    name.value = "";
  }
});

const submit = async () => {
  const url = unref(name);
  const { success, message: msg } = await isName(url);

  if (!success) {
    error(msg!);
    return;
  }

  router.push(`/edit/${url}`);
};
</script>

<template>
  <div
    class="flex flex-col items-center pt-20 sm:pt-30 md:pt-40 container mx-auto overflow-hidden min-h-80 sm:min-h-100 md:min-h-200 relative"
  >
    <h3 class="text-4xl sm:text-5xl lg:text-6xl font-bold z-10 gradient-text">定制个人专属页面</h3>
    <div
      class="w-full px-5 sm:px-0 mx-auto mt-15 mb-15 flex flex-col sm:flex-row items-center justify-center gap-8 rounded-md z-10"
    >
      <ui-home-input v-model:value="name">
        <template #prefix>
          <span>https://</span>
        </template>
      </ui-home-input>
      <button
        @click="submit"
        class="flex items-center gap-3 px-5 py-2 sm:py-3 bg-purple-600/80 hover:bg-purple-600 rounded-2xl"
      >
        <div class="w-5 h-5 i-carbon-edit" />
        <span class="font-bold text-3 sm:text-4 text-white">开始</span>
      </button>
    </div>
  </div>
  <div
    class="container mx-auto px-3 my-5 sm:my-10 md:my-20 flex flex-col md:flex-row md:items-start items-center justify-between"
  >
    <h4 class="text-6 sm:text-8 md:text-10 font-bold">马上行动</h4>
    <div class="w-full md:w-1/2 flex flex-col items-center md:items-start mt-10 md:mt-0">
      <span class="text-4 sm:text-5 text-white/60">现在就开始使用我的APP吧！</span>
      <div class="flex mt-5 md:mt-8 gap-6 justify-center items-center sm:gap-7 md:gap-8">
        <router-link class="primary-button primary-button-text primary-button-color" to="/auth/register">
          立即注册
        </router-link>
        <router-link class="~ h-full primary-button-text-flip" to="/auth/login">立即登录</router-link>
      </div>
    </div>
  </div>
  <section class="container mx-auto px-0 my-15 sm:my-25 md:my-40 px-3 flex md:px-0 flex-col md:flex-row">
    <div class="flex flex-col gap-3 sm:gap-6 md:gap-10 items-center mr-auto w-full md:w-auto">
      <h3 class="text-6 sm:text-8 md:text-10 font-bold">优势</h3>
      <p>我们的优势</p>
      <a href="#" class="primary-button primary-button-text primary-button-color">试用</a>
    </div>
    <div class="w-full md:w-1/2 mt-10 md:mt-0">
      <ul class="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-3 sm:gap-5">
        <li v-for="i of 5" :key="i" class="bg-zinc-800 h-50 rounded-lg p-2">广告位招租</li>
      </ul>
    </div>
  </section>
  <section
    class="container mx-auto px-3 md:px-0 flex flex-col sm:flex-row sm:items-start justify-between items-center gap-10 my-15 sm:my-20 md:my-30"
  >
    <div class="flex items-center gap-3">
      <i class="block i-carbon:favorite-filled w-6 h-6" />
      <span class="text-zinc-300 text-5 font-bold sm:text-6 md:text-7">个人专属页面</span>
    </div>
    <nav class="flex flex-col items-start sm:flex-row text-3 gap-5 sm:gap-10 md:gap-20 w-full sm:w-1/2">
      <dl v-for="item of footerLinks" :key="item.title" class="w-full sm:w-auto grid grid-cols-3 gap-1 md:gap-2">
        <dt class="col-span-3 text-4 sm:text-5 md:text-6 mb-2 sm:mb-3 md:mb-5 text-zinc-300">
          {{ item.title }}
        </dt>
        <dd class="flex sm:col-span-3 text-3 sm:text-4 md:text-5" v-for="i of item.nav" :key="i.title">
          <a :href="i.link" class="text-zinc-400 hover:text-zinc-300">
            {{ i.title }}
          </a>
        </dd>
      </dl>
    </nav>
  </section>
</template>

<style lang="scss">
// 渐变文字

.gradient-text {
  letter-spacing: -0.02em;
  box-decoration-break: clone;
  -webkit-text-fill-color: transparent;
  background: linear-gradient(to right bottom, rgb(255, 255, 255) 30%, rgba(255, 255, 255, 0.38));
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
}
</style>
