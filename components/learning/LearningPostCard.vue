<template>
  <article 
    :id="post.id"
    :class="[
      'group relative overflow-hidden transition-all duration-300',
      'bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl',
      'rounded-2xl border border-cyan-500/20 shadow-xl',
      'hover:border-cyan-400/40 hover:shadow-2xl hover:shadow-cyan-500/10',
      'transform hover:scale-[1.01] active:scale-[0.99]',
      cardClasses
    ]"
    :style="animationStyle"
  >
    <!-- 頂部發光條 -->
    <div 
      class="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
    ></div>
    
    <!-- 背景裝飾效果 -->
    <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
      <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/5 to-blue-500/5"></div>
    </div>
    
    <!-- 主要內容區域 -->
    <div class="relative z-10 p-6">
      
      <!-- 頭部資訊 -->
      <header class="flex items-start justify-between mb-4">
        <!-- 左側：標題和時間 -->
        <div class="flex-1 min-w-0">
          <!-- 標題 -->
          <h2 
            :class="[
              'font-bold mb-2 transition-colors duration-300 line-clamp-2',
              'group-hover:text-cyan-300',
              titleClasses
            ]"
          >
            {{ post.title }}
          </h2>
          
          <!-- 時間和元數據 -->
          <div class="flex items-center space-x-4 text-sm text-gray-400">
            <time 
              :datetime="post.date"
              class="flex items-center space-x-1 group-hover:text-cyan-400 transition-colors duration-300"
            >
              <Icon name="heroicons:clock" class="w-4 h-4" />
              <span>{{ formatDate(post.date) }}</span>
            </time>
            
            <!-- 閱讀時間 -->
            <div 
              v-if="post.readTime"
              class="flex items-center space-x-1 text-gray-500"
            >
              <Icon name="heroicons:book-open" class="w-4 h-4" />
              <span>{{ post.readTime }} 分鐘</span>
            </div>
            
            <!-- 字數統計 -->
            <div 
              v-if="post.wordCount"
              class="flex items-center space-x-1 text-gray-500"
            >
              <Icon name="heroicons:document-text" class="w-4 h-4" />
              <span>{{ post.wordCount }} 字</span>
            </div>
          </div>
        </div>
        
        <!-- 右側：操作按鈕 -->
        <div class="flex items-center space-x-2 ml-4">
          <!-- 分享按鈕 -->
          <button
            @click="sharePost"
            class="p-2 rounded-lg text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/20 transition-all duration-300 transform hover:scale-110 active:scale-95"
            aria-label="分享發文"
          >
            <Icon name="heroicons:share" class="w-5 h-5" />
          </button>
          
          <!-- 收藏按鈕 -->
          <button
            @click="toggleFavorite"
            :class="[
              'p-2 rounded-lg transition-all duration-300 transform hover:scale-110 active:scale-95',
              isFavorited
                ? 'text-amber-400 bg-amber-500/20 hover:bg-amber-500/30'
                : 'text-gray-400 hover:text-amber-400 hover:bg-amber-500/20'
            ]"
            aria-label="收藏發文"
          >
            <Icon 
              :name="isFavorited ? 'heroicons:star-solid' : 'heroicons:star'" 
              class="w-5 h-5"
            />
          </button>
        </div>
      </header>
      
      <!-- 內容區域 -->
      <div class="prose prose-slate prose-invert max-w-none">
        <!-- 摘要或完整內容 -->
        <div 
          v-if="post.excerpt && !isExpanded"
          class="text-gray-300 leading-relaxed mb-4"
        >
          <p v-for="(paragraph, index) in excerptParagraphs" :key="index" class="mb-3">
            {{ paragraph }}
          </p>
        </div>
        
        <!-- 完整內容 -->
        <div 
          v-if="isExpanded || !post.excerpt"
          class="text-gray-300 leading-relaxed"
        >
          <p 
            v-for="(paragraph, index) in contentParagraphs" 
            :key="index" 
            class="mb-4 leading-relaxed"
            v-html="formatParagraph(paragraph)"
          ></p>
        </div>
      </div>
      
      <!-- 標籤和展開按鈕 -->
      <footer class="mt-6 pt-4 border-t border-slate-700/30">
        <!-- 標籤區域 -->
        <div v-if="post.tags && post.tags.length > 0" class="mb-4">
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tag in post.tags"
              :key="tag"
              class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/30 hover:text-cyan-100 transition-all duration-300 transform hover:scale-105"
            >
              <Icon name="heroicons:hashtag" class="w-3 h-3 mr-1" />
              {{ tag }}
            </span>
          </div>
        </div>
        
        <!-- 展開/收合按鈕 -->
        <div v-if="post.excerpt" class="flex justify-between items-center">
          <button
            @click="toggleExpanded"
            :class="[
              'inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300',
              'border border-cyan-500/40 text-cyan-400 hover:text-cyan-200',
              'hover:bg-cyan-500/15 hover:border-cyan-400/60',
              'transform hover:scale-105 active:scale-95',
              'hover:shadow-md hover:shadow-cyan-500/20'
            ]"
          >
            <span>{{ isExpanded ? '收合' : '閱讀全文' }}</span>
            <Icon 
              :name="isExpanded ? 'heroicons:chevron-up' : 'heroicons:chevron-down'"
              class="w-4 h-4 ml-2 transition-transform duration-300"
              :class="{ 'rotate-180': isExpanded }"
            />
          </button>
          
          <!-- 字數統計 -->
          <div class="text-xs text-gray-500 flex items-center space-x-1">
            <Icon name="heroicons:document-text" class="w-3 h-3" />
            <span>{{ post.content.length }} 字符</span>
          </div>
        </div>
      </footer>
    </div>
    
    <!-- 滑鼠懸停時的發光效果 -->
    <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl">
      <div class="absolute inset-0 rounded-2xl blur-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10"></div>
    </div>
  </article>
