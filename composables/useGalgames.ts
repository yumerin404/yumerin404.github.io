export interface Game {
  id: number
  title: string
  description: string
  cover: string
  rating: number
  status: 'completed' | 'playing' | 'wishlist'
  company: string
  releaseYear: number
  category: string
  tags: string[]
  playTime?: number
  completedDate?: string
  notes?: string
}

export interface GameCategory {
  id: string
  name: string
  description?: string
  color?: string
}

export const useGalgames = () => {
  const categories: GameCategory[] = [
    { id: 'all', name: '全部', description: '顯示所有遊戲', color: 'gray' },
    { id: 'romance', name: '戀愛', description: '戀愛主題遊戲', color: 'pink' },
    { id: 'adventure', name: '冒險', description: '冒險類型遊戲', color: 'blue' },
    { id: 'fantasy', name: '奇幻', description: '奇幻世界遊戲', color: 'purple' },
    { id: 'mystery', name: '懸疑', description: '懸疑推理遊戲', color: 'amber' },
    { id: 'slice-of-life', name: '日常', description: '日常生活遊戲', color: 'green' }
  ]

  const games: Game[] = [
    {
      id: 1,
      title: '示例遊戲 1',
      description: '這是一個示例遊戲，展示了卡片的基本布局和功能。',
      cover: '/images/game1.jpg',
      rating: 9.2,
      status: 'completed',
      company: 'Visual Arts',
      releaseYear: 2023,
      category: 'romance',
      tags: ['戀愛', '校園', '催淚', '選擇分岐'],
      playTime: 45,
      completedDate: '2024-01-15',
      notes: '非常感人的故事，推薦給所有玩家。'
    },
    {
      id: 2,
      title: '示例遊戲 2',
      description: '另一個示例遊戲，用於測試篩選和分類功能。',
      cover: '/images/game2.jpg',
      rating: 8.7,
      status: 'playing',
      company: 'Type-Moon',
      releaseYear: 2022,
      category: 'fantasy',
      tags: ['奇幻', '戰鬥', '魔法', '史詩'],
      playTime: 25,
      notes: '目前進行中，劇情很有趣。'
    },
    {
      id: 3,
      title: '示例遊戲 3',
      description: '第三個示例遊戲，展示不同的狀態和評分。',
      cover: '/images/game3.jpg',
      rating: 8.1,
      status: 'wishlist',
      company: 'Key',
      releaseYear: 2024,
      category: 'slice-of-life',
      tags: ['日常', '治癒', '友情', '成長'],
      notes: '計劃下個月開始遊玩。'
    }
  ]

  // 狀態文字映射
  const getStatusText = (status: Game['status']): string => {
    const statusMap = {
      completed: '已完成',
      playing: '遊玩中',
      wishlist: '願望清單'
    }
    return statusMap[status] || '未知'
  }

  // 狀態顏色映射
  const getStatusColor = (status: Game['status']): string => {
    const colorMap = {
      completed: 'green',
      playing: 'blue',
      wishlist: 'gray'
    }
    return colorMap[status] || 'gray'
  }

  // 按類別篩選遊戲
  const getGamesByCategory = (categoryId: string): Game[] => {
    if (categoryId === 'all') {
      return games
    }
    return games.filter(game => game.category === categoryId)
  }

  // 按狀態篩選遊戲
  const getGamesByStatus = (status: Game['status']): Game[] => {
    return games.filter(game => game.status === status)
  }

  // 按標籤篩選遊戲
  const getGamesByTag = (tag: string): Game[] => {
    return games.filter(game => game.tags.includes(tag))
  }

  // 搜索遊戲
  const searchGames = (query: string): Game[] => {
    const lowercaseQuery = query.toLowerCase()
    return games.filter(game => 
      game.title.toLowerCase().includes(lowercaseQuery) ||
      game.description.toLowerCase().includes(lowercaseQuery) ||
      game.company.toLowerCase().includes(lowercaseQuery) ||
      game.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    )
  }

  // 獲取所有標籤
  const getAllTags = (): string[] => {
    const allTags = games.flatMap(game => game.tags)
    return [...new Set(allTags)]
  }

  // 獲取統計信息
  const getStats = () => {
    return {
      total: games.length,
      completed: games.filter(game => game.status === 'completed').length,
      playing: games.filter(game => game.status === 'playing').length,
      wishlist: games.filter(game => game.status === 'wishlist').length,
      averageRating: games.reduce((sum, game) => sum + game.rating, 0) / games.length,
      totalPlayTime: games
        .filter(game => game.playTime)
        .reduce((sum, game) => sum + (game.playTime || 0), 0)
    }
  }

  // 添加新遊戲
  const addGame = (game: Omit<Game, 'id'>): Game => {
    const newGame: Game = {
      ...game,
      id: Math.max(...games.map(g => g.id)) + 1
    }
    games.push(newGame)
    return newGame
  }

  // 更新遊戲
  const updateGame = (id: number, updates: Partial<Game>): Game | null => {
    const index = games.findIndex(game => game.id === id)
    if (index === -1) return null
    
    games[index] = { ...games[index], ...updates }
    return games[index]
  }

  // 刪除遊戲
  const removeGame = (id: number): boolean => {
    const index = games.findIndex(game => game.id === id)
    if (index === -1) return false
    
    games.splice(index, 1)
    return true
  }

  return {
    categories: readonly(ref(categories)),
    games: readonly(ref(games)),
    getStatusText,
    getStatusColor,
    getGamesByCategory,
    getGamesByStatus,
    getGamesByTag,
    searchGames,
    getAllTags,
    getStats,
    addGame,
    updateGame,
    removeGame
  }
}