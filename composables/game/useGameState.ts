import { ref } from 'vue'
import type { GameState, GameStatus } from '@/types/game'
import { COMPUTER_LEVELS } from '@/types/computer'

export const useGameState = () => {
  const state = ref<GameState>({
    status: 'waiting',
    level: 1,
    score: { player: 0, computer: 0 },
    timeLimit: COMPUTER_LEVELS[0].maxWaitTime
  })

  const updateStatus = (newStatus: GameStatus) => {
    state.value.status = newStatus
  }

  const updateLevel = (newLevel: number) => {
    state.value.level = newLevel
    state.value.timeLimit = COMPUTER_LEVELS[newLevel - 1].maxWaitTime
  }

  const updateScore = (type: 'player' | 'computer') => {
    state.value.score[type]++
  }

  const resetScore = () => {
    state.value.score = { player: 0, computer: 0 }
  }

  return {
    state,
    updateStatus,
    updateLevel,
    updateScore,
    resetScore
  }
}