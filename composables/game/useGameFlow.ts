// composables/game/useGameFlow.ts
import { ref } from 'vue'
import type { CatBreedWithImage } from '@/types/cat'
import { useGameState } from './useGameState'
import { usePlayerAnswer } from './usePlayerAnswer'
import { useComputerAnswer } from './useComputerAnswer'
import { selectRandom } from '~/utils/randomSelect'

export const useGameFlow = () => {
  const allCat = ref<CatBreedWithImage[]>([])
  const displayCat = ref<CatBreedWithImage[]>([])
  const currentCat = ref<CatBreedWithImage | null>(null)
  const usedCatIds = ref<Set<string>>(new Set())

  // 他のcomposablesを統合
  const { state: gameState, updateStatus, updateScore } = useGameState()
  const { handleAnswer } = usePlayerAnswer({ currentCat, gameState, updateScore })
  const { startAnswerTimer, cancelAnswerTimer } = useComputerAnswer({ gameState, updateScore })

  const prepareNewRound = () => {
    // 全ての猫が使用済みになったらリセット
    if (usedCatIds.value.size === allCat.value.length) {
      usedCatIds.value.clear()
    }

    // 未使用の猫から選択
    const unusedCats = allCat.value.filter(cat => !usedCatIds.value.has(cat.id))
    displayCat.value = selectRandom(unusedCats, 6)
    currentCat.value = displayCat.value[Math.floor(Math.random() * displayCat.value.length)]

    // 使用した猫のIDを記録
    displayCat.value.forEach(cat => usedCatIds.value.add(cat.id))
    updateStatus('reading')
  }

  const startRound = () => {
    updateStatus('selecting')
    startAnswerTimer()
  }

  return {
    gameState,
    displayCat,
    currentCat,
    handleAnswer,
    prepareNewRound,
    startRound
  }
}