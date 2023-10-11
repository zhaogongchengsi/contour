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
      base: process.env.APP_BASE || 'contour-app'
    },
    captchaExpert: 3,
    email: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    jwt: {
      key: process.env.JWT_KEY,
      // 过期时间 see https://github.com/vercel/ms
      exp: '1h'
    },
    upload: process.env.UPLOAD_PATH
  },
  devtools: { enabled: true },
  modules: [
    '@unocss/nuxt',
    '@nuxtjs/color-mode',
    '@vueuse/nuxt',
    'pinceau/nuxt',
    '@pinia/nuxt',
  ],
  css: [
    '@unocss/reset/tailwind.css',
    'assets/main.css'
  ],
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      'defineStore', // import { defineStore } from 'pinia'
      ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },
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
      },
      {
        path: '~/components/render',
        global: true,
        prefix: 'render'
      }
    ]
  },
  imports: {
    dirs: [
      'composables',
      'composables/*/index.{ts,js,mjs,mts}',
      'composables/**',
      'stores'
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



