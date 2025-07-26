import tailwindcss from "@tailwindcss/vite";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxt/icon'],
  css: ['~/assets/css/main.css'],
  ui: {
    fonts: false
  },
  icon: {
    serverBundle: 'local'
  },
  app: {
    baseURL: '/',
    head: {
      link: [
        { rel: 'canonical', href: 'https://yumerin.org/' },
        { rel: 'icon', type: 'image/x-icon', href: '/images/icon.ico' }
      ]
    }
  },
  nitro: {
    prerender: {
      routes: ['/']
    }
  },
  vite: {
	plugins: [
	  tailwindcss(),
	],
  },
})
