export default defineNuxtConfig({
  app: {
    head: {
      title: 'Talent',
      link: [
        { rel: 'icon', href: '/logo.svg' }
      ]
    }
  },
  devtools: { enabled: true },
  modules: [
    '@unocss/nuxt',
    '@nuxtjs/color-mode',
    '@vueuse/nuxt',
    '@oku-ui/primitives-nuxt',
    'pinceau/nuxt'
  ],
  css: [
    '@unocss/reset/tailwind.css',
    'assets/main.css'
  ],
  colorMode: {
    classSuffix: '',
    dataValue: 'light'
  },
  primitives: {
    installComponents: false
  },
  components: {
    "dirs": [
      {
        path: '~/components/app',
        global: true,
        prefix: 'app'
      }
    ]
  }
})


