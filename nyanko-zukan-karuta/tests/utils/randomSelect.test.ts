import { describe, it, expect, vi } from 'vitest'
import { selectRandomCats } from '~/utils/randomSelect'
import { mockCats } from '~/tests/__mocks__/catBreeds'

describe('selectRandomCats', () => {
  const mockGetRandomValues = vi.fn()
  global.crypto = {
    getRandomValues: mockGetRandomValues
  } as any

  it('指定された数の猫を返すこと', () => {
    mockGetRandomValues.mockReturnValue(new Uint32Array([0]))
    const result = selectRandomCats(mockCats, 2)
    expect(result).toHaveLength(2)
  })

  it('元の配列を変更しないこと', () => {
    const originalCats = [...mockCats]
    mockGetRandomValues.mockReturnValue(new Uint32Array([0]))
    selectRandomCats(mockCats, 2)
    expect(mockCats).toEqual(originalCats)
  })

  it('重複なく選択されること', () => {
    mockGetRandomValues.mockReturnValue(new Uint32Array([0]))
    const result = selectRandomCats(mockCats, 2)
    const uniqueIds = new Set(result.map(cat => cat.id))
    expect(uniqueIds.size).toBe(2)
  })

  it('要求数が配列長を超える場合、配列長分の要素を返すこと', () => {
    mockGetRandomValues.mockReturnValue(new Uint32Array([0]))
    const result = selectRandomCats(mockCats, 5)
    expect(result).toHaveLength(mockCats.length)
  })

  it('ランダムな順序で返されること', () => {
    mockGetRandomValues
      .mockReturnValueOnce(new Uint32Array([0]))
      .mockReturnValueOnce(new Uint32Array([2 ** 31]))
      .mockReturnValueOnce(new Uint32Array([2 ** 32 - 1]))

    const result1 = selectRandomCats(mockCats, 3)
    
    mockGetRandomValues
      .mockReturnValueOnce(new Uint32Array([2 ** 32 - 1]))
      .mockReturnValueOnce(new Uint32Array([2 ** 31]))
      .mockReturnValueOnce(new Uint32Array([0]))

    const result2 = selectRandomCats(mockCats, 3)

    // 少なくとも1つの位置で異なる要素があることを確認
    const hasDifferentOrder = result1.some((cat, index) => cat.id !== result2[index].id)
    expect(hasDifferentOrder).toBe(true)
  })
}) 