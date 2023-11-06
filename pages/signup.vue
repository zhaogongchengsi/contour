<script setup lang="ts">
import { useMessage, NForm, NFormItem, NInput, NButton } from "naive-ui";
import { debounce } from "perfect-debounce";

const config = useRuntimeConfig();
const name = useGlobalName();
const { success, error } = useMessage();
const formRef = ref();

const fromValue = reactive({
  name: name || "",
  account: import.meta.dev ? config.public.init.user : "",
  password: import.meta.dev ? config.public.init.pass : "",
});

const signup = () => {
  name.value = fromValue.name;
  registerApi(fromValue)
    .then(({ code, data, message }) => {
      if (!code) {
        error(message);
        return;
      }

      success("注册成功");
      navigateTo({ path: "/login" });
    })
    .catch((err) => {
      console.log(err);
    });
};

const loginHandle = debounce(async () => {
  formRef.value?.validate((errors: any) => {
    if (errors) return;
    signup();
  });
}, 300);
</script>

<template>
  <div class="container mx-auto max-w-100 md:max-w-120 py-10 px-3">
    <h4 class="text-lg sm:text-xl md:text-2xl font-bold mb-10 sm:mb-12 md:mb-15 text-center">注册</h4>
    <n-form ref="formRef" :model="fromValue" class="w-full max-w-200">
      <n-form-item label="名称" path="name">
        <n-input type="text" v-model:value="fromValue.name" placeholder="请输入名称" />
      </n-form-item>
      <n-form-item label="账号" path="account">
        <n-input type="text" v-model:value="fromValue.account" placeholder="请输入账号" />
      </n-form-item>
      <n-form-item label="密码" path="password">
        <n-input type="password" v-model:value="fromValue.password" placeholder="请输入密码" />
      </n-form-item>
      <n-button block @click="loginHandle">注册</n-button>
      <div class="flex justify-end gap-4 text-xs sm:text-sm mt-5">
        <router-link to="/login" class="text-zinc-400 hover:text-zinc-300">有账号! 直接登录</router-link>
      </div>
    </n-form>
  </div>
</template>
