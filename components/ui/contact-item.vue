<script setup lang="ts">
const props = withDefaults(defineProps<{ type?: "mail" | "phone" | "qq"; value?: string }>(), {
  type: "phone",
  value: "",
});

const href = computed(() => {
  switch (props.type) {
    case "mail":
      return `mailto:${props.value}`;
    case "phone":
      return `tel:${props.value}`;
    case "qq":
      return `mqqwpa://im/chat?chat_type=wpa&uin=${props.value}`;
  }
});

const iconClass = computed(() => {
  switch (props.type) {
    case "mail":
      return "i-uiw:mail ";
    case "phone":
      return "i-uiw:android";
    case "qq":
      return "i-uiw:qq";
  }
});
</script>

<template>
  <li class="flex items-center gap-1 text-xs sm:text-sm opacity-75 hover:opacity-100 transition">
    <i :class="iconClass" class="block print:hidden h-3 w-3" />
    <span class="hidden print:block">{{ type }}</span>
    <a :href="href">{{ value }}</a>
  </li>
</template>
