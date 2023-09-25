export default defineNuxtConfig({
  app: {
    head: {
      title: 'Talnt'
    }
  },
  devtools: { enabled: true },
  modules: [
    '@unocss/nuxt',
    '@nuxtjs/color-mode',
    '@vueuse/nuxt',
  ],
  css: [
    '@unocss/reset/tailwind.css'
  ],
  colorMode: {
    classSuffix: ''
  }
})

