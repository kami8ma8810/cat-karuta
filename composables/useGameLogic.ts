// composables/useGameLogic.ts
import { useCatApi } from './useCatApi'
import type { CatBreedWithImage } from '@/types/cat'

export const useGameLogic = () => {
  const { fetchCatsWithImages } = useCatApi()
  
  // 全ての猫データを保持
  const allCats = ref<CatBreedWithImage[]>([])

  // 現在のゲームで表示する6匹
  const displayCats = ref<CatBreedWithImage[]>([])
  
  // 現在の問題の猫
  const currentCat = ref<CatBreedWithImage | null>(null)
  
  // 初期データの読み込み
  const initialize = async () => {
    allCats.value = await fetchCatsWithImages()
  }
  
  // 新しいラウンドの準備
  const prepareNewRound = () => {
    // ランダムに6匹選択
    const shuffled = [...allCats.value].sort(() => 0.5 - Math.random())
    displayCats.value = shuffled.slice(0, 6)
    
    // その中からランダムに1匹を問題として選択
    currentCat.value = displayCats.value[Math.floor(Math.random() * displayCats.value.length)]
  }

  return {
    displayCats,
    currentCat,
    initialize,
    prepareNewRound
  }
}