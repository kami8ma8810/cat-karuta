import { describe, it, expect, vi } from 'vitest'
import { selectRandomCat } from '~/utils/randomSelect'
import { mockCat } from '~/tests/__mocks__/catBreed'

describe('selectRandomCat', () => {
  const mockGetRandomValue = vi.fn()
  global.crypto = {
    getRandomValues: mockGetRandomValue
  } as any

  it('指定された数の猫を返すこと', () => {
    mockGetRandomValue.mockReturnValue(new Uint32Array([0]))
    const result = selectRandomCat(mockCat, 2)
    expect(result).toHaveLength(2)
  })

  it('元の配列を変更しないこと', () => {
    const originalCats = [...mockCat]
    mockGetRandomValue.mockReturnValue(new Uint32Array([0]))
    selectRandomCat(mockCat, 2)
    expect(mockCat).toEqual(originalCats)
  })

  it('重複なく選択されること', () => {
    mockGetRandomValue.mockReturnValue(new Uint32Array([0]))
    const result = selectRandomCat(mockCat, 2)
    const uniqueIds = new Set(result.map(cat => cat.id))
    expect(uniqueIds.size).toBe(2)
  })

  it('要求数が配列長を超える場合、配列長分の要素を返すこと', () => {
    mockGetRandomValue.mockReturnValue(new Uint32Array([0]))
    const result = selectRandomCat(mockCat, 5)
    expect(result).toHaveLength(mockCat.length)
  })

  it('ランダムな順序で返されること', () => {
    mockGetRandomValue
      .mockReturnValueOnce(new Uint32Array([0]))
      .mockReturnValueOnce(new Uint32Array([2 ** 31]))
      .mockReturnValueOnce(new Uint32Array([2 ** 32 - 1]))

    const result1 = selectRandomCat(mockCat, 3)
    
    mockGetRandomValue
      .mockReturnValueOnce(new Uint32Array([2 ** 32 - 1]))
      .mockReturnValueOnce(new Uint32Array([2 ** 31]))
      .mockReturnValueOnce(new Uint32Array([0]))

    const result2 = selectRandomCat(mockCat, 3)

    // 少なくとも1つの位置で異なる要素があることを確認
    const hasDifferentOrder = result1.some((cat, index) => cat.id !== result2[index].id)
    expect(hasDifferentOrder).toBe(true)
  })
}) 