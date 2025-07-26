<template>
  <div class="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-amber-500/20 shadow-xl">
    
    <!-- 主搜尋區域 -->
    <div class="mb-6">
      <div class="relative group">
        <!-- 搜尋輸入框 -->
        <input
          :value="searchQuery"
          @input="handleSearchInput"
          @keydown.enter="handleSearch"
          type="search"
          :placeholder="searchPlaceholder"
          class="w-full rounded-xl border bg-slate-900/70 border-amber-500/40 text-white px-4 py-3 pl-12 text-base hover:border-amber-400/60 hover:bg-slate-900/80 focus:border-amber-400 focus:ring-amber-400/25 focus:bg-slate-900/85 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 placeholder:text-gray-500 transition-all duration-300 transform focus:scale-[1.02]"
        />
        
        <!-- 搜尋圖標 -->
        <Icon 
          name="heroicons:magnifying-glass" 
          class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-amber-400 transition-colors duration-300" 
        />
        
        <!-- 清除按鈕 -->
        <button
          v-if="searchQuery"
          @click="clearSearch"
          class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-amber-300 transition-all duration-300 p-1 rounded-full hover:bg-amber-500/20 hover:scale-110 active:scale-95"
        >
          <Icon name="heroicons:x-mark" class="w-4 h-4" />
        </button>
        
        <!-- Focus 發光效果 -->
        <div class="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-400/25 to-amber-600/25 blur-md -z-10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 shadow-lg shadow-amber-500/20"></div>
      </div>

      <!-- 搜尋建議 -->
      <div v-if="showSuggestions && searchSuggestions?.length" class="mt-3">
        <div class="flex flex-wrap gap-2">
          <span class="text-sm text-gray-400 mr-2">熱門搜尋：</span>
          <button
            v-for="suggestion in searchSuggestions.slice(0, 5)"
            :key="suggestion"
            @click="selectSuggestion(suggestion)"
            class="inline-flex items-center px-3 py-1 rounded-lg text-xs text-amber-200 bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/20 hover:border-amber-400/30 transition-all duration-300 transform hover:scale-105"
          >
            <Icon name="heroicons:hashtag" class="w-3 h-3 mr-1 opacity-70" />
            {{ suggestion }}
          </button>
        </div>
      </div>
    </div>

    <!-- 篩選器區域 -->
    <div class="space-y-4">
      
      <!-- 快速篩選標籤 -->
      <div class="flex flex-wrap items-center gap-3">
        <span class="text-sm text-gray-400 font-medium">分類篩選：</span>
        <button
          v-for="filter in filters"
          :key="filter.key"
          @click="selectFilter(filter.key)"
          class="group relative inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105"
          :class="[
            activeFilter === filter.key
              ? 'bg-gradient-to-r from-amber-500/30 to-amber-600/30 text-amber-200 border border-amber-400/50 shadow-lg shadow-amber-500/20'
              : 'bg-slate-700/50 text-gray-300 border border-slate-600/50 hover:bg-amber-500/20 hover:text-amber-300 hover:border-amber-500/40'
          ]"
        >
          <Icon 
            v-if="filter.icon" 
            :name="filter.icon" 
            class="w-4 h-4 mr-2 transition-transform duration-300 group-hover:scale-110" 
          />
          {{ filter.name }}
          <span 
            v-if="filter.count !== undefined"
            class="ml-2 px-2 py-0.5 rounded-full text-xs"
            :class="[
              activeFilter === filter.key
                ? 'bg-amber-400/30 text-amber-100'
                : 'bg-slate-600/50 text-gray-400 group-hover:bg-amber-500/30 group-hover:text-amber-200'
            ]"
          >
            {{ filter.count }}
          </span>
          
          <!-- 活躍狀態發光效果 -->
          <div 
            v-if="activeFilter === filter.key"
            class="absolute -inset-1 bg-gradient-to-r from-amber-500/20 to-amber-600/20 rounded-lg blur-sm -z-10 animate-pulse-gentle"
          ></div>
        </button>
      </div>

      <!-- 進階篩選選項 -->
      <div class="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-amber-500/20">
        
        <!-- 排序選項 -->
        <div class="flex items-center space-x-3">
          <span class="text-sm text-gray-400 font-medium">排序方式：</span>
          <div class="relative group">
            <select 
              :value="sortBy"
              @change="handleSortChange"
              class="bg-slate-800/60 border border-amber-500/30 rounded-lg px-3 py-2 pr-8 text-sm text-white focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all duration-300 appearance-none cursor-pointer hover:bg-slate-700/60"
            >
              <option value="latest">最新發佈</option>
              <option value="popular">最受歡迎</option>
              <option value="author">作者排序</option>
              <option value="category">分類排序</option>
              <option value="random">隨機排序</option>
            </select>
            <Icon 
              name="heroicons:chevron-down" 
              class="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none group-hover:text-amber-300 transition-colors duration-300" 
            />
          </div>
        </div>

        <!-- 結果統計和操作 -->
        <div class="flex items-center space-x-4">
          <!-- 結果數量 -->
          <div class="text-sm text-gray-400">
            共找到 <span class="text-amber-400 font-medium">{{ resultCount }}</span> 條名言
          </div>

          <!-- 操作按鈕組 -->
          <div class="flex items-center space-x-2">
            <!-- 隨機瀏覽 -->
            <button
              @click="handleRandomBrowse"
              class="p-2 rounded-lg text-gray-400 hover:text-amber-300 hover:bg-amber-500/20 transition-all duration-300 transform hover:scale-110 active:scale-95 group/random"
              title="隨機瀏覽"
            >
              <Icon name="heroicons:arrow-path" class="w-5 h-5 transition-transform duration-300 group-hover/random:rotate-180" />
            </button>

            <!-- 清除篩選 -->
            <button
              v-if="hasActiveFilters"
              @click="clearFilters"
              class="p-2 rounded-lg text-gray-400 hover:text-amber-300 hover:bg-amber-500/20 transition-all duration-300 transform hover:scale-110 active:scale-95"
              title="清除篩選"
            >
              <Icon name="heroicons:funnel-slash" class="w-5 h-5" />
            </button>

            <!-- 重置全部 -->
            <button
              @click="resetAll"
              class="inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 bg-transparent border border-amber-500/60 text-amber-400 hover:bg-amber-500/15 hover:border-amber-400 hover:scale-105 hover:text-amber-200 hover:shadow-lg hover:shadow-amber-500/25 focus:ring-amber-500 focus:ring-2 active:scale-95 transform"
            >
              <Icon name="heroicons:arrow-uturn-left" class="w-4 h-4 mr-2" />
              重置
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 進階搜尋展開區域 -->
    <div 
      v-if="showAdvancedSearch"
      class="mt-6 pt-6 border-t border-amber-500/20 animate-slide-down"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
        <!-- 作者篩選 -->
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">作者</label>
          <input
            :value="authorFilter"
            @input="handleAuthorFilter"
            type="text"
            placeholder="搜尋作者..."
            class="w-full rounded-lg border bg-slate-800/60 border-amber-500/30 text-white px-3 py-2 text-sm focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all duration-300"
          />
        </div>

        <!-- 年代篩選 -->
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">年代</label>
          <select 
            :value="eraFilter"
            @change="handleEraFilter"
            class="w-full bg-slate-800/60 border border-amber-500/30 rounded-lg px-3 py-2 text-sm text-white focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all duration-300"
          >
            <option value="">全部年代</option>
            <option value="ancient">古代</option>
            <option value="medieval">中世紀</option>
            <option value="renaissance">文藝復興</option>
            <option value="modern">近現代</option>
            <option value="contemporary">當代</option>
          </select>
        </div>

        <!-- 語言篩選 -->
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">語言</label>
          <select 
            :value="languageFilter"
            @change="handleLanguageFilter"
            class="w-full bg-slate-800/60 border border-amber-500/30 rounded-lg px-3 py-2 text-sm text-white focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all duration-300"
          >
            <option value="">全部語言</option>
            <option value="chinese">中文</option>
            <option value="english">英文</option>
            <option value="latin">拉丁文</option>
            <option value="greek">希臘文</option>
          </select>
        </div>
      </div>
    </div>

    <!-- 進階搜尋切換按鈕 -->
    <div class="mt-4 pt-4 border-t border-amber-500/20">
      <button
        @click="toggleAdvancedSearch"
        class="inline-flex items-center text-sm text-amber-400 hover:text-amber-300 transition-colors duration-300"
      >
        <Icon 
          :name="showAdvancedSearch ? 'heroicons:chevron-up' : 'heroicons:chevron-down'" 
          class="w-4 h-4 mr-2 transition-transform duration-300" 
        />
        {{ showAdvancedSearch ? '收起進階搜尋' : '展開進階搜尋' }}
      </button>
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
  searchQuery: string
  filters: Filter[]
  activeFilter: string
  resultCount: number
  searchPlaceholder?: string
  searchSuggestions?: string[]
  sortBy?: string
  authorFilter?: string
  eraFilter?: string
  languageFilter?: string
}

