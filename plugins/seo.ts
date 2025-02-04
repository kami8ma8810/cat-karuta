export default defineNuxtPlugin(() => {
  return {
    provide: {
      updateOgImage: (url: string) => {
        useSeoMeta({
          ogImage: url,
        })
      }
    }
  }
})