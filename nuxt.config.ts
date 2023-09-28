export default defineNuxtConfig({
  app: {
    head: {
      title: 'Talent',
      link: [
        { rel: 'icon', href: '/logo.svg' }
      ],
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Talent' }
      ]
    }
  },
  runtimeConfig: {
    public: {
      base: process.env.APP_BASE
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
      },
      {
        path: '~/components/ui',
        global: true,
        prefix: 'ui'
      }
    ]
  },
  imports: {
    dirs: [
      'composables',
      'composables/*/index.{ts,js,mjs,mts}',
      'composables/**'
    ]
  }
})



