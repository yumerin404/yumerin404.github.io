<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-950 via-teal-950/20 to-slate-900 text-white relative overflow-hidden">
    <!-- 醫療背景效果 -->
    <div class="absolute inset-0 opacity-5">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_rgba(20,184,166,0.3)_0%,transparent_50%)]"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(59,130,246,0.2)_0%,transparent_50%)]"></div>
      <!-- 醫療網格背景 -->
      <div class="absolute inset-0 bg-[linear-gradient(rgba(20,184,166,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
    </div>

    <!-- 滾動進度條 -->
    <div class="fixed top-0 left-0 right-0 h-1 bg-slate-900/50 z-50">
      <div 
        class="h-full bg-gradient-to-r from-teal-400 via-cyan-400 to-emerald-400 transition-all duration-300 shadow-[0_0_10px_rgba(20,184,166,0.5)]"
        :style="{ width: scrollProgress + '%' }"
      ></div>
    </div>

    <!-- Header -->
    <Header />

    <!-- Main Content -->
    <main class="relative z-10 pt-20">
      <!-- Breadcrumb -->
      <section class="py-4 px-4">
        <div class="container mx-auto max-w-7xl">
          <nav class="flex items-center space-x-2 text-sm text-gray-400">
            <NuxtLink to="/" class="hover:text-teal-400 transition-colors duration-300">首頁</NuxtLink>
            <Icon name="heroicons:chevron-right" class="w-4 h-4" />
            <NuxtLink to="/medical" class="hover:text-teal-400 transition-colors duration-300">醫學知識</NuxtLink>
            <Icon name="heroicons:chevron-right" class="w-4 h-4" />
            <span class="text-teal-400">保健品資訊</span>
          </nav>
        </div>
      </section>

      <!-- Hero Section -->
      <section class="py-16 px-4 relative">
        <div class="container mx-auto max-w-5xl text-center">
          <div class="mb-12 animate-fade-in-up">
            <!-- 醫療圖標 -->
            <div class="flex justify-center items-center mb-8">
              <div class="relative w-24 h-24 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-3xl flex items-center justify-center backdrop-blur-sm border border-teal-500/30">
                <div class="absolute inset-0 bg-gradient-to-br from-teal-400/10 to-cyan-400/10 rounded-3xl animate-pulse-gentle"></div>
                <!-- 醫療脈衝圈 -->
                <div class="absolute inset-0 rounded-3xl border border-teal-400/30 animate-ping"></div>
                <Icon name="heroicons:heart" class="relative z-10 w-12 h-12 text-teal-400" />
              </div>
            </div>
            
            <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span class="bg-gradient-to-r from-teal-300 via-cyan-300 via-emerald-300 to-teal-300 bg-clip-text text-transparent animate-gradient-shift">
                營養補充品指南
              </span>
            </h1>
            
            <div class="w-32 h-1 bg-gradient-to-r from-teal-400 to-cyan-400 mx-auto rounded-full mb-8 animate-glow-soft"></div>
            
            <p class="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              基於科學證據的完整保健品分析，提供專業使用建議與安全指導
            </p>
            
            <!-- 統計資訊 -->
            <div class="flex flex-wrap justify-center gap-8 mt-12">
              <div class="text-center">
                <div class="text-3xl font-bold text-teal-400 mb-1">{{ supplementStatistics.totalProducts }}</div>
                <div class="text-sm text-gray-400">種保健品</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-cyan-400 mb-1">{{ supplementStatistics.totalCategories }}</div>
                <div class="text-sm text-gray-400">個分類</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-emerald-400 mb-1">{{ supplementStatistics.totalManufacturers }}</div>
                <div class="text-sm text-gray-400">個品牌</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 搜尋和篩選區域 -->
      <section class="py-8 px-4 relative">
        <div class="container mx-auto max-w-7xl">
          <div class="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-2xl">
            <div class="flex flex-col lg:flex-row gap-6 items-center">
              <!-- 搜尋框 -->
              <div class="flex-1 relative">
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="搜尋保健品名稱、成分或功效..."
                  class="w-full bg-slate-800/60 border border-slate-600/40 rounded-xl px-4 py-3 pl-12 text-white placeholder-slate-400 focus:border-teal-400/60 focus:outline-none focus:ring-2 focus:ring-teal-400/20 transition-all duration-300"
                />
                <Icon name="heroicons:magnifying-glass" class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <button
                  v-if="searchQuery"
                  @click="searchQuery = ''"
                  class="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 hover:text-teal-400 transition-colors duration-200"
                >
                  <Icon name="heroicons:x-mark" class="w-5 h-5" />
                </button>
              </div>
              
              <!-- 分類篩選 -->
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="category in supplementCategories"
                  :key="category.key"
                  @click="selectedCategory = category.key"
                  class="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 border flex items-center space-x-2"
                  :class="selectedCategory === category.key 
                    ? 'bg-teal-500/20 border-teal-400/60 text-teal-300 shadow-[0_0_8px_rgba(20,184,166,0.3)]' 
                    : 'bg-slate-800/40 border-slate-600/40 text-slate-400 hover:bg-teal-500/10 hover:border-teal-500/40 hover:text-teal-300'"
                >
                  <Icon :name="category.icon" class="w-4 h-4" />
                  <span>{{ category.name }}</span>
                  <span class="text-xs opacity-70">({{ category.count }})</span>
                </button>
              </div>
            </div>
            
            <!-- 搜尋結果統計 -->
            <div v-if="searchQuery || selectedCategory !== 'all'" class="mt-4 pt-4 border-t border-slate-700/50">
              <div class="flex items-center justify-between text-sm text-slate-400">
                <span>
                  找到 <span class="text-teal-400 font-medium">{{ filteredSupplements.length }}</span> 個相關保健品
                  <span v-if="searchQuery">包含「<span class="text-cyan-400">{{ searchQuery }}</span>」</span>
                </span>
                <button
                  @click="resetFilters"
                  class="text-teal-400 hover:text-teal-300 transition-colors duration-200"
                >
                  重置篩選
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Content Section -->
      <section class="py-16 px-4 relative">
        <div class="container mx-auto max-w-7xl">
          <div class="flex flex-col lg:flex-row gap-8">
            
            <!-- Main Content -->
            <div class="flex-1">
              <div class="space-y-8">
                
                <!-- 使用時間安排 -->
                <div v-if="selectedCategory === 'all' && !searchQuery" class="mb-12">
                  <div class="bg-gradient-to-br from-slate-900/80 to-slate-800/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
                    <h2 class="text-3xl font-bold text-white mb-6 flex items-center">
                      <Icon name="heroicons:clock" class="w-8 h-8 text-teal-400 mr-3" />
                      每日使用時間安排
                    </h2>
                    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div
                        v-for="(items, timeSlot) in usageSchedule"
                        :key="timeSlot"
                        class="bg-slate-800/40 rounded-xl p-6 border border-slate-700/30 hover:border-teal-500/30 transition-all duration-300"
                      >
                        <h3 class="text-lg font-semibold text-teal-300 mb-4 flex items-center">
                          <Icon name="heroicons:clock" class="w-5 h-5 mr-2" />
                          {{ timeSlot }}
                        </h3>
                        <ul class="space-y-2">
                          <li 
                            v-for="item in items" 
                            :key="item"
                            class="text-sm text-gray-300 flex items-start"
                          >
                            <Icon name="heroicons:check" class="w-4 h-4 text-teal-400 mr-2 mt-0.5 flex-shrink-0" />
                            {{ item }}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- 保健品內容 -->
                <div
                  v-for="(supplement, index) in filteredSupplements"
                  :key="supplement.id"
                  :id="supplement.id"
                  class="bg-gradient-to-br from-slate-900/80 to-slate-800/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl transition-all duration-500 hover:border-teal-500/30 hover:shadow-[0_0_30px_rgba(20,184,166,0.1)] group"
                  :style="{ animationDelay: `${index * 100}ms` }"
                >
                  <!-- 保健品標題 -->
                  <div class="flex items-start justify-between mb-6">
                    <div class="flex items-start space-x-4">
                      <div class="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center border border-teal-500/30 group-hover:border-teal-400/50 transition-all duration-300">
                        <Icon :name="getCategoryIcon(supplement.category)" class="w-6 h-6 text-teal-400" />
                      </div>
                      <div class="flex-1">
                        <h2 class="text-2xl font-bold text-white mb-2 group-hover:text-teal-100 transition-colors duration-300">
                          {{ supplement.title }}
                        </h2>
                        <div class="flex flex-wrap items-center gap-3 mb-2">
                          <span class="text-sm text-slate-400">{{ getCategoryName(supplement.category) }}</span>
                          <span class="text-slate-500">•</span>
                          <span class="text-sm text-cyan-300">{{ supplement.manufacturer }}</span>
                        </div>
                        <div class="text-sm text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 rounded-lg px-3 py-1 inline-block">
                          {{ supplement.usage }}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- 保健品詳細內容 -->
                  <div class="prose prose-invert max-w-none">
                    <div 
                      v-html="renderSupplementContent(supplement.content)"
                      class="text-gray-300 leading-relaxed"
                    ></div>
                  </div>
                  
                  <!-- 標籤 -->
                  <div v-if="supplement.tags && supplement.tags.length > 0" class="mt-6 pt-6 border-t border-slate-700/50">
                    <div class="flex flex-wrap gap-2">
                      <span
                        v-for="tag in supplement.tags"
                        :key="tag"
                        class="text-xs bg-slate-700/40 text-slate-300 px-3 py-1 rounded-full border border-slate-600/30"
                      >
                        {{ tag }}
                      </span>
                    </div>
                  </div>
                </div>
                
                <!-- 沒有結果提示 -->
                <div 
                  v-if="filteredSupplements.length === 0" 
                  class="text-center py-16"
                >
                  <div class="w-24 h-24 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon name="heroicons:magnifying-glass" class="w-12 h-12 text-gray-500" />
                  </div>
                  <h3 class="text-xl font-medium text-gray-400 mb-2">沒有找到相關保健品</h3>
                  <p class="text-gray-500 mb-6">請嘗試調整搜尋條件或篩選設定</p>
                  <MedicalButton
                    @click="resetFilters"
                    variant="outline"
                    text="重置篩選"
                    left-icon="heroicons:arrow-uturn-left"
                  />
                </div>

              </div>
            </div>
            
          </div>
        </div>
      </section>
    </main>

    <!-- 醫療側邊欄 -->
    <MedicalSidebar
      :toc-items="tocItems"
      :categories="supplementCategories"
      :active-section="activeSection"
      @section-click="scrollToSection"
      @category-change="handleCategoryChange"
    />

    <!-- 免責聲明 -->
    <section class="py-12 px-4 bg-slate-900/90 border-t border-slate-700/50">
      <div class="container mx-auto max-w-6xl">
        <div class="bg-red-500/10 border border-red-500/30 rounded-2xl p-8 backdrop-blur-sm">
          <h3 class="text-red-300 font-semibold mb-4 flex items-center justify-center text-xl">
            <Icon name="heroicons:exclamation-triangle" class="w-6 h-6 mr-3" />
            重要醫療免責聲明
          </h3>
          <div class="grid md:grid-cols-2 gap-6 text-sm text-gray-300 leading-relaxed">
            <div>
              <p class="mb-3">
                <strong class="text-red-200">本頁面提供的保健品資訊僅供教育和參考目的</strong>，不能替代專業醫療建議、診斷或治療。
              </p>
              <p class="mb-3">
                所有保健品的效果因個人體質、健康狀況和生活方式而異。使用任何保健品前，請諮詢合格的醫療專業人員。
              </p>
            </div>
            <div>
              <p class="mb-3">
                <strong class="text-red-200">特別注意：</strong>孕婦、哺乳期婦女、兒童、老年人或患有慢性疾病者，在使用任何保健品前必須先諮詢醫師。
              </p>
              <p>
                本網站不對因使用這些資訊而導致的任何後果承擔責任。如有健康問題，請立即尋求專業醫療協助。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 回到頂部按鈕 -->
    <button
      v-if="scrollProgress > 10"
      @click="scrollToTop"
      class="fixed bottom-8 right-8 w-12 h-12 bg-teal-500/20 backdrop-blur-sm border border-teal-500/30 rounded-full flex items-center justify-center text-teal-400 hover:bg-teal-500/30 hover:border-teal-400/50 transition-all duration-300 z-40 group"
    >
      <Icon name="heroicons:arrow-up" class="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
      <div class="absolute inset-0 bg-teal-500/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
    </button>
  </div>
