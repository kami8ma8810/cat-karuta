<script setup lang="ts">
// メタ情報
useHead({
  title: 'にゃんこ図鑑かるた',
  meta: [
    { name: 'description', content: '猫の品種を楽しく学べるカルタゲーム' }
  ]
})

// 背景画像のインポート
const bgImage = new URL('../assets/images/fv_illust.png', import.meta.url).href
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 flex flex-col items-center justify-center p-4 relative">
    <!-- 背景画像 -->
    <div class="absolute inset-0 opacity-20 pointer-events-none">
      <div 
        class="w-full h-full bg-repeat bg-center" 
        :style="{ backgroundImage: `url(${bgImage})`, backgroundSize:'contain' }"
      >
      </div>
    </div>

    <div class="text-center mb-12 relative">
      <h1 class="text-4xl md:text-6xl font-bold mb-2">にゃんこ図鑑かるた</h1>
    </div>

    <NuxtLink 
      to="/game"
      class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-12 rounded-full text-xl md:text-3xl mb-8 transition-colors relative"
    >
      はじめる
    </NuxtLink>

    <div class="fixed bottom-4 text-center">
      <a 
        href="https://twitter.com/jookalubi24" 
        target="_blank"
        rel="noopener noreferrer" 
        class="text-sm underline text-gray-700 md:text-lg"
      >
        開発者: 上かるび
      </a>
    </div>
  </div>
</template>