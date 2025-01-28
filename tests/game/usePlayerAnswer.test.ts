// tests/game/usePlayerAnswer.test.ts
import { describe, test, expect, vi, beforeEach } from 'vitest'
import { ref } from 'vue'
import { usePlayerAnswer } from '@/composables/game/usePlayerAnswer'
import type { CatBreedWithImage } from '@/types/cat'
import type { GameState } from '@/types/game'

describe('usePlayerAnswer', () => {
  const currentCat = ref<CatBreedWithImage>({
    id: 'test-id',
    name: 'Test Cat',
    nameJa: 'テスト猫',
    description: 'Test description',
    imageId: 'test-image-id',
    imageUrl: 'test-url'
  })

  const gameState = ref<GameState>({
    status: 'selecting',
    level: 1,
    score: { player: 0, computer: 0 },
    timeLimit: 5000
  })

  const mockUpdateScore = vi.fn()

  beforeEach(() => {
    mockUpdateScore.mockClear()
    gameState.value = {
      status: 'selecting',
      level: 1,
      score: { player: 0, computer: 0 },
      timeLimit: 5000
    }
  })

  const { handleAnswer } = usePlayerAnswer({
    currentCat,
    gameState,
    updateScore: mockUpdateScore
  })


  test('正解の場合、プレイヤーのスコアが増加する', () => {
    const result = handleAnswer(currentCat.value)
    
    expect(result).toBe(true)
    expect(mockUpdateScore).toHaveBeenCalledWith('player')
    expect(gameState.value.status).toBe('showResult')
  })

  test('不正解の場合、スコアは増加しない', () => {
    const wrongAnswer = {
      id: 'wrong-id',
      name: 'Wrong Cat',
      nameJa: '間違い猫',
      description: 'Wrong description',
      imageId: 'wrong-image-id',
      imageUrl: 'wrong-url'
    }
    
    const result = handleAnswer(wrongAnswer)
    
    expect(result).toBe(false)
    expect(mockUpdateScore).not.toHaveBeenCalled()
    expect(gameState.value.status).toBe('showResult')
  })

  test('selecting状態以外では解答を受け付けない', () => {
    gameState.value.status = 'reading'
    const result = handleAnswer(currentCat.value)
    
    expect(result).toBe(false)
    expect(mockUpdateScore).not.toHaveBeenCalled()
    expect(gameState.value.status).toBe('reading')
  })
})