</template>

<script setup lang="ts">
// SEO 設定
useHead({
  title: '營養補充品指南 - 醫學知識 - 夢鈴領域',
  meta: [
    { 
      name: 'description', 
      content: '詳細的營養補充品使用指南，包含胺基酸、魚油、維生素等各類保健品的科學配方與使用方法。基於真實科學文獻的專業分析。' 
    },
    { 
      name: 'keywords', 
      content: '營養補充品, 保健品, 胺基酸, 魚油, 維生素, 礦物質, 益生菌, 酵素, 使用指南, 醫學知識' 
    },
    {
      property: 'og:title',
      content: '營養補充品指南 - 醫學知識 - 夢鈴領域'
    },
    {
      property: 'og:description',
      content: '基於科學證據的完整保健品分析，提供專業使用建議與安全指導。'
    }
  ]
})

// 導入保健品內容解析工具
const { 
  parseSupplementSections, 
  organizeSectionsIntoCategories, 
  generateSupplementTOC,
  extractUsageSchedule
} = useMarkdownContent()

// 響應式數據
const activeSection = ref('')
const selectedCategory = ref('all')
const searchQuery = ref('')
const scrollProgress = ref(0)
const supplementContent = ref('')
const supplements = ref<any[]>([])
const usageSchedule = ref<Record<string, string[]>>({})

