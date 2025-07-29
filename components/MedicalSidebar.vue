<template>
  <!-- 醫療專業風格側邊欄 -->
  <div 
    class="fixed top-16 right-0 h-[calc(100vh-4rem)] z-50 transition-all duration-700 ease-out"
    :class="[
      isCollapsed ? 'w-16' : 'w-96',
      'md:translate-x-0'
    ]"
  >
    <!-- 收合觸發器 - 醫療設備風格 -->
    <div 
      v-if="isCollapsed"
      class="absolute left-0 top-1/2 -translate-y-1/2 h-32 w-16 cursor-pointer group transition-all duration-500"
      @click="isCollapsed = false"
      @mouseenter="triggerHover = true"
      @mouseleave="triggerHover = false"
    >
      <!-- 醫療觸發面板 -->
      <div class="relative w-full h-full">
        <div 
          class="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-teal-900/20 to-slate-900/95 backdrop-blur-xl border-l border-y border-teal-500/40 rounded-l-2xl shadow-2xl transition-all duration-500 overflow-hidden"
          :class="triggerHover ? 'border-teal-400/80 shadow-[0_0_30px_rgba(20,184,166,0.3)]' : ''"
        >
          <!-- 醫療能量指示條 -->
          <div 
            class="absolute left-1 top-1/2 -translate-y-1/2 w-1 h-16 bg-gradient-to-b from-teal-400/60 via-cyan-500/80 to-emerald-500/60 rounded-full transition-all duration-500"
            :class="triggerHover ? 'w-1.5 shadow-[0_0_20px_rgba(20,184,166,0.8)] animate-pulse' : ''"
          >
            <!-- 醫療脈衝點 -->
            <div class="absolute top-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-teal-300 rounded-full animate-ping"></div>
            <div class="absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-emerald-300 rounded-full animate-ping" style="animation-delay: 0.7s;"></div>
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-cyan-300 rounded-full animate-ping" style="animation-delay: 1.2s;"></div>
          </div>
          
          <!-- 醫療圖示 -->
          <div 
            class="absolute right-2 top-1/2 -translate-y-1/2 transition-all duration-500"
            :class="triggerHover ? 'scale-110 text-teal-300' : 'text-gray-400'"
          >
            <Icon name="heroicons:heart" class="w-6 h-6" />
          </div>
          
          <!-- 醫療提示標籤 -->
          <div 
            class="absolute left-20 top-1/2 -translate-y-1/2 transition-all duration-500 transform"
            :class="triggerHover ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'"
          >
            <div class="bg-slate-900/95 backdrop-blur-sm border border-teal-500/50 rounded-xl px-4 py-2 shadow-2xl">
              <div class="text-sm text-teal-300 font-medium">保健品目錄</div>
              <div class="text-xs text-gray-400 mt-1">點擊展開</div>
            </div>
            <!-- 醫療箭頭 -->
            <div class="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-8 border-transparent border-r-teal-500/50"></div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 主側邊欄面板 - 醫療控制台風格 -->
    <div 
      class="ml-16 h-full relative transition-all duration-700 ease-out"
      :class="isCollapsed ? 'opacity-0 translate-x-full pointer-events-none' : 'opacity-100 translate-x-0'"
    >
      <!-- 關閉按鈕 -->
      <button
        @click="isCollapsed = true"
        class="absolute -left-12 top-4 w-8 h-8 bg-slate-900/95 backdrop-blur-sm border border-red-500/40 rounded-full flex items-center justify-center text-red-400 hover:text-red-300 hover:border-red-400/60 transition-all duration-300 z-10 group"
      >
        <Icon name="heroicons:x-mark" class="w-4 h-4" />
        <div class="absolute inset-0 bg-red-500/10 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse"></div>
      </button>
      
      <!-- 主面板容器 -->
      <div class="w-full h-full relative">
        <!-- 醫療能量護盾 -->
        <div class="absolute -inset-2 bg-gradient-to-br from-teal-500/10 via-cyan-500/5 to-emerald-500/10 rounded-2xl blur-lg animate-pulse-slow"></div>
        
        <!-- 主面板結構 -->
        <div class="relative w-full h-full bg-gradient-to-br from-slate-900/98 via-slate-800/95 to-slate-900/98 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
          
          <!-- 醫療狀態條 -->
          <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500/60 via-cyan-500/80 to-emerald-500/60">
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-scan-line"></div>
          </div>
          
          <!-- 頂部標題區 -->
          <div class="flex-shrink-0 border-b border-slate-700/60 bg-slate-900/80 p-4">
            <!-- 醫療系統標題 -->
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center space-x-2 text-sm text-slate-400 font-mono">
                <div class="w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse shadow-[0_0_6px_rgba(20,184,166,0.6)]"></div>
                <span class="tracking-wide">MEDICAL_NAVIGATOR</span>
              </div>
              <div class="text-xs font-mono text-slate-500">{{ totalItems }} ITEMS</div>
            </div>
            
            <!-- 搜尋框 -->
            <div class="relative mb-4">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="搜尋保健品分類..."
                class="w-full bg-slate-800/60 border border-slate-600/40 rounded-lg px-3 py-2 pl-10 text-sm text-white placeholder-slate-400 focus:border-teal-400/60 focus:outline-none focus:ring-1 focus:ring-teal-400/40 transition-all duration-300"
                @focus="searchFocused = true"
                @blur="searchFocused = false"
              />
              <Icon 
                name="heroicons:magnifying-glass" 
                class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300"
                :class="searchFocused ? 'text-teal-400' : 'text-slate-400'"
              />
              <!-- 搜尋清除按鈕 -->
              <button
                v-if="searchQuery"
                @click="searchQuery = ''"
                class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 hover:text-teal-400 transition-colors duration-200"
              >
                <Icon name="heroicons:x-mark" class="w-4 h-4" />
              </button>
            </div>
            
            <!-- 分類篩選 -->
            <div class="space-y-2">
              <div class="text-xs text-slate-400 font-mono tracking-wide">CATEGORY_FILTER</div>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="category in supplementCategories"
                  :key="category.key"
                  @click="selectedCategory = category.key"
                  class="px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-300 border"
                  :class="selectedCategory === category.key 
                    ? 'bg-teal-500/20 border-teal-400/60 text-teal-300 shadow-[0_0_8px_rgba(20,184,166,0.3)]' 
                    : 'bg-slate-800/40 border-slate-600/40 text-slate-400 hover:bg-teal-500/10 hover:border-teal-500/40 hover:text-teal-300'"
                >
                  <Icon :name="category.icon" class="w-3 h-3 inline mr-1" />
                  {{ category.name }}
                  <span class="ml-1 text-xs opacity-70">({{ category.count }})</span>
                </button>
              </div>
            </div>
          </div>
          
          <!-- 目錄內容區域 -->
          <div class="flex-1 overflow-hidden relative">
            <!-- 滾動容器 -->
            <div 
              ref="scrollContainer"
              class="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-teal-500/30 scrollbar-track-slate-800/30 px-2 py-2"
              @scroll="updateScrollPosition"
            >
              <div class="space-y-1">
                <!-- 保健品項目 -->
                <div
                  v-for="(item, index) in filteredTocItems"
                  :key="item.id"
                  class="group relative"
                >
                  <div
                    @click="handleSectionClick(item.id)"
                    class="w-full text-left py-3 px-3 transition-all duration-300 relative overflow-hidden cursor-pointer border-l-2 rounded-r-lg"
                    :class="getItemClasses(item)"
                  >
                    <!-- 醫療背景效果 -->
                    <div v-if="activeSection === item.id" class="absolute inset-0 opacity-20">
                      <div 
                        v-for="line in 3" :key="line"
                        class="absolute w-full h-px bg-gradient-to-r from-transparent via-teal-400/60 to-transparent animate-medical-scan"
                        :style="{ 
                          top: `${line * 30}%`,
                          animationDelay: `${line * 0.6}s`,
                          animationDuration: '2.5s'
                        }"
                      ></div>
                    </div>
                    
                    <div class="relative z-10 flex items-start space-x-3">
                      <!-- 醫療狀態指示器 -->
                      <div class="flex-shrink-0 relative pt-1">
                        <div 
                          class="w-1.5 h-4 transition-all duration-300 rounded-full"
                          :class="activeSection === item.id 
                            ? 'bg-gradient-to-b from-teal-400 to-emerald-400 shadow-[0_0_8px_rgba(20,184,166,0.6)]' 
                            : 'bg-slate-600/60 group-hover:bg-teal-500/40'"
                        >
                          <!-- 醫療脈衝效果 -->
                          <div 
                            v-if="activeSection === item.id"
                            class="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-transparent animate-medical-pulse rounded-full"
                          ></div>
                        </div>
                      </div>
                      
                      <!-- 分類圖示 -->
                      <div class="flex-shrink-0 pt-0.5">
                        <div 
                          class="w-5 h-5 rounded-md flex items-center justify-center transition-all duration-300"
                          :class="activeSection === item.id 
                            ? 'bg-teal-500/20 text-teal-300' 
                            : 'bg-slate-700/50 text-slate-400 group-hover:bg-teal-500/10 group-hover:text-teal-400'"
                        >
                          <Icon :name="getCategoryIcon(item.category)" class="w-3 h-3" />
                        </div>
                      </div>
                      
                      <!-- 項目內容 -->
                      <div class="flex-1 min-w-0">
                        <div class="flex items-center justify-between">
                          <span 
                            class="text-sm font-medium leading-relaxed transition-colors duration-200 block"
                            :class="activeSection === item.id ? 'text-teal-200' : 'text-slate-300 group-hover:text-teal-300'"
                          >
                            {{ item.title }}
                          </span>
                          <!-- 使用頻率標籤 -->
                          <span 
                            v-if="item.frequency"
                            class="text-xs px-2 py-0.5 rounded transition-all duration-200"
                            :class="getFrequencyBadgeClasses(item.frequency)"
                          >
                            {{ item.frequency }}
                          </span>
                        </div>
                        <!-- 副標題 -->
                        <div 
                          v-if="item.subtitle"
                          class="text-xs text-slate-400 mt-1 line-clamp-2 transition-colors duration-200"
                          :class="activeSection === item.id ? 'text-slate-300' : 'group-hover:text-slate-300'"
                        >
                          {{ item.subtitle }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- 無搜索結果 -->
                <div v-if="filteredTocItems.length === 0 && (searchQuery || selectedCategory !== 'all')" class="text-center py-8">
                  <Icon name="heroicons:magnifying-glass" class="w-8 h-8 text-slate-500 mx-auto mb-2" />
                  <p class="text-sm text-slate-400">無匹配的保健品項目</p>
                  <button 
                    @click="resetFilters"
                    class="text-xs text-teal-400 hover:text-teal-300 mt-2 transition-colors duration-200"
                  >
                    重置篩選
                  </button>
                </div>
              </div>
            </div>
            
            <!-- 醫療滾動位置指示器 -->
            <div class="absolute right-1 top-2 bottom-2 w-1 bg-slate-800/40 rounded-full overflow-hidden">
              <div 
                class="w-full bg-gradient-to-b from-teal-400 to-emerald-400 rounded-full transition-all duration-300 shadow-[0_0_4px_rgba(20,184,166,0.4)]"
                :style="{ 
                  height: scrollPercentage + '%', 
                  transform: `translateY(${scrollPosition}px)` 
                }"
              ></div>
            </div>
          </div>
          
          <!-- 底部醫療狀態欄 -->
          <div class="flex-shrink-0 border-t border-slate-700/60 bg-slate-900/80">
            <div class="p-3">
              <div class="flex items-center justify-between text-xs font-mono text-slate-400">
                <div class="flex items-center space-x-2">
                  <div class="w-1 h-1 bg-teal-400/60 rounded-full animate-pulse"></div>
                  <span class="tracking-wide">SYSTEM_READY</span>
                  <span v-if="searchQuery || selectedCategory !== 'all'" class="text-teal-400">| FILTERED</span>
                </div>
                <div class="flex items-center space-x-2">
                  <span>{{ filteredTocItems.length }}/{{ totalItems }}</span>
                  <div class="w-1 h-1 bg-slate-500 rounded-full"></div>
                  <span class="tracking-widest">{{ Math.round(scrollPercentage) }}%</span>
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
interface SupplementTOC {
  id: string
  title: string
  subtitle?: string
  category: string
  frequency?: 'high' | 'medium' | 'low'
}

