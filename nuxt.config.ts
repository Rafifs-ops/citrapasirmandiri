// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/sitemap',
    '@pinia/nuxt'
  ],
  site: {
    url: 'https://citrapasirmandiri.vercel.app',
    name: 'PT Citra Pasirmandiri'
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'id'
      },
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&display=swap' }
      ]
    }
  },
  nitro: {
    storage: {
      images: {
        driver: 'fs',
        base: './storage' // Menghubungkan ke folder /storage di root
      }
    }
  }
})