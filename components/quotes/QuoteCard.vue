<template>
  <article 
    class="group relative bg-gradient-to-br from-slate-900/90 via-slate-800/95 to-slate-900/90 backdrop-blur-xl rounded-2xl border border-amber-500/20 shadow-xl hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-500 transform hover:scale-[1.02] hover:border-amber-400/40 overflow-hidden"
    :class="[
      `animate-fade-in-up`,
      variant === 'featured' ? 'lg:col-span-2' : '',
      variant === 'compact' ? 'aspect-square' : ''
    ]"
    :style="{ animationDelay: `${animationDelay}ms` }"
  >
    <!-- 古典裝飾背景 -->
    <div class="absolute inset-0 opacity-20">
      <div class="absolute top-4 left-4 w-16 h-16 bg-gradient-to-br from-amber-400/30 to-amber-600/30 rounded-full blur-xl"></div>
      <div class="absolute bottom-4 right-4 w-12 h-12 bg-gradient-to-br from-amber-300/20 to-amber-500/20 rounded-full blur-lg"></div>
      <div class="absolute top-1/2 right-8 w-8 h-8 bg-gradient-to-br from-amber-500/25 to-amber-700/25 rounded-full blur-md animate-pulse-gentle"></div>
    </div>

    <!-- 古典邊框裝飾 -->
    <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent"></div>
    <div class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent"></div>
    
    <!-- 主要內容區域 -->
    <div class="relative z-10 p-6 h-full flex flex-col">
      
      <!-- 引用符號裝飾 -->
      <div class="flex justify-between items-start mb-4">
        <div class="text-6xl text-amber-400/30 font-serif leading-none select-none">"</div>
        <div class="flex items-center space-x-2">
          <!-- 分類標籤 -->
          <span 
            class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-500/20 text-amber-300 border border-amber-500/30 transition-all duration-300 group-hover:bg-amber-500/30 group-hover:border-amber-400/50"
          >
            <Icon :name="categoryIcon" class="w-3 h-3 mr-1" />
            {{ category }}
          </span>
          
          <!-- 收藏按鈕 -->
          <button
            @click="toggleFavorite"
            class="p-2 rounded-full transition-all duration-300 hover:bg-amber-500/20 hover:scale-110 active:scale-95 group/fav"
            :class="isFavorited ? 'text-amber-400' : 'text-gray-400 hover:text-amber-300'"
          >
            <Icon 
              :name="isFavorited ? 'heroicons:heart-solid' : 'heroicons:heart'" 
              class="w-5 h-5 transition-all duration-300 group-hover/fav:animate-pulse" 
            />
          </button>
        </div>
      </div>

      <!-- 名言內容 -->
      <blockquote class="flex-1 mb-6">
        <p class="text-lg md:text-xl leading-relaxed text-gray-100 font-medium italic tracking-wide">
          {{ quote.content }}
        </p>
      </blockquote>

      <!-- 作者信息 -->
      <footer class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <!-- 作者頭像 -->
          <div class="w-12 h-12 bg-gradient-to-br from-amber-500/30 to-amber-700/30 rounded-full flex items-center justify-center border-2 border-amber-500/40 group-hover:border-amber-400/60 transition-all duration-300">
            <Icon name="heroicons:user" class="w-6 h-6 text-amber-300" />
          </div>
          
          <!-- 作者名稱和描述 -->
          <div>
            <cite class="text-amber-300 font-semibold text-base not-italic">
              {{ quote.author }}
            </cite>
            <p v-if="quote.source" class="text-gray-400 text-sm">
              {{ quote.source }}
            </p>
          </div>
        </div>

        <!-- 操作按鈕 -->
        <div class="flex items-center space-x-2">
          
          <!-- 分享按鈕 -->
          <button
            @click="handleShare"
            class="p-2 rounded-full text-gray-400 hover:text-amber-300 hover:bg-amber-500/20 transition-all duration-300 hover:scale-110 active:scale-95 group/share"
          >
            <Icon name="heroicons:share" class="w-5 h-5 transition-all duration-300 group-hover/share:rotate-12" />
          </button>

          <!-- 複製按鈕 -->
          <button
            @click="handleCopy"
            class="p-2 rounded-full text-gray-400 hover:text-amber-300 hover:bg-amber-500/20 transition-all duration-300 hover:scale-110 active:scale-95 group/copy relative"
          >
            <Icon 
              :name="copied ? 'heroicons:check' : 'heroicons:clipboard-document'" 
              class="w-5 h-5 transition-all duration-300" 
              :class="copied ? 'text-green-400' : 'group-hover/copy:scale-110'"
            />
            
            <!-- 複製成功提示 -->
            <div 
              v-if="copied" 
              class="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-green-400 text-xs rounded whitespace-nowrap border border-green-500/30 animate-fade-in-up"
            >
              已複製
            </div>
          </button>

          <!-- 展開/收合按鈕 -->
          <button
            v-if="variant === 'compact'"
            @click="toggleExpanded"
            class="p-2 rounded-full text-gray-400 hover:text-amber-300 hover:bg-amber-500/20 transition-all duration-300 hover:scale-110 active:scale-95 group/expand"
          >
            <Icon 
              :name="isExpanded ? 'heroicons:chevron-up' : 'heroicons:chevron-down'" 
              class="w-5 h-5 transition-all duration-300 group-hover/expand:scale-110" 
            />
          </button>
        </div>
      </footer>

      <!-- 標籤區域 -->
      <div v-if="quote.tags && quote.tags.length" class="mt-4 pt-4 border-t border-amber-500/20">
        <div class="flex flex-wrap gap-2">
          <span 
            v-for="tag in quote.tags" 
            :key="tag"
            class="inline-flex items-center px-2 py-1 rounded-lg text-xs text-amber-200 bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/20 hover:border-amber-400/30 transition-all duration-300 cursor-pointer transform hover:scale-105"
            @click="$emit('tag-click', tag)"
          >
            <Icon name="heroicons:hashtag" class="w-3 h-3 mr-1 opacity-70" />
            {{ tag }}
          </span>
        </div>
      </div>
    </div>

    <!-- 鼠標懸停發光效果 -->
    <div class="absolute inset-0 bg-gradient-to-br from-amber-400/5 to-amber-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"></div>
    
    <!-- 邊框發光效果 -->
    <div class="absolute -inset-1 bg-gradient-to-r from-amber-500/20 via-amber-400/20 to-amber-500/20 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10"></div>
  </article>
