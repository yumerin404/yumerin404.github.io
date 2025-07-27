interface SEOData {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: string
  keywords?: string
  author?: string
}

export const useSEO = (data: SEOData = {}) => {
  const runtimeConfig = useRuntimeConfig()
  const route = useRoute()
  
  const defaultData = {
    title: 'Yumerin - 多元學習與創作平台',
    description: 'Yumerin 是一個多元化的學習與創作平台，涵蓋程式設計、AI技術、醫學知識、投資理財、小說創作等多個領域。',
    image: `${runtimeConfig.public.siteUrl}/images/avatar.png`,
    url: `${runtimeConfig.public.siteUrl}${route.path}`,
    type: 'website',
    keywords: 'Yumerin, 程式設計, AI, 醫學, 投資, 小說, 學習平台, 創作, 技術分享',
    author: 'Yumerin'
  }

  const seoData = { ...defaultData, ...data }

  useHead({
    title: seoData.title,
    meta: [
      { hid: 'description', name: 'description', content: seoData.description },
      { hid: 'keywords', name: 'keywords', content: seoData.keywords },
      { hid: 'author', name: 'author', content: seoData.author },
      
      { hid: 'og:type', property: 'og:type', content: seoData.type },
      { hid: 'og:title', property: 'og:title', content: seoData.title },
      { hid: 'og:description', property: 'og:description', content: seoData.description },
      { hid: 'og:image', property: 'og:image', content: seoData.image },
      { hid: 'og:url', property: 'og:url', content: seoData.url },
      
      { hid: 'twitter:title', name: 'twitter:title', content: seoData.title },
      { hid: 'twitter:description', name: 'twitter:description', content: seoData.description },
      { hid: 'twitter:image', name: 'twitter:image', content: seoData.image }
    ],
    link: [
      { rel: 'canonical', href: seoData.url }
    ]
  })

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': seoData.type === 'article' ? 'Article' : 'WebPage',
    name: seoData.title,
    description: seoData.description,
    url: seoData.url,
    image: seoData.image,
    author: {
      '@type': 'Person',
      name: seoData.author
    },
    publisher: {
      '@type': 'Organization',
      name: 'Yumerin',
      url: runtimeConfig.public.siteUrl
    }
  }

  useHead({
    script: [{
      type: 'application/ld+json',
      innerHTML: JSON.stringify(jsonLd)
    }]
  })

  return {
    seoData,
    jsonLd
  }
}