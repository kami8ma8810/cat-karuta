
<script setup lang="ts">
const { t } = useI18n()

interface Card {
  id: string
  name: string
  imageUrl: string
  description: string
}

// 仮のカードデータ
const cards = ref<Card[]>([
  {
    id: '1',
    name: 'しろねこ',
    imageUrl: 'https://placehold.jp/150x150.png',
    description: '白い毛並みが特徴的な猫'
  },
  {
    id: '2', 
    name: 'くろねこ',
    imageUrl: 'https://placehold.jp/150x150.png',
    description: '黒い毛並みが特徴的な猫'
  },
  {
    id: '3',
    name: 'みけねこ',
    imageUrl: 'https://placehold.jp/150x150.png', 
    description: '三毛の模様が特徴的な猫'
  },
  {
    id: '4',
    name: 'とらねこ',
    imageUrl: 'https://placehold.jp/150x150.png',
    description: 'トラ模様が特徴的な猫'
  },
  {
    id: '5',
    name: 'ちゃとら',
    imageUrl: 'https://placehold.jp/150x150.png',
    description: '茶トラ模様が特徴的な猫'
  },
  {
    id: '6',
    name: 'はちわれ',
    imageUrl: 'https://placehold.jp/150x150.png',
    description: '顔の模様が特徴的な猫'
  }
])

// Props
const props = withDefaults(defineProps<{
  level: number
  playerScore: number
  computerScore: number
  isReading: boolean
  isSelectable: boolean
  revealedCardId: string | null
  correctCardId: string | null
  currentMessage: string
}>(), {
  level: 1,
  playerScore: 0,
  computerScore: 0,
  isReading: false,
  isSelectable: true,
  revealedCardId: null,
  correctCardId: null,
  currentMessage: ''
})

// Emits
const emit = defineEmits<{
  'select-card': [cardId: string]
}>()

// Methods
const handleCardSelect = (cardId: string) => {
  if (props.isSelectable) {
    emit('select-card', cardId)
  }
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-pink-50 to-green-50 p-4">
    <!-- スコアボード -->
    <div class="flex justify-between items-center mb-8 max-w-4xl mx-auto">
      <div>
        <span class="text-lg font-bold text-pink-800">{{ t('game.level') }} {{ level }}</span>
      </div>
      <div class="flex gap-8">
        <div class="text-center">
          <p class="text-sm text-pink-600">{{ t('game.player') }}</p>
          <p class="text-2xl font-bold text-pink-800">{{ playerScore }}</p>
        </div>
        <div class="text-center">
          <p class="text-sm text-pink-600">{{ t('game.opponent') }}</p>
          <p class="text-2xl font-bold text-pink-800">{{ computerScore }}</p>
        </div>
      </div>
    </div>

    <!-- 猫カードグリッド -->
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8 max-w-4xl mx-auto">
      <CatCard
        v-for="card in cards"
        :key="card.id"
        :image-url="card.imageUrl"
        :name="card.name"
        :is-selectable="isSelectable"
        :is-revealed="revealedCardId === card.id"
        :is-correct="revealedCardId === card.id && card.id === correctCardId"
        @select="handleCardSelect(card.id)"
      />
    </div>

    <!-- メッセージエリア -->
    <div class="max-w-4xl mx-auto">
      <div class="bg-white/80 backdrop-blur-sm rounded-lg p-6">
        <div class="flex items-center gap-2 mb-2">
          <div 
            :class="[
              'w-4 h-4 rounded-full',
              isReading ? 'bg-pink-500 animate-pulse' : 'bg-gray-300'
            ]"
          ></div>
          <span class="text-lg text-gray-600">
            {{ isReading ? t('game.reading') : t('game.waiting') }}
          </span>
        </div>
        <p 
          class="text-xl text-pink-800"
          :class="{ 'animate-fade-in': isReading }"
        >
          {{ currentMessage }}
        </p>
      </div>
    </div>
  </div>
</template>


<style scoped>
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