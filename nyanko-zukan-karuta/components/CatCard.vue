<template>
  <div 
    class="relative aspect-square cursor-pointer transition-all duration-200"
    :class="{
      'hover:scale-105': isSelectable,
      'opacity-50': isRevealed && !isCorrect
    }"
    @click="handleClick"
  >
    <img 
      :src="imageUrl" 
      :alt="name"
      class="w-full h-full object-cover rounded-lg shadow-md"
    />
    
    <!-- 結果表示オーバーレイ -->
    <div 
      v-if="isRevealed"
      :class="[
        'absolute inset-0 flex items-center justify-center rounded-lg',
        isCorrect ? 'bg-green-500/50' : 'bg-red-500/50'
      ]"
    >
      <Icon 
        :name="isCorrect ? 'heroicons:check-circle' : 'heroicons:x-circle'"
        class="w-16 h-16 text-white"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  imageUrl: string
  name: string
  isSelectable?: boolean
  isRevealed?: boolean
  isCorrect?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isSelectable: true,
  isRevealed: false,
  isCorrect: false
})

const emit = defineEmits<{
  select: []
}>()

const handleClick = () => {
  if (props.isSelectable) {
    emit('select')
  }
}
</script>