import { useCatApi } from './useCatApi'
import type { CatBreedWithImage } from '@/types/cat'

export const useCatData = () => {
  const { fetchCatsWithImage } = useCatApi()
  
  // キャッシュキー
  const CACHE_KEY = 'cat-karuta-data'
  const CACHE_EXPIRY_KEY = 'cat-karuta-data-expiry'
  const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000 // 1週間
  
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

  // 画像の有効性をチェック
  const validateImage = (url: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const timeout = setTimeout(() => resolve(false), 5000)
      const img = new Image()
      img.onload = () => {
        clearTimeout(timeout)
        resolve(true)
      }
      img.onerror = () => {
        clearTimeout(timeout)
        resolve(false)
      }
      img.src = url
    })
  }

  // 画像の有効性を確認して、有効な猫のデータのみを返す
  const validateCatsWithImages = async (cats: CatBreedWithImage[]): Promise<CatBreedWithImage[]> => {
    const validationResults = await Promise.all(
      cats.map(async (cat) => {
        if (!cat.imageUrl) return null
        const isValid = await validateImage(cat.imageUrl)
        return isValid ? cat : null
      })
    )
    return validationResults.filter((cat): cat is CatBreedWithImage => cat !== null)
  }

  // データの取得
  const fetchData = async () => {
    // メモリ内キャッシュをチェック
    if (catData.value.length > 0) {
      // メモリ内キャッシュの画像を再検証
      const validData = await validateCatsWithImages(catData.value)
      if (validData.length >= 6) {
        catData.value = validData
        return validData
      }
      // 有効な画像が不足している場合は新しくデータを取得
      return catData.value
    }

    // ローカルストレージのキャッシュをチェック
    if (isCacheValid()) {
      const cached = loadFromCache()
      if (cached) {
        // キャッシュの画像を再検証
        const validData = await validateCatsWithImages(cached)
        if (validData.length >= 6) {
          catData.value = validData
          saveToCache(validData) // 有効なデータで更新
          return validData
        }
        // 有効な画像が不足している場合は新しくデータを取得
        return catData.value
      }
    }

    isLoading.value = true
    error.value = null

    try {
      const data = await fetchCatsWithImage()
      // 画像の有効性を確認
      const validData = await validateCatsWithImages(data)
      
      // 最低6匹の有効な猫データがあることを確認
      if (validData.length < 6) {
        throw new Error('有効な画像を持つ猫が不足しています')
      }
      
      catData.value = validData
      saveToCache(validData)
      return validData
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