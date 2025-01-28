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

  const fetchBreedImage = async (imageId: string): Promise<string | null> => {
    if (!imageId) return null

    try {
      const response = await fetch(`${BASE_URL}/images/${imageId}`, {
        headers: { 'x-api-key': API_KEY }
      })

      if (!response.ok) {
        const error = await response.json() as ApiError
        throw new Error(error.message)
      }

      const data = await response.json() as ApiImage
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