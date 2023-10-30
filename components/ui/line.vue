<script setup lang="ts">

const lineDom = ref<HTMLDivElement | null>()

const chart = useChart()

onMounted(() => {
	chart.render(lineDom.value!)
})

console.log(chart)


</script>

<template>
	<div class="w-full h-full overflow-hidden" ref="lineDom"></div>
</template>
