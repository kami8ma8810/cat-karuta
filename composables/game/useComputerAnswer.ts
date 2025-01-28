import type { Ref } from 'vue'
import type { GameState } from '@/types/game'
import { COMPUTER_LEVELS } from '@/types/computer'

interface UseComputerAnswerProps {
  gameState: Ref<GameState>
  updateScore: (type: 'player' | 'computer') => void
}

export const useComputerAnswer = ({
  gameState,
  updateScore
}: UseComputerAnswerProps) => {
  const calculateWaitTime = () => {
    const level = gameState.value.level
    const { minWaitTime, maxWaitTime, interruptChance } = COMPUTER_LEVELS[level - 1]
    
    // 読み上げ途中で回答する確率計算
    if (Math.random() < interruptChance) {
      return minWaitTime
    }
    
    return maxWaitTime
  }

  let timeoutId: NodeJS.Timeout | undefined

  const startAnswerTimer = () => {
    const waitTime = calculateWaitTime()
    
    timeoutId = setTimeout(() => {
      if (gameState.value.status === 'selecting') {
        updateScore('computer')
        gameState.value.status = 'showResult'
      }
    }, waitTime)
  }

  const cancelAnswerTimer = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
  }

  return {
    startAnswerTimer,
    cancelAnswerTimer
  }
}