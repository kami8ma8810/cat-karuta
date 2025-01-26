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
  <div class="min-h-screen bg-gradient-to-b from-pink-50 to-green-50 flex flex-col items-center justify-center p-4 relative">
    <!-- 背景画像 -->
    <div class="absolute inset-0 opacity-15 pointer-events-none">
      <div 
        class="w-full h-full bg-repeat bg-center" 
        :style="{ backgroundImage: `url(${bgImage})`, backgroundSize:'contain' }"
      >
      </div>
    </div>

    <div class="text-center mb-12 relative">
      <h1 class="text-4xl md:text-6xl font-bold mb-2 text-pink-800">にゃんこ図鑑かるた</h1>
    </div>

    <NuxtLink 
      to="/game"
      class="bg-pink-400 hover:bg-pink-500 text-white font-bold py-4 px-12 rounded-full text-xl md:text-3xl mb-8 transition-colors relative shadow-lg hover:shadow-xl"
    >
      はじめる
    </NuxtLink>

    <div class="fixed bottom-4 text-center">
      <a 
        href="https://twitter.com/jookalubi24" 
        target="_blank"
        rel="noopener noreferrer" 
        class="text-sm underline text-pink-700 hover:text-pink-800 md:text-lg"
      >
        開発者: 上かるび
      </a>
    </div>
  </div>
</template>