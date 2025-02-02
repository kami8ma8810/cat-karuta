<script setup lang="ts">
import { useGameLogic } from "@/composables/useGameLogic";
import { useI18n } from "vue-i18n";
import { useCatData } from "@/composables/useCatData";
import MasterAchievement from "@/components/MasterAchievement.vue";
import GameOver from "@/components/GameOver.vue";
// import { useRuntimeConfig } from 'nuxt'
// import { useRouter } from 'vue-router'

const isDev = process.env.NODE_ENV === "development";

const { t } = useI18n();
// const router = useRouter()
const { catData, fetchData, isLoading, error } = useCatData();
const {
  gameState,
  displayCat,
  currentMessage,
  revealedCardId,
  correctCardId,
  revealType,
  initialize,
  handleCardSelect,
  handleBack,
  handleNext,
  handleRestart,
} = useGameLogic();

// ページを離れる前の確認
// TODO: ブラウザを閉じるときにも出す
// onBeforeRouteLeave((to, from) => {
//   const answer = window.confirm('ゲームを中断します。保存されませんがよろしいですか？')
//   if (!answer) return false
// })

// ゲーム開始時の初期化
onMounted(async () => {
  // データが未取得の場合は取得
  if (catData.value.length === 0) {
    try {
      await fetchData();
    } catch (e) {
      console.error("データの取得に失敗:", e);
      return;
    }
  }

  await initialize();
});

