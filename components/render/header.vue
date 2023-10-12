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
    <div class="h-full w-full flex flex-1 flex-col" :class="data.description ? 'justify-between' : 'justify-center'">
      <h1
        class="text-13 font-bold text-zinc-900 dark:text-gray-200"
        :class="{ 'italic': data.ltalic, 'text-center w-full': data.center }"
      >
        {{ data.name }}
      </h1>
      <p v-if="data?.description" class="text-6 outline-none" :class="{ 'italic': data.ltalic, 'text-center': data.center }">
        {{ data.description }}
      </p>
    </div>
  </header>
</template>
