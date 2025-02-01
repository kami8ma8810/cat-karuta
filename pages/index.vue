<script setup lang="ts">
import backgroundImage from 'assets/image/fv_illust.png'
import { useI18n } from 'vue-i18n'
import { useCatData } from '@/composables/useCatData'

const { t, locale } = useI18n()
const { fetchData, isLoading, error } = useCatData()

useHead({
  title: t('meta.title'),
  meta: [
    { name: 'description', content: t('meta.description') }
  ]
})

// 言語切り替えメニューの状態管理
const isLangMenuOpen = ref(false)

// 言語切り替え関数
const toggleLanguage = () => {
  locale.value = locale.value === 'ja' ? 'en' : 'ja'
  isLangMenuOpen.value = false
}

// トップページでデータを事前取得
onMounted(async () => {
  try {
    await fetchData()
  } catch (e) {
    console.error('データの取得に失敗:', e)
  }
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-pink-50 to-green-50 flex flex-col items-center justify-center p-4 relative">
    <div class="absolute inset-0 opacity-15 pointer-events-none">
      <div 
        class="w-full h-full bg-repeat bg-center" 
        :style="{ backgroundImage: `url(${backgroundImage})`, backgroundSize:'contain' }"
      >
      </div>
    </div>

    <div class="text-center mb-12 relative">
      <h1 class="text-4xl md:text-6xl font-bold mb-2 text-pink-800">{{ t('home.title') }}</h1>
    </div>

    <!-- エラー表示 -->
    <div v-if="error" class="mb-8 text-red-600">
      <p>{{ t('home.error') }}</p>
    </div>

    <NuxtLink 
      to="/game"
      class="bg-pink-400 hover:bg-pink-500 text-white font-bold py-4 px-12 rounded-full text-xl md:text-3xl mb-8 transition-colors relative shadow-lg hover:shadow-xl"
      :class="{ 'opacity-50 cursor-not-allowed': isLoading || !!error }"
      :disabled="isLoading || !!error"
    >
      {{ isLoading ? t('home.loading') : t('home.start') }}
    </NuxtLink>

    <div class="fixed bottom-8 text-center">
      <a 
        href="https://twitter.com/jookalubi24" 
        target="_blank"
        class="text-sm underline text-pink-700 hover:text-pink-800 md:text-lg"
      >
        {{ t('home.developer') }}
      </a>
    </div>
    <div class="fixed bottom-8 right-8">
      <button
        @click="isLangMenuOpen = !isLangMenuOpen"
        class="bg-white px-4 py-2 rounded-full shadow-md hover:shadow-lg text-pink-700 hover:bg-pink-50 flex items-cneter gap-2"
        type="button"
      >
      <Icon name="i-heroicons-globe-alt" class="w-5 h-5 flex-shrink-0" />
      <span class="leading-none text-lg top-[-1px] relative">Language</span>
      </button>

      <div 
        v-if="isLangMenuOpen"
        class="absolute bottom-10 right-0 bg-white rounded-lg shadow-lg p-2 min-w-[120px] transition-all duration-300"
        :class="{ 'translate-y-2 opacity-0': !isLangMenuOpen, 'translate-y-0 opacity-100': isLangMenuOpen }"
      >
        <button
          @click="toggleLanguage"
          class="w-full text-left px-3 py-2 rounded hover:bg-pink-100 text-pink-700 transition-colors flex items-center justify-between"
        >
          <span>日本語</span>
          <svg v-if="locale === 'ja'" class="w-4 h-4 text-pink-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </button>
        <button
          @click="toggleLanguage" 
          class="w-full text-left px-3 py-2 rounded hover:bg-pink-100 text-pink-700 transition-colors flex items-center justify-between"
        >
          <span>English</span>
          <svg v-if="locale === 'en'" class="w-4 h-4 text-pink-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>