interface SupplementCategory {
  key: string
  name: string
  icon: string
  count: number
}

interface Props {
  tocItems: SupplementTOC[]
  categories: SupplementCategory[]
  activeSection?: string
}

interface Emits {
  (e: 'section-click', sectionId: string): void
  (e: 'category-change', categoryKey: string): void
}

const props = withDefaults(defineProps<Props>(), {
  tocItems: () => [],
  categories: () => [],
  activeSection: ''
})

const emit = defineEmits<Emits>()

// 響應式狀態
const isCollapsed = ref(true)
const triggerHover = ref(false)
const searchQuery = ref('')
const searchFocused = ref(false)
const selectedCategory = ref('all')
const scrollContainer = ref<HTMLElement>()
const scrollPosition = ref(0)
const scrollPercentage = ref(0)

// 預設保健品分類
const defaultCategories: SupplementCategory[] = [
  { key: 'all', name: '全部', icon: 'heroicons:squares-2x2', count: 0 },
  { key: 'vitamins', name: '維生素', icon: 'heroicons:sparkles', count: 0 },
  { key: 'minerals', name: '礦物質', icon: 'heroicons:cube', count: 0 },
  { key: 'herbs', name: '草本', icon: 'heroicons:leaf', count: 0 },
  { key: 'protein', name: '蛋白質', icon: 'heroicons:bolt', count: 0 },
  { key: 'omega', name: 'Omega脂肪酸', icon: 'heroicons:heart', count: 0 },
  { key: 'probiotics', name: '益生菌', icon: 'heroicons:beaker', count: 0 }
]