interface Emits {
  (e: 'search-change', query: string): void
  (e: 'filter-change', filterKey: string): void
  (e: 'sort-change', sortBy: string): void
  (e: 'author-filter', author: string): void
  (e: 'era-filter', era: string): void
  (e: 'language-filter', language: string): void
  (e: 'clear-search'): void
  (e: 'clear-filters'): void
  (e: 'reset-all'): void
  (e: 'random-browse'): void
}

const props = withDefaults(defineProps<Props>(), {
  searchPlaceholder: '搜尋名言佳句...',
  searchSuggestions: () => [],
  sortBy: 'latest',
  authorFilter: '',
  eraFilter: '',
  languageFilter: ''
})

const emit = defineEmits<Emits>()

// 響應式狀態
const showSuggestions = ref(true)
const showAdvancedSearch = ref(false)

// 計算屬性
const hasActiveFilters = computed(() => {
  return props.activeFilter !== 'all' || 
         props.searchQuery.trim() !== '' ||
         props.authorFilter !== '' ||
         props.eraFilter !== '' ||
         props.languageFilter !== ''
})

// 方法
const handleSearchInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('search-change', target.value)
}

const handleSearch = () => {
  showSuggestions.value = false
}

const clearSearch = () => {
  emit('clear-search')
  showSuggestions.value = true
}

