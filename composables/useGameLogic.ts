import { useCatApi } from './useCatApi'
import type { CatBreedWithImage } from '@/types/cat'
import { selectRandom } from '@/utils/randomSelect'

export const useGameLogic = () => {
  const { fetchCatsWithImage } = useCatApi()

  const allCat = ref<CatBreedWithImage[]>([])
  const usedCatIds = ref<Set<string>>(new Set())
  const displayCat = ref<CatBreedWithImage[]>([])
  const currentCat = ref<CatBreedWithImage | null>(null)
  const score = ref({
    player: 0,
    computer: 0,
  })
  const level = ref(1)
  const gameState = ref<'waiting' | 'reading' | 'selecting' | 'result'>('waiting')

  const initialize = async () => {
    allCat.value = await fetchCatsWithImage()
  }
  const prepareNewRound = () => {
    if (usedCatIds.value.size === allCat.value.length) {
      usedCatIds.value.clear()
    }
     // 未使用の猫から選択
    const unusedCats = allCat.value.filter(cat => !usedCatIds.value.has(cat.id))
    displayCat.value = selectRandom<CatBreedWithImage>(unusedCats, 6)
    currentCat.value = displayCat.value[Math.floor(Math.random() * displayCat.value.length)]
    // 使用した猫のIDを記録
    displayCat.value.forEach(cat => usedCatIds.value.add(cat.id))
    gameState.value = 'reading'
  }

  return {
    displayCat,
    currentCat,
    initialize,
    prepareNewRound
  }
}