// 載入保健品數據
const loadSupplementData = async () => {
  try {
    // 獲取 supple.md 內容
    const content = await $fetch('/content/supple.md', { 
      responseType: 'text' 
    }) as string
    
    supplementContent.value = content
    
    // 解析保健品段落
    const sections = parseSupplementSections(content)
    supplements.value = sections
    
    // 提取使用時間安排
    usageSchedule.value = extractUsageSchedule(content)
    
  } catch (error) {
    console.error('載入保健品數據失敗:', error)
    // 提供備用數據
    supplements.value = []
    usageSchedule.value = {}
  }
}

// 保健品分類映射
const categoryIconMap: Record<string, string> = {
  'amino-acids': 'heroicons:bolt',
  'fish-oil': 'heroicons:water',
  'eye-health': 'heroicons:eye',
  'stomach-protection': 'heroicons:heart',
  'minerals': 'heroicons:cube',
  'vitamins': 'heroicons:sparkles',
  'others': 'heroicons:star',
  'enzymes': 'heroicons:beaker',
  'probiotics': 'heroicons:leaf'
}

const categoryNameMap: Record<string, string> = {
  'amino-acids': '胺基酸類',
  'fish-oil': '魚油補充劑',
  'eye-health': '眼部健康',
  'stomach-protection': '胃部保護',
  'minerals': '礦物質',
  'vitamins': '維生素',
  'others': '其他類補充',
  'enzymes': '酵素',
  'probiotics': '益生菌'
}

