<script setup lang="ts">
const data = usePlaneData()
</script>

<template>
  <header
    class="h-30 flex gap-5"
    :class="{
      'flex-col justify-center items-center h-auto': data.center,
    }"
  >
    <ui-avatar v-if="data.avatar" :src="data.avatar" :edit="data.edit" />
    <div :style="{color: data.color}" class="h-full w-full flex flex-1 flex-col" :class="data.description ? 'justify-between' : 'justify-center'">
      <h1
        class="text-13 font-bold"
        :class="{ 'italic': data.ltalic, 'text-center w-full': data.center }"
      >
        {{ data.name }}
      </h1>
      <p v-if="data?.description" class="text-6 outline-none opacity-80" :class="{ 'italic': data.ltalic, 'text-center': data.center }">
        {{ data.description }}
      </p>
    </div>
  </header>
</template>
