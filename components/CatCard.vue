<template>
  <div 
    class="relative aspect-square cursor-pointer transition-all duration-300"
    :class="{
      'hover:scale-105': isSelectable && !isRevealed,
      'opacity-80': !isSelectable || (isRevealed && !isCorrect && !isAnswer),
      'ring-4 ring-pink-500 ring-offset-2': isAnswer
    }"
    @click="handleClick"
  >
    <!-- 画像ローディング表示 -->
    <div 
      v-if="isLoading"
      class="absolute inset-0 bg-gray-100 rounded-lg flex items-center justify-center"
    >
      <div class="animate-spin rounded-full h-8 w-8 border-2 border-pink-500 border-t-transparent"></div>
    </div>

    <!-- 猫画像 -->
    <img 
      :src="imageUrl || ''"
      :alt="name"
      @load="isLoading = false"
      class="w-full h-full object-cover rounded-lg shadow-md"
      :class="{ 'opacity-0': isLoading }"
    />
    
    <!-- 結果表示オーバーレイ -->
    <div 
      v-if="isRevealed"
      :class="[
        'absolute inset-0 flex items-center justify-center rounded-lg transition-opacity duration-300',
        isCorrect ? 'bg-green-500/50' : isAnswer ? 'bg-pink-500/50' : 'bg-red-500/50'
      ]"
    >
      <Icon 
        :name="isCorrect ? 'heroicons:check-circle' : isAnswer ? 'heroicons:sparkles' : 'heroicons:x-circle'"
        class="w-16 h-16 text-white"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  imageUrl: string | null
  name: string
  isSelectable?: boolean
  isRevealed?: boolean
  isCorrect?: boolean
  isAnswer: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isSelectable: true,
  isRevealed: false,
  isCorrect: false,
  isAnswer: false
})

const emit = defineEmits<{
  select: []
}>()

const isLoading = ref(true)

const handleClick = () => {
  console.log('props.isSelectable', props.isSelectable)
  console.log('props.isRevealed', props.isRevealed)
  if (props.isSelectable && !props.isRevealed) {
    emit('select')
  }
}
</script>