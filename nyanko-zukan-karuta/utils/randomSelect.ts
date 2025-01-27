import type { CatBreed } from '@/types/cat'

export const selectRandomCats = (cats: CatBreed[], count: number): CatBreed[] => {
  const copiedCats = [...cats]
  
  // Fisher-Yates シャッフルアルゴリズム
  for (let i = copiedCats.length - 1; i > 0; i--) {
    // crypto.getRandomValues() を使用してよりセキュアな乱数を生成
    const j = Math.floor(crypto.getRandomValues(new Uint32Array(1))[0] / (2 ** 32) * (i + 1))
    // 要素の入れ替え
    ;[copiedCats[i], copiedCats[j]] = [copiedCats[j], copiedCats[i]]
  }
  
  return copiedCats.slice(0, count)
}