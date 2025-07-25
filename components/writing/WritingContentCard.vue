<template>
  <article 
    :id="content.id"
    :class="[
      'group relative overflow-hidden transition-all duration-500',
      'bg-gradient-to-br from-slate-800/70 to-slate-900/70 backdrop-blur-xl',
      'rounded-3xl border shadow-xl hover:shadow-2xl transform hover:scale-[1.01] active:scale-[0.99]',
      cardClasses,
      animationClasses
    ]"
    :style="animationStyle"
  >
    <!-- 背景裝飾效果 -->
    <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
      <div :class="['absolute inset-0 rounded-3xl', backgroundGradient]"></div>
    </div>
    
    <!-- 頂部裝飾條 -->
    <div 
      v-if="showTopBar"
      :class="[
        'absolute top-0 left-0 right-0 h-1 rounded-t-3xl',
        topBarGradient
      ]"
    ></div>
    
    <!-- 主要內容區域 -->
    <div class="relative z-10 p-6 md:p-8">
      
      <!-- 標題區域 -->
      <header class="flex items-start justify-between mb-6">
        <div class="flex items-start space-x-4 flex-1 min-w-0">
          <!-- 圖標 -->
          <div 
            v-if="content.icon || categoryIcon"
            :class="[
              'flex-shrink-0 rounded-xl flex items-center justify-center border transition-all duration-500',
              'group-hover:scale-110 group-hover:rotate-6',
              iconContainerClasses
            ]"
          >
            <Icon 
              :name="content.icon || categoryIcon" 
              :class="['transition-colors duration-300', iconClasses]"
            />
          </div>
          
          <!-- 標題和分類 -->
          <div class="flex-1 min-w-0">
            <h3 :class="['font-bold mb-2 border-b pb-2 transition-colors duration-300', titleClasses]">
              {{ content.title }}
            </h3>
            
            <!-- 分類標籤 -->
            <div v-if="content.category" class="flex items-center space-x-2">
              <span :class="['text-xs px-2 py-1 rounded-lg font-medium', categoryTagClasses]">
                {{ getCategoryName(content.category) }}
              </span>
              
              <!-- 其他標籤 -->
              <span 
                v-for="tag in content.tags" 
                :key="tag"
                class="text-xs px-2 py-1 bg-slate-700/50 text-gray-400 rounded-lg"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
        
        <!-- 右上角操作按鈕 -->
        <div v-if="showActions" class="flex items-center space-x-2 ml-4">
          <!-- 收藏按鈕 -->
          <button
            v-if="showFavorite" 
            @click="toggleFavorite"
            :class="[
              'p-2 rounded-lg transition-all duration-300 transform hover:scale-110 active:scale-95',
              isFavorited 
                ? 'bg-amber-500/25 text-amber-300 hover:bg-amber-500/35 shadow-lg shadow-amber-500/25' 
                : 'hover:bg-amber-500/20 text-gray-400 hover:text-amber-300 hover:shadow-md hover:shadow-amber-500/15'
            ]"
          >
            <Icon 
              :name="isFavorited ? 'heroicons:star-solid' : 'heroicons:star'" 
              class="w-5 h-5"
            />
          </button>
          
          <!-- 分享按鈕 -->
          <button
            v-if="showShare"
            @click="shareContent"
            class="p-2 rounded-lg hover:bg-amber-500/20 text-gray-400 hover:text-amber-300 transition-all duration-300 transform hover:scale-110 active:scale-95 hover:shadow-md hover:shadow-amber-500/15"
          >
            <Icon name="heroicons:share" class="w-5 h-5" />
          </button>
        </div>
      </header>
      
      <!-- 內容區域 -->
      <div class="prose prose-invert prose-amber max-w-none text-gray-300 leading-relaxed mb-6">
        <!-- 引用內容 -->
        <div 
          v-if="content.quote"
          class="bg-slate-700/20 rounded-xl p-4 border-l-4 border-amber-400/50 mb-6 italic"
        >
          <p class="text-lg text-gray-200 leading-relaxed">
            "{{ content.quote }}"
          </p>
        </div>
        
        <!-- HTML 內容 -->
        <div 
          v-if="content.content"
          v-html="content.content"
          class="writing-content"
        ></div>
        
        <!-- 純文字內容 -->
        <p v-else-if="content.text" class="text-base leading-relaxed">
          {{ content.text }}
        </p>
        
        <!-- 插槽內容 -->
        <slot name="content" :content="content" />
      </div>
      
      <!-- 底部資訊 -->
      <footer v-if="showFooter" class="pt-4 border-t border-slate-700/30">
        <div class="flex items-center justify-between text-sm">
          <!-- 左側資訊 -->
          <div class="flex items-center space-x-4 text-gray-500">
            <!-- 閱讀時間 -->
            <div v-if="content.readTime" class="flex items-center space-x-1">
              <Icon name="heroicons:clock" class="w-4 h-4" />
              <span>{{ content.readTime }} 分鐘</span>
            </div>
            
            <!-- 字數 -->
            <div v-if="content.wordCount" class="flex items-center space-x-1">
              <Icon name="heroicons:document-text" class="w-4 h-4" />
              <span>{{ content.wordCount }} 字</span>
            </div>
            
            <!-- 日期 -->
            <div v-if="content.date" class="flex items-center space-x-1">
              <Icon name="heroicons:calendar" class="w-4 h-4" />
              <span>{{ formatDate(content.date) }}</span>
            </div>
          </div>
          
          <!-- 右側操作 -->
          <div class="flex items-center space-x-2">
            <!-- 展開/收合按鈕 -->
            <button
              v-if="isExpandable"
              @click="toggleExpanded"
              :class="[
                'px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 transform hover:scale-105 active:scale-95',
                'border border-amber-500/40 hover:border-amber-400/70',
                'text-amber-400 hover:text-amber-200 hover:bg-amber-500/15 hover:shadow-md hover:shadow-amber-500/20'
              ]"
            >
              {{ isExpanded ? '收合' : '展開' }}
              <Icon 
                :name="isExpanded ? 'heroicons:chevron-up' : 'heroicons:chevron-down'"
                class="w-4 h-4 ml-1 transition-transform duration-300"
                :class="{ 'rotate-180': isExpanded }"
              />
            </button>
            
            <!-- 閱讀更多連結 -->
            <NuxtLink
              v-if="content.readMoreLink"
              :to="content.readMoreLink"
              class="px-3 py-1.5 rounded-lg text-xs font-medium bg-gradient-to-r from-amber-500/25 to-orange-500/25 text-amber-300 hover:text-amber-100 transition-all duration-300 border border-amber-500/40 hover:border-amber-400/70 transform hover:scale-105 active:scale-95 hover:shadow-md hover:shadow-amber-500/20"
            >
              閱讀更多
              <Icon name="heroicons:arrow-right" class="w-4 h-4 ml-1" />
            </NuxtLink>
          </div>
        </div>
      </footer>
    </div>
    
    <!-- 載入中狀態 -->
    <div 
      v-if="loading"
      class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm rounded-3xl flex items-center justify-center z-20"
    >
      <div class="flex items-center space-x-3 text-amber-400">
        <div class="w-6 h-6 border-2 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
        <span class="text-sm">載入中...</span>
      </div>
    </div>
    
    <!-- 滑鼠懸停時的發光效果 -->
    <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl">
      <div :class="['absolute inset-0 rounded-3xl blur-xl', glowEffect]"></div>
    </div>
  </article>
