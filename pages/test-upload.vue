<template>
  <div class="p-4">
    <h1 class="text-2xl mb-4">Cloudinaryアップロードテスト</h1>
    <div class="flex gap-4 mb-4">
      <button 
        @click="testUpload"
        class="bg-blue-500 text-white px-4 py-2 rounded"
        :disabled="loading"
      >
        {{ loading ? '処理中...' : 'テストアップロード' }}
      </button>
      <button 
        @click="checkImage"
        class="bg-green-500 text-white px-4 py-2 rounded"
        :disabled="loading"
      >
        アップロード済み画像を確認
      </button>
    </div>
    
    <div v-if="result" class="mt-4">
      <p class="text-green-600">{{ result.message }}</p>
      <img 
        v-if="result.url" 
        :src="result.url" 
        alt="アップロードされた画像"
        class="mt-2 max-w-xs rounded shadow"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const loading = ref(false)
const result = ref<{ success: boolean; url: string; message: string } | null>(null)

const testUpload = async () => {
  loading.value = true
  try {
    const response = await fetch('/api/test/upload')
    result.value = await response.json()
  } catch (error) {
    console.error('テストエラー:', error)
  } finally {
    loading.value = false
  }
}

const checkImage = async () => {
  loading.value = true
  try {
    const response = await fetch('/api/test/images')
    result.value = await response.json()
  } catch (error) {
    console.error('画像確認エラー:', error)
  } finally {
    loading.value = false
  }
}
</script> 