<script setup lang="ts">
const props = defineProps<{ value?: string }>();
const emit = defineEmits(["update:value"]);

const { value } = useVModel(props, "value", emit);
</script>

<template>
  <div class="home-input_wrapper text-4 sm:text-5">
    <div v-if="$slots.prefix">
      <slot name="prefix" />
    </div>
    <input class="h-8 bg-transparent outline-none w-40 sm:w-50" v-model="value" type="text" />
  </div>
</template>

<style lang="scss">
.home-input_wrapper {
  border-radius: 16px;
  border: 1px solid $dt('input.border.primary');
  background: $dt('input.background.primary');

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 0.6rem;
  padding: 0.5rem 1rem;
}
</style>
