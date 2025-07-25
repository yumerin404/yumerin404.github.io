export interface Tool {
  title: string
  category: string
  description: string
  features: string[]
  icon: string
  featureIcon: string
  featureTitle: string
  codeUrl: string
  themeColor: string
  gradientColors: string
  tags?: string[]
  status?: 'active' | 'development' | 'deprecated'
  lastUpdated?: string
}

export interface SupportLink {
  name: string
  description: string
  url: string
  icon: string
  color: string
  buttonText: string
  isPrimary?: boolean
}

export const useProgrammingTools = () => {
  const tools: Tool[] = [
    {
      title: 'Threads 追蹤者管理器',
      category: 'Social Media Automation',
      description: '智能社交媒體管理工具，提供自動化追蹤管理、批量操作和帳戶清理功能，讓您的社交媒體維護變得更加高效。',
      features: ['自動追蹤/取消追蹤管理', '批量帳戶操作', '智能清理工具', '統計資料追蹤'],
      icon: 'heroicons:users',
      featureIcon: 'heroicons:cpu-chip',
      featureTitle: '核心功能',
      codeUrl: 'https://gist.github.com/yumerin404/2efad1c668a60b3dc4ab834a00d41435',
      themeColor: '[#58a6ff]',
      gradientColors: 'from-[#58a6ff] to-[#a5a5ff]',
      tags: ['自動化', '社交媒體', 'JavaScript'],
      status: 'active',
      lastUpdated: '2024-12-01'
    },
    {
      title: '強化 ExHentai 腳本',
      category: 'Reading Enhancement',
      description: '專為閱讀體驗設計的增強腳本，提供性能優化、界面改進和便利功能，讓您的閱讀過程更加流暢舒適。',
      features: ['界面性能優化', '閱讀體驗提升', '快捷鍵支援', '自定義設置'],
      icon: 'heroicons:book-open',
      featureIcon: 'heroicons:sparkles',
      featureTitle: '特色功能',
      codeUrl: 'https://gist.github.com/yumerin404/bc23649a1423e835ecb1474f3b35664f',
      themeColor: '[#a5a5ff]',
      gradientColors: 'from-[#a5a5ff] to-[#7ce38a]',
      tags: ['用戶腳本', '界面優化', 'JavaScript'],
      status: 'active',
      lastUpdated: '2024-11-15'
    },
    {
      title: 'DLsite 記錄管理器',
      category: 'Data Management',
      description: '全功能數據記錄管理工具，支援資料導出導入、視覺化統計和自定義主題，讓您的數據管理更加便捷直觀。',
      features: ['數據導出/導入', '統計圖表顯示', '亮色主題支援', '批量資料處理'],
      icon: 'heroicons:chart-bar',
      featureIcon: 'heroicons:cog-6-tooth',
      featureTitle: '管理功能',
      codeUrl: 'https://gist.github.com/yumerin404/ed1426a90ef70e7f925afde8654f97ca',
      themeColor: '[#7ce38a]',
      gradientColors: 'from-[#7ce38a] to-[#ffa657]',
      tags: ['數據管理', '視覺化', 'TypeScript'],
      status: 'active',
      lastUpdated: '2024-10-20'
    },
    {
      title: 'ChatGPT 風險監控器',
      category: 'Security Tool',
      description: 'AI 對話安全監控工具，提供實時風險評估、內容篩選和安全預警功能，確保您的 AI 互動過程安全可靠。',
      features: ['實時風險監控', '內容安全篩選', '自動警報系統', '風險評估報告'],
      icon: 'heroicons:shield-check',
      featureIcon: 'heroicons:eye',
      featureTitle: '安全功能',
      codeUrl: 'https://gist.github.com/yumerin404/23897d7fea9f6d061593b88ded5e1171',
      themeColor: '[#ffa657]',
      gradientColors: 'from-[#ffa657] to-[#58a6ff]',
      tags: ['AI安全', '風險監控', 'JavaScript'],
      status: 'active',
      lastUpdated: '2024-09-10'
    }
  ]

  const supportLinks: SupportLink[] = [
    {
      name: 'GitHub',
      description: '在 GitHub 上查看源碼、提出問題或建議改進',
      url: 'https://github.com/yumerin404',
      icon: 'heroicons:code-bracket',
      color: '[#58a6ff]',
      buttonText: '訪問 GitHub',
      isPrimary: true
    },
    {
      name: 'Threads',
      description: '在 Threads 上關注最新開發動態和工具更新',
      url: 'https://www.threads.com/@yumerin.main.i',
      icon: 'heroicons:at-symbol',
      color: '[#a5a5ff]',
      buttonText: '追蹤更新',
      isPrimary: false
    }
  ]

  // 添加新工具的輔助函數
  const addTool = (tool: Tool) => {
    tools.push(tool)
  }

  // 按類別篩選工具
  const getToolsByCategory = (category: string) => {
    return tools.filter(tool => tool.category === category)
  }

  // 按狀態篩選工具
  const getToolsByStatus = (status: Tool['status']) => {
    return tools.filter(tool => tool.status === status)
  }

  // 按標籤篩選工具
  const getToolsByTag = (tag: string) => {
    return tools.filter(tool => tool.tags?.includes(tag))
  }

  // 獲取所有類別
  const getCategories = () => {
    return [...new Set(tools.map(tool => tool.category))]
  }

  // 獲取所有標籤
  const getTags = () => {
    const allTags = tools.flatMap(tool => tool.tags || [])
    return [...new Set(allTags)]
  }

  return {
    tools: readonly(ref(tools)),
    supportLinks: readonly(ref(supportLinks)),
    addTool,
    getToolsByCategory,
    getToolsByStatus,
    getToolsByTag,
    getCategories,
    getTags
  }
}