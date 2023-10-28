<script setup lang="ts">
import { AvatarUri } from '~/types';
import card from '~/components/card/card.vue'

definePageMeta({
   layout: 'render',
})

const route = useRoute()

const { data, code, message } = await getResume(route.params.name as string)

if (!code) {
   await navigateTo({
      path: '/error',
      query: { message },
      // redirectCode: 301
   })
}

const { name, avatar, background, styles, color, description, contact, cards } = data!

const config = computed(() => {
   const s = styles?.split('-')
   return {
      frosted: s?.includes('frosted') || false,
      center: s?.includes('center') || false,
      blur: s?.includes('blur') || false,
      ltalic: s?.includes('ltalic') || false
   }
})

const contacts = computed(() => {
   if (!contact)
      return []

   return JSON.parse(contact as string)
})

const cardList = computed(() => {
   return cards.map((card) => {
      const [row, col] = card.size.split('-').map(Number)
      return {
         ...card,
         icon: JSON.parse(card.icon),
         size: {
            row,
            col
         }
      }
   })
})

</script>

<template>
   <div>
      <render-plane :background="background" :color="color" :frosted="config.frosted" :center="config.center"
         :blur="config.blur" :ltalic="config.ltalic">
         <template #avatar>
            <ui-avatar :src="(avatar as AvatarUri)" class="text-5 sm:text-8 md:text-12 lg:text-16" />
         </template>
         <template #name>
            <h1>{{ name }}</h1>
         </template>
         <template #desc>
            <span>{{ description || '这人很神秘，没有自我介绍' }}</span>
         </template>
         <template #contact>
            <ui-contact-wrapper>
               <ui-contact-item v-for="contact of contacts" :key="contact.value" :value="contact.value"
                  :type="contact.type" />
            </ui-contact-wrapper>
         </template>
         <template #card>
            <div class="card-wrapper-grid">
               <card v-for="card of cardList" :icon="card.icon" :background="card.background"
                  :button-style="card.buttonStyle" :col="card.size.col" :row="card.size.row">
                  <template #image>
                     <div class="w-full h-full">
                        <ui-picture :src="card.image" :alt="String(card.id)" />
                     </div>
                  </template>
               </card>
            </div>
         </template>
      </render-plane>
   </div>
</template>

<style>
body {
   background-color: transparent;
   color: #333333 !important;
}
</style>