export default defineNuxtConfig({
  app: {
    head: {
      title: "Talent",
      link: [
        { rel: "icon", href: "/logo.svg" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
      ],
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { hid: "description", name: "description", content: "Talent" },
      ],
      script: [
        // see https://github.com/triggerjs/trigger/blob/main/README.zh-Hans.md
        {
          src: "/trigger.js",
          defer: true,
        },
      ],
    },
    // pageTransition: { name: 'page', mode: 'out-in' }
  },
  runtimeConfig: {
    public: {
      base: process.env.APP_BASE || "contour-app",
      init: {
        user: "abcdefg@qq.com",
        pass: "abcdefg123..",
      },
      reportCycle: 10,
    },
    log: {
      level: process.env.LOG_LEVEL || "debug",
      direction: process.env.LOG_PATH || "stdout",
    },
    captchaExpert: 3,
    email: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    jwt: {
      key: process.env.JWT_KEY,
      // 过期时间 see https://github.com/vercel/ms
      exp: "1h",
    },
    upload: {
      urlPrefix: "http://localhost/upload",
      path: process.env.UPLOAD_PATH,
    },
  },
  devtools: { enabled: true },
  modules: ["@unocss/nuxt", "@vueuse/nuxt", "pinceau/nuxt", "@pinia/nuxt", "nuxt-lodash"],
  css: ["@unocss/reset/tailwind.css", "assets/main.css"],
  lodash: {
    prefix: "_",
  },
  pinia: {
    autoImports: ["defineStore", ["defineStore", "definePiniaStore"]],
  },
  components: {
    dirs: [
      {
        path: "~/components/app",
        global: true,
        prefix: "app",
      },
      {
        path: "~/components/ui",
        global: true,
        prefix: "ui",
      },
      {
        path: "~/components/render",
        global: true,
        prefix: "render",
      },
    ],
  },
  imports: {
    dirs: ["composables", "composables/*/index.{ts,js,mjs,mts}", "composables/**", "stores"],
  },
  build: {
    transpile:
      process.env.NODE_ENV === "production"
        ? ["naive-ui", "vueuc", "@css-render/vue3-ssr", "@juggle/resize-observer"]
        : ["@juggle/resize-observer"],
  },
  vite: {
    optimizeDeps: {
      include: process.env.NODE_ENV === "development" ? ["naive-ui", "vueuc"] : [],
    },
  },
  nitro: {
    prerender: {
      ignore: ["/edit/**"],
      routes: ["/"],
    },
  },
});