</template>

<script setup lang="ts">
interface ContentItem {
  id: string
  title: string
  content?: string
  text?: string
  quote?: string
  category?: string
  tags?: string[]
  icon?: string
  readTime?: number
  wordCount?: number
  date?: string | Date
  readMoreLink?: string
}

interface Props {
  content: ContentItem
  
  // 樣式變體
  variant?: 'default' | 'highlight' | 'subtle' | 'accent'
  size?: 'sm' | 'md' | 'lg'
  
  // 功能開關
  showActions?: boolean
  showFavorite?: boolean
  showShare?: boolean
  showFooter?: boolean
  showTopBar?: boolean
  
  // 狀態
  loading?: boolean
  favorited?: boolean
  expanded?: boolean
  expandable?: boolean
  
  // 動畫
  animationDelay?: number
  
  // 分類資料
  categories?: Array<{ key: string; name: string; icon?: string }>
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'md', 
  showActions: true,
  showFavorite: true,
  showShare: true,
  showFooter: true,
  showTopBar: true,
  loading: false,
  favorited: false,
  expanded: false,
  expandable: false,
  animationDelay: 0
})

const emit = defineEmits<{
  favorite: [contentId: string, favorited: boolean]
  share: [content: ContentItem]
  expand: [contentId: string, expanded: boolean]
}>()

// 響應式狀態
const isFavorited = ref(props.favorited)
const isExpanded = ref(props.expanded)

// 計算屬性
const isExpandable = computed(() => {
  return props.expandable || (props.content.content && props.content.content.length > 500)
})

const categoryIcon = computed(() => {
  if (!props.content.category || !props.categories) return 'heroicons:sparkles'
  const category = props.categories.find(c => c.key === props.content.category)
  return category?.icon || 'heroicons:sparkles'
})

const cardClasses = computed(() => {
  const variants = {
    default: 'border-amber-500/30 hover:border-amber-400/60 hover:shadow-amber-500/15',
    highlight: 'border-orange-500/40 hover:border-orange-400/70 ring-1 ring-amber-500/15 hover:shadow-orange-500/20',
    subtle: 'border-slate-600/40 hover:border-slate-500/60 hover:shadow-slate-500/10',
    accent: 'border-amber-400/50 hover:border-amber-300/80 bg-gradient-to-br from-amber-500/8 to-orange-500/8 hover:shadow-amber-400/25'
  }
  
  const sizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  }
  
  return [variants[props.variant], sizes[props.size]].join(' ')
})

