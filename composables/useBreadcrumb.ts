interface BreadcrumbItem {
  name: string
  href: string
}

export const useBreadcrumb = (customItems?: BreadcrumbItem[]) => {
  const route = useRoute()
  const runtimeConfig = useRuntimeConfig()
  
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (customItems) return customItems
    
    const pathSegments = route.path.split('/').filter(segment => segment)
    const breadcrumbs: BreadcrumbItem[] = [
      { name: '首頁', href: '/' }
    ]
    
    const pathMap: Record<string, string> = {
      'ai': 'AI 技術',
      'programming': '程式設計',
      'medical': '醫學知識',
      'investment': '投資理財',
      'novels': '小說創作',
      'galgame': 'Galgame',
      'politics': '政治思考',
      'writing': '寫作創作',
      'learning': '學習資源',
      'posts': '文章',
      'quotes': '名言佳句',
      'thought': '思想',
      'insights': '洞察',
      'story-anatomy': '故事解剖'
    }
    
    let currentPath = ''
    pathSegments.forEach(segment => {
      currentPath += `/${segment}`
      const name = pathMap[segment] || segment
      breadcrumbs.push({
        name,
        href: currentPath
      })
    })
    
    return breadcrumbs
  }
  
  const breadcrumbs = generateBreadcrumbs()
  
  // 生成結構化資料
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${runtimeConfig.public.siteUrl}${item.href}`
    }))
  }
  
  // 添加到頁面 head
  useHead({
    script: [{
      type: 'application/ld+json',
      innerHTML: JSON.stringify(breadcrumbJsonLd)
    }]
  })
  
  return {
    breadcrumbs,
    breadcrumbJsonLd
  }
}