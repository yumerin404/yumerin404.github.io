<template>
  <div 
    @click="$emit('click', game)"
    class="group bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 hover:border-pink-500/50 transition-all duration-300 cursor-pointer hover:scale-[1.02] hover:shadow-2xl hover:shadow-pink-500/10"
  >
    <!-- 遊戲封面 -->
    <div class="relative aspect-[3/4] overflow-hidden">
      <img 
        :src="game.cover" 
        :alt="game.title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        @error="handleImageError"
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
          getStatusClasses(game.status)
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
          v-for="tag in displayTags" 
          :key="tag"
          class="px-2 py-1 bg-pink-500/20 text-pink-300 text-xs rounded-md border border-pink-500/30"
        >
          {{ tag }}
        </span>
        <span 
          v-if="game.tags.length > maxTags"
          class="px-2 py-1 bg-gray-600/50 text-gray-300 text-xs rounded-md"
        >
          +{{ game.tags.length - maxTags }}
        </span>
      </div>

      <!-- 底部資訊 -->
      <div class="flex items-center justify-between text-xs text-gray-500">
        <span>{{ game.company }}</span>
        <span>{{ game.releaseYear }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Game } from '~/composables/useGalgames'

interface Props {
  game: Game
  maxTags?: number
}

const props = withDefaults(defineProps<Props>(), {
  maxTags: 3
})

defineEmits<{
  click: [game: Game]
}>()

const { getStatusText } = useGalgames()

const displayTags = computed(() => {
  return props.game.tags.slice(0, props.maxTags)
})

const getStatusClasses = (status: Game['status']): string => {
  const classMap = {
    completed: 'bg-green-500/80 text-white',
    playing: 'bg-blue-500/80 text-white',
    wishlist: 'bg-gray-500/80 text-white'
  }
  return classMap[status] || 'bg-gray-500/80 text-white'
}

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src = '/images/placeholder-game.jpg' // 提供一個預設圖片
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>