</template>

<script setup lang="ts">
interface Quote {
  id: string
  content: string
  author: string
  source?: string
  category: string
  tags?: string[]
  createdAt?: string
}

interface Props {
  quote: Quote
  variant?: 'default' | 'featured' | 'compact'
  animationDelay?: number
}

interface Emits {
  (e: 'favorite', quoteId: string, favorited: boolean): void
  (e: 'share', quote: Quote): void
  (e: 'copy', quote: Quote): void
  (e: 'expand', quoteId: string, expanded: boolean): void
  (e: 'tag-click', tag: string): void
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  animationDelay: 0
})

const emit = defineEmits<Emits>()

// 響應式狀態
const isFavorited = ref(false)
const isExpanded = ref(false)
const copied = ref(false)

// 計算屬性
const categoryIcon = computed(() => {
  const iconMap: Record<string, string> = {
    '哲學': 'heroicons:academic-cap',
    '人生': 'heroicons:heart',
    '成功': 'heroicons:trophy',
    '智慧': 'heroicons:light-bulb',
    '愛情': 'heroicons:heart',
    '友誼': 'heroicons:user-group',
    '勇氣': 'heroicons:bolt',
    '希望': 'heroicons:sun',
    '真理': 'heroicons:eye',
    '自由': 'heroicons:paper-airplane'
  }
  return iconMap[props.quote.category] || 'heroicons:chat-bubble-oval-left-ellipsis'
})

const category = computed(() => props.quote.category)

// 方法
const toggleFavorite = () => {
  isFavorited.value = !isFavorited.value
  emit('favorite', props.quote.id, isFavorited.value)
}

const handleShare = () => {
  emit('share', props.quote)
}

const handleCopy = async () => {
  try {
    const text = `"${props.quote.content}" —— ${props.quote.author}`
    
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text)
    } else {
      // 降級處理
      const textArea = document.createElement('textarea')
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
    }
    
    copied.value = true
    emit('copy', props.quote)
    
    // 2秒後恢復圖標
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (error) {
    console.error('複製失敗:', error)
  }
}

const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value
  emit('expand', props.quote.id, isExpanded.value)
}
</script>

<style scoped>
/* 自定義動畫 */
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

@keyframes pulse-gentle {
  0%, 100% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out forwards;
  opacity: 0;
}

.animate-pulse-gentle {
  animation: pulse-gentle 3s ease-in-out infinite;
}

/* 引用符號特殊樣式 */
blockquote p::before {
  content: '';
}

blockquote p::after {
  content: '';
}

/* 古典風格文字陰影 */
.text-amber-300 {
  text-shadow: 0 0 10px rgba(251, 191, 36, 0.3);
}

/* 特殊變體樣式 */
article.featured {
  background: linear-gradient(135deg, 
    rgba(15, 23, 42, 0.95) 0%, 
    rgba(30, 41, 59, 0.97) 50%, 
    rgba(15, 23, 42, 0.95) 100%);
}

article.compact {
  min-height: 280px;
}

/* 懸停時的特殊效果 */
.group:hover .text-6xl {
  color: rgba(251, 191, 36, 0.5);
  text-shadow: 0 0 20px rgba(251, 191, 36, 0.3);
  transition: all 0.5s ease;
}
</style>