// 計算屬性
const supplementCategories = computed(() => {
  const categoryMap = new Map(defaultCategories.map(cat => [cat.key, { ...cat }]))
  
  // 更新分類計數
  props.categories.forEach(cat => {
    if (categoryMap.has(cat.key)) {
      categoryMap.set(cat.key, { ...cat })
    }
  })
  
  // 計算全部分類的計數
  const allCount = props.tocItems.length
  const allCategory = categoryMap.get('all')
  if (allCategory) {
    allCategory.count = allCount
  }
  
  return Array.from(categoryMap.values())
})

const filteredTocItems = computed(() => {
  let items = props.tocItems
  
  // 按分類篩選
  if (selectedCategory.value !== 'all') {
    items = items.filter(item => item.category === selectedCategory.value)
  }
  
  // 按搜尋詞篩選
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    items = items.filter(item => 
      item.title.toLowerCase().includes(query) ||
      (item.subtitle && item.subtitle.toLowerCase().includes(query))
    )
  }
  
  return items
})

const totalItems = computed(() => props.tocItems.length)

// 方法
const handleSectionClick = (sectionId: string) => {
  emit('section-click', sectionId)
}

const getCategoryIcon = (categoryKey: string) => {
  const category = supplementCategories.value.find(cat => cat.key === categoryKey)
  return category?.icon || 'heroicons:circle'
}

