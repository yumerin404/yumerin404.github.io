export interface MedicalCategory {
  id: string
  name: string
  description: string
  icon: string
  color: string
  features: string[]
  buttonText: string
}

export interface MedicalArticle {
  id: number
  title: string
  description: string
  content: string
  category: string
  tags: string[]
  publishDate: string
  readTime: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  featured?: boolean
  disclaimer?: boolean
}

export interface QualityAssurance {
  title: string
  items: string[]
}

export const useMedicalContent = () => {
  // 醫療分類
  const medicalCategories: MedicalCategory[] = [
    {
      id: 'health',
      name: '健康知識',
      description: '基礎醫學知識、疾病預防、健康生活方式指導，幫助您建立正確的健康觀念，預防勝於治療。',
      icon: 'heroicons:book-open',
      color: 'blue',
      features: [
        '疾病預防與早期篩檢',
        '健康生活方式建議',
        '常見疾病認識與護理',
        '營養學基礎知識'
      ],
      buttonText: '探索健康知識'
    },
    {
      id: 'medicine',
      name: '藥物資訊',
      description: '藥物作用機制、用法用量、副作用與交互作用，協助您安全合理使用藥物，避免用藥風險。',
      icon: 'heroicons:beaker',
      color: 'green',
      features: [
        '常用藥物介紹與機制',
        '用藥安全與注意事項',
        '藥物交互作用分析',
        '副作用識別與處理'
      ],
      buttonText: '了解藥物資訊'
    },
    {
      id: 'supplement',
      name: '保健品資訊',
      description: '保健食品成分分析、功效評估、選購指南，幫助您理性選擇適合的保健產品，避免不必要花費。',
      icon: 'heroicons:sparkles',
      color: 'teal',
      features: [
        '保健品成分科學分析',
        '功效宣稱真實性評估',
        '選購指南與品質辨別',
        '使用時機與注意事項'
      ],
      buttonText: '查看保健品資訊'
    }
  ]

  // 品質保證信息
  const qualityAssurances: QualityAssurance[] = [
    {
      title: '資訊來源',
      items: [
        '同行評議的醫學期刊',
        '權威醫療機構指南',
        '臨床實證研究數據'
      ]
    },
    {
      title: '品質保證',
      items: [
        '定期更新最新資訊',
        '多重來源交叉驗證',
        '客觀中立的分析觀點'
      ]
    }
  ]

  // 醫療文章（示例）
  const medicalArticles: MedicalArticle[] = [
    {
      id: 1,
      title: '高血壓的預防與管理',
      description: '了解高血壓的成因、症狀、預防方法以及日常管理技巧，幫助維護心血管健康。',
      content: '...',
      category: 'health',
      tags: ['高血壓', '心血管', '預防', '生活方式'],
      publishDate: '2024-01-15',
      readTime: 8,
      difficulty: 'beginner',
      featured: true,
      disclaimer: true
    },
    {
      id: 2,
      title: '降血壓藥物種類與作用機制',
      description: '詳細介紹各類降血壓藥物的作用機制、適用情況和注意事項。',
      content: '...',
      category: 'medicine',
      tags: ['降血壓藥', 'ACE抑制劑', '利尿劑', '鈣通道阻滯劑'],
      publishDate: '2024-01-10',
      readTime: 12,
      difficulty: 'intermediate',
      featured: false,
      disclaimer: true
    },
    {
      id: 3,
      title: 'omega-3脂肪酸保健品選購指南',
      description: '分析omega-3的健康益處、不同形式的差異，以及如何選擇優質產品。',
      content: '...',
      category: 'supplement',
      tags: ['omega-3', '魚油', '心血管健康', '選購指南'],
      publishDate: '2024-01-05',
      readTime: 10,
      difficulty: 'beginner',
      featured: true,
      disclaimer: true
    }
  ]

  // 免責聲明內容
  const disclaimer = {
    title: '重要提醒',
    content: '本網站提供的資訊僅供參考，不能替代專業醫療建議、診斷或治療。如有健康問題，請諮詢合格的醫療專業人員。任何醫療決定都應在醫師指導下進行。'
  }

  // 按分類獲取文章
  const getArticlesByCategory = (categoryId: string) => {
    return medicalArticles.filter(article => article.category === categoryId)
  }

  // 獲取特色文章
  const getFeaturedArticles = () => {
    return medicalArticles.filter(article => article.featured)
  }

  // 按難度篩選文章
  const getArticlesByDifficulty = (difficulty: MedicalArticle['difficulty']) => {
    return medicalArticles.filter(article => article.difficulty === difficulty)
  }

  // 按標籤搜索文章
  const searchArticlesByTag = (tag: string) => {
    return medicalArticles.filter(article => 
      article.tags.some(t => t.toLowerCase().includes(tag.toLowerCase()))
    )
  }

  // 搜索文章
  const searchArticles = (query: string) => {
    const lowercaseQuery = query.toLowerCase()
    return medicalArticles.filter(article => 
      article.title.toLowerCase().includes(lowercaseQuery) ||
      article.description.toLowerCase().includes(lowercaseQuery) ||
      article.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    )
  }

  // 獲取最新文章
  const getLatestArticles = (limit: number = 5) => {
    return medicalArticles
      .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
      .slice(0, limit)
  }

  // 添加新文章
  const addArticle = (article: Omit<MedicalArticle, 'id'>) => {
    const newArticle: MedicalArticle = {
      ...article,
      id: Math.max(...medicalArticles.map(a => a.id)) + 1
    }
    medicalArticles.push(newArticle)
    return newArticle
  }

  // 獲取分類統計
  const getCategoryStats = () => {
    return medicalCategories.map(category => ({
      ...category,
      articleCount: getArticlesByCategory(category.id).length,
      featuredCount: getArticlesByCategory(category.id).filter(a => a.featured).length
    }))
  }

  // 獲取所有標籤
  const getAllTags = () => {
    const allTags = medicalArticles.flatMap(article => article.tags)
    return [...new Set(allTags)]
  }

  // 獲取統計信息
  const getStats = () => {
    return {
      totalArticles: medicalArticles.length,
      totalCategories: medicalCategories.length,
      totalTags: getAllTags().length,
      featuredCount: medicalArticles.filter(article => article.featured).length,
      totalReadTime: medicalArticles.reduce((sum, article) => sum + article.readTime, 0)
    }
  }

  return {
    medicalCategories: readonly(ref(medicalCategories)),
    qualityAssurances: readonly(ref(qualityAssurances)),
    medicalArticles: readonly(ref(medicalArticles)),
    disclaimer: readonly(ref(disclaimer)),
    getArticlesByCategory,
    getFeaturedArticles,
    getArticlesByDifficulty,
    searchArticlesByTag,
    searchArticles,
    getLatestArticles,
    addArticle,
    getCategoryStats,
    getAllTags,
    getStats
  }
}