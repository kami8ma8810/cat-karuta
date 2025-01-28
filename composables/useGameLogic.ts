import { useCatApi } from './useCatApi'
import { usePlayerAnswer } from './game/usePlayerAnswer'
import { useComputerAnswer } from './game/useComputerAnswer'
import { useGameState } from './game/useGameState'
import type { CatBreedWithImage } from '@/types/cat'
import { selectRandom } from '@/utils/randomSelect'

export const useGameLogic = () => {
  // 状態管理
  const { state: gameState, updateScore, updateStatus, updateLevel } = useGameState()
  const { fetchCatsWithImage } = useCatApi()

  const allCat = ref<CatBreedWithImage[]>([])
  const usedCatIds = ref<Set<string>>(new Set())
  const displayCat = ref<CatBreedWithImage[]>([])
  const currentCat = ref<CatBreedWithImage | null>(null)
  const currentMessage = ref('')
  const revealedCardId = ref<string | null>(null)
  const correctCardId = ref<string | null>(null)

  // タイピングアニメーション用
  const typingSpeed = computed(() => Math.max(50 - gameState.value.level * 3, 20))
  let typingTimer: NodeJS.Timeout | undefined

  // プレイヤーとコンピュータの回答処理
  const { handleAnswer } = usePlayerAnswer({
    currentCat,
    gameState,
    updateScore
  })

  const { startAnswerTimer, cancelAnswerTimer } = useComputerAnswer({
    gameState,
    updateScore
  })

  // テキストのタイピングアニメーション
  const typeMessage = (message: string) => {
    let index = 0
    currentMessage.value = ''
    updateStatus('reading')

    const type = () => {
      if (index < message.length) {
        currentMessage.value += message[index]
        index++
        typingTimer = setTimeout(type, typingSpeed.value)
      } else {
        updateStatus('selecting')
        startAnswerTimer()
      }
    }

    type()
  }

  // 新しいラウンドの準備
  const prepareNewRound = () => {
    if (usedCatIds.value.size === allCat.value.length) {
      usedCatIds.value.clear()
    }

    const unusedCats = allCat.value.filter(cat => !usedCatIds.value.has(cat.id))
    displayCat.value = selectRandom<CatBreedWithImage>(unusedCats, 6)
    currentCat.value = displayCat.value[Math.floor(Math.random() * displayCat.value.length)]
    displayCat.value.forEach(cat => usedCatIds.value.add(cat.id))

    // 状態をリセット
    revealedCardId.value = null
    correctCardId.value = null
    currentMessage.value = ''

    // タイピング開始
    if (currentCat.value) {
      typeMessage(currentCat.value.description)
    }
  }

  // カード選択時の処理
  const handleCardSelect = (cardId: string) => {
    const selectedCat = displayCat.value.find(cat => cat.id === cardId)
    if (!selectedCat) return

    cancelAnswerTimer()
    revealedCardId.value = cardId
    correctCardId.value = currentCat.value?.id || null

    const isCorrect = handleAnswer(selectedCat)
    if (isCorrect && gameState.value.score.player % 5 === 0) {
      updateLevel(Math.min(gameState.value.level + 1, 10))
    }

    setTimeout(prepareNewRound, 2000)
  }

  // 初期化
  const initialize = async () => {
    allCat.value = await fetchCatsWithImage()
    prepareNewRound()
  }

  // クリーンアップ
  onUnmounted(() => {
    if (typingTimer) clearTimeout(typingTimer)
    cancelAnswerTimer()
  })

  return {
    gameState,
    displayCat,
    currentCat,
    currentMessage,
    revealedCardId,
    correctCardId,
    initialize,
    handleCardSelect
  }
}