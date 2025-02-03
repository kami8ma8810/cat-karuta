// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  ssr: true,
  // nitro: {
  //   preset: 'vercel'
  // },
  runtimeConfig: {
    cloudinary: {
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
      apiSecret: process.env.CLOUDINARY_API_SECRET
    },
    catApiKey: process.env.NUXT_CAT_API_KEY,
    public: {
      catApiKey: process.env.NUXT_CAT_API_KEY,
    }
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/i18n', '@nuxt/icon', '@nuxt/test-utils/module'],
  i18n: {
    langDir: 'locales',
    locales: [
      { code: 'ja', file: 'ja.json',iso: 'ja-JP' },
      { code: 'en', file: 'en.json',iso: 'en-US' }
    ],
    defaultLocale: 'ja',
    strategy: 'no_prefix',
    // detectBrowserLanguage: {
    //   useCookie: true,
    //   cookieKey: 'i18n_redirected',
    //   redirectOn: 'root',
    //   alwaysRedirect: true,
    //   fallbackLocale: 'ja',
    //   cookieSecure: true,
    // },
    detectBrowserLanguage: false,
    vueI18n: './i18n/i18n.config.ts'
  },
  app: {
    head: {
      title: 'にゃんこかるた',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'description', content: '猫の品種を学べるカルタゲーム' },
        // OGP
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'にゃんこかるた' },
        { property: 'og:title', content: 'にゃんこかるた' },
        { property: 'og:description', content: '猫の品種を学べるカルタゲーム' },
        { property: 'og:image', content: 'https://cat-karuta.vercel.app/ogp.jpg' },
        { property: 'og:url', content: 'https://cat-karuta.vercel.app' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@jookalubi24' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', type: 'image/png', href: '/favicon.png' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@400;700&display=swap'
        }
      ]
    }
  }
})