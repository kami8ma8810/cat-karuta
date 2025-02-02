<script setup lang="ts">
import { useCatData } from "@/composables/useCatData";
import { useI18n } from "vue-i18n";
import { imagePositions } from "@/assets/data/imagePositions";

const { t } = useI18n();
const { catData, fetchData, isLoading, error } = useCatData();

// データ取得
onMounted(async () => {
  if (catData.value.length === 0) {
    await fetchData();
  }
});

// 猫データをあいうえお順にソート
const sortedCats = computed(() => {
  return [...catData.value].sort((a, b) =>
    a.nameJa.localeCompare(b.nameJa, "ja")
  );
});
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-pink-50 to-green-50 md:p-8 p-4">
    <!-- ヘッダー -->
    <div class="max-w-7xl mx-auto mb-8">
      <h1 class="text-3xl font-bold text-pink-800 text-center">
        {{ t("cats.title") }}
      </h1>
    </div>

    <!-- 戻るボタン -->
    <NuxtLink
      to="/"
      class="fixed md:top-8 md:left-8 md:bottom-auto bottom-4 left-[50%] -translate-x-1/2 md:translate-x-0 flex items-center gap-2 px-4 py-2 bg-pink-700 hover:bg-pink-800 backdrop-blur-sm text-white rounded-lg shadow-md transition-colors"
    >
      <Icon name="i-heroicons-arrow-left" class="w-6 h-6" />
      <span>{{ t("cats.back") }}</span>
    </NuxtLink>

    <!-- ローディング表示 -->
    <div v-if="isLoading" class="text-center py-12">
      <div
        class="animate-spin rounded-full h-12 w-12 border-4 border-pink-500 border-t-transparent mx-auto mb-4"
      ></div>
      <p class="text-pink-800">{{ t("cats.loading") }}</p>
    </div>

    <!-- エラー表示 -->
    <div v-else-if="error" class="text-center py-12">
      <p class="text-red-600">{{ t("cats.error") }}</p>
    </div>

    <!-- 猫カードグリッド -->
    <div
      v-else
      class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto"
    >
      <div
        v-for="cat in sortedCats"
        :key="cat.id"
        class="bg-white rounded-lg shadow-md overflow-hidden"
      >
        <img
          :src="cat.imageUrl || ''"
          :alt="cat.nameJa"
          class="w-full aspect-square object-cover"
          :style="{
            objectPosition: imagePositions[cat.id]
              ? `${imagePositions[cat.id]}`
              : 'center',
          }"
        />
        <div class="md:px-4 px-2 py-4">
          <h2 class="md:text-lg text-base font-bold text-pink-800">{{ cat.nameJa }}</h2>
          <p class="md:text-sm text-xs text-black mt-2 leading-5">{{ cat.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
