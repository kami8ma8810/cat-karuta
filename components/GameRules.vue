<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import exampleGameImage from 'assets/image/example_game.png'

const { t } = useI18n()

defineEmits<{
  (e: 'close'): void
}>()
</script> 

<template>
  <div class="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-lg max-w-2xl mx-auto">
    <h2 class="text-2xl font-bold text-pink-800 mb-4">{{ t('rules.title') }}</h2>
    
    <div class="space-y-4">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 flex-shrink-0 bg-pink-100 rounded-full flex items-center justify-center">
          <span class="text-pink-800 font-bold">1</span>
        </div>
        <p class="text-gray-700">{{ t('rules.step2') }}</p>
      </div>

      <div class="flex items-center gap-3">
        <div class="w-8 h-8 flex-shrink-0 bg-pink-100 rounded-full flex items-center justify-center">
          <span class="text-pink-800 font-bold">2</span>
        </div>
        <p class="text-gray-700">{{ t('rules.step3') }}</p>
      </div>

      <div class="flex items-center gap-3">
        <div class="w-8 h-8 flex-shrink-0 bg-pink-100 rounded-full flex items-center justify-center">
          <span class="text-pink-800 font-bold">3</span>
        </div>
        <p class="text-gray-700">{{ t('rules.step4') }}</p>
      </div>

      <div class="flex items-center gap-3">
        <div class="w-8 h-8 flex-shrink-0 bg-pink-100 rounded-full flex items-center justify-center">
          <span class="text-pink-800 font-bold">4</span>
        </div>
        <p class="text-gray-700">{{ t('rules.step5') }}</p>
      </div>

      <div class="flex items-center gap-3">
        <div class="w-8 h-8 flex-shrink-0 bg-pink-100 rounded-full flex items-center justify-center">
          <span class="text-pink-800 font-bold">5</span>
        </div>
        <p class="text-gray-700">{{ t('rules.step6') }}</p>
      </div>
    </div>

    <div class="mt-6 p-4 bg-pink-50 rounded-lg">
      <h3 class="font-bold text-pink-800 mb-2">{{ t('rules.tips') }}</h3>
      <ul class="list-disc list-inside text-gray-700 space-y-2">
        <li>{{ t('rules.tip1') }}</li>
      </ul>
    </div>

    <button
      @click="$emit('close')"
      class="mt-6 w-full px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
    >
      {{ t('rules.understood') }}
    </button>
  </div>
</template>