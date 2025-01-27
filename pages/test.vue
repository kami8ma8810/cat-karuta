<!-- pages/test.vue -->
<template>
  <div class="p-4 max-w-4xl mx-auto">
    <h1 class="text-2xl mb-4">Cat API Test</h1>

    <!-- ローディング表示 -->
    <div v-if="loading" class="flex justify-center items-center h-32">
      <div
        class="animate-spin rounded-full h-8 w-8 border-2 border-pink-500 border-t-transparent"
      ></div>
    </div>

    <!-- 猫種一覧 -->
    <div v-else class="grid gap-6">
      <div
        v-for="breed in breeds"
        :key="breed.id"
        class="bg-white rounded-lg shadow p-4"
      >
        <div class="mb-2">
          <h2 class="text-xl font-bold text-pink-800">
            {{ breed.nameJa }} ({{ breed.name }})
          </h2>
          <p class="text-gray-600">ID: {{ breed.id }}</p>
        </div>
        <p class="mb-4 text-gray-700">{{ breed.description }}</p>

        <!-- 画像表示 -->
        <div v-if="breedImages[breed.id]" class="aspect-video relative">
          <img
            :src="breedImages[breed.id]"
            :alt="breed.nameJa"
            class="rounded-lg object-cover w-full h-full"
          />
        </div>
        <div
          v-else
          class="h-40 bg-gray-100 rounded-lg flex items-center justify-center"
        >
          画像読み込み中...
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { fetchBreeds, fetchBreedImage } = useCatApi();
const breeds = ref([]);
const breedImages = ref({});
const loading = ref(true);

onMounted(async () => {
  // 猫種データの取得
  breeds.value = await fetchBreeds();
  loading.value = false;

  // 各猫種の画像を取得
  for (const breed of breeds.value) {
    if (breed.imageId) {
      const imageUrl = await fetchBreedImage(breed.imageId);
      if (imageUrl) {
        breedImages.value[breed.id] = imageUrl;
      }
    }
  }
});
</script>
