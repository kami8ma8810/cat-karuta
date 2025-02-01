<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
    <div class="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-lg max-w-md mx-auto text-center">
      <div class="mb-6">
        <Icon name="heroicons:trophy" class="w-20 h-20 text-yellow-500 mx-auto" />
      </div>

      <h2 class="text-2xl font-bold text-pink-800 mb-4">{{ t('rules.master.title') }}</h2>
      
      <p class="text-gray-700 whitespace-pre-line mb-8">{{ t('rules.master.message') }}</p>

      <div class="space-y-4">
        <button
          @click="$emit('restart')"
          class="w-full px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
        >
          {{ t('rules.master.restart') }}
        </button>

        <button
          @click="$emit('back')"
          class="w-full px-4 py-2 bg-white text-pink-800 border-2 border-pink-600 rounded-lg hover:bg-pink-50 transition-colors"
        >
          {{ t('rules.master.back') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineEmits<{
  (e: 'restart'): void
  (e: 'back'): void
}>()
</script> 