<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    // 磨砂
    frosted?: boolean;
    // 模糊
    blur?: boolean;
    // 居中
    center?: boolean;
    // 斜体
    ltalic?: boolean;
    // 背景颜色
    background?: string;
    // 字体颜色
    color?: string;
  }>(),
  {
    color: "#fff",
    center: false,
    blur: false,
    frosted: false,
    ltalic: false,
    background: "transparent",
  },
);
</script>

<template>
  <main
    class="min-h-screen relative flex justify-center"
    :style="{ background: props.background }"
  >
    <div
      class="w-full px-5 lg:px-0 max-w-200 py-15 z-20 flex flex-col gap-5"
      :style="{ color: color }"
    >
      <render-header
        :center="$props.center"
        :ltalic="$props.ltalic"
        :color="props.color"
      >
        <template #avatar>
          <slot name="avatar" />
        </template>
        <template #name>
          <slot name="name" />
        </template>
        <slot name="desc" />
      </render-header>
      <div v-if="$slots.contact" class="my-3">
        <slot name="contact" />
      </div>
      <div v-if="$slots.card">
        <slot name="card" />
      </div>
    </div>
    <div
      class="render-bg z-10"
      :class="{
        'bg-frosted': props.frosted,
        'backdrop-blur-sm': props.blur,
      }"
    />
  </main>
</template>

<style>
.render-bg {
  position: absolute;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  inset: 0;
  pointer-events: none;
}

.bg-frosted {
  background: url(/noise.svg);
}
</style>
