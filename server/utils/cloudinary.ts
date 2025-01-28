import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

export const uploadImage = async (imageUrl: string, publicId: string) => {
  try {
    const result = await cloudinary.uploader.upload(imageUrl, {
      public_id: `cat-karuta/${publicId}`,
      overwrite: false // 既存の画像は上書きしない
    })
    return result.secure_url
  } catch (error) {
    console.error('Cloudinary upload error:', error)
    return null
  }
} 