</template>

<script setup lang="ts">
interface Post {
  id: string
  title: string
  content: string
  excerpt?: string
  date: string | Date
  readTime?: number
  wordCount?: number
  tags?: string[]
}

interface Props {
  post: Post
  
  // 樣式變體
  variant?: 'default' | 'featured' | 'compact'
  
  // 狀態
  favorited?: boolean
  expanded?: boolean
  
  // 動畫
  animationDelay?: number
  
  // 功能開關
  showActions?: boolean
  showMetadata?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  favorited: false,
  expanded: false,
  animationDelay: 0,
  showActions: true,
  showMetadata: true
})

const emit = defineEmits<{
  share: [post: Post]
  favorite: [postId: string, favorited: boolean]
  expand: [postId: string, expanded: boolean]
}>()

// 響應式狀態
const isFavorited = ref(props.favorited)
const isExpanded = ref(props.expanded)

// 計算屬性
const cardClasses = computed(() => {
  const variants = {
    default: '',
    featured: 'ring-2 ring-cyan-500/30 ring-offset-2 ring-offset-slate-950',
    compact: 'p-4'
  }
  return variants[props.variant]
})

const titleClasses = computed(() => {
  const variants = {
    default: 'text-xl text-cyan-400',
    featured: 'text-2xl text-cyan-300',
    compact: 'text-lg text-cyan-400'
  }
  return variants[props.variant]
})

const animationStyle = computed(() => {
  return {
    animationDelay: `${props.animationDelay}ms`
  }
})

// 處理內容分段
const splitIntoSentences = (text: string): string[] => {
  // 按句號、問號、驚嘆號分割，但保留標點符號
  return text.split(/([。？！])/).reduce((acc: string[], curr, index, array) => {
    if (index % 2 === 0) {
      // 文字部分
      if (curr.trim()) {
        const sentence = curr.trim() + (array[index + 1] || '')
        acc.push(sentence)
      }
    }
    return acc
  }, []).filter(sentence => sentence.trim().length > 0)
}

const contentParagraphs = computed(() => {
  return splitIntoSentences(props.post.content)
})

const excerptParagraphs = computed(() => {
  if (!props.post.excerpt) return []
  return splitIntoSentences(props.post.excerpt)
})

// 工具函數
const formatDate = (date: string | Date) => {
  const d = new Date(date)
  const now = new Date()
  const diffInMs = now.getTime() - d.getTime()
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
  
  if (diffInDays === 0) {
    return '今天'
  } else if (diffInDays === 1) {
    return '昨天'
  } else if (diffInDays < 7) {
    return `${diffInDays} 天前`
  } else {
    return d.toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }
}

const formatParagraph = (paragraph: string) => {
  // 將 strong 標記轉換為帶樣式的 span
  return paragraph
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-cyan-300 font-semibold">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="text-cyan-400 italic">$1</em>')
}

// 事件處理
const toggleFavorite = () => {
  isFavorited.value = !isFavorited.value
  emit('favorite', props.post.id, isFavorited.value)
}

const sharePost = () => {
  emit('share', props.post)
}

const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value
  emit('expand', props.post.id, isExpanded.value)
}

// 監聽 props 變化
watch(() => props.favorited, (newVal) => {
  isFavorited.value = newVal
})

watch(() => props.expanded, (newVal) => {
  isExpanded.value = newVal
})
</script>

<style scoped>
/* 限制行數 */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 滑入動畫 */
@keyframes slide-in-up {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-in-up {
  animation: slide-in-up 0.6s ease-out forwards;
}
</style>