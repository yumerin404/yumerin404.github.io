<template>
  <!-- 通用目錄系統 -->
  <div class="flex flex-col h-full bg-gradient-to-br from-slate-950/95 via-slate-900/98 to-slate-950/95 backdrop-blur-xl border border-slate-700/60 rounded-2xl shadow-2xl overflow-hidden">
    
    <!-- 目錄標題欄 -->
    <div class="flex-shrink-0 border-b border-slate-700/60 bg-slate-900/80">
      <div class="p-4">
        <!-- 標題區域 -->
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center space-x-2 text-sm text-slate-400 font-mono">
            <div class="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_6px_rgba(34,211,238,0.6)]"></div>
            <span class="tracking-wide">{{ title || 'NAVIGATION_MATRIX' }}</span>
          </div>
          <div class="text-xs font-mono text-slate-500">{{ totalSections }} SEC</div>
        </div>
        
        <!-- 搜索欄 -->
        <div class="relative" v-if="showSearch">
          <input
            v-model="searchQuery"
            type="text"
            :placeholder="searchPlaceholder"
            class="w-full bg-slate-800/60 border border-slate-600/40 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-400 focus:border-cyan-400/60 focus:outline-none focus:ring-1 focus:ring-cyan-400/40 transition-all duration-300"
          />
          <Icon name="heroicons:magnifying-glass" class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        </div>
        
        <!-- 工具欄 -->
        <div class="flex items-center justify-between mt-3">
          <div class="flex items-center space-x-2">
            <button
              @click="toggleSearch"
              class="p-1.5 rounded-md bg-slate-800/60 hover:bg-slate-700/80 transition-colors duration-200"
              :class="showSearch ? 'text-cyan-400' : 'text-slate-400'"
            >
              <Icon name="heroicons:magnifying-glass" class="w-4 h-4" />
            </button>
            <button
              v-if="enableCategoryCollapse"
              @click="toggleCollapseAll"
              class="p-1.5 rounded-md bg-slate-800/60 hover:bg-slate-700/80 text-slate-400 hover:text-cyan-400 transition-colors duration-200"
            >
              <Icon :name="allCollapsed ? 'heroicons:chevron-down' : 'heroicons:chevron-up'" class="w-4 h-4" />
            </button>
          </div>
          
          <!-- 進度指示器 -->
          <div class="text-xs font-mono text-slate-400">
            {{ currentSectionIndex + 1 }}/{{ filteredSections.length }}
          </div>
        </div>
      </div>
    </div>
    
    <!-- 目錄內容區域 -->
    <div class="flex-1 overflow-hidden relative">
      <!-- 滾動容器 -->
      <div 
        ref="scrollContainer"
        class="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-500/30 scrollbar-track-slate-800/30 px-2 py-2"
        @scroll="updateScrollPosition"
      >
        <div class="space-y-1">
          <!-- 有分類的顯示方式 -->
          <template v-if="enableCategorization && categorizedSections.length > 0">
            <template v-for="(category, categoryIndex) in categorizedSections" :key="category.key">
              
              <!-- 分類標題 -->
              <div 
                v-if="category.sections.length > 0"
                class="sticky top-0 z-10 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700/40 py-2 px-3 -mx-2 mb-2"
              >
                <button
                  @click="toggleCategory(category.key)"
                  class="flex items-center justify-between w-full text-left group"
                >
                  <div class="flex items-center space-x-2">
                    <Icon :name="category.icon" class="w-4 h-4 text-amber-400" />
                    <span class="text-sm font-medium text-slate-300 group-hover:text-cyan-300 transition-colors duration-200">
                      {{ category.name }}
                    </span>
                    <span class="text-xs text-slate-500 bg-slate-800/60 px-1.5 py-0.5 rounded">
                      {{ category.sections.length }}
                    </span>
                  </div>
                  <Icon 
                    :name="collapsedCategories.has(category.key) ? 'heroicons:chevron-right' : 'heroicons:chevron-down'" 
                    class="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-all duration-200"
                  />
                </button>
              </div>
              
              <!-- 目錄項目 -->
              <div v-if="!collapsedCategories.has(category.key)" class="space-y-1">
                <div
                  v-for="(item, index) in category.sections"
                  :key="item.id"
                  class="group relative"
                >
                  <div
                    @click="handleSectionClick(item.id)"
                    class="w-full text-left py-2 px-3 transition-all duration-300 relative overflow-hidden cursor-pointer border-l-2"
                    :class="getSectionClasses(item)"
                  >
                    <!-- 背景動畫線條 -->
                    <div v-if="activeSection === item.id" class="absolute inset-0 opacity-20">
                      <div 
                        v-for="line in 2" :key="line"
                        class="absolute w-full h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent animate-data-flow"
                        :style="{ 
                          top: `${line * 40}%`,
                          animationDelay: `${line * 0.8}s`,
                          animationDuration: '3s'
                        }"
                      ></div>
                    </div>
                    
                    <div class="relative z-10 flex items-center space-x-3">
                      <!-- 狀態指示器 -->
                      <div class="flex-shrink-0 relative">
                        <div 
                          class="w-1 h-4 transition-all duration-300"
                          :class="activeSection === item.id 
                            ? 'bg-gradient-to-b from-cyan-400 to-blue-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]' 
                            : 'bg-slate-600/60 group-hover:bg-cyan-500/40'"
                        >
                          <!-- 活躍狀態掃描效果 -->
                          <div 
                            v-if="activeSection === item.id"
                            class="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-transparent animate-scan-pulse"
                          ></div>
                        </div>
                      </div>
                      
                      <!-- 章節標題 -->
                      <div class="flex-1 min-w-0">
                        <span 
                          class="text-sm leading-relaxed transition-colors duration-200 block"
                          :class="activeSection === item.id ? 'text-cyan-200 font-medium' : 'text-slate-300 group-hover:text-cyan-300'"
                        >
                          {{ item.title }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </template>
          
          <!-- 無分類的顯示方式 -->
          <template v-else>
            <div
              v-for="(item, index) in filteredSections"
              :key="item.id"
              class="group relative"
            >
              <div
                @click="handleSectionClick(item.id)"
                class="w-full text-left py-2 px-3 transition-all duration-300 relative overflow-hidden cursor-pointer border-l-2"
                :class="getSectionClasses(item)"
              >
                <!-- 背景動畫線條 -->
                <div v-if="activeSection === item.id" class="absolute inset-0 opacity-20">
                  <div 
                    v-for="line in 2" :key="line"
                    class="absolute w-full h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent animate-data-flow"
                    :style="{ 
                      top: `${line * 40}%`,
                      animationDelay: `${line * 0.8}s`,
                      animationDuration: '3s'
                    }"
                  ></div>
                </div>
                
                <div class="relative z-10 flex items-center space-x-3">
                  <!-- 狀態指示器 -->
                  <div class="flex-shrink-0 relative">
                    <div 
                      class="w-1 h-4 transition-all duration-300"
                      :class="activeSection === item.id 
                        ? 'bg-gradient-to-b from-cyan-400 to-blue-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]' 
                        : 'bg-slate-600/60 group-hover:bg-cyan-500/40'"
                    >
                      <!-- 活躍狀態掃描效果 -->
                      <div 
                        v-if="activeSection === item.id"
                        class="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-transparent animate-scan-pulse"
                      ></div>
                    </div>
                  </div>
                  
                  <!-- 章節標題 -->
                  <div class="flex-1 min-w-0">
                    <span 
                      class="text-sm leading-relaxed transition-colors duration-200 block"
                      :class="activeSection === item.id ? 'text-cyan-200 font-medium' : 'text-slate-300 group-hover:text-cyan-300'"
                    >
                      {{ item.title }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </template>
          
          <!-- 無搜索結果 -->
          <div v-if="filteredSections.length === 0 && searchQuery" class="text-center py-8">
            <Icon name="heroicons:magnifying-glass" class="w-8 h-8 text-slate-500 mx-auto mb-2" />
            <p class="text-sm text-slate-400">無匹配的章節</p>
            <button 
              @click="searchQuery = ''"
              class="text-xs text-cyan-400 hover:text-cyan-300 mt-1"
            >
              清除搜索
            </button>
          </div>
        </div>
      </div>
      
      <!-- 滾動位置指示器 -->
      <div class="absolute right-1 top-2 bottom-2 w-1 bg-slate-800/40 rounded-full overflow-hidden">
        <div 
          class="w-full bg-gradient-to-b from-cyan-400 to-blue-400 rounded-full transition-all duration-300 shadow-[0_0_4px_rgba(34,211,238,0.4)]"
          :style="{ 
            height: scrollPercentage + '%', 
            transform: `translateY(${scrollPosition}px)` 
          }"
        ></div>
      </div>
    </div>
    
    <!-- 底部狀態欄 -->
    <div class="flex-shrink-0 border-t border-slate-700/60 bg-slate-900/80">
      <div class="p-3">
        <div class="flex items-center justify-between text-xs font-mono text-slate-400">
          <div class="flex items-center space-x-2">
            <div class="w-1 h-1 bg-cyan-400/60 rounded-full animate-pulse"></div>
            <span class="tracking-wide">READY</span>
            <span v-if="searchQuery" class="text-cyan-400">| SEARCH_ACTIVE</span>
          </div>
          <div class="flex items-center space-x-2">
            <span>{{ filteredSections.length }}/{{ totalSections }}</span>
            <div class="w-1 h-1 bg-slate-500 rounded-full"></div>
            <span class="tracking-widest">{{ Math.round(scrollPercentage) }}%</span>
          </div>
        </div>
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
  level?: number
  progress?: number
}

