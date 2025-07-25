<template>
  <div 
    v-if="game"
    @click="$emit('close')"
    class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
  >
    <div 
      @click.stop
      class="bg-gray-900/95 backdrop-blur-sm rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-700/50"
    >
      <div class="relative">
        <!-- 關閉按鈕 -->
        <button 
          @click="$emit('close')"
          class="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors duration-300"
        >
          <Icon name="heroicons:x-mark" class="w-6 h-6" />
        </button>

        <!-- 遊戲封面 -->
        <div class="relative h-64 md:h-80 overflow-hidden rounded-t-2xl">
          <img 
            :src="game.cover" 
            :alt="game.title"
            class="w-full h-full object-cover"
            @error="handleImageError"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
        </div>

        <!-- 詳細資訊 -->
        <div class="p-6 md:p-8">
          <div class="flex flex-col md:flex-row md:items-start gap-6">
            <!-- 基本資訊 -->
            <div class="flex-1">
              <h2 class="text-3xl font-bold text-white mb-2">{{ game.title }}</h2>
              <p class="text-gray-400 mb-4">{{ game.company }} • {{ game.releaseYear }}</p>
              
              <!-- 評分和狀態 -->
              <div class="flex items-center mb-6">
                <div class="flex items-center mr-4">
                  <Icon name="heroicons:star-solid" class="w-5 h-5 text-yellow-400 mr-1" />
                  <span class="text-xl font-semibold text-white">{{ game.rating }}</span>
                  <span class="text-gray-400 ml-1">/10</span>
                </div>
                <div 
                  :class="[
                    'px-3 py-1 rounded-lg text-sm font-medium border',
                    getStatusClasses(game.status)
                  ]"
                >
                  {{ getStatusText(game.status) }}
                </div>
              </div>

              <!-- 描述 -->
              <div class="mb-6">
                <h3 class="text-white font-semibold mb-3">遊戲簡介</h3>
                <p class="text-gray-300 leading-relaxed">{{ game.description }}</p>
              </div>

              <!-- 詳細標籤 -->
              <div class="mb-6">
                <h3 class="text-white font-semibold mb-3">標籤</h3>
                <div class="flex flex-wrap gap-2">
                  <span 
                    v-for="tag in game.tags" 
                    :key="tag"
                    class="px-3 py-1 bg-pink-500/20 text-pink-300 text-sm rounded-lg border border-pink-500/30"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>

              <!-- 遊玩記錄 -->
              <div class="space-y-2 text-sm">
                <div v-if="game.playTime" class="text-gray-400">
                  <span class="text-white font-medium">遊玩時間：</span>{{ game.playTime }} 小時
                </div>
                <div v-if="game.completedDate" class="text-gray-400">
                  <span class="text-white font-medium">完成日期：</span>{{ formatDate(game.completedDate) }}
                </div>
                <div v-if="game.notes" class="text-gray-400">
                  <span class="text-white font-medium">個人筆記：</span>{{ game.notes }}
                </div>
              </div>
            </div>
          </div>

          <!-- 操作按鈕 -->
          <div class="flex gap-3 mt-8 pt-6 border-t border-gray-700/50">
            <button
              @click="$emit('editGame', game)"
              class="flex-1 bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 border border-pink-500/30 hover:border-pink-500/50 px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center justify-center"
            >
              <Icon name="heroicons:pencil-square" class="w-4 h-4 mr-2" />
              編輯資訊
            </button>
            <button
              @click="$emit('deleteGame', game)"
              class="bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 hover:border-red-500/50 px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center justify-center"
            >
              <Icon name="heroicons:trash" class="w-4 h-4 mr-2" />
              刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Game } from '~/composables/useGalgames'

interface Props {
  game: Game | null
}

defineProps<Props>()

defineEmits<{
  close: []
  editGame: [game: Game]
  deleteGame: [game: Game]
}>()

const { getStatusText } = useGalgames()

const getStatusClasses = (status: Game['status']): string => {
  const classMap = {
    completed: 'bg-green-500/20 text-green-300 border-green-500/30',
    playing: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    wishlist: 'bg-gray-500/20 text-gray-300 border-gray-500/30'
  }
  return classMap[status] || 'bg-gray-500/20 text-gray-300 border-gray-500/30'
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src = '/images/placeholder-game.jpg'
}
</script>