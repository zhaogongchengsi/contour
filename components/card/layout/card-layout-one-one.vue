<script setup lang="ts">
import CardTag  from '../card-tag.vue'

</script>

<template>
   <card-tag class="block w-full h-full px-[var(--card-gap-x)] py-[var(--card-gap-y)]">
		<slot name="icon" />
   </card-tag>
</template>