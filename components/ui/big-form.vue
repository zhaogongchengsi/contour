<script setup lang="ts">
const validatorList = shallowRef<(() => Promise<unknown>)[]>([]);

provide("big-form-key", validatorList);

const validate = () => {
  return Promise.all(validatorList.value.map((v) => v()));
};

defineExpose({
  validate,
});
</script>

<template>
  <div>
    <slot />
  </div>
</template>
