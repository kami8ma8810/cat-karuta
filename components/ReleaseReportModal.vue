<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
    @click.self="$emit('close')"
  >
    <div class="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-lg max-w-md mx-auto">
      <h2 class="text-2xl font-bold text-pink-800 mb-4">更新情報</h2>

      <div class="space-y-6">
        <!-- v1.1.2 -->
        <div class="border-b pb-4">
          <h3 class="font-bold text-lg text-pink-800 mb-2">v1.1.2</h3>
          <p class="text-gray-700">更新情報を追加しました。バグを見つけたら X からご連絡いただけると助かります。</p>
        </div>
        <!-- v1.1.1 -->
        <div class="border-b pb-4">
          <h3 class="font-bold text-lg text-pink-800 mb-2">v1.1.1</h3>
          <p class="text-gray-700">レベル10を正解してもクリアにならないバグを修正しました。</p>
        </div>

        <!-- v1.1.0 -->
        <div class="border-b pb-4">
          <h3 class="font-bold text-lg text-pink-800 mb-2">v1.1.0</h3>
          <p class="text-gray-700">
            猫の説明文を修正しました。性格についての言及だとゲーム性にそぐわないと判断したため、見た目や歴史などの要素を元にした文章に変更しました。
          </p>
        </div>

        <!-- 既知のバグ -->
        <div>
          <h3 class="font-bold text-lg text-pink-800 mb-2">既知のバグ</h3>
          <p class="text-gray-700">
            コンピュータが得点した次の問題で、問題文がおかしくなることがあります。
          </p>
        </div>
      </div>

      <button
        @click="$emit('close')"
        class="mt-6 w-full px-4 py-2 bg-pink-700 hover:bg-pink-800 text-white rounded-lg transition-colors"
      >
        閉じる
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  show: boolean
}>()

defineEmits<{
  (e: 'close'): void
}>()
</script>