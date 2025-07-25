<template>
  <section class="py-16 px-4">
    <div class="container mx-auto max-w-7xl">
      <!-- 搜索和篩選工具 -->
      <div v-if="showSearchAndFilters" class="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
        <!-- 搜索框 -->
        <div class="relative flex-1 max-w-md">
          <Icon name="heroicons:magnifying-glass" class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="搜索遊戲..."
            class="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:border-pink-500/50 focus:outline-none transition-colors duration-300"
          />
        </div>

        <!-- 狀態篩選 -->
        <div class="flex gap-2">
          <button
            v-for="status in statusFilters"
            :key="status.key"
            @click="toggleStatusFilter(status.key)"
            :class="[
              'px-3 py-1 rounded-lg text-xs font-medium transition-all duration-300 border',
              activeStatusFilters.includes(status.key)
                ? `bg-${status.color}-500/20 border-${status.color}-500/50 text-${status.color}-300`
                : 'border-gray-600/50 text-gray-400 hover:border-gray-500/50'
            ]"
          >
            {{ status.label }}
          </button>
        </div>
      </div>

      <!-- 遊戲網格 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <GameCard
          v-for="game in displayedGames"
          :key="game.id"
          :game="game"
          @click="$emit('gameClick', game)"
        />
      </div>

      <!-- 空狀態 -->
      <div v-if="displayedGames.length === 0" class="text-center py-16">
        <Icon 
          :name="searchQuery ? 'heroicons:magnifying-glass' : 'heroicons:face-frown'" 
          class="w-16 h-16 text-gray-500 mx-auto mb-4" 
        />
        <h3 class="text-xl font-semibold text-gray-300 mb-2">
          {{ searchQuery ? '未找到相關遊戲' : '此分類暫無遊戲' }}
        </h3>
        <p class="text-gray-400">
          {{ searchQuery ? '嘗試調整搜索條件' : '期待未來添加更多精彩內容' }}
        </p>
      </div>

      <!-- 載入更多按鈕 -->
      <div v-if="hasMore && displayedGames.length > 0" class="text-center mt-12">
        <button
          @click="loadMore"
          :disabled="loading"
          class="bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 border border-pink-500/30 hover:border-pink-500/50 px-8 py-3 rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Icon 
            v-if="loading"
            name="heroicons:arrow-path" 
            class="w-5 h-5 mr-2 animate-spin" 
          />
          {{ loading ? '載入中...' : '載入更多' }}
        </button>
      </div>

      <!-- 統計信息 -->
      <div v-if="showStats" class="mt-8 pt-8 border-t border-gray-700/50">
        <div class="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
          <div class="bg-gray-800/30 rounded-lg p-4">
            <div class="text-2xl font-bold text-white">{{ stats.total }}</div>
            <div class="text-sm text-gray-400">總計</div>
          </div>
          <div class="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <div class="text-2xl font-bold text-green-300">{{ stats.completed }}</div>
            <div class="text-sm text-gray-400">已完成</div>
          </div>
          <div class="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <div class="text-2xl font-bold text-blue-300">{{ stats.playing }}</div>
            <div class="text-sm text-gray-400">遊玩中</div>
          </div>
          <div class="bg-gray-500/10 border border-gray-500/20 rounded-lg p-4">
            <div class="text-2xl font-bold text-gray-300">{{ stats.wishlist }}</div>
            <div class="text-sm text-gray-400">願望清單</div>
          </div>
          <div class="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
            <div class="text-2xl font-bold text-yellow-300">{{ stats.averageRating.toFixed(1) }}</div>
            <div class="text-sm text-gray-400">平均評分</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Game } from '~/composables/useGalgames'

interface Props {
  games: Game[]
  selectedCategory?: string
  showSearchAndFilters?: boolean
  showStats?: boolean
  itemsPerPage?: number
}

const props = withDefaults(defineProps<Props>(), {
  selectedCategory: 'all',
  showSearchAndFilters: true,
  showStats: false,
  itemsPerPage: 12
})

defineEmits<{
  gameClick: [game: Game]
}>()

const { getGamesByCategory, searchGames, getStats } = useGalgames()

// 響應式數據
const searchQuery = ref('')
const activeStatusFilters = ref<Game['status'][]>([])
const currentPage = ref(1)
const loading = ref(false)

// 狀態篩選選項
const statusFilters = [
  { key: 'completed' as const, label: '已完成', color: 'green' },
  { key: 'playing' as const, label: '遊玩中', color: 'blue' },
  { key: 'wishlist' as const, label: '願望清單', color: 'gray' }
]

// 計算屬性
const filteredGames = computed(() => {
  let result = props.games

  // 按類別篩選
  if (props.selectedCategory && props.selectedCategory !== 'all') {
    result = result.filter(game => game.category === props.selectedCategory)
  }

  // 按搜索查詢篩選
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(game => 
      game.title.toLowerCase().includes(query) ||
      game.description.toLowerCase().includes(query) ||
      game.company.toLowerCase().includes(query) ||
      game.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }

  // 按狀態篩選
  if (activeStatusFilters.value.length > 0) {
    result = result.filter(game => activeStatusFilters.value.includes(game.status))
  }

  return result
})

const displayedGames = computed(() => {
  const endIndex = currentPage.value * props.itemsPerPage
  return filteredGames.value.slice(0, endIndex)
})

const hasMore = computed(() => {
  return displayedGames.value.length < filteredGames.value.length
})

const stats = computed(() => {
  if (!props.showStats) return { total: 0, completed: 0, playing: 0, wishlist: 0, averageRating: 0 }
  
  const games = filteredGames.value
  return {
    total: games.length,
    completed: games.filter(game => game.status === 'completed').length,
    playing: games.filter(game => game.status === 'playing').length,
    wishlist: games.filter(game => game.status === 'wishlist').length,
    averageRating: games.length > 0 
      ? games.reduce((sum, game) => sum + game.rating, 0) / games.length 
      : 0
  }
})

// 方法
const toggleStatusFilter = (status: Game['status']) => {
  const index = activeStatusFilters.value.indexOf(status)
  if (index === -1) {
    activeStatusFilters.value.push(status)
  } else {
    activeStatusFilters.value.splice(index, 1)
  }
  currentPage.value = 1 // 重置頁面
}

const loadMore = async () => {
  loading.value = true
  // 模擬載入延遲
  await new Promise(resolve => setTimeout(resolve, 500))
  currentPage.value++
  loading.value = false
}

// 監聽搜索查詢變化，重置頁面
watch(searchQuery, () => {
  currentPage.value = 1
})

// 監聽類別變化，重置篩選
watch(() => props.selectedCategory, () => {
  currentPage.value = 1
  activeStatusFilters.value = []
  searchQuery.value = ''
})
</script>