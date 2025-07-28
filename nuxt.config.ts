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
      title: 'Yumerin - 多元學習與創作平台',
      titleTemplate: '%s - Yumerin',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
        { hid: 'description', name: 'description', content: 'Yumerin 是一個多元化的學習與創作平台，涵蓋程式設計、AI技術、醫學知識、投資理財、小說創作等多個領域。' },
        { hid: 'keywords', name: 'keywords', content: 'Yumerin, 程式設計, AI, 醫學, 投資, 小說, 學習平台, 創作, 技術分享' },
        { name: 'author', content: 'Yumerin' },
        { name: 'robots', content: 'index, follow' },
        { name: 'language', content: 'zh-TW' },
        
        // Open Graph
        { hid: 'og:type', property: 'og:type', content: 'website' },
        { hid: 'og:title', property: 'og:title', content: 'Yumerin - 多元學習與創作平台' },
        { hid: 'og:description', property: 'og:description', content: 'Yumerin 是一個多元化的學習與創作平台，涵蓋程式設計、AI技術、醫學知識、投資理財、小說創作等多個領域。' },
        { hid: 'og:url', property: 'og:url', content: 'https://yumerin.org/' },
        { hid: 'og:site_name', property: 'og:site_name', content: 'Yumerin' },
        { hid: 'og:image', property: 'og:image', content: 'https://yumerin.org/images/avatar.png' },
        { hid: 'og:image:width', property: 'og:image:width', content: '1200' },
        { hid: 'og:image:height', property: 'og:image:height', content: '630' },
        { hid: 'og:locale', property: 'og:locale', content: 'zh_TW' },
        
        // Twitter Card
        { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
        { hid: 'twitter:title', name: 'twitter:title', content: 'Yumerin - 多元學習與創作平台' },
        { hid: 'twitter:description', name: 'twitter:description', content: 'Yumerin 是一個多元化的學習與創作平台，涵蓋程式設計、AI技術、醫學知識、投資理財、小說創作等多個領域。' },
        { hid: 'twitter:image', name: 'twitter:image', content: 'https://yumerin.org/images/avatar.png' },
        
        // Apple Touch Icon
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'apple-mobile-web-app-title', content: 'Yumerin' },
        
        // Microsoft
        { name: 'msapplication-TileColor', content: '#000000' },
        { name: 'theme-color', content: '#000000' }
      ],
      link: [
        { rel: 'canonical', href: 'https://yumerin.org/' },
        { rel: 'icon', type: 'image/x-icon', href: '/images/icon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/images/icon.ico' },
        { rel: 'manifest', href: '/site.webmanifest' }
      ],
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Yumerin',
            description: 'Yumerin 是一個多元化的學習與創作平台，涵蓋程式設計、AI技術、醫學知識、投資理財、小說創作等多個領域。',
            url: 'https://yumerin.org/',
            author: {
              '@type': 'Person',
              name: 'Yumerin'
            },
            potentialAction: {
              '@type': 'SearchAction',
              target: 'https://yumerin.org/search?q={search_term_string}',
              'query-input': 'required name=search_term_string'
            }
          })
        }
      ]
    }
  },
  nitro: {
    prerender: {
      routes: [
        '/',
        '/ai',
        '/galgame',
        '/investment',
        '/learning',
        '/learning/posts',
        '/learning/quotes',
        '/medical',
        '/novels',
        '/politics',
        '/politics/thought',
        '/programming',
        '/writing',
        '/writing/insights',
        '/writing/story-anatomy'
      ]
    },
    compressPublicAssets: true
  },
  
  experimental: {
    payloadExtraction: false
  },
  
  ssr: true,
  
  runtimeConfig: {
    public: {
      siteUrl: 'https://yumerin.org'
    }
  },
  vite: {
	plugins: [
	  tailwindcss(),
	]
  },
  
  routeRules: {
    '/': { prerender: true, headers: { 'cache-control': 's-maxage=0' } },
    '/ai': { prerender: true },
    '/galgame': { prerender: true },
    '/investment': { prerender: true },
    '/learning/**': { prerender: true },
    '/medical': { prerender: true },
    '/novels': { prerender: true },
    '/politics/**': { prerender: true },
    '/programming': { prerender: true },
    '/writing/**': { prerender: true }
  },
})
