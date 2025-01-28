import { v2 as cloudinary } from 'cloudinary'

export const initCloudinary = () => {
  const config = useRuntimeConfig()
  
  // 設定値の存在確認
  if (!config.cloudinary?.cloudName || !config.cloudinary?.apiKey || !config.cloudinary?.apiSecret) {
    throw new Error('Cloudinary configuration is missing')
  }
  
  const cloudinaryConfig = {
    cloud_name: config.cloudinary.cloudName,
    api_key: config.cloudinary.apiKey,
    api_secret: config.cloudinary.apiSecret
  }
  
  console.log('Cloudinary Config:', {
    cloud_name: cloudinaryConfig.cloud_name,
    has_api_key: !!cloudinaryConfig.api_key,
    has_api_secret: !!cloudinaryConfig.api_secret
  })
  
  cloudinary.config(cloudinaryConfig)
}

export const uploadImage = async (imageUrl: string, publicId: string) => {
  try {
    initCloudinary()
    console.log('Uploading image:', { imageUrl, publicId })
    
    const result = await cloudinary.uploader.upload(imageUrl, {
      public_id: `cat-karuta/${publicId}`,
      folder: 'cat-karuta', // フォルダを明示的に指定
      overwrite: false // 既存の画像は上書きしない
    })
    
    console.log('Upload result:', result)
    return result.secure_url
  } catch (error) {
    console.error('Cloudinary upload error:', error)
    return null
  }
} 