import { useCatApi } from './useCatApi'
import { usePlayerAnswer } from './game/usePlayerAnswer'
import { useComputerAnswer } from './game/useComputerAnswer'
import { useGameState } from './game/useGameState'
import type { CatBreedWithImage } from '@/types/cat'
import { selectRandom } from '@/utils/randomSelect'
import { useCatData } from '@/composables/useCatData'
import type { RevealType } from '@/types/game'
import { useI18n } from 'vue-i18n'
export const useGameLogic = () => {
  // 状態管理
  const { state: gameState, updateScore, updateStatus } = useGameState()
  const { catData } = useCatData()
  const router = useRouter()
  const { t } = useI18n()

  const allCat = computed(() => catData.value)
  const usedCatIds = ref<Set<string>>(new Set())
  const correctCatIds = ref<Set<string>>(new Set())
  const displayCat = ref<CatBreedWithImage[]>([])
  const currentCat = ref<CatBreedWithImage | null>(null)
  const currentMessage = ref('')
  const revealedCardId = ref<string | null>(null)
  const correctCardId = ref<string | null>(null)
  const revealType = ref<RevealType>(null)

  // タイピングアニメーション用
  const typingSpeed = computed(() => Math.max(150 - gameState.value.level * 5, 80))
  let typingTimer: NodeJS.Timeout | undefined

  // プレイヤーとコンピュータの回答処理
  const { handleAnswer } = usePlayerAnswer({
    currentCat,
    gameState,
    updateScore
  })

  const { startAnswerTimer, cancelAnswerTimer, onComputerAnswer } = useComputerAnswer({
    gameState,
    updateScore,
    updateStatus
  })

  // コンピュータの回答時の処理
  onComputerAnswer(() => {
    revealType.value = 'timeup'
    correctCardId.value = currentCat.value?.id || null
    revealedCardId.value = null // 時間切れの場合は選択されたカードなし
    
    // レベル5以上で時間切れの場合は相手にポイント
    if (gameState.value.level >= 5) {
      updateScore('computer')
    }
    // 時間切れ結果表示
    updateStatus('timeupResult')
    // 問題文を完全な状態に更新
    if (currentCat.value) {
      currentMessage.value = `${currentCat.value.description}\n\n${t('game.catName', { name: currentCat.value.nameJa })}`
    }
    // ゲームオーバーチェック
    if (gameState.value.score.computer >= 5) {
      updateStatus('gameOver')
      return
    }
  })

  // テキストのタイピングアニメーション
  const typeMessage = (message: string) => {
    let index = 0
    currentMessage.value = ''
    // 読み上げ開始と同時に選択可能にする
    updateStatus('selecting')

    // 説明文と猫種名を組み合わせる（改行を追加）
    const fullMessage = `${message}\n\nこの猫は「${currentCat.value?.nameJa}」です。`
    startAnswerTimer(fullMessage.length)

    const type = () => {
      if (index < fullMessage.length) {
        currentMessage.value += fullMessage[index]
        index++
        typingTimer = setTimeout(type, typingSpeed.value)
      }
    }

    type()
  }

  // 新しいラウンドの準備
  const prepareNewRound = async () => {
    // 正解していない猫から選択
    const availableCats = allCat.value.filter(cat => !correctCatIds.value.has(cat.id))
    // 利用可能な猫が6匹未満になったら一時的な使用履歴のみリセット
    let unusedCats = availableCats.filter(cat => !usedCatIds.value.has(cat.id))
    if (unusedCats.length < 6) {
      usedCatIds.value.clear()
      // 正解していない猫から再度選択
      unusedCats = availableCats
    }

    displayCat.value = selectRandom<CatBreedWithImage>(unusedCats, 6)
    currentCat.value = displayCat.value[Math.floor(Math.random() * displayCat.value.length)]
    displayCat.value.forEach(cat => usedCatIds.value.add(cat.id))

    // 状態をリセット
    revealedCardId.value = null
    correctCardId.value = null
    revealType.value = null
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
    revealType.value = 'mistake'

    const isCorrect = handleAnswer(selectedCat)
    if (isCorrect && currentCat.value) {
      correctCatIds.value.add(currentCat.value.id)
      // レベル10でクリア
      if (gameState.value.level === 10) {
        updateStatus('gameCleared')
      } else {
        updateStatus('waitingNext')
      }
    } else {
      if (!isCorrect && gameState.value.level >= 5) {
        // レベル5以上でお手つきの場合は相手にポイント
        updateScore('computer')
      }
      // お手つき結果表示
      updateStatus('mistakeResult')
    }

    // ゲームオーバーチェック
    if (gameState.value.score.computer >= 5) {
      updateStatus('gameOver')
      return
    }

    // 読み上げ中のタイマーをクリア
    if (typingTimer) {
      clearTimeout(typingTimer)
    }
    
    // 説明文全体を表示
    const fullMessage = `${currentCat.value?.description}\n\nこの猫は「${currentCat.value?.nameJa}」です。`
    currentMessage.value = fullMessage
  }

  // 次のレベルへ進む
  const handleNext = async () => {
    // 画面最上部へスクロール位置をリセット（スマホ用）
    window.scrollTo(0, 0)
    if (gameState.value.status === 'waitingNext') {
      // レベルを更新（最大10まで）
      gameState.value.level = Math.min(gameState.value.level + 1, 10)
      await prepareNewRound()
    } else {
      // 間違いや時間切れの場合は同じレベルでリトライ
      await prepareNewRound()
    }
  }

  // 初期化
  const initialize = async () => {
    await prepareNewRound()
  }

  // ゲームを中断してホームに戻る
  const handleBack = () => {
    const answer = window.confirm(t('game.confirmBack'))
    if (answer) {
      updateStatus('waiting')
      correctCatIds.value.clear()
      router.push('/')
    }
  }

  // ゲームをリスタート
  const handleRestart = () => {
    updateStatus('waiting')
    gameState.value.score.player = 0
    gameState.value.score.computer = 0
    gameState.value.level = 1
    usedCatIds.value.clear()
    correctCatIds.value.clear()
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
    revealType,
    initialize,
    handleCardSelect,
    handleBack,
    handleNext,
    handleRestart,
    prepareNewRound,
    correctCatIds
  }
}