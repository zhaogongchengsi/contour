export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@unocss/nuxt',
    '@nuxtjs/color-mode'
  ],
  css: [
    '@unocss/reset/tailwind.css'
  ]
})