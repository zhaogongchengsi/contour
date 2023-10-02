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
    },
    captchaExpert: 3
  },
  devtools: { enabled: true },
  modules: [
    '@unocss/nuxt',
    '@nuxtjs/color-mode',
    '@vueuse/nuxt',
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
  },
  build: {
    transpile:
      process.env.NODE_ENV === 'production'
        ? [
          'naive-ui',
          'vueuc',
          '@css-render/vue3-ssr',
          '@juggle/resize-observer'
        ]
        : ['@juggle/resize-observer']
  },
  vite: {
    optimizeDeps: {
      include:
        process.env.NODE_ENV === 'development'
          ? ['naive-ui', 'vueuc']
          : []
    }
  }
})



