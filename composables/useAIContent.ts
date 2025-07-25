export interface AITechnology {
  name: string
  color: string
  category?: string
  description?: string
}

export interface AIFeature {
  title: string
  description: string
  icon: string
  color: string
  status?: 'planned' | 'development' | 'coming-soon'
}

export interface AIArticle {
  id: number
  title: string
  description: string
  content: string
  category: string
  tags: string[]
  publishDate: string
  readTime: number
  featured?: boolean
}

export const useAIContent = () => {
  // AI 技術標籤
  const aiTechnologies: AITechnology[] = [
    { 
      name: 'Machine Learning', 
      color: 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/30',
      category: 'core',
      description: '機器學習基礎理論與實踐'
    },
    { 
      name: 'Deep Learning', 
      color: 'bg-purple-500/20 border-purple-500/50 text-purple-300 hover:bg-purple-500/30',
      category: 'core',
      description: '深度學習網路架構與訓練'
    },
    { 
      name: 'Neural Networks', 
      color: 'bg-pink-500/20 border-pink-500/50 text-pink-300 hover:bg-pink-500/30',
      category: 'core',
      description: '神經網路原理與應用'
    },
    { 
      name: 'Computer Vision', 
      color: 'bg-blue-500/20 border-blue-500/50 text-blue-300 hover:bg-blue-500/30',
      category: 'application',
      description: '電腦視覺技術與影像處理'
    },
    { 
      name: 'Natural Language Processing', 
      color: 'bg-green-500/20 border-green-500/50 text-green-300 hover:bg-green-500/30',
      category: 'application',
      description: '自然語言處理與理解'
    },
    { 
      name: 'Reinforcement Learning', 
      color: 'bg-yellow-500/20 border-yellow-500/50 text-yellow-300 hover:bg-yellow-500/30',
      category: 'advanced',
      description: '強化學習與智能決策'
    },
    { 
      name: 'Generative AI', 
      color: 'bg-red-500/20 border-red-500/50 text-red-300 hover:bg-red-500/30',
      category: 'trending',
      description: '生成式人工智能技術'
    },
    { 
      name: 'Large Language Models', 
      color: 'bg-indigo-500/20 border-indigo-500/50 text-indigo-300 hover:bg-indigo-500/30',
      category: 'trending',
      description: '大型語言模型與應用'
    }
  ]

  // 預期功能特色
  const aiFeatures: AIFeature[] = [
    {
      title: 'AI 工具評測',
      description: '深度評測各種 AI 工具，分享實用技巧與最佳實踐',
      icon: 'heroicons:sparkles',
      color: 'text-cyan-400',
      status: 'development'
    },
    {
      title: '學習心得',
      description: '機器學習與深度學習的實戰經驗與踩坑記錄',
      icon: 'heroicons:academic-cap',
      color: 'text-purple-400',
      status: 'planned'
    },
    {
      title: '未來展望',
      description: 'AI 技術趨勢分析與未來發展方向預測',
      icon: 'heroicons:rocket-launch',
      color: 'text-pink-400',
      status: 'coming-soon'
    }
  ]

  // 文章數據（示例）
  const aiArticles: AIArticle[] = [
    {
      id: 1,
      title: 'ChatGPT 使用技巧與最佳實踐',
      description: '深入探討如何更有效地使用 ChatGPT，包含提示工程技巧與實際應用場景。',
      content: '...',
      category: '工具評測',
      tags: ['ChatGPT', '提示工程', 'LLM'],
      publishDate: '2024-01-15',
      readTime: 8,
      featured: true
    },
    {
      id: 2,
      title: '機器學習模型部署實戰',
      description: '從模型訓練到生產環境部署的完整流程，包含 Docker 容器化與 API 設計。',
      content: '...',
      category: '實戰經驗',
      tags: ['模型部署', 'Docker', 'API'],
      publishDate: '2024-01-10',
      readTime: 12,
      featured: false
    }
  ]

  // 打字機效果文字
  const typewriterTexts = [
    'Initializing AI systems...',
    'Loading neural networks...',
    'Processing deep learning models...',
    'Analyzing data patterns...',
    'Optimizing algorithms...',
    'Training in progress...',
    'Generating insights...',
    'Evaluating performance...'
  ]

  // 軌道符號
  const orbitSymbols = ['AI', 'ML', 'DL', 'NLP', 'CV', 'NN']

  // 按類別獲取技術
  const getTechnologiesByCategory = (category: string) => {
    return aiTechnologies.filter(tech => tech.category === category)
  }

  // 獲取特色文章
  const getFeaturedArticles = () => {
    return aiArticles.filter(article => article.featured)
  }

  // 按類別獲取文章
  const getArticlesByCategory = (category: string) => {
    return aiArticles.filter(article => article.category === category)
  }

  // 按標籤搜索文章
  const searchArticlesByTag = (tag: string) => {
    return aiArticles.filter(article => 
      article.tags.some(t => t.toLowerCase().includes(tag.toLowerCase()))
    )
  }

  // 獲取最新文章
  const getLatestArticles = (limit: number = 5) => {
    return aiArticles
      .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
      .slice(0, limit)
  }

  // 添加新文章
  const addArticle = (article: Omit<AIArticle, 'id'>) => {
    const newArticle: AIArticle = {
      ...article,
      id: Math.max(...aiArticles.map(a => a.id)) + 1
    }
    aiArticles.push(newArticle)
    return newArticle
  }

  // 獲取統計信息
  const getStats = () => {
    const categories = [...new Set(aiArticles.map(article => article.category))]
    const tags = [...new Set(aiArticles.flatMap(article => article.tags))]
    const totalReadTime = aiArticles.reduce((sum, article) => sum + article.readTime, 0)

    return {
      totalArticles: aiArticles.length,
      totalCategories: categories.length,
      totalTags: tags.length,
      totalReadTime,
      featuredCount: aiArticles.filter(article => article.featured).length
    }
  }

  return {
    aiTechnologies: readonly(ref(aiTechnologies)),
    aiFeatures: readonly(ref(aiFeatures)),
    aiArticles: readonly(ref(aiArticles)),
    typewriterTexts: readonly(ref(typewriterTexts)),
    orbitSymbols: readonly(ref(orbitSymbols)),
    getTechnologiesByCategory,
    getFeaturedArticles,
    getArticlesByCategory,
    searchArticlesByTag,
    getLatestArticles,
    addArticle,
    getStats
  }
}