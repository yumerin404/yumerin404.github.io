<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white">
    <!-- Header -->
    <Header />

    <!-- Main Content -->
    <main class="relative z-10 pt-20">
      <!-- Hero Section -->
      <section class="py-16 px-4">
        <div class="container mx-auto max-w-6xl text-center">
          <div class="mb-12 animate-fade-in-up">
            <div class="flex justify-center items-center mb-6">
              <div class="w-20 h-20 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-pink-500/30">
                <Icon name="heroicons:heart" class="w-10 h-10 text-pink-400" />
              </div>
            </div>
            
            <h1 class="text-5xl md:text-6xl font-bold mb-6">
              <span class="bg-gradient-to-r from-pink-400 via-purple-400 to-violet-400 bg-clip-text text-transparent">
                Galgame 世界
              </span>
            </h1>
            
            <p class="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              探索故事的無限可能，在二次元的世界中尋找心靈的共鳴
            </p>

            <!-- 篩選標籤 -->
            <div class="flex flex-wrap justify-center gap-3 mb-12">
              <button 
                v-for="category in categories" 
                :key="category.id"
                @click="selectedCategory = category.id"
                :class="[
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 border',
                  selectedCategory === category.id 
                    ? 'bg-pink-500/20 border-pink-500/50 text-pink-300' 
                    : 'border-gray-600/50 text-gray-400 hover:border-pink-500/30 hover:text-pink-300'
                ]"
              >
                {{ category.name }}
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Galgame 卡片展示 -->
      <section class="py-16 px-4">
        <div class="container mx-auto max-w-7xl">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div 
              v-for="game in filteredGames" 
              :key="game.id"
              @click="openGameDetail(game)"
              class="group bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 hover:border-pink-500/50 transition-all duration-300 cursor-pointer hover:scale-[1.02] hover:shadow-2xl hover:shadow-pink-500/10"
            >
              <!-- 遊戲封面 -->
              <div class="relative aspect-[3/4] overflow-hidden">
                <img 
                  :src="game.cover" 
                  :alt="game.title"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <!-- 評分標籤 -->
                <div class="absolute top-3 right-3 bg-black/80 backdrop-blur-sm px-2 py-1 rounded-lg">
                  <div class="flex items-center space-x-1">
                    <Icon name="heroicons:star-solid" class="w-4 h-4 text-yellow-400" />
                    <span class="text-sm font-semibold text-white">{{ game.rating }}</span>
                  </div>
                </div>

                <!-- 狀態標籤 -->
                <div 
                  v-if="game.status"
                  :class="[
                    'absolute top-3 left-3 px-2 py-1 rounded-lg text-xs font-medium backdrop-blur-sm',
                    game.status === 'completed' ? 'bg-green-500/80 text-white' :
                    game.status === 'playing' ? 'bg-blue-500/80 text-white' :
                    'bg-gray-500/80 text-white'
                  ]"
                >
                  {{ getStatusText(game.status) }}
                </div>
              </div>

              <!-- 遊戲資訊 -->
              <div class="p-4">
                <h3 class="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-pink-300 transition-colors duration-300">
                  {{ game.title }}
                </h3>
                
                <p class="text-sm text-gray-400 mb-3 line-clamp-2 leading-relaxed">
                  {{ game.description }}
                </p>

                <!-- 標籤 -->
                <div class="flex flex-wrap gap-1 mb-3">
                  <span 
                    v-for="tag in game.tags.slice(0, 3)" 
                    :key="tag"
                    class="px-2 py-1 bg-pink-500/20 text-pink-300 text-xs rounded-md border border-pink-500/30"
                  >
                    {{ tag }}
                  </span>
                  <span 
                    v-if="game.tags.length > 3"
                    class="px-2 py-1 bg-gray-600/50 text-gray-300 text-xs rounded-md"
                  >
                    +{{ game.tags.length - 3 }}
                  </span>
                </div>

                <!-- 底部資訊 -->
                <div class="flex items-center justify-between text-xs text-gray-500">
                  <span>{{ game.company }}</span>
                  <span>{{ game.releaseYear }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 如果沒有遊戲 -->
          <div v-if="filteredGames.length === 0" class="text-center py-16">
            <Icon name="heroicons:face-frown" class="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <p class="text-gray-400 text-lg">此分類暫無遊戲</p>
          </div>
        </div>
      </section>
    </main>

    <!-- 遊戲詳情 Modal -->
    <div 
      v-if="selectedGame"
      @click="closeGameDetail"
      class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <div 
        @click.stop
        class="bg-gray-900/95 backdrop-blur-sm rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-700/50"
      >
        <div class="relative">
          <!-- 關閉按鈕 -->
          <button 
            @click="closeGameDetail"
            class="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors duration-300"
          >
            <Icon name="heroicons:x-mark" class="w-6 h-6" />
          </button>

          <!-- 遊戲封面 -->
          <div class="relative h-64 md:h-80 overflow-hidden rounded-t-2xl">
            <img 
              :src="selectedGame.cover" 
              :alt="selectedGame.title"
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
          </div>

          <!-- 詳細資訊 -->
          <div class="p-6 md:p-8">
            <div class="flex flex-col md:flex-row md:items-start gap-6">
              <!-- 基本資訊 -->
              <div class="flex-1">
                <h2 class="text-3xl font-bold text-white mb-2">{{ selectedGame.title }}</h2>
                <p class="text-gray-400 mb-4">{{ selectedGame.company }} • {{ selectedGame.releaseYear }}</p>
                
                <!-- 評分 -->
                <div class="flex items-center mb-6">
                  <div class="flex items-center mr-4">
                    <Icon name="heroicons:star-solid" class="w-5 h-5 text-yellow-400 mr-1" />
                    <span class="text-xl font-semibold text-white">{{ selectedGame.rating }}</span>
                    <span class="text-gray-400 ml-1">/10</span>
                  </div>
                  <div 
                    :class="[
                      'px-3 py-1 rounded-lg text-sm font-medium',
                      selectedGame.status === 'completed' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
                      selectedGame.status === 'playing' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                      'bg-gray-500/20 text-gray-300 border border-gray-500/30'
                    ]"
                  >
                    {{ getStatusText(selectedGame.status) }}
                  </div>
                </div>

                <!-- 描述 -->
                <p class="text-gray-300 leading-relaxed mb-6">{{ selectedGame.description }}</p>

                <!-- 詳細標籤 -->
                <div class="mb-6">
                  <h3 class="text-white font-semibold mb-3">標籤</h3>
                  <div class="flex flex-wrap gap-2">
                    <span 
                      v-for="tag in selectedGame.tags" 
                      :key="tag"
                      class="px-3 py-1 bg-pink-500/20 text-pink-300 text-sm rounded-lg border border-pink-500/30"
                    >
                      {{ tag }}
                    </span>
                  </div>
                </div>

                <!-- 遊玩記錄 -->
                <div v-if="selectedGame.playTime" class="text-sm text-gray-400">
                  <p>遊玩時間：{{ selectedGame.playTime }} 小時</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Game } from '~/composables/useGalgames'

// SEO 設定
useHead({
  title: 'Galgame 世界 - 夢鈴領域',
  meta: [
    { name: 'description', content: '探索 Galgame 的無限世界，發現故事的魅力與情感的共鳴。' }
  ]
})

// 使用 Galgame 數據管理
const { categories, games } = useGalgames()

// 響應式資料
const selectedCategory = ref('all')
const selectedGame = ref<Game | null>(null)

// 計算屬性
const filteredGames = computed(() => {
  if (selectedCategory.value === 'all') {
    return games.value
  }
  return games.value.filter(game => game.category === selectedCategory.value)
})

// 方法
const getStatusText = (status: string) => {
  const statusMap = {
    completed: '已完成',
    playing: '遊玩中',
    wishlist: '願望清單'
  }
  return statusMap[status] || '未知'
}

const openGameDetail = (game: Game) => {
  selectedGame.value = game
}

const closeGameDetail = () => {
  selectedGame.value = null
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@keyframes fade-in-up {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out;
}
</style>