const selectSuggestion = (suggestion: string) => {
  emit('search-change', suggestion)
  showSuggestions.value = false
}

const selectFilter = (filterKey: string) => {
  emit('filter-change', filterKey)
}

const handleSortChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  emit('sort-change', target.value)
}

const handleAuthorFilter = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('author-filter', target.value)
}

const handleEraFilter = (event: Event) => {
  const target = event.target as HTMLSelectElement
  emit('era-filter', target.value)
}

const handleLanguageFilter = (event: Event) => {
  const target = event.target as HTMLSelectElement
  emit('language-filter', target.value)
}

const clearFilters = () => {
  emit('clear-filters')
}

const resetAll = () => {
  emit('reset-all')
  showSuggestions.value = true
  showAdvancedSearch.value = false
}

const handleRandomBrowse = () => {
  emit('random-browse')
}

const toggleAdvancedSearch = () => {
  showAdvancedSearch.value = !showAdvancedSearch.value
}

// 當搜尋查詢為空時顯示建議
watch(() => props.searchQuery, (newQuery) => {
  if (!newQuery.trim()) {
    showSuggestions.value = true
  }
})
</script>

<style scoped>
/* 自定義動畫 */
@keyframes slide-down {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse-gentle {
  0%, 100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
}

.animate-slide-down {
  animation: slide-down 0.3s ease-out;
}

.animate-pulse-gentle {
  animation: pulse-gentle 2s ease-in-out infinite;
}

/* 自定義選擇框樣式 */
select {
  background-image: none;
}

/* 搜尋輸入框特殊效果 */
input[type="search"]::-webkit-search-cancel-button {
  display: none;
}

/* 懸停效果增強 */
.group:hover input {
  transform: scale(1.02);
}
</style>