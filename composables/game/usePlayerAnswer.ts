import type { Ref } from 'vue'
import type { CatBreedWithImage } from '@/types/cat'
import type { GameState } from '@/types/game'

interface UsePlayerAnswerProps {
  currentCat: Ref<CatBreedWithImage | null>
  gameState: Ref<GameState>
  updateScore: (type: 'player' | 'computer') => void
}

export const usePlayerAnswer = ({
  currentCat,
  gameState,
  updateScore
}: UsePlayerAnswerProps) => {
  const handleAnswer = (selectedCat: CatBreedWithImage): boolean => {
    if (gameState.value.status !== 'selecting') return false

    const isCorrect = selectedCat.id === currentCat.value?.id
    if (isCorrect) updateScore('player')

    gameState.value.status = 'showResult'
    return isCorrect
  }

  return {
    handleAnswer
  }
}