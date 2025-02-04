<script setup lang="ts">
import backgroundImage from 'assets/image/fv_illust.png'
import { useI18n } from 'vue-i18n'
import { useCatData } from '@/composables/useCatData'
import GameRulesModal from '@/components/GameRulesModal.vue'
import ReleaseReportModal from '@/components/ReleaseReportModal.vue'
import { useRequestURL } from '#app'

const { t, locale } = useI18n()
const baseUrl = useRequestURL().origin
const { fetchData, isLoading, error } = useCatData()

// 言語切り替えメニューの状態管理
// const isLangMenuOpen = ref(false)

// 言語切り替え関数
// const toggleLanguage = () => {
//   locale.value = locale.value === 'ja' ? 'en' : 'ja'
//   isLangMenuOpen.value = false
// }

// トップページでデータを事前取得
onMounted(async () => {
  try {
    await fetchData()
  } catch (e) {
    console.error('データの取得に失敗:', e)
  }
})

const showRules = ref(false)
const showReport = ref(false)
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-pink-50 to-green-50 flex flex-col items-center justify-center p-4 relative">
    <!-- ローディング表示 -->
    <div v-if="isLoading" class="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-4 border-pink-500 border-t-transparent mx-auto mb-4"></div>
        <p class="text-pink-800 text-lg font-bold">{{ t('home.loading') }}</p>
      </div>
    </div>

    <!-- ルール説明モーダル -->
    <GameRulesModal
      :show="showRules"
      @close="showRules = false"
    />

    <div class="absolute inset-0 opacity-15 pointer-events-none">
      <div 
        class="w-full h-full bg-repeat bg-center" 
        :style="{ backgroundImage: `url(${backgroundImage})`, backgroundSize:'contain' }"
      >
      </div>
    </div>

    <div class="relative z-10 text-center">
      <h1 class="text-3xl sm:text-4xl font-bold text-pink-800 mb-8 tracking-widest">{{ t('home.title') }}</h1>
      
      <div class="space-y-4">
        <NuxtLink
          to="/game"
          class="block px-8 py-4 rounded-lg text-xl font-bold shadow-lg transition-colors"
          :class="[
            isLoading || error
              ? 'bg-pink-300 cursor-not-allowed text-white'
              : 'bg-pink-700 hover:bg-pink-800 text-white transition-colors'
          ]"
          :aria-disabled="isLoading || error"
          @click.prevent="isLoading || error ? null : navigateTo('/game')"
        >
          {{ t('home.start') }}
        </NuxtLink>

        <NuxtLink
          to="/cats"
          class="block px-8 py-4 rounded-lg text-xl font-bold transition-colors border-2"
          :class="[
            isLoading || error
              ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
              : 'bg-white text-pink-800 hover:bg-pink-50 border-pink-200'
          ]"
          :aria-disabled="isLoading || error"
          @click.prevent="isLoading || error ? null : navigateTo('/cats')"
        >
          {{ t('home.catList') }}
        </NuxtLink>

        <button
          @click="showRules = true"
          class="block w-full px-8 py-4 bg-white/80 backdrop-blur-sm text-pink-800 rounded-lg hover:bg-pink-50 transition-colors text-xl font-bold shadow-lg"
        >
          {{ t('home.rules') }}
        </button>

        <!-- SNSシェアボタン -->
        <a
          :href="`https://twitter.com/intent/tweet?text=${encodeURIComponent(t('home.shareText'))}&url=${encodeURIComponent(baseUrl)}&hashtags=にゃんこかるた`"
          target="_blank"
          class="flex items-center justify-center gap-2 px-8 py-4 bg-black text-white rounded-lg hover:opacity-90 transition-opacity text-xl font-bold shadow-lg"
        >
          <Icon name="simple-icons:x" class="w-6 h-6" />
          {{ t('home.share') }}
        </a>

        <button
          class="block w-full p-2 text-pink-800 rounded-lg text-xl underline"
          @click="showReport = true"
        >
          {{ t('home.report') }}
        </button>
      </div>
    </div>

    <!-- エラー表示 -->
    <div v-if="error" class="mt-8 text-red-700 font-bold text-2xl">
      <p>{{ t('home.error') }}</p>
    </div>

    <div class="fixed bottom-8 text-center">
      <a 
        href="https://twitter.com/jookalubi24" 
        target="_blank"
        class="text-sm underline text-pink-700 hover:text-pink-800 md:text-lg"
      >
        {{ t('home.developer') }}
      </a>
      <p class="mt-4 text-sm text-gray-700">Version 1.1.2</p>
    </div>
    <!-- <div class="fixed bottom-8 right-8">
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
    </div> -->

    <ReleaseReportModal :show="showReport" @close="showReport = false" />
  </div>
</template>