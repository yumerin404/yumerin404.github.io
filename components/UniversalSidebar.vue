<template>
  <!-- 通用側邊欄系統 -->
  <div 
    class="fixed top-16 right-0 h-[calc(100vh-4rem)] z-50 transition-all duration-700 ease-out"
    :class="[
      isCollapsed ? 'w-16' : 'w-96',
      'md:translate-x-0'
    ]"
  >
    <!-- 收合觸發器 -->
    <div 
      v-if="isCollapsed"
      class="absolute left-0 top-1/2 -translate-y-1/2 h-32 w-16 transition-all duration-500"
      :class="[
        props.loading || totalItems === 0 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
        'group'
      ]"
      @click="handleTriggerClick"
      @mouseenter="triggerHover = true"
      @mouseleave="triggerHover = false"
    >
      <!-- 觸發面板 -->
      <div class="relative w-full h-full">
        <div 
          class="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl border-l border-y rounded-l-2xl shadow-2xl transition-all duration-500 overflow-hidden"
          :class="[
            triggerHover ? 'shadow-[0_0_30px_rgba(59,130,246,0.3)]' : '',
            themeClasses.borderColor
          ]"
        >
          <!-- 能量指示條 -->
          <div 
            class="absolute left-1 top-1/2 -translate-y-1/2 w-1 h-16 rounded-full transition-all duration-500"
            :class="[
              themeClasses.energyBar,
              triggerHover ? 'w-1.5 animate-pulse' : ''
            ]"
          >
            <!-- 脈衝點 -->
            <div class="absolute top-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-current rounded-full animate-ping"></div>
            <div class="absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-current rounded-full animate-ping" style="animation-delay: 0.7s;"></div>
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-current rounded-full animate-ping" style="animation-delay: 1.2s;"></div>
          </div>
          
          <!-- 圖示或載入指示器 -->
          <div 
            class="absolute right-2 top-1/2 -translate-y-1/2 transition-all duration-500"
            :class="triggerHover ? `scale-110 ${themeClasses.iconColor}` : 'text-gray-400'"
          >
            <div 
              v-if="props.loading"
              class="animate-spin w-6 h-6 border-2 border-current border-t-transparent rounded-full"
            ></div>
            <Icon v-else :name="triggerIcon" class="w-6 h-6" />
          </div>
          
          <!-- 提示標籤 -->
          <div 
            class="absolute left-20 top-1/2 -translate-y-1/2 transition-all duration-500 transform"
            :class="triggerHover ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'"
          >
            <div class="bg-slate-900/95 backdrop-blur-sm border rounded-xl px-4 py-2 shadow-2xl"
                 :class="themeClasses.borderColor">
              <div class="text-sm font-medium" :class="themeClasses.textColor">{{ triggerTitle }}</div>
              <div class="text-xs text-gray-400 mt-1">
                {{ props.loading ? '載入中...' : totalItems === 0 ? '內容空白' : '點擊展開' }}
              </div>
            </div>
            <!-- 箭頭 -->
            <div class="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-8 border-transparent"
                 :class="themeClasses.arrowColor"></div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 主側邊欄面板 -->
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
        <!-- 外層能量護盾 -->
        <div class="absolute -inset-2 rounded-2xl blur-lg animate-pulse-slow"
             :class="themeClasses.aura"></div>
        
        <!-- 主面板結構 -->
        <div class="relative w-full h-full bg-gradient-to-br from-slate-900/98 via-slate-800/95 to-slate-900/98 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
          
          <!-- 狀態條 -->
          <div class="absolute top-0 left-0 right-0 h-1"
               :class="themeClasses.statusBar">
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-scan-line"></div>
          </div>
          
          <!-- 頂部標題區 -->
          <div class="flex-shrink-0 border-b border-slate-700/60 bg-slate-900/80 p-4">
            <!-- 系統標題 -->
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center space-x-2 text-sm text-slate-400 font-mono">
                <div class="w-1.5 h-1.5 rounded-full animate-pulse shadow-[0_0_6px_rgba(59,130,246,0.6)]"
                     :class="themeClasses.pulse"></div>
                <span class="tracking-wide">{{ systemTitle }}</span>
              </div>
              <div class="text-xs font-mono text-slate-500">{{ totalItems }} ITEMS</div>
            </div>
            
            <!-- 搜尋框 -->
            <div class="relative mb-4" v-if="showSearch">
              <input
                v-model="searchQuery"
                type="text"
                :placeholder="searchPlaceholder"
                class="w-full bg-slate-800/60 border border-slate-600/40 rounded-lg px-3 py-2 pl-10 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-1 transition-all duration-300"
                :class="themeClasses.focusColor"
                @focus="searchFocused = true"
                @blur="searchFocused = false"
              />
              <Icon 
                name="heroicons:magnifying-glass" 
                class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300"
                :class="searchFocused ? themeClasses.focusIcon : 'text-slate-400'"
              />
              <!-- 搜尋清除按鈕 -->
              <button
                v-if="searchQuery"
                @click="searchQuery = ''"
                class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 transition-colors duration-200"
                :class="themeClasses.hoverIcon"
              >
                <Icon name="heroicons:x-mark" class="w-4 h-4" />
              </button>
            </div>
            
            <!-- 分類篩選 -->
            <div class="space-y-2" v-if="enableCategoryFilter && categories.length > 0">
              <div class="text-xs text-slate-400 font-mono tracking-wide">CATEGORY_FILTER</div>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="category in categories"
                  :key="category.key"
                  @click="selectedCategory = category.key"
                  class="px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-300 border"
                  :class="selectedCategory === category.key 
                    ? themeClasses.activeFilter
                    : themeClasses.inactiveFilter"
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
              class="h-full overflow-y-auto scrollbar-thin scrollbar-track-slate-800/30 px-2 py-2 overscroll-contain"
              :class="themeClasses.scrollbar"
              @scroll="updateScrollPosition"
              style="scroll-behavior: smooth;"
            >
              <!-- 載入狀態 -->
              <div v-if="props.loading" class="flex flex-col items-center justify-center py-8 space-y-4">
                <div class="animate-spin w-8 h-8 border-2 border-gray-300 border-t-transparent rounded-full"></div>
                <div class="text-sm text-gray-400">載入內容中...</div>
              </div>
              
              <!-- 無內容狀態 -->
              <div v-else-if="totalItems === 0" class="flex flex-col items-center justify-center py-8 space-y-4">
                <Icon name="heroicons:document-text" class="w-8 h-8 text-gray-500" />
                <div class="text-sm text-gray-400">暫無內容</div>
              </div>
              
              <!-- 正常內容 -->
              <div v-else class="space-y-1">
                <!-- 有分類的顯示方式 -->
                <template v-if="enableCategorization && categorizedItems.length > 0">
                  <template v-for="(category, categoryIndex) in categorizedItems" :key="category.key">
                    
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
                          <Icon :name="category.icon" class="w-4 h-4" :class="themeClasses.categoryIcon" />
                          <span class="text-sm font-medium text-slate-300 group-hover:transition-colors duration-200"
                                :class="themeClasses.categoryHover">
                            {{ category.name }}
                          </span>
                          <span class="text-xs text-slate-500 bg-slate-800/60 px-1.5 py-0.5 rounded">
                            {{ category.sections.length }}
                          </span>
                        </div>
                        <Icon 
                          :name="collapsedCategories.has(category.key) ? 'heroicons:chevron-right' : 'heroicons:chevron-down'" 
                          class="w-4 h-4 text-slate-400 group-hover:transition-all duration-200"
                          :class="themeClasses.categoryHoverIcon"
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
                          @click="handleItemClick(item.id)"
                          class="w-full text-left py-2 px-3 transition-all duration-300 relative overflow-hidden cursor-pointer border-l-2 rounded-r-lg"
                          :class="getItemClasses(item)"
                        >
                          <!-- 背景動畫線條 -->
                          <div v-if="activeItem === item.id" class="absolute inset-0 opacity-20">
                            <div 
                              v-for="line in 2" :key="line"
                              class="absolute w-full h-px bg-gradient-to-r from-transparent via-current to-transparent animate-data-flow"
                              :style="{ 
                                top: `${line * 40}%`,
                                animationDelay: `${line * 0.8}s`,
                                animationDuration: '3s'
                              }"
                              :class="themeClasses.flowColor"
                            ></div>
                          </div>
                          
                          <div class="relative z-10 flex items-center space-x-3">
                            <!-- 狀態指示器 -->
                            <div class="flex-shrink-0 relative">
                              <div 
                                class="w-1 h-4 transition-all duration-300"
                                :class="activeItem === item.id 
                                  ? themeClasses.activeIndicator
                                  : themeClasses.inactiveIndicator"
                              >
                                <!-- 活躍狀態掃描效果 -->
                                <div 
                                  v-if="activeItem === item.id"
                                  class="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-transparent animate-scan-pulse"
                                ></div>
                              </div>
                            </div>
                            
                            <!-- 章節標題 -->
                            <div class="flex-1 min-w-0">
                              <span 
                                class="text-sm leading-relaxed transition-colors duration-200 block"
                                :class="activeItem === item.id ? themeClasses.activeText : themeClasses.inactiveText"
                              >
                                {{ item.title }}
                              </span>
                              <!-- 副標題 -->
                              <div 
                                v-if="item.subtitle"
                                class="text-xs text-slate-400 mt-1 line-clamp-2 transition-colors duration-200"
                                :class="activeItem === item.id ? 'text-slate-300' : 'group-hover:text-slate-300'"
                              >
                                {{ item.subtitle }}
                              </div>
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
                    v-for="(item, index) in filteredItems"
                    :key="item.id"
                    class="group relative"
                  >
                    <div
                      @click="handleItemClick(item.id)"
                      class="w-full text-left py-2 px-3 transition-all duration-300 relative overflow-hidden cursor-pointer border-l-2"
                      :class="getItemClasses(item)"
                    >
                      <!-- 背景動畫線條 -->
                      <div v-if="activeItem === item.id" class="absolute inset-0 opacity-20">
                        <div 
                          v-for="line in 2" :key="line"
                          class="absolute w-full h-px bg-gradient-to-r from-transparent via-current to-transparent animate-data-flow"
                          :style="{ 
                            top: `${line * 40}%`,
                            animationDelay: `${line * 0.8}s`,
                            animationDuration: '3s'
                          }"
                          :class="flowColorClass"
                        ></div>
                      </div>
                      
                      <div class="relative z-10 flex items-center space-x-3">
                        <!-- 狀態指示器 -->
                        <div class="flex-shrink-0 relative">
                          <div 
                            class="w-1 h-4 transition-all duration-300"
                            :class="activeItem === item.id 
                              ? themeClasses.activeIndicator
                              : themeClasses.inactiveIndicator"
                          >
                            <!-- 活躍狀態掃描效果 -->
                            <div 
                              v-if="activeItem === item.id"
                              class="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-transparent animate-scan-pulse"
                            ></div>
                          </div>
                        </div>
                        
                        <!-- 章節標題 -->
                        <div class="flex-1 min-w-0">
                          <span 
                            class="text-sm leading-relaxed transition-colors duration-200 block"
                            :class="activeItem === item.id ? activeTextClass : inactiveTextClass"
                          >
                            {{ item.title }}
                          </span>
                          <!-- 副標題 -->
                          <div 
                            v-if="item.subtitle"
                            class="text-xs text-slate-400 mt-1 line-clamp-2 transition-colors duration-200"
                            :class="activeItem === item.id ? 'text-slate-300' : 'group-hover:text-slate-300'"
                          >
                            {{ item.subtitle }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
                
                <!-- 無搜索結果 -->
                <div v-if="filteredItems.length === 0 && searchQuery" class="text-center py-8">
                  <Icon name="heroicons:magnifying-glass" class="w-8 h-8 text-slate-500 mx-auto mb-2" />
                  <p class="text-sm text-slate-400">無匹配的項目</p>
                  <button 
                    @click="searchQuery = ''"
                    class="text-xs transition-colors duration-200 mt-1"
                    :class="themeClasses.clearButton"
                  >
                    清除搜索
                  </button>
                </div>
              </div>
            </div>
            
            <!-- 滾動位置指示器 -->
            <div class="absolute right-1 top-2 bottom-2 w-1 bg-slate-800/40 rounded-full overflow-hidden">
              <div 
                class="w-full rounded-full transition-all duration-300"
                :class="themeClasses.scrollIndicator"
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
                  <div class="w-1 h-1 rounded-full animate-pulse"
                       :class="themeClasses.statusPulse"></div>
                  <span class="tracking-wide">READY</span>
                  <span v-if="searchQuery" :class="themeClasses.statusActive">| SEARCH_ACTIVE</span>
                </div>
                <div class="flex items-center space-x-2">
                  <span>{{ filteredItems.length }}/{{ totalItems }}</span>
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
interface SidebarItem {
  id: string
  title: string
  subtitle?: string
  category?: string
  level?: number
  progress?: number
  frequency?: string
  readTime?: number
  wordCount?: number
}

interface SidebarCategory {
  key: string
  name: string
  icon: string
  count?: number
}

interface Props {
  // 數據相關
  items: SidebarItem[]
  categories?: SidebarCategory[]
  activeItem?: string
  
  // 顯示選項
  title?: string
  searchPlaceholder?: string
  enableCategorization?: boolean
  enableCategoryFilter?: boolean
  showSearch?: boolean
  
  // 主題配色
  theme?: 'medical' | 'writing' | 'learning' | 'default'
  
  // 自定義樣式
  triggerIcon?: string
  triggerTitle?: string
  systemTitle?: string
  
  // 載入狀態
  loading?: boolean
}

interface Emits {
  (e: 'item-click', itemId: string): void
  (e: 'category-change', categoryKey: string): void
}

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  categories: () => [],
  activeItem: '',
  title: 'NAVIGATION_MATRIX',
  searchPlaceholder: '搜索項目...',
  enableCategorization: true,
  enableCategoryFilter: true,
  showSearch: true,
  theme: 'default',
  triggerIcon: 'heroicons:bars-3',
  triggerTitle: '導航控制台',
  systemTitle: 'NAVIGATION_MATRIX',
  loading: false
})

