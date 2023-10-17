<script setup lang="ts">
const data = usePlaneData()
</script>

<template>
  <header class="h-30 flex gap-5" :class="{
    'flex-col justify-center items-center h-auto': data.center,
  }">
    <div>
      <slot name="avatar" />
    </div>
    <div :style="{ color: data.color }" class="h-full w-full flex flex-1 flex-col"
      :class="$slots.default ? 'justify-between' : 'justify-center'">
      <h1 class="text-13 font-bold" :class="{ 'italic': data.ltalic, 'text-center w-full': data.center }">
        <slot name="name" />
      </h1>
      <p class="text-6 outline-none opacity-80"
        :class="{ 'italic': data.ltalic, 'text-center': data.center }">
        <slot />
      </p>
    </div>
  </header>
</template>
