import { useCatApi } from './useCatApi'
import type { CatBreedWithImage } from '@/types/cat'

export const useCatData = () => {
  const { fetchCatsWithImage } = useCatApi()
  
  // キャッシュキー
  const CACHE_KEY = 'cat-karuta-data'
  
  // 猫データのキャッシュ
  const catData = useState<CatBreedWithImage[]>(CACHE_KEY, () => [])
  const isLoading = ref(false)
  const error = ref<Error | null>(null)

  // データの取得
  const fetchData = async () => {
    if (catData.value.length > 0) {
      return catData.value
    }

    isLoading.value = true
    error.value = null

    try {
      const data = await fetchCatsWithImage()
      catData.value = data
      return data
    } catch (e) {
      error.value = e instanceof Error ? e : new Error('データの取得に失敗しました')
      throw error.value
    } finally {
      isLoading.value = false
    }
  }

  return {
    catData,
    isLoading,
    error,
    fetchData
  }
} 