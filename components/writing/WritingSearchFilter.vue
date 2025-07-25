<template>
  <div class="relative">
    <div class="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-3xl p-6 border border-amber-500/30 shadow-2xl hover:border-amber-400/60 hover:shadow-amber-500/10 transition-all duration-500 group">
      
      <!-- 搜尋輸入框 -->
      <div class="mb-6">
        <WritingInput
          :model-value="searchQuery"
          @update:model-value="handleSearchChange"
          type="search"
          :placeholder="searchPlaceholder"
          leftIcon="heroicons:magnifying-glass"
          :clearable="true"
          size="lg"
          variant="default"
          class="search-input"
          @clear="handleClearSearch"
          @enter="handleSearchSubmit"
        >
          <template #right>
            <!-- 搜尋建議按鈕 -->
            <button
              v-if="showSearchSuggestions && searchSuggestions.length > 0"
              @click="toggleSuggestions"
              class="p-2 rounded-lg hover:bg-amber-500/20 hover:text-amber-300 transition-all duration-300 relative transform hover:scale-110 active:scale-95"
              :class="{ 'bg-amber-500/25 text-amber-200': showSuggestionsDropdown }"
            >
              <Icon 
                name="heroicons:light-bulb" 
                class="w-5 h-5 text-amber-400"
              />
              <!-- 建議數量指示器 -->
              <div 
                v-if="searchSuggestions.length > 0"
                class="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-amber-400 to-orange-400 text-slate-900 text-xs rounded-full flex items-center justify-center font-bold shadow-lg animate-pulse"
              >
                {{ Math.min(searchSuggestions.length, 9) }}
              </div>
            </button>
          </template>
        </WritingInput>
        
        <!-- 搜尋建議下拉選單 -->
        <transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 transform scale-95 -translate-y-2"
          enter-to-class="opacity-100 transform scale-100 translate-y-0"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="opacity-100 transform scale-100 translate-y-0"
          leave-to-class="opacity-0 transform scale-95 -translate-y-2"
        >
          <div 
            v-if="showSuggestionsDropdown && searchSuggestions.length > 0"
            class="absolute z-20 w-full mt-2 bg-slate-800/95 backdrop-blur-xl rounded-2xl border border-amber-500/30 shadow-2xl max-h-60 overflow-y-auto"
          >
            <div class="p-2">
              <div class="text-xs text-gray-400 px-3 py-2 border-b border-slate-700/50">
                搜尋建議
              </div>
              <button
                v-for="(suggestion, index) in searchSuggestions.slice(0, 8)"
                :key="index"
                @click="applySuggestion(suggestion)"
                class="w-full text-left px-3 py-2 rounded-lg hover:bg-amber-500/10 hover:text-amber-300 transition-all duration-300 text-sm flex items-center space-x-3"
              >
                <Icon name="heroicons:magnifying-glass" class="w-4 h-4 text-gray-400" />
                <span class="flex-1 truncate">{{ suggestion }}</span>
                <Icon name="heroicons:arrow-top-right-on-square" class="w-3 h-3 text-gray-500" />
              </button>
            </div>
          </div>
        </transition>
      </div>
      
      <!-- 篩選標籤區域 -->
      <div v-if="filters && filters.length > 0" class="space-y-4">
        <!-- 標題 -->
        <div class="flex items-center justify-between">
          <h4 class="text-sm font-medium text-gray-300 flex items-center">
            <Icon name="heroicons:funnel" class="w-4 h-4 mr-2" />
            分類篩選
          </h4>
          
          <!-- 清除所有篩選 -->
          <button
            v-if="activeFilter !== 'all'"
            @click="clearAllFilters"
            class="text-xs text-gray-400 hover:text-amber-300 transition-all duration-300 px-2 py-1 rounded-md hover:bg-amber-500/20 transform hover:scale-105 active:scale-95"
          >
            清除篩選
          </button>
        </div>
        
        <!-- 篩選標籤 -->
        <div class="flex flex-wrap gap-3">
          <button
            v-for="filter in filters"
            :key="filter.key"
            @click="handleFilterChange(filter.key)"
            :class="[
              'group relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 overflow-hidden',
              'transform hover:scale-105 active:scale-95',
              activeFilter === filter.key
                ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-slate-900 shadow-lg shadow-amber-400/30 border-2 border-amber-300/50'
                : 'bg-slate-800/70 text-gray-300 hover:bg-gradient-to-r hover:from-amber-500/25 hover:to-orange-500/25 hover:text-amber-200 border border-amber-500/30 hover:border-amber-400/60 hover:shadow-md hover:shadow-amber-500/20'
            ]"
          >
            <!-- 背景動畫效果 -->
            <div 
              v-if="activeFilter !== filter.key"
              class="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/10 to-amber-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
            ></div>
            
            <!-- 標籤內容 -->
            <div class="relative z-10 flex items-center space-x-2">
              <!-- 圖標（如果有的話） -->
              <Icon 
                v-if="filter.icon" 
                :name="filter.icon" 
                class="w-4 h-4"
              />
              
              <!-- 標籤文字 -->
              <span>{{ filter.name }}</span>
              
              <!-- 計數（如果有的話） -->
              <span 
                v-if="filter.count !== undefined"
                :class="[
                  'text-xs px-2 py-0.5 rounded-full font-bold',
                  activeFilter === filter.key
                    ? 'bg-slate-900/30 text-slate-900'
                    : 'bg-amber-500/20 text-amber-400'
                ]"
              >
                {{ filter.count }}
              </span>
            </div>
            
            <!-- 激活狀態指示器 -->
            <div 
              v-if="activeFilter === filter.key"
              class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-slate-900/50 rounded-full"
            ></div>
          </button>
        </div>
      </div>
      
      <!-- 搜尋結果統計 -->
      <div 
        v-if="showResultCount && (searchQuery || activeFilter !== 'all')"
        class="mt-4 pt-4 border-t border-slate-700/30"
      >
        <div class="flex items-center justify-between text-sm">
          <div class="text-gray-400">
            搜尋結果: 
            <span class="text-amber-400 font-medium">{{ resultCount }}</span> 
            項目
          </div>
          
          <!-- 結果狀態 -->
          <div 
            v-if="resultCount === 0 && (searchQuery.trim() || activeFilter !== 'all')"
            class="text-orange-400 flex items-center space-x-1"
          >
            <Icon name="heroicons:exclamation-triangle" class="w-4 h-4" />
            <span>沒有找到相關內容</span>
          </div>
        </div>
      </div>
      
      <!-- 快捷操作區域 -->
      <div v-if="showQuickActions" class="mt-4 pt-4 border-t border-slate-700/30">
        <div class="flex items-center justify-between">
          <div class="text-xs text-gray-500">
            快捷操作
          </div>
          <div class="flex items-center space-x-2">
            <!-- 隨機瀏覽 -->
            <button
              @click="randomBrowse"
              class="px-3 py-1.5 text-xs bg-slate-700/60 hover:bg-amber-500/25 text-gray-400 hover:text-amber-200 rounded-lg transition-all duration-300 flex items-center space-x-1 transform hover:scale-105 active:scale-95 hover:shadow-md hover:shadow-amber-500/20"
            >
              <Icon name="heroicons:arrow-path" class="w-3 h-3" />
              <span>隨機</span>
            </button>
            
            <!-- 重置所有 -->
            <button
              @click="resetAll"
              class="px-3 py-1.5 text-xs bg-slate-700/60 hover:bg-rose-500/25 text-gray-400 hover:text-rose-300 rounded-lg transition-all duration-300 flex items-center space-x-1 transform hover:scale-105 active:scale-95 hover:shadow-md hover:shadow-rose-500/20"
            >
              <Icon name="heroicons:arrow-uturn-left" class="w-3 h-3" />
              <span>重置</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Filter {
  key: string
  name: string
  icon?: string
  count?: number
}

