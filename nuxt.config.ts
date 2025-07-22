import tailwindcss from "@tailwindcss/vite";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  app: {
    baseURL: '/',
    head: {
      link: [
        { rel: 'canonical', href: 'https://yumerin.org/' }
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
