<template>
  <div
    class="relative aspect-square transition-all duration-300"
    :class="{
      'cursor-pointer': isSelectable && !isRevealed && !isAnswer}"
    @click="handleClick"
  >
    <!-- 画像ローディング表示 -->
    <div
      v-if="isLoading"
      class="absolute inset-0 bg-gray-100 rounded-lg flex items-center justify-center"
    >
      <div
        class="animate-spin rounded-full h-8 w-8 border-2 border-pink-500 border-t-transparent"
      ></div>
    </div>

    <!-- 猫画像 -->
    <img
      :src="imageUrl || ''"
      :alt="name"
      @load="isLoading = false"
      class="w-full h-full object-cover rounded-lg shadow-md"
    />

    <!-- 猫種名表示オーバーレイ -->
    <div
      v-if="showBreedName"
      class="absolute z-10 inset-0 flex items-end justify-center"
    >
      <div class="text-center p-2 w-full bg-black rounded-lg">
        <p class="text-sm font-bold text-white">{{ name }}</p>
      </div>
    </div>

    <!-- 結果表示オーバーレイ -->
    <div
      v-if="isRevealed || isAnswer"
      :class="[
        'absolute inset-0 flex items-center justify-center rounded-lg',
        isCorrect
          ? 'bg-green-500/40'
          : isAnswer
          ? 'bg-green-500/40'
          : 'bg-red-500/40',
      ]"
    >
      <Icon
        :name="
          isCorrect
            ? 'heroicons:check-circle'
            : isAnswer
            ? 'heroicons:check-circle'
            : 'heroicons:x-circle'
        "
        class="w-16 h-16 text-white z-10"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  imageUrl: string | null;
  name: string;
  isSelectable?: boolean;
  isRevealed?: boolean;
  isCorrect?: boolean;
  isAnswer: boolean;
  revealType?: "mistake" | "timeup" | null;
  gameStatus?: string;
}

const props = withDefaults(defineProps<Props>(), {
  isSelectable: true,
  isRevealed: false,
  isCorrect: false,
  isAnswer: false,
  revealType: null,
  gameStatus: '',
});

const showBreedName = computed(() => props.gameStatus === 'waitingNext');

const emit = defineEmits<{
  select: [];
}>();

const isLoading = ref(true);

const handleClick = () => {
  // 正解表示後やカード表示後はクリックを無効化
  if (props.isSelectable && !props.isRevealed && !props.isAnswer) {
    emit("select");
  }
};
</script>
