<script setup lang="ts">
import { NSwitch } from "naive-ui";
</script>

<template>
  <NSwitch size="small">
    <template #checked-icon>
      <div class="i-carbon:moon md-icon" />
    </template>
    <template #unchecked-icon>
      <div class="md-icon i-carbon:sun" />
    </template>
  </NSwitch>
</template>
