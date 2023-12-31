<script setup lang="ts">
import { useMessage, NForm, NFormItem, NInput, NButton } from "naive-ui";
import type { FormInst } from "naive-ui";
import { debounce } from "perfect-debounce";
import { loginAndSignupRules } from "~/utils/rules";

const config = useRuntimeConfig();
const userStore = useUserInfo();
const name = useGlobalName();
const { success, error } = useMessage();
const formRef = ref<FormInst>();

const fromValue = reactive({
  name: name || "",
  account: import.meta.dev ? config.public.init.user : "",
  password: import.meta.dev ? config.public.init.pass : "",
});

const login = () => {
  name.value = fromValue.name;
  loginApi(fromValue)
    .then(({ code, data, message }) => {
      if (!code) {
        error(message);
        return;
      }

      const { authorization, user } = data!;
      userStore.logging(user, authorization);

      success("登陆成功");

      navigateTo({ path: `/edit/${fromValue.name}` });
    })
    .catch((err) => {
      console.log(err);
    });
};

const loginHandle = debounce(async () => {
  formRef.value?.validate((errors: any) => {
    if (errors) return;
    login();
  });
}, 300);
</script>

<template>
  <div class="container mx-auto max-w-100 md:max-w-120 py-10 px-3">
    <h4 class="text-lg sm:text-xl md:text-2xl font-bold mb-10 sm:mb-12 md:mb-15 text-center">登录</h4>
    <n-form ref="formRef" :rules="loginAndSignupRules" :model="fromValue" class="w-full max-w-200">
      <n-form-item label="名称" path="name">
        <n-input type="text" v-model:value="fromValue.name" placeholder="请输入名称" />
      </n-form-item>
      <n-form-item label="账号" path="account">
        <n-input type="text" v-model:value="fromValue.account" placeholder="请输入账号" />
      </n-form-item>
      <n-form-item label="密码" path="password">
        <n-input type="password" v-model:value="fromValue.password" placeholder="请输入密码" />
      </n-form-item>
      <n-button block @click="loginHandle">登录</n-button>
      <div class="flex justify-end gap-4 text-xs sm:text-sm mt-5">
        <span class="text-zinc-400">忘记密码？</span>
        <router-link to="/signup" class="text-zinc-400 hover:text-zinc-300">没有账号 先去注册</router-link>
      </div>
    </n-form>
  </div>
</template>

<style lang="scss"></style>
