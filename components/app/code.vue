<script setup lang="ts">
const loading = ref(false);
const value = reactive({
  code: "",
  id: "",
});

const props = withDefaults(
  defineProps<{ immediate?: boolean; id?: string }>(),
  {
    immediate: true,
  },
);

const emit = defineEmits(["update:id"]);

const { counter, reset, pause, resume } = useInterval(1000, {
  controls: true,
  immediate: false,
});

onMounted(() => {
  if (import.meta.browser && props.immediate) {
    getCode();
  }
});

const getCode = async (oid?: string) => {
  loading.value = true;

  const { id, data } = (await (
    await fetch(`/api/security${oid ? `?id=${oid}` : ""}`)
  ).json()) as { id: string; data: string };
  value.id = id;
  value.code = data;

  emit("update:id", id);

  loading.value = false;
};

const seconds = 10;
watch(counter, (value) => {
  if (value < seconds) return;
  pause();
  reset();
});

const resetCode = async () => {
  resume();
  await getCode();
};

defineExpose({
  value,
  resetCode,
  getCode,
});
</script>

<template>
  <div
    class="h-10 sm:h-12 md:h-15 rounded gap-3 flex justify-center items-center"
  >
    <div
      v-if="!loading"
      class="flex-1 h-full bg-white/90 rounded-lg code-wrapper"
      v-html="value.code"
    ></div>
    <div
      v-else-if="loading"
      class="flex-1 md-icon i-carbon-rotate-180 animate-spin"
    />
    <div class="w-5 h-5 flex justify-center items-center">
      <span v-if="counter" class="text-6">{{ counter }}</span>
      <div
        v-else
        class="w-8 h-8 i-carbon:rotate-360 cursor-pointer"
        @click="resetCode"
      />
    </div>
  </div>
</template>
<style>
.code-wrapper svg {
  width: 100%;
  height: 100%;
}
</style>
