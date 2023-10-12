<script setup lang="ts">

const props = withDefaults(defineProps<{ col: number; row: number }>(), {
   col: 1,
   row: 1
})


const style = computed(() => {
   return {
      '--card-item-col': props.col,
      '--card-item-row': props.row,
      width: `calc(var(--card-size) * ${props.col} + var(--card-gap-x) * ${props.col - 1})`, 
      height: `calc(var(--card-size) * ${props.row} + var(--card-gap-y) * ${props.row - 1})`,
      gridColumn: `span ${props.col}`,
      gridRow: `span ${props.row}`
   }
})

</script>

<template>
   <div :style="style">
		<slot />		
   </div>
</template>