import { catBreed } from '@/assets/data/catBreed'
import type { 
  CatBreed, 
  CatBreedWithImage, 
  CatBreedTranslation, 
  ApiBreed, 
  ApiImage, 
  ApiError 
} from '@/types/cat'

export const useCatApi = () => {
  const config = useRuntimeConfig()
  const API_KEY = config.public.catApiKey
  const BASE_URL = 'https://api.thecatapi.com/v1'

  const breedTranslation: Record<string, CatBreedTranslation> = catBreed

  const handleApiError = (error: unknown): never => {
    console.error('API Error:', error)
    throw error instanceof Error ? error : new Error('Unknown API error')
  }

  const fetchBreed = async (): Promise<CatBreed[]> => {
    try {
      const response = await fetch(`${BASE_URL}/breeds`, {
        headers: { 'x-api-key': API_KEY }
      })
      
      if (!response.ok) {
        const error = await response.json() as ApiError
        throw new Error(error.message)
      }

      const data = await response.json() as ApiBreed[]

      return data
        .filter((breed: ApiBreed) => breedTranslation[breed.id])
        .map((breed: ApiBreed): CatBreed => ({
          id: breed.id,
          name: breed.name,
          nameJa: breedTranslation[breed.id].nameJa,
          description: breedTranslation[breed.id].descriptionJa,
          imageId: breed.reference_image_id
        }))
    } catch (error) {
      return handleApiError(error)
    }
  }

  const fetchWithRetry = async (url: string, retries = 3, delay = 1000): Promise<Response> => {
    const options: RequestInit = {
      headers: { 
        'x-api-key': API_KEY,
      },
      mode: 'cors',
      credentials: 'omit'
    }

    try {
      const response = await fetch(url, options)
      
      if (response.status === 429 && retries > 0) {
        const retryAfter = response.headers.get('Retry-After')
        const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : delay
        
        await new Promise(resolve => setTimeout(resolve, waitTime))
        return fetchWithRetry(url, retries - 1, delay * 2)
      }
      
      return response
    } catch (error) {
      if (retries > 0) {
        await new Promise(resolve => setTimeout(resolve, delay))
        return fetchWithRetry(url, retries - 1, delay * 2)
      }
      throw error
    }
  }

  const fetchBreedImage = async (imageId: string): Promise<string | null> => {
    if (!imageId) return null

    try {
      const response = await fetch(`/api/images/${imageId}`)
      
      if (!response.ok) {
        console.error(`Image fetch failed: ${response.status}`)
        return null
      }

      const data = await response.json()
      return data.url
    } catch (error) {
      console.error('Error fetching breed image:', error)
      return null
    }
  }

  const fetchCatsWithImage = async (): Promise<CatBreedWithImage[]> => {
    try {
      const breeds = await fetchBreed()
      const breedsWithImages = await Promise.all(
        breeds.map(async (breed: CatBreed): Promise<CatBreedWithImage> => {
          const imageUrl = await fetchBreedImage(breed.imageId)
          return {
            ...breed,
            imageUrl
          }
        })
      )
      return breedsWithImages
    } catch (error) {
      return handleApiError(error)
    }
  }

  return {
    fetchBreed,
    fetchBreedImage,
    fetchCatsWithImage
  }
}