// 保健品分類
const supplementCategories = computed(() => {
  const categories = new Map()
  
  // 添加全部分類
  categories.set('all', {
    key: 'all',
    name: '全部',
    icon: 'heroicons:squares-2x2',
    count: supplements.value.length
  })
  
  // 計算各分類數量
  supplements.value.forEach(supplement => {
    const categoryKey = supplement.category
    const categoryName = categoryNameMap[categoryKey] || categoryKey
    const categoryIcon = categoryIconMap[categoryKey] || 'heroicons:circle'
    
    if (!categories.has(categoryKey)) {
      categories.set(categoryKey, {
        key: categoryKey,
        name: categoryName,
        icon: categoryIcon,
        count: 0
      })
    }
    
    const category = categories.get(categoryKey)
    category.count++
  })
  
  return Array.from(categories.values())
})

// 計算屬性
const filteredSupplements = computed(() => {
  let filtered = supplements.value
  
  // 按分類篩選
  if (selectedCategory.value !== 'all') {
    filtered = filtered.filter(supplement => supplement.category === selectedCategory.value)
  }
  
  // 按搜尋詞篩選
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(supplement =>
      supplement.title.toLowerCase().includes(query) ||
      supplement.content.toLowerCase().includes(query) ||
      (supplement.manufacturer && supplement.manufacturer.toLowerCase().includes(query)) ||
      (supplement.productName && supplement.productName.toLowerCase().includes(query)) ||
      (supplement.tags && supplement.tags.some((tag: string) => tag.toLowerCase().includes(query)))
    )
  }
  
  return filtered
})

