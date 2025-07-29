interface Post {
  id: string
  title: string
  content: string
  excerpt?: string
  date: string
  readTime: number
  wordCount: number
  tags: string[]
  category?: string
}

interface ParsedPost {
  frontmatter: Record<string, any>
  content: string
}

// 保健品相關介面
export interface SupplementSection {
  id: string
  title: string
  category: string
  level: number
  content: string
  usage?: string
  manufacturer?: string
  productName?: string
  tags?: string[]
  subcategories?: string[]
}

export interface SupplementCategory {
  id: string
  name: string
  description: string
  icon: string
  items: SupplementSection[]
}

export interface SupplementTOC {
  id: string
  title: string
  level: number
  category: string
  anchor: string
}

export const useMarkdownContent = () => {
  const posts = ref<Post[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // 解析前置內容 (frontmatter)
  const parseFrontmatter = (content: string): ParsedPost => {
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/
    const match = content.match(frontmatterRegex)
    
    if (!match) {
      return { frontmatter: {}, content }
    }

    const frontmatterText = match[1]
    const markdownContent = match[2]
    
    // 簡單的 YAML 解析
    const frontmatter: Record<string, any> = {}
    frontmatterText.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split(':')
      if (key && valueParts.length > 0) {
        const value = valueParts.join(':').trim()
        // 處理數組格式
        if (value.startsWith('[') && value.endsWith(']')) {
          frontmatter[key.trim()] = value.slice(1, -1).split(',').map(s => s.trim().replace(/['"]/g, ''))
        } else {
          frontmatter[key.trim()] = value.replace(/['"]/g, '')
        }
      }
    })

    return { frontmatter, content: markdownContent }
  }

  // 計算閱讀時間（中文約每分鐘 200-300 字）
  const calculateReadTime = (content: string): number => {
    const chineseChars = (content.match(/[\u4e00-\u9fff]/g) || []).length
    const englishWords = (content.match(/[a-zA-Z]+/g) || []).length
    const totalChars = chineseChars + englishWords * 2 // 英文單詞按平均字母數計算
    return Math.max(1, Math.ceil(totalChars / 250))
  }

  // 計算字數
  const calculateWordCount = (content: string): number => {
    const chineseChars = (content.match(/[\u4e00-\u9fff]/g) || []).length
    const englishWords = (content.match(/[a-zA-Z]+/g) || []).length
    return chineseChars + englishWords
  }

  // 從內容生成摘要
  const generateExcerpt = (content: string, maxLength: number = 100): string => {
    // 移除 markdown 標記
    const cleanContent = content
      .replace(/#{1,6}\s+/g, '') // 標題
      .replace(/\*\*(.*?)\*\*/g, '$1') // 粗體
      .replace(/\*(.*?)\*/g, '$1') // 斜體
      .replace(/`(.*?)`/g, '$1') // 代碼
      .replace(/\[(.*?)\]\(.*?\)/g, '$1') // 連結
      .replace(/!\[.*?\]\(.*?\)/g, '') // 圖片
      .replace(/\n+/g, ' ') // 換行
      .trim()

    return cleanContent.length > maxLength 
      ? cleanContent.substring(0, maxLength) + '...'
      : cleanContent
  }

  // 根據標籤判斷分類
  const determineCategory = (tags: string[]): string => {
    if (!tags || tags.length === 0) return 'other'
    
    const categoryMap: Record<string, string[]> = {
      'political': ['政治', '國家治理', '政治觀察', '政治制度', '三權分立', '民主憂慮', '群眾動員'],
      'social': ['社會觀察', '世代差異', '職場觀察', '企業文化', '人才管理', '社會議題', '倫理思辨', '社會心理'],
      'writing': ['寫作', '寫作技巧', '創作過程', '思維方式'],
      'philosophy': ['哲學思辨', '獨立思考', '古典文學', '價值觀', '自由思考', '理性思考', '智慧'],
      'psychology': ['心理分析', '人性分析', '人際關係', '溝通'],
      'technology': ['程式設計', '資訊安全', '風險管理', '思維模式'],
      'health': ['健康', '醫學', '營養', '保健'],
      'other': []
    }
    
    for (const tag of tags) {
      for (const [category, categoryTags] of Object.entries(categoryMap)) {
        if (categoryTags.some(ct => tag.includes(ct))) {
          return category
        }
      }
    }
    
    return 'other'
  }

  // 從文件名生成 ID
  const generateIdFromFilename = (filename: string): string => {
    return filename.replace(/\.md$/, '').toLowerCase().replace(/[^a-z0-9]/g, '-')
  }

  // 解析單個 markdown 檔案
  const parseMarkdownFile = async (filename: string, content: string): Promise<Post> => {
    const { frontmatter, content: markdownContent } = parseFrontmatter(content)
    const wordCount = calculateWordCount(markdownContent)
    const readTime = calculateReadTime(markdownContent)
    const excerpt = generateExcerpt(markdownContent)
    
    const post: Post = {
      id: frontmatter.id || generateIdFromFilename(filename),
      title: frontmatter.title || filename.replace(/\.md$/, ''),
      content: markdownContent,
      excerpt: frontmatter.excerpt || excerpt,
      date: frontmatter.date || new Date().toISOString().split('T')[0],
      readTime: frontmatter.readTime || readTime,
      wordCount: frontmatter.wordCount || wordCount,
      tags: frontmatter.tags || [],
      category: frontmatter.category || determineCategory(frontmatter.tags || [])
    }

    return post
  }

  // 載入所有 markdown 檔案
  const loadMarkdownFiles = async () => {
    loading.value = true
    error.value = null

    try {
      // 由於 GitHub Pages 是靜態託管，我們需要直接載入預定義的內容
      const loadedPosts: Post[] = []

      // 載入 post.md
      try {
        const postContent = await $fetch('/content/post.md')
        if (typeof postContent === 'string') {
          const post = await parseMarkdownFile('post.md', postContent)
          loadedPosts.push(post)
        }
      } catch (fileError) {
        console.warn('無法載入 post.md:', fileError)
      }

      // 載入 supple.md
      try {
        const suppleContent = await $fetch('/content/supple.md')
        if (typeof suppleContent === 'string') {
          const post = await parseMarkdownFile('supple.md', suppleContent)
          loadedPosts.push(post)
        }
      } catch (fileError) {
        console.warn('無法載入 supple.md:', fileError)
      }

      posts.value = loadedPosts.sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      )
      
    } catch (err) {
      error.value = '載入內容時發生錯誤'
      console.error('載入 markdown 檔案錯誤:', err)
    } finally {
      loading.value = false
    }
  }

  // 根據 ID 獲取單個文章
  const getPostById = (id: string): Post | undefined => {
    return posts.value.find(post => post.id === id)
  }

  // 根據標籤過濾文章
  const getPostsByTag = (tag: string): Post[] => {
    return posts.value.filter(post => 
      post.tags.some(t => t.toLowerCase().includes(tag.toLowerCase()))
    )
  }

  // 根據分類獲取文章
  const getPostsByCategory = (category: string): Post[] => {
    return posts.value.filter(post => post.category === category)
  }

  // 搜尋文章
  const searchPosts = (query: string): Post[] => {
    if (!query.trim()) return posts.value

    const searchTerm = query.toLowerCase().trim()
    return posts.value.filter(post =>
      post.title.toLowerCase().includes(searchTerm) ||
      post.content.toLowerCase().includes(searchTerm) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
      (post.excerpt && post.excerpt.toLowerCase().includes(searchTerm))
    )
  }

  // 統計資訊
  const getStatistics = () => {
    const totalPosts = posts.value.length
    const totalWords = posts.value.reduce((sum, post) => sum + post.wordCount, 0)
    const averageReadTime = totalPosts > 0 
      ? Math.round(posts.value.reduce((sum, post) => sum + post.readTime, 0) / totalPosts)
      : 0
    
    const firstPost = posts.value.reduce((earliest, post) => {
      return new Date(post.date) < new Date(earliest.date) ? post : earliest
    }, posts.value[0])
    
    const daysSinceFirst = firstPost 
      ? Math.ceil((new Date().getTime() - new Date(firstPost.date).getTime()) / (1000 * 60 * 60 * 24))
      : 0

    return {
      totalPosts,
      totalWords,
      averageReadTime,
      daysSinceFirst
    }
  }

  // ===== 保健品相關功能 =====
  
  /**
   * 解析保健品 markdown 內容並提取段落
   */
  const parseSupplementSections = (content: string): SupplementSection[] => {
    const sections: SupplementSection[] = []
    
    // 按主要標題 (##) 分割內容
    const parts = content.split(/^##\s/gm).filter(part => part.trim())
    
    parts.forEach((part, index) => {
      const lines = part.trim().split('\n')
      const firstLine = lines[0]
      
      // 跳過標題或使用時間段落
      if (firstLine.includes('營養補充品完整指南') || firstLine.includes('使用時間')) {
        return
      }
      
      // 從第一行提取分類
      const categoryMatch = firstLine.match(/^(.+?)$/)
      if (!categoryMatch) return
      
      const categoryName = categoryMatch[1].trim()
      const categoryId = generateCategoryId(categoryName)
      
      // 尋找子段落 (###)
      const subsections = part.split(/^###\s/gm).filter(sub => sub.trim())
      
      subsections.forEach((subsection, subIndex) => {
        const subLines = subsection.trim().split('\n')
        const subTitle = subLines[0]
        
        // 跳過分類標題本身
        if (subTitle === categoryName) return
        
        // 解析保健品資訊
        const supplement = parseSupplementInfo(subTitle, subsection, categoryId)
        if (supplement) {
          sections.push(supplement)
        }
      })
    })
    
    return sections
  }

  /**
   * 解析個別保健品資訊
   */
  const parseSupplementInfo = (title: string, content: string, category: string): SupplementSection | null => {
    // 提取使用模式和名稱
    const titleMatch = title.match(/^<(.+?)>(.+)$/)
    if (!titleMatch) return null
    
    const usage = titleMatch[1]
    const productInfo = titleMatch[2]
    
    // 提取製造商和產品名稱
    const manufacturerMatch = productInfo.match(/【(.+?)】(.+)$/)
    if (!manufacturerMatch) return null
    
    const manufacturer = manufacturerMatch[1]
    const productName = manufacturerMatch[2]
    
    // 生成唯一 ID
    const id = generateSupplementId(manufacturer, productName)
    
    // 提取主要內容（移除標題行）
    const contentLines = content.split('\n').slice(1)
    const mainContent = contentLines.join('\n').trim()
    
    // 從使用和產品資訊提取標籤
    const tags = [usage, manufacturer, category]
    
    return {
      id,
      title: `${manufacturer} - ${productName}`,
      category,
      level: 3,
      content: mainContent,
      usage,
      manufacturer,
      productName,
      tags,
      subcategories: [usage]
    }
  }

  /**
   * 從分類名稱生成分類 ID
   */
  const generateCategoryId = (name: string): string => {
    const categoryMapping: Record<string, string> = {
      '胺基酸類補充劑': 'amino-acids',
      '魚油補充劑': 'fish-oil',
      '眼部健康補充劑': 'eye-health',
      '保護胃部': 'stomach-protection',
      '礦物質補充劑': 'minerals',
      '維生素補充劑': 'vitamins',
      '其他類補充': 'others',
      '酶': 'enzymes',
      '益生菌補充劑': 'probiotics'
    }
    
    return categoryMapping[name] || name.toLowerCase().replace(/[^a-z0-9]/g, '-')
  }

  /**
   * 生成保健品 ID
   */
  const generateSupplementId = (manufacturer: string, productName: string): string => {
    const cleanManufacturer = manufacturer.replace(/[^a-zA-Z0-9\u4e00-\u9fff]/g, '')
    const cleanProduct = productName.substring(0, 30).replace(/[^a-zA-Z0-9\u4e00-\u9fff]/g, '')
    return `${cleanManufacturer}-${cleanProduct}`.toLowerCase()
  }

  /**
   * 將段落組織成分類
   */
  const organizeSectionsIntoCategories = (sections: SupplementSection[]): SupplementCategory[] => {
    const categoryMap = new Map<string, SupplementCategory>()
    
    // 定義分類資訊
    const categoryInfo: Record<string, { name: string; description: string; icon: string }> = {
      'amino-acids': {
        name: '胺基酸類補充劑',
        description: '支持肌肉合成、免疫功能和新陳代謝的必需胺基酸',
        icon: 'material-symbols:fitness-center'
      },
      'fish-oil': {
        name: '魚油補充劑',
        description: '富含 Omega-3 脂肪酸，支持心血管和大腦健康',
        icon: 'material-symbols:water-drop'
      },
      'eye-health': {
        name: '眼部健康補充劑',
        description: '保護視力，緩解眼疲勞和支持視網膜健康',
        icon: 'material-symbols:visibility'
      },
      'stomach-protection': {
        name: '胃部保護',
        description: '維護胃腸道健康，緩解消化不適',
        icon: 'material-symbols:local-hospital'
      },
      'minerals': {
        name: '礦物質補充劑',
        description: '提供必需礦物質，支持骨骼、免疫和代謝功能',
        icon: 'material-symbols:science'
      },
      'vitamins': {
        name: '維生素補充劑',
        description: '補充日常所需維生素，維持身體正常機能',
        icon: 'material-symbols:medication'
      },
      'others': {
        name: '其他類補充',
        description: '特殊功能的營養補充品和抗氧化劑',
        icon: 'material-symbols:category'
      },
      'enzymes': {
        name: '酶類補充劑',
        description: '改善消化吸收，支持腸道健康',
        icon: 'material-symbols:biotech'
      },
      'probiotics': {
        name: '益生菌補充劑',
        description: '維護腸道菌群平衡，增強免疫力',
        icon: 'material-symbols:eco'
      }
    }
    
    sections.forEach(section => {
      const categoryId = section.category
      const info = categoryInfo[categoryId] || {
        name: section.category,
        description: '',
        icon: 'material-symbols:health-and-safety'
      }
      
      if (!categoryMap.has(categoryId)) {
        categoryMap.set(categoryId, {
          id: categoryId,
          name: info.name,
          description: info.description,
          icon: info.icon,
          items: []
        })
      }
      
      categoryMap.get(categoryId)!.items.push(section)
    })
    
    return Array.from(categoryMap.values())
  }

  /**
   * 生成保健品目錄
   */
  const generateSupplementTOC = (sections: SupplementSection[]): SupplementTOC[] => {
    return sections.map(section => ({
      id: section.id,
      title: section.title,
      level: section.level,
      category: section.category,
      anchor: `#${section.id}`
    }))
  }

  /**
   * 從 markdown 提取使用時間安排
   */
  const extractUsageSchedule = (content: string): Record<string, string[]> => {
    const scheduleSection = content.match(/## 使用時間：\s*\n([\s\S]*?)(?=\n##|$)/)
    if (!scheduleSection) return {}
    
    const schedule: Record<string, string[]> = {}
    const scheduleText = scheduleSection[1]
    
    const timeBlocks = scheduleText.split(/\n\n/).filter(block => block.trim())
    
    timeBlocks.forEach(block => {
      const lines = block.trim().split('\n')
      const timeLabel = lines[0].replace('：', '').trim()
      const items = lines.slice(1)
        .filter(line => line.startsWith('- '))
        .map(line => line.substring(2).trim())
      
      if (timeLabel && items.length > 0) {
        schedule[timeLabel] = items
      }
    })
    
    return schedule
  }

  return {
    posts: readonly(posts),
    loading: readonly(loading),
    error: readonly(error),
    loadMarkdownFiles,
    getPostById,
    getPostsByTag,
    getPostsByCategory,
    searchPosts,
    getStatistics,
    // 保健品相關功能
    parseSupplementSections,
    parseSupplementInfo,
    generateCategoryId,
    generateSupplementId,
    organizeSectionsIntoCategories,
    generateSupplementTOC,
    extractUsageSchedule
  }
}