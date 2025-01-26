<script setup lang="ts">
// メタ情報
useHead({
  title: 'にゃんこ図鑑かるた',
  meta: [
    { name: 'description', content: '猫の品種を楽しく学べるカルタゲーム' }
  ]
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 flex flex-col items-center justify-center p-4 relative">
    <!-- 背景画像 -->
    <div class="absolute inset-0 opacity-50 pointer-events-none flex items-center justify-center">
      <img
        src="@/assets/images/fv_illust.png"
        alt=""
        class="w-full h-full object-contain"
      />
    </div>

    <div class="text-center mb-12 relative">
      <h1 class="text-4xl font-bold mb-2">にゃんこ図鑑かるた</h1>
    </div>

    <NuxtLink 
      to="/game"
      class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-full text-xl mb-8 transition-colors relative"
    >
      はじめる
    </NuxtLink>

    <div class="fixed bottom-4 text-center">
      <p class="mb-2 text-sm text-gray-600">© 2024 にゃんこ図鑑かるた</p>
      <a 
        href="https://twitter.com/jookalubi24" 
        target="_blank"
        rel="noopener noreferrer" 
        class="text-blue-500 hover:text-blue-600"
      >
        開発者: 上かるび
      </a>
    </div>
  </div>
</template>