// リロード時の処理
onBeforeRouteUpdate(() => {
  window.location.reload();
});
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-pink-50 to-green-50 md:p-8 p-4">
    <!-- ローディング表示 -->
    <div
      v-if="isLoading"
      class="fixed inset-0 bg-white backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div class="text-center">
        <div
          class="animate-spin rounded-full h-12 w-12 border-4 border-pink-500 border-t-transparent mb-4"
        ></div>
        <p class="text-pink-800">{{ t("game.loading") }}</p>
      </div>
    </div>

    <!-- エラー表示 -->
    <div
      v-if="error"
      class="fixed inset-0 bg-white backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-md text-center">
        <p class="text-red-600 mb-4">{{ t("game.error") }}</p>
        <button
          @click="handleBack"
          class="px-4 py-2 bg-pink-700 hover:bg-pink-800 text-white rounded-lg transition-colors"
        >
          {{ t("game.backToHome") }}
        </button>
      </div>
    </div>

    <!-- デバッグメニュー（開発環境のみ） -->
    <div v-if="isDev" class="fixed bottom-8 right-8 z-50">
      <div class="flex flex-col gap-2">
        <button
          @click="
            () => {
              gameState.level = 5;
              handleRestart();
            }
          "
          class="px-4 py-2 bg-gray-800 text-white rounded-lg opacity-50 hover:opacity-100"
        >
          デバッグ: レベル5スタート
        </button>
        <button
          @click="
            () => {
              gameState.level = 9;
              gameState.score.player = 45;
              gameState.status = 'gameCleared';
              handleCardSelect(correctCardId || '');
            }
          "
          class="px-4 py-2 bg-gray-800 text-white rounded-lg opacity-50 hover:opacity-100"
        >
          デバッグ: ゲームクリア
        </button>
        <button
          @click="
            () => {
              gameState.score.computer = 3;
              gameState.status = 'gameOver';
            }
          "
          class="px-4 py-2 bg-gray-800 text-white rounded-lg opacity-50 hover:opacity-100"
        >
          デバッグ: ゲームオーバー
        </button>
      </div>
    </div>

    <div class="flex md:gap-8 gap-4 md:flex-row flex-col-reverse">
      <div class="flex-none flex md:flex-col flex-col-reverse gap-8">
        <!-- トップに戻るボタン -->
        <button
          @click="handleBack"
          class="flex items-center gap-2 px-4 py-2 backdrop-blur-sm bg-pink-700 hover:bg-pink-800 text-white rounded-lg transition-colors shadow-md"
        >
          <Icon name="i-heroicons-arrow-left" class="w-6 h-6" />
          <span>{{ t("game.back") }}</span>
        </button>
        <!-- スコアボード -->
        <div
          class="flex-none bg-white backdrop-blur-sm p-4 rounded-lg shadow-md min-w-[200px]"
        >
          <div class="mb-4">
            <span class="md:text-xl text-md font-bold text-pink-800"
              >{{ t("game.level") }} {{ gameState.level }}</span
            >
          </div>
          <div class="flex flex-col gap-4">
            <div class="flex gap-4">
              <p class="md:text-md text-sm font-bold text-pink-800">
                {{ t("game.score") }}
              </p>
              <div class="text-center">
                <p class="md:text-sm text-xs text-pink-600">{{ t("game.player") }}</p>
                <p class="md:text-2xl text-xl font-bold text-pink-800">
                  {{ gameState.score.player }}
                </p>
              </div>
              <div class="text-center">
                <p class="md:text-sm text-xs text-pink-600">{{ t("game.opponent") }}</p>
                <p class="md:text-2xl text-xl font-bold text-pink-800">
                  {{ gameState.score.computer }}
                </p>
              </div>
            </div>
          </div>
          <!-- 次へ進む・リトライ ボタン -->
          <button
            v-if="gameState.status === 'waitingNext' || 
                  gameState.status === 'timeupResult' || 
                  gameState.status === 'mistakeResult'"
            @click="handleNext"
            class="mt-4 w-full px-4 py-2 bg-pink-700 hover:bg-pink-800 text-white rounded-lg transition-colors"
          >
            {{
              gameState.status === 'waitingNext'
                ? t("game.next", {
                    level: gameState.level + 1 > 10 ? 10 : gameState.level + 1,
                  })
                : t("game.retry")
            }}
          </button>
        </div>
      </div>
      <div class="flex-1">
        <!-- 猫カードグリッド -->
        <div
          class="grid grid-cols-2 md:grid-cols-3 md:gap-4 gap-2 md:mb-8 mb-4 max-w-4xl mx-auto"
        >
          <CatCard
            v-for="cat in displayCat"
            :key="cat.id"
            :image-url="cat.imageUrl"
            :name="cat.nameJa"
            :is-selectable="gameState.status === 'selecting'"
            :is-revealed="revealedCardId === cat.id"
            :is-correct="revealedCardId === cat.id && cat.id === correctCardId"
            :is-answer="cat.id === correctCardId"
            :reveal-type="revealType"
            :game-status="gameState.status"
            @select="handleCardSelect(cat.id)"
          />
        </div>
        <!-- メッセージエリア -->
        <div class="max-w-4xl mx-auto">
          <div
            class="bg-white backdrop-blur-sm rounded-lg md:pt-10 pt-8 px-4 pb-4 border-2 relative"
          >
            <!-- ステータス表示 -->
            <div
              v-if="gameState.status === 'selecting' || 
                    gameState.status === 'timeupResult' || 
                    gameState.status === 'mistakeResult' ||
                    gameState.status === 'waitingNext'"
              class="absolute top-0 left-0 md:p-2 p-1 rounded md:text-sm text-xs font-bold"
              :class="{
                'bg-yellow-100 text-yellow-800': gameState.status === 'selecting',
                'bg-red-100 text-red-800':
                  gameState.status === 'timeupResult',
                'bg-pink-100 text-pink-800':
                  gameState.status === 'mistakeResult',
                'bg-green-100 text-green-800':
                  gameState.status === 'waitingNext'
              }"
            >
              {{
                gameState.status === "selecting"
                  ? t("game.status.selecting")
                  : gameState.status === "timeupResult"
                  ? gameState.level >= 5
                    ? t("game.status.timeupWithPoint")
                    : t("game.status.timeup")
                  : gameState.status === "mistakeResult"
                  ? gameState.level >= 5
                    ? t("game.status.mistakeWithPoint")
                    : t("game.status.mistake")
                : gameState.status === "waitingNext"
                ? t("game.status.correct")
                : ""
              }}
            </div>
            <!-- タイピングテキスト -->
            <p
              class="md:text-xl text-sm min-h-[4rem] relative font-medium"
              :class="{ 'typing-cursor': gameState.status === 'reading' }"
            >
              <span
                class="text-pink-800 font-bold"
                :class="{ 'animate-typing': gameState.status === 'reading' }"
              >
                {{ currentMessage }}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- マスター達成モーダル -->
    <MasterAchievement
      v-if="gameState.status === 'gameCleared'"
      @restart="handleRestart"
      @back="handleBack"
    />

    <!-- ゲームオーバーモーダル -->
    <GameOver
      v-if="gameState.status === 'gameOver'"
      @restart="handleRestart"
      @back="handleBack"
    />
  </div>
</template>

<style scoped>
.typing-cursor::after {
  content: "|";
  position: absolute;
  margin-left: 2px;
  animation: cursor 1s infinite;
  color: theme("colors.pink.500");
}

@keyframes cursor {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
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
