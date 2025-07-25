<template>
  <div class="w-full lg:w-80 shrink-0">
    <div class="sticky top-24 space-y-6 max-h-[calc(100vh-8rem)] overflow-hidden z-30">
      
      <!-- 目錄導航卡片 -->
      <div class="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-3xl p-6 border border-amber-500/30 shadow-2xl hover:border-amber-400/60 hover:shadow-amber-500/10 transition-all duration-500 group">
        <!-- 標題 -->
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-bold text-amber-400 flex items-center group-hover:text-amber-300 transition-colors duration-300">
            <Icon name="heroicons:list-bullet" class="w-6 h-6 mr-3 group-hover:scale-110 transition-transform duration-300" />
            目錄導航
          </h3>
          
          <!-- 摺疊按鈕 -->
          <button
            @click="isCollapsed = !isCollapsed"
            class="p-2 rounded-lg hover:bg-amber-500/20 hover:text-amber-300 transition-all duration-300 lg:hidden transform hover:scale-110 active:scale-95"
          >
            <Icon 
              :name="isCollapsed ? 'heroicons:chevron-down' : 'heroicons:chevron-up'" 
              class="w-5 h-5 text-gray-400 transition-transform duration-300"
            />
          </button>
        </div>
        
        <!-- 導航內容 -->
        <div 
          :class="[
            'transition-all duration-300 overflow-hidden',
            isCollapsed ? 'max-h-0 lg:max-h-none' : 'max-h-96'
          ]"
        >
          <!-- 進度條（可選） -->
          <div v-if="showProgress" class="mb-6">
            <div class="flex items-center justify-between text-sm text-gray-400 mb-2">
              <span>閱讀進度</span>
              <span>{{ Math.round(readingProgress) }}%</span>
            </div>
            <div class="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
              <div 
                class="h-full bg-gradient-to-r from-amber-400 to-orange-400 transition-all duration-300 rounded-full"
                :style="{ width: `${readingProgress}%` }"
              ></div>
            </div>
          </div>
          
          <!-- 目錄清單 -->
          <nav class="space-y-1 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-amber-500/30">
            <a
              v-for="(item, index) in tocItems"
              :key="item.id || index"
              :href="`#${item.id}`"
              @click.prevent="scrollToSection(item.id)"
              :class="[
                'group block p-3 rounded-xl text-sm transition-all duration-300 border relative overflow-hidden transform hover:scale-[1.02] active:scale-[0.98]',
                activeSection === item.id
                  ? 'bg-gradient-to-r from-amber-500/25 to-orange-500/25 text-amber-200 border-amber-400/60 shadow-lg shadow-amber-500/20'
                  : 'text-gray-400 hover:text-amber-200 hover:bg-gradient-to-r hover:from-amber-500/15 hover:to-orange-500/15 border-transparent hover:border-amber-500/40 hover:shadow-md hover:shadow-amber-500/10'
              ]"
            >
              <!-- 背景動畫效果 -->
              <div 
                v-if="activeSection === item.id"
                class="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10 animate-pulse"
              ></div>
              
              <!-- 內容 -->
              <div class="relative z-10">
                <!-- 標題 -->
                <div class="font-medium truncate flex items-center">
                  <!-- 層級指示器 -->
                  <div 
                    v-if="item.level && item.level > 1"
                    class="flex mr-2"
                  >
                    <div 
                      v-for="n in (item.level - 1)" 
                      :key="n"
                      class="w-0.5 h-4 bg-gray-600 mr-1 last:mr-0"
                    ></div>
                  </div>
                  
                  <!-- 項目圖標 -->
                  <div 
                    :class="[
                      'w-2 h-2 rounded-full mr-3 transition-all duration-300',
                      activeSection === item.id 
                        ? 'bg-amber-300 shadow-lg shadow-amber-300/60 animate-pulse' 
                        : 'bg-gray-500 group-hover:bg-amber-400 group-hover:shadow-sm group-hover:shadow-amber-400/40'
                    ]"
                  ></div>
                  
                  <span class="flex-1 truncate">{{ item.title }}</span>
                </div>
                
                <!-- 副標題或分類 -->
                <div 
                  v-if="item.subtitle || item.category"
                  class="text-xs text-gray-500 mt-1 ml-5 truncate"
                >
                  {{ item.subtitle || getCategoryName(item.category) }}
                </div>
              </div>
              
              <!-- 右側指示器 -->
              <div 
                v-if="activeSection === item.id"
                class="absolute right-2 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-amber-400 to-orange-400 rounded-full"
              ></div>
            </a>
          </nav>
        </div>
      </div>
      
      <!-- 統計資訊卡片（可選） -->
      <div 
        v-if="showStats"
        class="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-3xl p-6 border border-amber-500/20 shadow-xl"
      >
        <h3 class="text-lg font-bold text-amber-400 mb-4 flex items-center">
          <Icon name="heroicons:chart-bar" class="w-5 h-5 mr-3" />
          統計資訊
        </h3>
        
        <div class="space-y-3">
          <div class="flex justify-between items-center">
            <span class="text-gray-400">總內容數</span>
            <span class="text-amber-400 font-bold">{{ tocItems.length }}</span>
          </div>
          <div v-if="categories && categories.length > 0" class="flex justify-between items-center">
            <span class="text-gray-400">分類數</span>
            <span class="text-orange-400 font-bold">{{ categories.length }}</span>
          </div>
          <div v-if="filteredCount !== undefined" class="flex justify-between items-center">
            <span class="text-gray-400">顯示中</span>
            <span class="text-yellow-400 font-bold">{{ filteredCount }}</span>
          </div>
        </div>
      </div>

      <!-- 快捷操作（可選） -->
      <div v-if="showActions" class="space-y-3">
        <!-- 回到頂部按鈕 -->
        <WritingButton
          variant="outline"
          size="sm"
          leftIcon="heroicons:arrow-up"
          text="回到頂部"
          @click="scrollToTop"
          class="w-full"
        />
        
        <!-- 自定義操作插槽 -->
        <slot name="actions" />
        
        <!-- 返回連結 -->
        <WritingButton
          v-if="backLink"
          :href="backLink.href"
          variant="secondary"
          size="sm"
          leftIcon="heroicons:arrow-left"
          :text="backLink.text || '返回'"
          class="w-full"
        />
      </div>
      
    </div>
  </div>
