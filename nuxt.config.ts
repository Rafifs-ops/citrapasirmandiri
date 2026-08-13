// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  runtimeConfig: {
    databaseUrl: process.env.DATABASE_URL || 'file:./dev.db',
    jwtAccessSecret: process.env.JWT_ACCESS_SECRET || 'dev-secret-access-key',
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || 'dev-secret-refresh-key',
    tursoDatabaseUrl: process.env.TURSO_DATABASE_URL,
    tursoAuthToken: process.env.TURSO_AUTH_TOKEN,
    nodeEnv: process.env.NODE_ENV || 'development',
    public: {}
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
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&display=swap' },
        { rel: 'icon', type: 'image/png', href: '/favicon.png' }
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