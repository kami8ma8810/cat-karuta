import { uploadImage } from '~/server/utils/cloudinary'

export default defineEventHandler(async (event) => {
  try {
    // 設定値の確認
    const config = useRuntimeConfig()
    console.log('Runtime config:', {
      cloudName: config.cloudinary.cloudName,
      hasApiKey: !!config.cloudinary.apiKey,
      hasApiSecret: !!config.cloudinary.apiSecret
    })

    // より信頼性の高いテスト画像URL
    const testImageUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png'
    console.log('Starting upload test with:', testImageUrl)
    
    const uploadedUrl = await uploadImage(testImageUrl, 'test-cat-001')
    
    if (!uploadedUrl) {
      throw new Error('アップロードURLが取得できませんでした')
    }

    return {
      success: true,
      url: uploadedUrl,
      message: 'アップロード成功！'
    }
  } catch (error) {
    // エラー詳細をログに出力
    console.error('Upload test error details:', error)

    throw createError({
      statusCode: 500,
      message: `アップロードテストに失敗: ${error.message}`
    })
  }
}) 