interface Category {
  key: string
  name: string
  icon: string
}

interface Props {
  tocItems: TocItem[]
  activeSection: string
  title?: string
  searchPlaceholder?: string
  enableCategorization?: boolean
  enableCategoryCollapse?: boolean
  categories?: Category[]
}

interface Emits {
  (e: 'section-click', sectionId: string): void
}

const props = withDefaults(defineProps<Props>(), {
  tocItems: () => [],
  activeSection: '',
  title: 'NAVIGATION_MATRIX',
  searchPlaceholder: '搜索章節...',
  enableCategorization: true,
  enableCategoryCollapse: true,
  categories: () => [
    { key: 'writing-techniques', name: '寫作技法', icon: 'heroicons:pencil-square' },
    { key: 'character-development', name: '角色塑造', icon: 'heroicons:users' },
    { key: 'story-structure', name: '故事結構', icon: 'heroicons:building-library' },
    { key: 'creative-process', name: '創作心法', icon: 'heroicons:light-bulb' },
    { key: 'genre-understanding', name: '類型理解', icon: 'heroicons:book-open' },
    { key: 'other', name: '其他', icon: 'heroicons:ellipsis-horizontal' }
  ]
})

const emit = defineEmits<Emits>()

// 響應式數據
const searchQuery = ref('')
const showSearch = ref(false)
const allCollapsed = ref(false)
const collapsedCategories = ref(new Set<string>())
const scrollContainer = ref<HTMLElement>()
const scrollPosition = ref(0)
const scrollPercentage = ref(0)
const currentSectionIndex = ref(0)