const tocItems = computed(() => {
  return filteredSupplements.value.map(supplement => ({
    id: supplement.id,
    title: supplement.title,
    subtitle: supplement.content.replace(/<[^>]*>/g, '').substring(0, 80) + '...',
    category: supplement.category,
    frequency: supplement.usage ? 'high' : 'medium'
  }))
})

// 統計資訊
const supplementStatistics = computed(() => {
  const totalProducts = supplements.value.length
  const totalCategories = supplementCategories.value.length - 1 // 排除 "全部"
  const manufacturers = new Set(supplements.value.map(s => s.manufacturer).filter(Boolean))
  const totalManufacturers = manufacturers.size
  
  return {
    totalProducts,
    totalCategories,
    totalManufacturers
  }
})

// 工具函數
const getCategoryIcon = (categoryKey: string) => {
  return categoryIconMap[categoryKey] || 'heroicons:circle'
}

const getCategoryName = (categoryKey: string) => {
  return categoryNameMap[categoryKey] || categoryKey
}

// 渲染保健品內容的函數
const renderSupplementContent = (content: string) => {
  if (!content) return ''
  
  // 將 markdown 內容轉換為 HTML 的基本處理
  let html = content
    // 處理標題
    .replace(/^###\s+(.+)$/gm, '<h3 class="text-xl font-semibold text-teal-300 mb-4 mt-6">$1</h3>')
    .replace(/^##\s+(.+)$/gm, '<h2 class="text-2xl font-bold text-teal-200 mb-6 mt-8">$1</h2>')
    // 處理粗體
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-teal-200 font-semibold">$1</strong>')
    // 處理列表
    .replace(/^\s*-\s+(.+)$/gm, '<li class="mb-2 flex items-start"><span class="text-teal-400 mr-2">•</span>$1</li>')
    // 處理段落
    .replace(/\n\n/g, '</p><p class="mb-4">')
    // 處理連結
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener" class="text-cyan-400 hover:text-cyan-300 underline">$1</a>')
  
  // 包裝在段落標籤中
  html = '<p class="mb-4">' + html + '</p>'
  
  // 清理空段落
  html = html.replace(/<p class="mb-4"><\/p>/g, '')
  
  return html
}

// 事件處理
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    activeSection.value = sectionId
  }
}

const handleCategoryChange = (categoryKey: string) => {
  selectedCategory.value = categoryKey
}

const resetFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = 'all'
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const updateScrollProgress = () => {
  if (!process.client) return
  
  const scrollTop = window.pageYOffset
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  scrollProgress.value = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
}

const updateActiveSection = () => {
  if (!process.client) return
  
  const sections = document.querySelectorAll('[id]')
  let currentSection = ''
  
  sections.forEach(section => {
    const rect = section.getBoundingClientRect()
    if (rect.top <= 200 && rect.bottom >= 200) {
      currentSection = section.id
    }
  })
  
  activeSection.value = currentSection
}

