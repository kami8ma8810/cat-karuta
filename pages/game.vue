<script setup lang="ts">
import { useGameLogic } from '@/composables/useGameLogic'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const router = useRouter()
const {
  gameState,
  displayCat,
  currentMessage,
  revealedCardId,
  correctCardId,
  initialize,
  handleCardSelect,
  handleBack
} = useGameLogic()

// ページを離れる前の確認
// TODO: ブラウザを閉じるときにも出す
onBeforeRouteLeave((to, from) => {
  const answer = window.confirm('ゲームを中断します。保存されませんがよろしいですか？')
  if (!answer) return false
})

// ゲーム開始時の初期化
onMounted(async () => {
  await initialize()
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-pink-50 to-green-50 p-4">
    <!-- トップに戻るボタン -->
    <button
      @click="handleBack"
      class="fixed top-4 left-4 flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm text-pink-800 hover:bg-pink-50 rounded-lg transition-colors shadow-sm"
    >
      <Icon name="i-heroicons-arrow-left" class="w-6 h-6" />
      <span>{{ t('game.back') }}</span>
    </button>

    <!-- スコアボード -->
    <div class="flex justify-between items-center mb-8 max-w-4xl mx-auto">
      <div>
        <span class="text-xl font-bold text-pink-800">{{ t('game.level') }} {{ gameState.level }}</span>
      </div>
      <div class="flex gap-8">
        <div class="flex gap-8 items-center">
          <p class="text-md font-bold text-pink-800">{{ t('game.score') }}</p>
          <div class="text-center">
            <p class="text-sm text-pink-600">{{ t('game.player') }}</p>
            <p class="text-2xl font-bold text-pink-800">{{ gameState.score.player }}</p>
          </div>
          <div class="text-center">
            <p class="text-sm text-pink-600">{{ t('game.opponent') }}</p>
            <p class="text-2xl font-bold text-pink-800">{{ gameState.score.computer }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 猫カードグリッド -->
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8 max-w-4xl mx-auto">
      <CatCard
        v-for="cat in displayCat"
        :key="cat.id"
        :image-url="cat.imageUrl"
        :name="cat.nameJa"
        :is-selectable="gameState.status === 'selecting'"
        :is-revealed="revealedCardId === cat.id"
        :is-correct="revealedCardId === cat.id && cat.id === correctCardId"
        @select="handleCardSelect(cat.id)"
      />
    </div>

    <!-- メッセージエリア -->
    <div class="max-w-4xl mx-auto">
      <div 
        class="bg-white/80 backdrop-blur-sm rounded-lg p-6 border-2"
        :class="[
          ['reading', 'answering'].includes(gameState.status)
            ? 'border-pink-600 shadow-lg shadow-pink-100' 
            : 'border-gray-200'
        ]"
      >
        <!-- ステータスインジケーター -->
        <div class="flex items-center gap-2 mb-4">
          <div 
            :class="[
              'w-4 h-4 rounded-full transition-colors duration-300',
              gameState.status === 'reading' ? 'bg-pink-500 animate-pulse' 
              : gameState.status === 'answering' ? 'bg-yellow-500 animate-pulse'
              : 'bg-gray-300'
            ]"
          ></div>
          <span 
            v-if="!['reading', 'answering'].includes(gameState.status)"
            class="text-lg transition-colors duration-300 text-gray-600"
          >
            {{ t('game.waiting') }}
          </span>
        </div>

        <!-- タイピングテキスト -->
        <p 
          class="text-xl min-h-[4rem] relative font-medium"
          :class="{ 'typing-cursor': gameState.status === 'reading' }"
        >
          <span 
            class="text-pink-800"
            :class="{ 'animate-typing': gameState.status === 'reading' }"
          >
            {{ currentMessage }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.typing-cursor::after {
  content: '|';
  position: absolute;
  margin-left: 2px;
  animation: cursor 1s infinite;
  color: theme('colors.pink.500');
}

@keyframes cursor {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.animate-typing {
  display: inline-block;
  animation: typing-fade 0.15s ease-out;
}

@keyframes typing-fade {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 既存のアニメーション */
.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>