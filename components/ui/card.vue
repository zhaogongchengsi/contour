<script setup lang="ts">
withDefaults(defineProps<{ tag?: string }>(), { tag: "div" });
</script>

<template>
  <component :is="tag" class="card-wrapper">
    <div class="card-wrapper_bg" />
    <slot />
  </component>
</template>
<style lang="scss">
.card-wrapper {
  --border: 1px;
  --radius: 12px;
  --border-shine-opacity: 0;

  --y: calc((var(--cursor-y) * 1px));
  --x: calc((var(--cursor-x) * 1px));

  border-radius: var(--radius);
  background-color: $dt("background.primary");
  border: var(--border) solid $dt("border.primary");
  box-shadow: rgba(0, 0, 0, 0.12) 0px 12px 12px;
  position: relative;

  .card-wrapper_bg {
    pointer-events: none;
    user-select: none;
    position: absolute;
    z-index: 1;
    opacity: 0;
    top: var(--border);
    bottom: var(--border);
    left: var(--border);
    right: var(--border);
    border-radius: var(--radius);
    will-change: background, opacity;
    background: radial-gradient(400px circle at var(--x) var(--y), rgba(255, 255, 255, 0.1), transparent);
    contain: strict;
    transition: opacity 400ms ease 0s;
  }

  &::before {
    content: "";
    pointer-events: none;
    user-select: none;
    position: absolute;
    inset: 0px;
    border-radius: inherit;
    opacity: var(--border-shine-opacity);
    transition: opacity 400ms ease 0s;
    will-change: background, opacity;
    background: radial-gradient(800px circle at var(--x) var(--y), rgba(255, 255, 255, 0.3), transparent 40%);
  }

  &:hover {
    .card-wrapper_bg {
      opacity: 1;
    }
  }
}
</style>