// 計算屬性
const filteredSections = computed(() => {
  let sections = props.tocItems
  
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    sections = sections.filter(item => 
      item.title.toLowerCase().includes(query) ||
      (item.subtitle && item.subtitle.toLowerCase().includes(query))
    )
  }
  
  return sections
})

const categorizedSections = computed(() => {
  if (!props.enableCategorization) return []
  
  const categorized = props.categories.map(category => ({
    ...category,
    sections: filteredSections.value.filter(item => 
      (item.category || 'other') === category.key
    )
  }))
  
  return categorized.filter(category => category.sections.length > 0)
})

const totalSections = computed(() => props.tocItems.length)

// 方法
const toggleSearch = () => {
  showSearch.value = !showSearch.value
  if (!showSearch.value) {
    searchQuery.value = ''
  }
}

const toggleCollapseAll = () => {
  allCollapsed.value = !allCollapsed.value
  if (allCollapsed.value) {
    collapsedCategories.value = new Set(props.categories.map(c => c.key))
  } else {
    collapsedCategories.value.clear()
  }
}

const toggleCategory = (categoryKey: string) => {
  if (collapsedCategories.value.has(categoryKey)) {
    collapsedCategories.value.delete(categoryKey)
  } else {
    collapsedCategories.value.add(categoryKey)
  }
}

const handleSectionClick = (sectionId: string) => {
  emit('section-click', sectionId)
}

const getSectionClasses = (item: TocItem) => {
  if (props.activeSection === item.id) {
    return 'bg-gradient-to-r from-cyan-500/10 to-transparent border-cyan-400/70 text-cyan-200'
  }
  return 'text-slate-300 hover:text-cyan-300 hover:bg-slate-800/20 border-transparent hover:border-cyan-500/30'
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

// 監聽活躍章節變化，更新當前索引
watch(() => props.activeSection, (newSection) => {
  const index = filteredSections.value.findIndex(item => item.id === newSection)
  if (index !== -1) {
    currentSectionIndex.value = index
  }
})

// 生命週期
onMounted(() => {
  if (scrollContainer.value) {
    updateScrollPosition()
  }
})
</script>

<style scoped>
/* 自定義滾動條 */
.scrollbar-thin::-webkit-scrollbar {
  width: 4px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: rgba(30, 41, 59, 0.3);
  border-radius: 2px;
}

.scrollbar-thumb-cyan-500\/30::-webkit-scrollbar-thumb {
  background: rgba(34, 211, 238, 0.3);
  border-radius: 2px;
}

.scrollbar-thumb-cyan-500\/30::-webkit-scrollbar-thumb:hover {
  background: rgba(34, 211, 238, 0.5);
}

/* 自定義動畫 */
@keyframes data-flow {
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

@keyframes scan-pulse {
  0%, 100% {
    transform: translateX(-100%);
    opacity: 0;
  }
  50% {
    transform: translateX(0%);
    opacity: 1;
  }
}

.animate-data-flow {
  animation: data-flow 3s ease-in-out infinite;
}

.animate-scan-pulse {
  animation: scan-pulse 2s ease-in-out infinite;
}
</style>