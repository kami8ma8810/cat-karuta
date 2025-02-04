<template>
  <div
    class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
  >
    <div
      class="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-lg max-w-md mx-auto text-center"
    >
      <div class="mb-6">
        <Icon
          name="heroicons:trophy"
          class="w-20 h-20 text-yellow-500 mx-auto"
        />
      </div>

      <h2 class="text-2xl font-bold text-pink-800 mb-4">
        {{ t("rules.master.title") }}
      </h2>

      <p class="text-gray-700 whitespace-pre-line mb-8">
        {{ t("rules.master.message") }}
      </p>

      <div class="flex flex-col gap-4">
        <!-- SNSシェアボタン -->
        <a
          :href="twitterShareUrl"
          target="_blank"
          class="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:opacity-90 transition-opacity w-full justify-center"
        >
          <Icon name="simple-icons:x" class="w-5 h-5" />
          {{ t("rules.master.share") }}
        </a>

        <button
          @click="$emit('restart')"
          class="w-full px-4 py-2 bg-pink-700 hover:bg-pink-800 text-white rounded-lg transition-colors"
        >
          {{ t("rules.master.restart") }}
        </button>

        <button
          @click="$emit('back')"
          class="w-full px-4 py-2 bg-white text-pink-800 border-2 border-pink-600 rounded-lg hover:bg-pink-50 transition-colors"
        >
          {{ t("rules.master.back") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useRequestURL } from "#app";

const { t } = useI18n();
const baseUrl = useRequestURL().origin;
const nuxtApp = useNuxtApp();

// クリア時のOGP画像を設定
useServerSeoMeta({
  ogImage:
    process.env.NODE_ENV === "production"
      ? "https://cat-karuta.vercel.app/ogp-clear.jpg"
      : "/ogp-clear.jpg",
});

defineEmits<{
  (e: "restart"): void;
  (e: "back"): void;
}>();

const ogImageUrl = computed(() => {
  return process.env.NODE_ENV === "production"
    ? "https://cat-karuta.vercel.app/ogp-clear.jpg"
    : `${baseUrl}/ogp-clear.jpg`;
});

const twitterShareUrl = computed(() => {
  const text = t('rules.master.shareText');
  const hashtags = 'にゃんこかるた';
  
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(baseUrl)}&hashtags=${encodeURIComponent(hashtags)}`;
});

onMounted(() => {
  nuxtApp.$updateOgImage(ogImageUrl.value);
});
</script>