const getItemClasses = (item: SupplementTOC) => {
  if (props.activeSection === item.id) {
    return 'bg-gradient-to-r from-teal-500/10 to-transparent border-teal-400/70 text-teal-200'
  }
  return 'text-slate-300 hover:text-teal-300 hover:bg-slate-800/20 border-transparent hover:border-teal-500/30'
}

const getFrequencyBadgeClasses = (frequency: string) => {
  const baseClasses = 'font-mono'
  switch (frequency) {
    case 'high':
      return `${baseClasses} bg-emerald-500/20 text-emerald-300 border border-emerald-500/30`
    case 'medium':
      return `${baseClasses} bg-yellow-500/20 text-yellow-300 border border-yellow-500/30`
    case 'low':
      return `${baseClasses} bg-slate-500/20 text-slate-300 border border-slate-500/30`
    default:
      return `${baseClasses} bg-slate-500/20 text-slate-300 border border-slate-500/30`
  }
}

const resetFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = 'all'
}

const updateScrollPosition = () => {
  if (!scrollContainer.value) return
  
  const container = scrollContainer.value
  const scrollTop = container.scrollTop
  const scrollHeight = container.scrollHeight - container.clientHeight
  
  if (scrollHeight > 0) {
    scrollPercentage.value = (scrollTop / scrollHeight) * 100
    scrollPosition.value = (scrollTop / scrollHeight) * (container.clientHeight - 20)
  }
}

// 監聽分類變化
watch(selectedCategory, (newCategory) => {
  emit('category-change', newCategory)
})

// 響應式設計 - 小螢幕自動收合
const handleResize = () => {
  if (process.client && window.innerWidth < 768) {
    isCollapsed.value = true
  }
}

// 生命週期
onMounted(() => {
  if (process.client) {
    handleResize()
    window.addEventListener('resize', handleResize)
    if (scrollContainer.value) {
      updateScrollPosition()
    }
  }
})

onUnmounted(() => {
  if (process.client) {
    window.removeEventListener('resize', handleResize)
  }
})
</script>

<style scoped>
/* 醫療風格自定義滾動條 */
.scrollbar-thin::-webkit-scrollbar {
  width: 4px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: rgba(30, 41, 59, 0.3);
  border-radius: 2px;
}

.scrollbar-thumb-teal-500\/30::-webkit-scrollbar-thumb {
  background: rgba(20, 184, 166, 0.3);
  border-radius: 2px;
}

.scrollbar-thumb-teal-500\/30::-webkit-scrollbar-thumb:hover {
  background: rgba(20, 184, 166, 0.5);
}

/* 醫療風格動畫 */
@keyframes medical-scan {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateX(100%);
    opacity: 0;
  }
}

@keyframes medical-pulse {
  0%, 100% {
    transform: translateY(-100%);
    opacity: 0;
  }
  50% {
    transform: translateY(0%);
    opacity: 1;
  }
}

@keyframes scan-line {
  0% { transform: translateX(-100%); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateX(100%); opacity: 0; }
}

@keyframes pulse-slow {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
}

.animate-medical-scan {
  animation: medical-scan 2.5s ease-in-out infinite;
}

.animate-medical-pulse {
  animation: medical-pulse 2s ease-in-out infinite;
}

.animate-scan-line {
  animation: scan-line 3s ease-in-out infinite;
}

.animate-pulse-slow {
  animation: pulse-slow 4s ease-in-out infinite;
}

/* 文字截取 */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>