const iconContainerClasses = computed(() => {
  const variants = {
    default: 'w-12 h-12 bg-gradient-to-br from-amber-500/20 to-orange-500/20 border-amber-500/30',
    highlight: 'w-14 h-14 bg-gradient-to-br from-orange-500/25 to-red-500/25 border-orange-500/40',
    subtle: 'w-10 h-10 bg-gradient-to-br from-slate-600/20 to-slate-700/20 border-slate-500/30',
    accent: 'w-16 h-16 bg-gradient-to-br from-amber-400/30 to-orange-400/30 border-amber-400/50'
  }
  return variants[props.variant]
})

const iconClasses = computed(() => {
  const variants = {
    default: 'w-6 h-6 text-amber-400',
    highlight: 'w-7 h-7 text-orange-400',
    subtle: 'w-5 h-5 text-slate-400',
    accent: 'w-8 h-8 text-amber-300'
  }
  return variants[props.variant]
})

const titleClasses = computed(() => {
  const variants = {
    default: 'text-2xl text-amber-400 border-amber-500/30',
    highlight: 'text-2xl text-orange-400 border-orange-500/30',
    subtle: 'text-xl text-slate-300 border-slate-600/30',
    accent: 'text-3xl text-amber-300 border-amber-400/40'
  }
  return variants[props.variant]
})

const categoryTagClasses = computed(() => {
  const variants = {
    default: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
    highlight: 'bg-orange-500/20 text-orange-300 border border-orange-500/30',
    subtle: 'bg-slate-600/20 text-slate-400 border border-slate-500/30',
    accent: 'bg-amber-400/25 text-amber-200 border border-amber-400/40'
  }
  return variants[props.variant]
})

const backgroundGradient = computed(() => {
  const variants = {
    default: 'bg-gradient-to-br from-amber-500/5 to-orange-500/5',
    highlight: 'bg-gradient-to-br from-orange-500/8 to-red-500/8',
    subtle: 'bg-gradient-to-br from-slate-600/5 to-slate-700/5',
    accent: 'bg-gradient-to-br from-amber-400/10 to-orange-400/10'
  }
  return variants[props.variant]
})

const topBarGradient = computed(() => {
  const variants = {
    default: 'bg-gradient-to-r from-amber-400 to-orange-400',
    highlight: 'bg-gradient-to-r from-orange-400 to-red-400',
    subtle: 'bg-gradient-to-r from-slate-500 to-slate-600',
    accent: 'bg-gradient-to-r from-amber-300 to-orange-300'
  }
  return variants[props.variant]
})

const glowEffect = computed(() => {
  const variants = {
    default: 'bg-gradient-to-br from-amber-500/20 to-orange-500/20',
    highlight: 'bg-gradient-to-br from-orange-500/25 to-red-500/25',
    subtle: 'bg-gradient-to-br from-slate-500/15 to-slate-600/15',
    accent: 'bg-gradient-to-br from-amber-400/30 to-orange-400/30'
  }
  return variants[props.variant]
})

const animationClasses = computed(() => {
  return 'animate-slide-in-up'
})

const animationStyle = computed(() => {
  return {
    animationDelay: `${props.animationDelay}ms`
  }
})

// 工具函數
const getCategoryName = (categoryKey: string) => {
  if (!props.categories) return categoryKey
  const category = props.categories.find(c => c.key === categoryKey)
  return category ? category.name : categoryKey
}

const formatDate = (date: string | Date) => {
  const d = new Date(date)
  return d.toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// 事件處理
const toggleFavorite = () => {
  isFavorited.value = !isFavorited.value
  emit('favorite', props.content.id, isFavorited.value)
}

const shareContent = () => {
  emit('share', props.content)
}

const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value
  emit('expand', props.content.id, isExpanded.value)
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

/* 內容樣式 */
.writing-content :deep(p) {
  margin-bottom: 1rem;
  line-height: 1.7;
}

.writing-content :deep(strong) {
  color: rgb(251 191 36);
  font-weight: 600;
}

.writing-content :deep(ul) {
  margin: 1rem 0;
  padding-left: 1.5rem;
}

.writing-content :deep(li) {
  margin-bottom: 0.5rem;
}

.writing-content :deep(.bg-slate-700\/30) {
  background-color: rgba(51, 65, 85, 0.3);
  padding: 1rem;
  border-radius: 0.75rem;
  border-left: 4px solid rgb(251 191 36);
  margin: 1rem 0;
}

/* 內容展開/收合動畫 */
.content-expandable {
  max-height: 300px;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
}

.content-expanded {
  max-height: none;
}
</style>