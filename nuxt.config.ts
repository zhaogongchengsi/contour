export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@unocss/nuxt',
    '@nuxtjs/color-mode',
    '@vueuse/nuxt',
    '@oku-ui/primitives-nuxt',
    'pinceau/nuxt'
  ],
  css: [
    '@unocss/reset/tailwind.css'
  ],
  colorMode: {
    classSuffix: ''
  },
  primitives: {
    installComponents: false
  }
})

