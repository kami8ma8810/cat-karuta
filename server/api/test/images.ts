export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const cloudName = config.cloudinary.cloudName

  try {
    // テスト用の画像パス
    const imagePath = 'cat-karuta/test-cat-001'
    const imageUrl = `https://res.cloudinary.com/${cloudName}/image/upload/${imagePath}`

    // 画像の存在確認
    const response = await fetch(imageUrl, { method: 'HEAD' })
    
    if (!response.ok) {
      throw new Error('画像が見つかりません')
    }

    return {
      success: true,
      url: imageUrl,
      message: '画像の取得に成功しました'
    }
  } catch (error: unknown) {
    console.error('Image fetch error:', error)
    throw createError({
      statusCode: 500,
      message: `画像の取得に失敗: ${error instanceof Error ? error.message : '不明なエラー'}`
    })
  }
}) 