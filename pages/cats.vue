<script setup lang="ts">
import { useCatData } from '@/composables/useCatData'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { catData, fetchData, isLoading, error } = useCatData()

// データ取得
onMounted(async () => {
  if (catData.value.length === 0) {
    await fetchData()
  }
})

// 猫データをあいうえお順にソート
const sortedCats = computed(() => {
  return [...catData.value].sort((a, b) => 
    a.nameJa.localeCompare(b.nameJa, 'ja')
  )
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-pink-50 to-green-50 p-8">
    <!-- ヘッダー -->
    <div class="max-w-7xl mx-auto mb-8">
        <h1 class="text-3xl font-bold text-pink-800 text-center">{{ t('cats.title') }}</h1>
        <NuxtLink
          to="/"
          class="fixed top-8 left-8 flex items-center gap-2 px-4 py-2 bg-white backdrop-blur-sm text-pink-800 rounded-lg shadow-md"
        >
          <Icon name="i-heroicons-arrow-left" class="w-6 h-6" />
          <span>{{ t('cats.back') }}</span>
        </NuxtLink>
    </div>

    <!-- ローディング表示 -->
    <div v-if="isLoading" class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-4 border-pink-500 border-t-transparent mx-auto mb-4"></div>
      <p class="text-pink-800">{{ t('cats.loading') }}</p>
    </div>

    <!-- エラー表示 -->
    <div v-else-if="error" class="text-center py-12">
      <p class="text-red-600">{{ t('cats.error') }}</p>
    </div>

    <!-- 猫カードグリッド -->
    <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
      <div
        v-for="cat in sortedCats"
        :key="cat.id"
        class="bg-white rounded-lg shadow-md overflow-hidden"
      >
        <img
          :src="cat.imageUrl || ''"
          :alt="cat.nameJa"
          class="w-full aspect-square object-cover"
          :class="cat.id === 'beng' ? 'object-right' : 'object-left'"
        />
        <div class="p-4">
          <h2 class="text-lg font-bold text-pink-800">{{ cat.nameJa }}</h2>
          <p class="text-sm text-gray-600 mt-2">{{ cat.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template> 