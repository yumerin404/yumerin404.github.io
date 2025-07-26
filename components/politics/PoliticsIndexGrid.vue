<template>
  <section class="py-16 px-4">
    <div class="container mx-auto max-w-7xl">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div 
          v-for="category in categories"
          :key="category.id"
          class="group relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-purple-500/20 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:border-purple-400/40 hover:shadow-purple-500/10"
        >
          <!-- 頂部發光條 -->
          <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 via-indigo-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <!-- 背景裝飾效果 -->
          <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/5 to-indigo-500/5"></div>
          </div>
          
          <div class="relative z-10 p-8">
            <!-- 圖示區域 -->
            <div class="flex justify-center mb-6">
              <div class="relative w-20 h-20 rounded-2xl flex items-center justify-center border group-hover:scale-110 transition-transform duration-300 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border-purple-500/30">
                <!-- 內層光暈 -->
                <div class="absolute inset-2 bg-gradient-to-br from-purple-400/10 to-indigo-400/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                <Icon :name="category.icon" class="relative z-10 w-10 h-10" :class="getCategoryIconColor(category.color)" />
              </div>
            </div>

            <h2 class="text-2xl font-bold text-white text-center mb-4 group-hover:text-purple-200 transition-colors duration-300">{{ category.name }}</h2>
            
            <p class="text-gray-300 text-center mb-8 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
              {{ category.description }}
            </p>

            <!-- 內容列表 -->
            <div class="space-y-3 mb-8">
              <div 
                v-for="(item, index) in category.items" 
                :key="item"
                class="flex items-center text-sm text-gray-400 group-hover:text-gray-300 transition-all duration-300"
                :style="{ transitionDelay: `${index * 50}ms` }"
              >
                <div class="w-4 h-4 mr-3 flex-shrink-0 relative">
                  <div class="absolute inset-0 rounded-full bg-gradient-to-br from-green-400 to-green-500 opacity-20"></div>
                  <Icon name="heroicons:check-circle" class="w-4 h-4 text-green-400 relative z-10" />
                </div>
                <span>{{ item }}</span>
              </div>
            </div>

            <!-- 進入按鈕 - 重新設計 -->
            <div class="text-center">
              <button 
                @click="handleButtonClick(category.id)"
                :class="[
                  'relative w-full text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 overflow-hidden group/btn',
                  getCategoryButtonClass(category.color)
                ]"
                @mouseenter="playHoverSound"
              >
                <!-- 背景漸變層 -->
                <div :class="[
                  'absolute inset-0 bg-gradient-to-r opacity-100 group-hover/btn:opacity-0 transition-opacity duration-300',
                  getCategoryGradient(category.color)
                ]"></div>
                
                <!-- Hover 背景層 -->
                <div :class="[
                  'absolute inset-0 bg-gradient-to-r opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300',
                  getCategoryHoverGradient(category.color)
                ]"></div>
                
                <!-- 發光效果 -->
                <div :class="[
                  'absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300',
                  getCategoryShadow(category.color)
                ]"></div>
                
                <!-- 按鈕內容 -->
                <div class="relative z-10 flex items-center justify-center group-hover/btn:scale-105 transition-transform duration-300">
                  <Icon name="heroicons:arrow-right" class="w-5 h-5 mr-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  <span class="group-hover/btn:tracking-wide transition-all duration-300">{{ category.buttonText }}</span>
                </div>
                
                <!-- 點擊波紋效果 -->
                <div class="absolute inset-0 opacity-0 group-active/btn:opacity-100 transition-opacity duration-150">
                  <div :class="[
                    'absolute inset-0 rounded-xl animate-ping',
                    getCategoryRipple(category.color)
                  ]"></div>
                </div>
                
                <!-- 邊框發光 -->
                <div :class="[
                  'absolute inset-0 rounded-xl border-2 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300',
                  getCategoryBorder(category.color)
                ]"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface IndexCategory {
  id: string
  name: string
  description: string
  icon: string
  color: string
  items: string[]
  buttonText: string
}

interface Props {
  categories: IndexCategory[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  navigate: [categoryId: string]
}>()

// 按鈕點擊處理
const handleButtonClick = (categoryId: string) => {
  playClickSound()
  emit('navigate', categoryId)
}

// 音效處理（可選）
const playHoverSound = () => {
  // 可以添加hover音效
}

const playClickSound = () => {
  // 可以添加點擊音效
}

// 顏色工具函數
const getCategoryIconColor = (color: string) => {
  const colorMap: Record<string, string> = {
    'purple-500': 'text-purple-400',
    'indigo-500': 'text-indigo-400', 
    'amber-500': 'text-amber-400'
  }
  return colorMap[color] || 'text-purple-400'
}

const getCategoryButtonClass = (color: string) => {
  return 'shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95'
}

const getCategoryGradient = (color: string) => {
  const gradientMap: Record<string, string> = {
    'purple-500': 'from-purple-600 to-purple-700',
    'indigo-500': 'from-indigo-600 to-indigo-700',
    'amber-500': 'from-amber-600 to-amber-700'
  }
  return gradientMap[color] || 'from-purple-600 to-purple-700'
}

const getCategoryHoverGradient = (color: string) => {
  const hoverGradientMap: Record<string, string> = {
    'purple-500': 'from-purple-500 to-purple-600',
    'indigo-500': 'from-indigo-500 to-indigo-600',
    'amber-500': 'from-amber-500 to-amber-600'
  }
  return hoverGradientMap[color] || 'from-purple-500 to-purple-600'
}

const getCategoryShadow = (color: string) => {
  const shadowMap: Record<string, string> = {
    'purple-500': 'shadow-purple-500/25',
    'indigo-500': 'shadow-indigo-500/25',
    'amber-500': 'shadow-amber-500/25'
  }
  return `shadow-xl ${shadowMap[color] || 'shadow-purple-500/25'}`
}

const getCategoryRipple = (color: string) => {
  const rippleMap: Record<string, string> = {
    'purple-500': 'bg-purple-400/30',
    'indigo-500': 'bg-indigo-400/30',
    'amber-500': 'bg-amber-400/30'
  }
  return rippleMap[color] || 'bg-purple-400/30'
}

const getCategoryBorder = (color: string) => {
  const borderMap: Record<string, string> = {
    'purple-500': 'border-purple-400/50',
    'indigo-500': 'border-indigo-400/50',
    'amber-500': 'border-amber-400/50'
  }
  return borderMap[color] || 'border-purple-400/50'
}
</script>

<style scoped>
/* 自定義動畫 */
@keyframes ripple {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(4);
    opacity: 0;
  }
}

@keyframes glow-pulse {
  0%, 100% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
}

.animate-ripple {
  animation: ripple 0.6s ease-out;
}

.animate-glow-pulse {
  animation: glow-pulse 2s ease-in-out infinite;
}

/* 按鈕 focus 狀態 */
button:focus {
  outline: none;
}

button:focus-visible {
  outline: 2px solid rgb(168 85 247);
  outline-offset: 2px;
}

/* 按鈕懸停時的額外效果 */
button:hover::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  animation: shine 1.5s ease-in-out;
}

@keyframes shine {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}
</style>