interface Props {
  // 搜尋相關
  searchQuery: string
  searchPlaceholder?: string
  searchSuggestions?: string[]
  showSearchSuggestions?: boolean
  
  // 篩選相關
  filters?: Filter[]
  activeFilter: string
  
  // 結果統計
  resultCount?: number
  showResultCount?: boolean
  
  // 功能開關
  showQuickActions?: boolean
  
  // 防抖時間
  debounceTime?: number
}

const props = withDefaults(defineProps<Props>(), {
  searchPlaceholder: '搜尋內容...',
  searchSuggestions: () => [],
  showSearchSuggestions: true,
  showResultCount: true,
  showQuickActions: true,
  debounceTime: 300
})

const emit = defineEmits<{
  'search-change': [query: string]
  'filter-change': [filterKey: string]
  'search-submit': [query: string]
  'clear-search': []
  'clear-filters': []
  'reset-all': []
  'random-browse': []
}>()

// 響應式狀態
const showSuggestionsDropdown = ref(false)
const searchDebounceTimer = ref<NodeJS.Timeout>()

// 搜尋處理
const handleSearchChange = (value: string | number) => {
  const query = String(value)
  
  // 防抖處理
  if (searchDebounceTimer.value) {
    clearTimeout(searchDebounceTimer.value)
  }
  
  searchDebounceTimer.value = setTimeout(() => {
    emit('search-change', query)
  }, props.debounceTime)
}

const handleSearchSubmit = () => {
  emit('search-submit', props.searchQuery)
  showSuggestionsDropdown.value = false
}

const handleClearSearch = () => {
  emit('clear-search')
  showSuggestionsDropdown.value = false
}

// 篩選處理
const handleFilterChange = (filterKey: string) => {
  emit('filter-change', filterKey)
}

const clearAllFilters = () => {
  emit('clear-filters')
}

// 建議處理
const toggleSuggestions = () => {
  showSuggestionsDropdown.value = !showSuggestionsDropdown.value
}

const applySuggestion = (suggestion: string) => {
  emit('search-change', suggestion)
  showSuggestionsDropdown.value = false
}

// 快捷操作
const randomBrowse = () => {
  emit('random-browse')
}

const resetAll = () => {
  emit('reset-all')
  showSuggestionsDropdown.value = false
}

// 點擊外部關閉建議
const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement
  if (!target.closest('.search-input') && !target.closest('[data-suggestions]')) {
    showSuggestionsDropdown.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  if (searchDebounceTimer.value) {
    clearTimeout(searchDebounceTimer.value)
  }
})
</script>

<style scoped>
/* 搜尋輸入框的特殊動畫 */
.search-input :deep(.group:focus-within) {
  transform: scale(1.02);
}

/* 篩選標籤的背景掃過動畫 */
@keyframes filter-sweep {
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
</style>