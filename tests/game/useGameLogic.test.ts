import { describe, test, expect, beforeEach, vi, afterEach } from 'vitest'
import { ref } from 'vue'
import { useGameLogic } from '@/composables/useGameLogic'
import type { CatBreedWithImage } from '@/types/cat'

// モックデータ
const mockCats: CatBreedWithImage[] = [
  {
    id: 'test-1', 
    name: 'Test Cat 1',
    nameJa: 'テスト猫1',
    description: 'テスト説明1',
    imageId: 'test-image-1',
    imageUrl: 'test-url-1'
  },
  {
    id: 'test-2',
    name: 'Test Cat 2', 
    nameJa: 'テスト猫2',
    description: 'テスト説明2',
    imageId: 'test-image-2',
    imageUrl: 'test-url-2'
  }
]

describe('useGameLogic', () => {
  beforeEach(() => {
    // windowのスクロールをモック
    vi.stubGlobal('window', {
      scrollTo: vi.fn(),
      confirm: vi.fn()
    })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  test('レベル10クリア時にゲームクリア状態になる', async () => {
    const { gameState, handleNext } = useGameLogic()
    
    // レベル10の状態を設定
    gameState.value.level = 10
    gameState.value.status = 'waitingNext'
    
    await handleNext()
    
    expect(gameState.value.status).toBe('gameCleared')
  })

  test('レベル9クリア時にレベル10に進む', async () => {
    const { gameState, handleNext } = useGameLogic()
    
    gameState.value.level = 9
    gameState.value.status = 'waitingNext'
    
    await handleNext()
    
    expect(gameState.value.level).toBe(10)
    expect(gameState.value.status).not.toBe('gameCleared')
  })

  test('間違いや時間切れの場合は同じレベルでリトライ', async () => {
    const { gameState, handleNext } = useGameLogic()
    
    const currentLevel = 5
    gameState.value.level = currentLevel
    gameState.value.status = 'mistakeResult'
    
    await handleNext()
    
    expect(gameState.value.level).toBe(currentLevel)
  })
})