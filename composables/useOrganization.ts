export const useOrganization = () => {
  const runtimeConfig = useRuntimeConfig()
  
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '夢鈴領域',
    alternateName: 'Yumerin',
    url: runtimeConfig.public.siteUrl,
    logo: `${runtimeConfig.public.siteUrl}/images/avatar.png`,
    description: 'Yumerin 是一個多元化的學習與創作平台，涵蓋程式設計、AI技術、醫學知識、投資理財、小說創作等多個領域。',
    foundingDate: '2025',
    founder: {
      '@type': 'Person',
      name: 'Yumerin'
    },
    sameAs: [
      // 可以添加社交媒體連結
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      url: runtimeConfig.public.siteUrl
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'TW'
    },
    knowsAbout: [
      '程式設計',
      'AI技術', 
      '醫學知識',
      '投資理財',
      '小說創作',
      'Galgame',
      '政治思考',
      '寫作創作'
    ],
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': runtimeConfig.public.siteUrl
    }
  }
  
  // 創作者 Profile
  const creatorSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Yumerin',
    alternateName: '夢鈴',
    url: runtimeConfig.public.siteUrl,
    image: `${runtimeConfig.public.siteUrl}/images/avatar.png`,
    description: '多領域學習者與創作者，專注於技術分享、知識整理與創意寫作',
    knowsAbout: [
      '程式設計',
      '人工智能', 
      '醫學知識',
      '投資理財',
      '小說創作',
      'Galgame',
      '政治思想',
      '創意寫作'
    ],
    worksFor: {
      '@type': 'Organization',
      name: '夢鈴領域',
      url: runtimeConfig.public.siteUrl
    }
  }
  
  return {
    organizationSchema,
    creatorSchema
  }
}