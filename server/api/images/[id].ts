import { uploadImage } from '~/server/utils/cloudinary'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const config = useRuntimeConfig()
  
  try {
    // まずCloudinaryに既に保存されているか確認
    const cloudinaryUrl = `https://res.cloudinary.com/${config.cloudinary.cloudName}/image/upload/cat-karuta/${id}`
    const checkResponse = await fetch(cloudinaryUrl, { method: 'HEAD' })
    
    if (checkResponse.ok) {
      return { url: cloudinaryUrl }
    }

    // The Cat APIから画像を取得
    const catApiResponse = await fetch(`https://api.thecatapi.com/v1/images/${id}`, {
      headers: { 'x-api-key': config.catApiKey }
    })

    if (!catApiResponse.ok) {
      throw new Error(`Failed to fetch from Cat API: ${catApiResponse.status}`)
    }

    const data = await catApiResponse.json()
    
    // Cloudinaryにアップロード
    const uploadedUrl = await uploadImage(data.url, id)
    if (!uploadedUrl) {
      throw new Error('Failed to upload to Cloudinary')
    }

    return { url: uploadedUrl }
  } catch (error) {
    console.error('Image fetch error:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch image'
    })
  }
}) 