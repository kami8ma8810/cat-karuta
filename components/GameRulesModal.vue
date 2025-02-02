<script setup lang="ts">
import GameRules from '@/components/GameRules.vue'

defineProps<{
  show: boolean
}>()

defineEmits<{
  close: []
}>()
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="transform opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="transform opacity-0"
  >
    <div
      v-if="show"
      class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      @click.self="$emit('close')"
    >
      <GameRules @close="$emit('close')" />
    </div>
  </Transition>
</template> 