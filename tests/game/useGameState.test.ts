import { describe, test, expect, beforeEach } from 'vitest'
import { useGameState } from '@/composables/game/useGameState'
import { COMPUTER_LEVELS } from '@/types/computer'

describe('useGameState', () => {
  const { state, updateStatus, updateLevel, updateScore, resetScore } = useGameState()

  beforeEach(() => {
    state.value = {
      status: 'waiting',
      level: 1,
      score: { player: 0, computer: 0 },
      timeLimit: COMPUTER_LEVELS[0].maxWaitTime
    }
  })

  test('初期状態が正しい', () => {
    expect(state.value.status).toBe('waiting')
    expect(state.value.level).toBe(1)
    expect(state.value.score).toEqual({ player: 0, computer: 0 })
  })

  test('ステータスを更新できる', () => {
    updateStatus('reading')
    expect(state.value.status).toBe('reading')
  })

  test('レベルを更新すると制限時間も更新される', () => {
    updateLevel(2)
    expect(state.value.level).toBe(2)
    expect(state.value.timeLimit).toBe(COMPUTER_LEVELS[1].maxWaitTime)
  })

  test('スコアを更新できる', () => {
    updateScore('player')
    expect(state.value.score.player).toBe(1)
    expect(state.value.score.computer).toBe(0)

    updateScore('computer')
    expect(state.value.score.computer).toBe(1)
  })

  test('スコアをリセットできる', () => {
    updateScore('player')
    updateScore('computer')
    resetScore()
    expect(state.value.score).toEqual({ player: 0, computer: 0 })
  })
})