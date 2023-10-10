<script setup lang="ts">
const data = usePlaneData()

</script>

<template>
	<ul class="flex gap-8 flex-wrap" :class="{ 'justify-center': data.center }">
		<li v-for="contact in data.contacts" class="flex items-center gap3">
			<div class="w-5 h-5 i-uiw:mail" v-if="contact.type === 'mail'" />
			<div class="w-5 h-5 i-uiw:android" v-else-if="contact.type === 'phone'" />
			<div class="w-5 h-5 i-uiw:qq" v-else="contact.type === 'qq'" />
			<div class="link">
				<a :href="`mailto:${contact.value}`" v-if="contact.type === 'mail'">{{ contact.value }}</a>
				<a :href="`tel:${contact.value}`" v-if="contact.type === 'phone'">{{ contact.value }}</a>
				<a :href="`mqqwpa://im/chat?chat_type=wpa&uin=${contact.value}`" v-if="contact.type === 'qq'">{{ contact.value }}</a>
			</div>
		</li>
	</ul>
</template>