</template>

<script setup lang="ts">
interface TocItem {
  id: string
  title: string
  subtitle?: string
  category?: string
  level?: number // 層級深度，用於嵌套顯示
}

interface BackLink {
  href: string
  text?: string
}

interface Props {
  // 必要資料
  tocItems: TocItem[]
  activeSection: string
  
  // 可選功能
  showProgress?: boolean
  showStats?: boolean
  showActions?: boolean
  
  // 統計資料
  categories?: Array<{ key: string; name: string }>
  filteredCount?: number
  
  // 返回連結
  backLink?: BackLink
  
  // 進度追蹤
  readingProgress?: number
}

const props = withDefaults(defineProps<Props>(), {
  showProgress: true,
  showStats: true,
  showActions: true,
  readingProgress: 0
})

const emit = defineEmits<{
  sectionClick: [sectionId: string]
}>()

// 響應式狀態
const isCollapsed = ref(false)

// 工具函數
const getCategoryName = (categoryKey?: string) => {
  if (!categoryKey || !props.categories) return '其他'
  const category = props.categories.find(c => c.key === categoryKey)
  return category ? category.name : '其他'
}

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start',
      inline: 'nearest'
    })
    emit('sectionClick', sectionId)
  }
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// 響應式處理
onMounted(() => {
  // 在小屏幕上默認摺疊
  const handleResize = () => {
    if (window.innerWidth < 1024) {
      isCollapsed.value = true
    } else {
      isCollapsed.value = false
    }
  }
  
  handleResize()
  window.addEventListener('resize', handleResize)
  
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })
})
</script>

<style scoped>
/* 自定義滾動條 */
.scrollbar-thin::-webkit-scrollbar {
  width: 6px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: rgba(30, 41, 59, 0.3);
  border-radius: 10px;
}

.scrollbar-thumb-amber-500\/30::-webkit-scrollbar-thumb {
  background: rgba(245, 158, 11, 0.3);
  border-radius: 10px;
}

.scrollbar-thumb-amber-500\/30::-webkit-scrollbar-thumb:hover {
  background: rgba(245, 158, 11, 0.5);
}

/* 平滑的高度過渡 */
.max-h-96 {
  max-height: 24rem;
}

.max-h-0 {
  max-height: 0;
}

/* 層級指示器動畫 */
@keyframes level-indicator {
  0%, 100% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
}
</style>