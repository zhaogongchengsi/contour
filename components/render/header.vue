<script setup lang="ts">
withDefaults(
  defineProps<{
    center: boolean;
    ltalic: boolean;
    color: string;
  }>(),
  {
    center: false,
    ltalic: false,
    color: "#ffffff",
  },
);
</script>

<template>
  <header
    class="flex gap-5"
    :class="{
      'flex-col justify-center items-center h-auto': center,
    }"
  >
    <div class="w-15 h-15 sm:w-18 sm:h-18 md:w-22 md:h-22">
      <slot name="avatar" />
    </div>
    <div
      :style="{ color: color }"
      class="h-full w-full flex flex-1 flex-col"
      :class="$slots.default ? 'justify-between' : 'justify-center'"
    >
      <h1
        class="text-5 sm:text-6 md:text-8 font-bold"
        :class="{ italic: ltalic, 'text-center w-full': center }"
      >
        <slot name="name" />
      </h1>
      <p
        class="text-3 sm:text-4 outline-none opacity-80"
        :class="{ italic: ltalic, 'text-center': center }"
      >
        <slot />
      </p>
    </div>
  </header>
</template>