// 生命週期
onMounted(async () => {
  await loadSupplementData()
  
  if (process.client) {
    window.addEventListener('scroll', () => {
      updateScrollProgress()
      updateActiveSection()
    })
    
    // 初始設定
    updateScrollProgress()
    updateActiveSection()
  }
})

onUnmounted(() => {
  if (process.client) {
    window.removeEventListener('scroll', updateScrollProgress)
    window.removeEventListener('scroll', updateActiveSection)
  }
})
</script>

<style scoped>
/* 醫療風格自定義動畫 */
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

@keyframes glow-soft {
  0%, 100% {
    box-shadow: 0 0 10px rgba(20, 184, 166, 0.3);
  }
  50% {
    box-shadow: 0 0 20px rgba(20, 184, 166, 0.5), 0 0 30px rgba(20, 184, 166, 0.3);
  }
}

@keyframes gradient-shift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

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

@keyframes data-flow {
  0% {
    transform: translateY(-10px);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateY(10px);
    opacity: 0;
  }
}

@keyframes heartbeat {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out;
}

.animate-pulse-gentle {
  animation: pulse-gentle 3s ease-in-out infinite;
}

.animate-glow-soft {
  animation: glow-soft 2s ease-in-out infinite;
}

.animate-gradient-shift {
  background-size: 200% 200%;
  animation: gradient-shift 8s ease-in-out infinite;
}

.animate-medical-scan {
  animation: medical-scan 2s ease-in-out infinite;
}

.animate-data-flow {
  animation: data-flow 3s ease-in-out infinite;
}

.animate-heartbeat {
  animation: heartbeat 2s ease-in-out infinite;
}

/* 醫療風格內容樣式 */
.prose {
  color: #e2e8f0;
}

.prose :deep(h2) {
  color: #14b8a6;
  border-bottom: 2px solid rgba(20, 184, 166, 0.2);
  padding-bottom: 0.5rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.prose :deep(h3) {
  color: #06b6d4;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

.prose :deep(strong) {
  color: #14b8a6;
  font-weight: 600;
}

.prose :deep(ul) {
  list-style: none;
  padding-left: 0;
}

.prose :deep(li) {
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
  position: relative;
}

.prose :deep(li::before) {
  content: "▸";
  color: #14b8a6;
  position: absolute;
  left: 0;
  top: 0;
}

.prose :deep(a) {
  color: #06b6d4;
  text-decoration: none;
  border-bottom: 1px solid rgba(6, 182, 212, 0.3);
  transition: all 0.2s ease;
}

.prose :deep(a:hover) {
  color: #0891b2;
  border-bottom-color: rgba(8, 145, 178, 0.6);
}

.prose :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
  background: rgba(30, 41, 59, 0.4);
  border-radius: 0.75rem;
  overflow: hidden;
}

.prose :deep(th),
.prose :deep(td) {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid rgba(71, 85, 105, 0.3);
}

.prose :deep(th) {
  background: rgba(20, 184, 166, 0.1);
  color: #14b8a6;
  font-weight: 600;
}

.prose :deep(blockquote) {
  border-left: 4px solid #14b8a6;
  padding-left: 1rem;
  margin: 1.5rem 0;
  background: rgba(20, 184, 166, 0.05);
  border-radius: 0.5rem;
  padding: 1rem;
}

/* 自定義滾動條 */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: rgba(30, 41, 59, 0.3);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: rgba(20, 184, 166, 0.4);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(20, 184, 166, 0.6);
}

/* 響應式調整 */
@media (max-width: 768px) {
  .animate-fade-in-up {
    animation-delay: 0.2s;
  }
  
  .prose :deep(h2) {
    font-size: 1.5rem;
  }
  
  .prose :deep(h3) {
    font-size: 1.25rem;
  }
}

/* 載入動畫 */
@keyframes skeleton-loading {
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
}

.skeleton-loading {
  background: linear-gradient(90deg, rgba(30, 41, 59, 0.4) 25%, rgba(20, 184, 166, 0.1) 50%, rgba(30, 41, 59, 0.4) 75%);
  background-size: 200px 100%;
  animation: skeleton-loading 1.5s infinite;
}
</style>