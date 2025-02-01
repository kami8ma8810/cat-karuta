import { useCatApi } from './useCatApi'
import type { CatBreedWithImage } from '@/types/cat'

export const useCatData = () => {
  const { fetchCatsWithImage } = useCatApi()
  
  // キャッシュキー
  const CACHE_KEY = 'cat-karuta-data'
  const CACHE_EXPIRY_KEY = 'cat-karuta-data-expiry'
  const CACHE_DURATION = 24 * 60 * 60 * 1000 // 24時間
  
  // 猫データのキャッシュ
  const catData = useState<CatBreedWithImage[]>(CACHE_KEY, () => [])
  const isLoading = ref(false)
  const error = ref<Error | null>(null)

  // キャッシュの有効期限をチェック
  const isCacheValid = () => {
    const expiry = localStorage.getItem(CACHE_EXPIRY_KEY)
    return expiry && Number(expiry) > Date.now()
  }

  // キャッシュの保存
  const saveToCache = (data: CatBreedWithImage[]) => {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data))
    localStorage.setItem(CACHE_EXPIRY_KEY, String(Date.now() + CACHE_DURATION))
  }

  // キャッシュからの読み込み
  const loadFromCache = (): CatBreedWithImage[] | null => {
    const cached = localStorage.getItem(CACHE_KEY)
    return cached ? JSON.parse(cached) : null
  }

  // データの取得
  const fetchData = async () => {
    // メモリ内キャッシュをチェック
    if (catData.value.length > 0) {
      return catData.value
    }

    // ローカルストレージのキャッシュをチェック
    if (isCacheValid()) {
      const cached = loadFromCache()
      if (cached) {
        catData.value = cached
        return cached
      }
    }

    isLoading.value = true
    error.value = null

    try {
      const data = await fetchCatsWithImage()
      catData.value = data
      saveToCache(data)
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