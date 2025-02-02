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
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@400;700&display=swap'
        }
      ]
    }
  }
})