const emit = defineEmits<Emits>()

// 響應式數據
const isCollapsed = ref(true)
const triggerHover = ref(false)
const searchQuery = ref('')
const searchFocused = ref(false)
const selectedCategory = ref('all')
const collapsedCategories = ref(new Set<string>())
const scrollContainer = ref<HTMLElement>()
const scrollPosition = ref(0)
const scrollPercentage = ref(0)

// 主題配色
const themeColors = computed(() => {
  const themes = {
    medical: {
      primary: 'teal',
      secondary: 'emerald',
      accent: 'cyan'
    },
    writing: {
      primary: 'amber',
      secondary: 'orange', 
      accent: 'yellow'
    },
    learning: {
      primary: 'cyan',
      secondary: 'blue',
      accent: 'purple'
    },
    default: {
      primary: 'blue',
      secondary: 'indigo',
      accent: 'purple'
    }
  }
  return themes[props.theme]
})

// 動態樣式類別 - 使用固定的 Tailwind 類別
const themeClasses = computed(() => {
  const themes = {
    medical: {
      borderColor: 'border-teal-500/40',
      energyBar: 'bg-gradient-to-b from-teal-400/60 via-cyan-500/80 to-emerald-500/60',
      iconColor: 'text-teal-300',
      textColor: 'text-teal-300',
      arrowColor: 'border-r-teal-500/50',
      aura: 'bg-gradient-to-br from-teal-500/10 via-cyan-500/5 to-emerald-500/10',
      statusBar: 'bg-gradient-to-r from-teal-500/60 via-cyan-500/80 to-emerald-500/60',
      pulse: 'bg-teal-400',
      focusColor: 'focus:border-teal-400/60 focus:ring-teal-400/40',
      focusIcon: 'text-teal-400',
      hoverIcon: 'hover:text-teal-400',
      activeFilter: 'bg-teal-500/20 border-teal-400/60 text-teal-300 shadow-[0_0_8px_rgba(20,184,166,0.3)]',
      inactiveFilter: 'bg-slate-800/40 border-slate-600/40 text-slate-400 hover:bg-teal-500/10 hover:border-teal-500/40 hover:text-teal-300',
      scrollbar: 'scrollbar-thumb-teal-500/30',
      categoryIcon: 'text-emerald-400',
      categoryHover: 'group-hover:text-teal-300',
      categoryHoverIcon: 'group-hover:text-teal-400',
      flowColor: 'text-teal-400/60',
      activeIndicator: 'bg-gradient-to-b from-teal-400 to-emerald-400 shadow-[0_0_8px_rgba(20,184,166,0.6)]',
      inactiveIndicator: 'bg-slate-600/60 group-hover:bg-teal-500/40',
      activeText: 'text-teal-200 font-medium',
      inactiveText: 'text-slate-300 group-hover:text-teal-300',
      clearButton: 'text-teal-400 hover:text-teal-300',
      scrollIndicator: 'bg-gradient-to-b from-teal-400 to-emerald-400 shadow-[0_0_4px_rgba(20,184,166,0.4)]',
      statusPulse: 'bg-teal-400/60',
      statusActive: 'text-teal-400'
    },
    writing: {
      borderColor: 'border-amber-500/40',
      energyBar: 'bg-gradient-to-b from-amber-400/60 via-orange-500/80 to-yellow-500/60',
      iconColor: 'text-amber-300',
      textColor: 'text-amber-300',
      arrowColor: 'border-r-amber-500/50',
      aura: 'bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-yellow-500/10',
      statusBar: 'bg-gradient-to-r from-amber-500/60 via-orange-500/80 to-yellow-500/60',
      pulse: 'bg-amber-400',
      focusColor: 'focus:border-amber-400/60 focus:ring-amber-400/40',
      focusIcon: 'text-amber-400',
      hoverIcon: 'hover:text-amber-400',
      activeFilter: 'bg-amber-500/20 border-amber-400/60 text-amber-300 shadow-[0_0_8px_rgba(245,158,11,0.3)]',
      inactiveFilter: 'bg-slate-800/40 border-slate-600/40 text-slate-400 hover:bg-amber-500/10 hover:border-amber-500/40 hover:text-amber-300',
      scrollbar: 'scrollbar-thumb-amber-500/30',
      categoryIcon: 'text-orange-400',
      categoryHover: 'group-hover:text-amber-300',
      categoryHoverIcon: 'group-hover:text-amber-400',
      flowColor: 'text-amber-400/60',
      activeIndicator: 'bg-gradient-to-b from-amber-400 to-orange-400 shadow-[0_0_8px_rgba(245,158,11,0.6)]',
      inactiveIndicator: 'bg-slate-600/60 group-hover:bg-amber-500/40',
      activeText: 'text-amber-200 font-medium',
      inactiveText: 'text-slate-300 group-hover:text-amber-300',
      clearButton: 'text-amber-400 hover:text-amber-300',
      scrollIndicator: 'bg-gradient-to-b from-amber-400 to-orange-400 shadow-[0_0_4px_rgba(245,158,11,0.4)]',
      statusPulse: 'bg-amber-400/60',
      statusActive: 'text-amber-400'
    },
    learning: {
      borderColor: 'border-cyan-500/40',
      energyBar: 'bg-gradient-to-b from-cyan-400/60 via-blue-500/80 to-purple-500/60',
      iconColor: 'text-cyan-300',
      textColor: 'text-cyan-300',
      arrowColor: 'border-r-cyan-500/50',
      aura: 'bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10',
      statusBar: 'bg-gradient-to-r from-cyan-500/60 via-blue-500/80 to-purple-500/60',
      pulse: 'bg-cyan-400',
      focusColor: 'focus:border-cyan-400/60 focus:ring-cyan-400/40',
      focusIcon: 'text-cyan-400',
      hoverIcon: 'hover:text-cyan-400',
      activeFilter: 'bg-cyan-500/20 border-cyan-400/60 text-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.3)]',
      inactiveFilter: 'bg-slate-800/40 border-slate-600/40 text-slate-400 hover:bg-cyan-500/10 hover:border-cyan-500/40 hover:text-cyan-300',
      scrollbar: 'scrollbar-thumb-cyan-500/30',
      categoryIcon: 'text-blue-400',
      categoryHover: 'group-hover:text-cyan-300',
      categoryHoverIcon: 'group-hover:text-cyan-400',
      flowColor: 'text-cyan-400/60',
      activeIndicator: 'bg-gradient-to-b from-cyan-400 to-blue-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]',
      inactiveIndicator: 'bg-slate-600/60 group-hover:bg-cyan-500/40',
      activeText: 'text-cyan-200 font-medium',
      inactiveText: 'text-slate-300 group-hover:text-cyan-300',
      clearButton: 'text-cyan-400 hover:text-cyan-300',
      scrollIndicator: 'bg-gradient-to-b from-cyan-400 to-blue-400 shadow-[0_0_4px_rgba(34,211,238,0.4)]',
      statusPulse: 'bg-cyan-400/60',
      statusActive: 'text-cyan-400'
    },
    default: {
      borderColor: 'border-blue-500/40',
      energyBar: 'bg-gradient-to-b from-blue-400/60 via-indigo-500/80 to-purple-500/60',
      iconColor: 'text-blue-300',
      textColor: 'text-blue-300',
      arrowColor: 'border-r-blue-500/50',
      aura: 'bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-purple-500/10',
      statusBar: 'bg-gradient-to-r from-blue-500/60 via-indigo-500/80 to-purple-500/60',
      pulse: 'bg-blue-400',
      focusColor: 'focus:border-blue-400/60 focus:ring-blue-400/40',
      focusIcon: 'text-blue-400',
      hoverIcon: 'hover:text-blue-400',
      activeFilter: 'bg-blue-500/20 border-blue-400/60 text-blue-300 shadow-[0_0_8px_rgba(59,130,246,0.3)]',
      inactiveFilter: 'bg-slate-800/40 border-slate-600/40 text-slate-400 hover:bg-blue-500/10 hover:border-blue-500/40 hover:text-blue-300',
      scrollbar: 'scrollbar-thumb-blue-500/30',
      categoryIcon: 'text-indigo-400',
      categoryHover: 'group-hover:text-blue-300',
      categoryHoverIcon: 'group-hover:text-blue-400',
      flowColor: 'text-blue-400/60',
      activeIndicator: 'bg-gradient-to-b from-blue-400 to-indigo-400 shadow-[0_0_8px_rgba(59,130,246,0.6)]',
      inactiveIndicator: 'bg-slate-600/60 group-hover:bg-blue-500/40',
      activeText: 'text-blue-200 font-medium',
      inactiveText: 'text-slate-300 group-hover:text-blue-300',
      clearButton: 'text-blue-400 hover:text-blue-300',
      scrollIndicator: 'bg-gradient-to-b from-blue-400 to-indigo-400 shadow-[0_0_4px_rgba(59,130,246,0.4)]',
      statusPulse: 'bg-blue-400/60',
      statusActive: 'text-blue-400'
    }
  }
  return themes[props.theme]
})

