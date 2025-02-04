export default defineNuxtPlugin(() => {
  return {
    provide: {
      updateOgImage: (url: string) => {
        useHead({
          meta: [
            {
              property: 'og:image',
              content: url
            }
          ]
        })
      }
    }
  }
})