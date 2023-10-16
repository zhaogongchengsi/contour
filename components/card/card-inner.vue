<script setup lang="ts">
import { useCardProps } from './props'
import { figureTranslate } from './utils'
import cardLayoutOneOne from './layout/card-layout-one-one.vue';
import cardLayoutTwoTwo from './layout/card-layout-two-two.vue'

defineOptions({
   components: {
      cardLayoutOneOne,
      cardLayoutTwoTwo
   }
})

const props = useCardProps()

const componentName = computed(() => {
   // @ts-ignore
   return `card-layout-${figureTranslate(props.row)}-${figureTranslate(props.col)}`
})

</script>

<template>
   <component :is="componentName">
      <template #icon>
         <slot name="icon" />
      </template>
      <template #image>
         <slot name="image" />
      </template>
   </component>
</template>
