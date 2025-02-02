// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  runtimeConfig: {
    cloudinary: {
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
      apiSecret: process.env.CLOUDINARY_API_SECRET
    },
    catApiKey: process.env.CAT_API_KEY,
    public: {
      cloudinary: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME
      }
    }
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/i18n', '@nuxt/icon', '@nuxt/test-utils/module'],
  i18n: {
    langDir: 'locales',
    locales: [
      { code: 'ja', file: 'ja.json' },
      { code: 'en', file: 'en.json' }
    ],
    defaultLocale: 'ja',
    strategy: 'no_prefix',
    vueI18n: './i18n/i18n.config.ts'
  },
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@400;700&display=swap'
        }
      ]
    }
  }
})