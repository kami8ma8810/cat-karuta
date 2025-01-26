<script setup lang="ts">
// i18nの設定を取得
const { t, locale } = useI18n()

useHead({
  title: t('meta.title'),
  meta: [
    { name: 'description', content: t('meta.description') }
  ]
})

const bgImage = new URL('../assets/image/fv_illust.png', import.meta.url).href

const toggleLanguage = () => {
  locale.value = locale.value === 'ja' ? 'en' : 'ja'
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-pink-50 to-green-50 flex flex-col items-center justify-center p-4 relative">
    <div class="absolute inset-0 opacity-15 pointer-events-none">
      <div 
        class="w-full h-full bg-repeat bg-center" 
        :style="{ backgroundImage: `url(${bgImage})`, backgroundSize:'contain' }"
      >
      </div>
    </div>

    <div class="text-center mb-12 relative">
      <h1 class="text-4xl md:text-6xl font-bold mb-2 text-pink-800">{{ t('home.title') }}</h1>
    </div>

    <NuxtLink 
      to="/game"
      class="bg-pink-400 hover:bg-pink-500 text-white font-bold py-4 px-12 rounded-full text-xl md:text-3xl mb-8 transition-colors relative shadow-lg hover:shadow-xl"
    >
      {{ t('home.start') }}
    </NuxtLink>

    <div class="fixed bottom-4 text-center">
      <a 
        href="https://twitter.com/jookalubi24" 
        target="_blank"
        class="text-sm underline text-pink-700 hover:text-pink-800 md:text-lg"
      >
        {{ t('home.developer') }}
      </a>
    </div>

    <button
      @click="toggleLanguage"
      class="fixed bottom-4 right-4 bg-white px-3 py-1 rounded-full shadow-md hover:shadow-lg text-pink-700 hover:bg-pink-50"
      type="button"
    >
      {{ locale === 'ja' ? 'Switch to English' : '日本語に切り替える' }}
    </button>
  </div>
</template>