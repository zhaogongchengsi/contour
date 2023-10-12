<script setup lang="ts">

withDefaults(defineProps<{list?: any[], itemKey?: string}>(), {
	list: [] as any,
	itemKey: ''
})

</script>

<template>
   <div>
		<slot name="item" v-for="(item, index) of list" :key="itemKey ? item[itemKey] : index" :element="item"></slot>
   </div>
</template>