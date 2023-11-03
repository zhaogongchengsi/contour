<script setup lang="ts">
// 一个虚拟的 拖拽组件 用来在 服务端也能直接渲染出对应的html 字符串

withDefaults(defineProps<{ list?: any[]; itemKey?: string }>(), {
  list: [] as any,
  itemKey: "",
});
</script>

<template>
  <div>
    <slot
      name="item"
      v-for="(item, index) of list"
      :key="itemKey ? item[itemKey] : index"
      :element="item"
    ></slot>
  </div>
</template>
