<script setup lang="ts">
import { useCardProps } from "./props";
import { figureTranslate } from "./utils";
import cardLayoutOneOne from "./layout/card-layout-one-one.vue";
import cardLayoutTwoTwo from "./layout/card-layout-two-two.vue";
import cardLayoutOneTwo from "./layout/card-layout-one-two.vue";
import cardLayoutTwoOne from "./layout/card-layout-two-one.vue";
import cardLayoutTwoFour from "./layout/card-layout-two-four.vue";
import cardLayoutFourTwo from "./layout/card-layout-four-two.vue";
import { CardSizeString } from "~/types";

defineOptions({
  components: {
    cardLayoutOneOne,
    cardLayoutTwoTwo,
    cardLayoutOneTwo,
    cardLayoutTwoOne,
    cardLayoutTwoFour,
    cardLayoutFourTwo,
  },
});

const props = defineProps<{ size: CardSizeString }>();

const componentName = computed(() => {
  const [row, col] = props.size.split("-").map(Number);
  // @ts-ignore
  return `card-layout-${figureTranslate(row)}-${figureTranslate(col)}`;
});
</script>

<template>
  <component :is="componentName">
    <template #icon>
      <slot name="icon" />
    </template>
    <template #image>
      <slot name="image" />
    </template>
    <template #default>
      <slot />
    </template>
  </component>
</template>
