<script setup lang="ts">
withDefaults(defineProps<{ tag?: string }>(), { tag: "div" });

const target = ref(null);
const cursor = reactive({ x: 0, y: 0 });
const { elementX, elementY } = useMouseInElement(target);

watch([elementX, elementY], ([x, y]) => {
  cursor.x = x;
  cursor.y = y;
});

if (import.meta.client) {
  if (window.DeviceOrientationEvent) {
    // 监听陀螺仪事件
    window.addEventListener(
      "deviceorientation",
      (e: DeviceOrientationEvent) => {
        const { beta: y, gamma: x } = e;
        cursor.x = x! + 95;
        cursor.y = y!;
      },
      false,
    );
  } else {
    console.warn("该设备不支持陀螺仪事件。");
  }
}

defineOptions({
  inheritAttrs: false,
});
</script>

<template>
  <component
    ref="target"
    :is="tag"
    class="card-wrapper"
    :style="{
      '--cursor-x': cursor.x + 'px',
      '--cursor-y': cursor.y + 'px',
    }"
  >
    <!-- <div class="card-wrapper_bg" /> -->
    <div v-bind="$attrs" class="card-wrapper_content">
      <slot />
    </div>
  </component>
</template>
<style lang="scss">
.card-wrapper {
  --border: 1px;
  --radius: 12px;
  --border-shine-opacity: 0.3;
  --card-center: calc(var(--card-searchlight-size, 300px) / 2);

  padding: var(--border);

  border-radius: $dt("radius.xs");
  background-color: $dt("background.secondary");

  box-shadow: rgba(0, 0, 0, 0.12) 0px 12px 12px;
  overflow: hidden;
  position: relative;

  .card-wrapper_content {
    width: 100%;
    border-radius: $dt("radius.xs");
    background-color: #1c1c1f;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50%;
    transform-origin: center;
    transition: opacity 400ms ease 0s;
    will-change: background, opacity;
    background-color: rgba(90, 194, 194, 0.068);

    width: var(--card-searchlight-size, 300px);
    height: var(--card-searchlight-size, 300px);
    opacity: var(--border-shine-opacity);
    transform: translate(calc(var(--cursor-x) - var(--card-center)), calc(var(--cursor-y) - var(--card-center)));

    background: radial-gradient(
      800px circle at var(--cursor-x) var(--cursor-y),
      rgba(255, 255, 255, 0.2),
      transparent 40%
    );

    // background: radial-gradient(800px circle, rgba(255, 255, 255, 0.1), transparent 40%);
  }
}
</style>