// 計算屬性
const filteredItems = computed(() => {
  let items = props.items
  
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

const categorizedItems = computed(() => {
  if (!props.enableCategorization) return []
  
  const categorized = props.categories.map(category => ({
    ...category,
    sections: filteredItems.value.filter(item => 
      (item.category || 'other') === category.key
    )
  }))
  
  return categorized.filter(category => category.sections.length > 0)
})

const totalItems = computed(() => props.items.length)

// 方法
const handleTriggerClick = () => {
  if (props.loading || totalItems.value === 0) {
    return
  }
  isCollapsed.value = false
}

const handleItemClick = (itemId: string) => {
  emit('item-click', itemId)
}

const toggleCategory = (categoryKey: string) => {
  if (collapsedCategories.value.has(categoryKey)) {
    collapsedCategories.value.delete(categoryKey)
  } else {
    collapsedCategories.value.add(categoryKey)
  }
}

const getItemClasses = (item: SidebarItem) => {
  const theme = themeClasses.value
  if (props.activeItem === item.id) {
    return `bg-gradient-to-r ${theme.activeText} border-l-2 ${theme.borderColor} rounded-r-lg`
  }
  return `${theme.inactiveText} hover:bg-slate-800/20 border-l-2 border-transparent hover:${theme.borderColor} rounded-r-lg`
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

// 監聽活躍項目變化
watch(() => props.activeItem, (newItem) => {
  // 可以在這裡處理活躍項目變化的邏輯
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
/* 自定義滾動條 */
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

.scrollbar-thumb-amber-500\/30::-webkit-scrollbar-thumb {
  background: rgba(245, 158, 11, 0.3);
  border-radius: 2px;
}

.scrollbar-thumb-amber-500\/30::-webkit-scrollbar-thumb:hover {
  background: rgba(245, 158, 11, 0.5);
}

.scrollbar-thumb-cyan-500\/30::-webkit-scrollbar-thumb {
  background: rgba(34, 211, 238, 0.3);
  border-radius: 2px;
}

.scrollbar-thumb-cyan-500\/30::-webkit-scrollbar-thumb:hover {
  background: rgba(34, 211, 238, 0.5);
}

.scrollbar-thumb-blue-500\/30::-webkit-scrollbar-thumb {
  background: rgba(59, 130, 246, 0.3);
  border-radius: 2px;
}

.scrollbar-thumb-blue-500\/30::-webkit-scrollbar-thumb:hover {
  background: rgba(59, 130, 246, 0.5);
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

@keyframes scan-line {
  0% { transform: translateX(-100%); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateX(100%); opacity: 0; }
}

@keyframes pulse-slow {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
}

.animate-data-flow {
  animation: data-flow 3s ease-in-out infinite;
}

.animate-scan-pulse {
  animation: scan-pulse 2s ease-in-out infinite;
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