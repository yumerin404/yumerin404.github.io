<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
    <!-- 進度條 -->
    <WritingProgressBar 
      :progress="scrollProgress"
      variant="gradient"
      :show-glow="true"
      :animated="true"
    />

    <!-- 背景裝飾效果 -->
    <WritingGradientBackground 
      variant="amber"
      opacity="medium"
      :decoration-count="15"
      decoration-symbol="✦"
    />

    <!-- Header -->
    <Header />

    <!-- Main Content -->
    <main class="relative z-10 pt-20">
      <!-- Breadcrumb -->
      <section class="py-4 px-4">
        <div class="container mx-auto max-w-7xl">
          <nav class="flex items-center space-x-2 text-sm text-gray-400">
            <NuxtLink to="/" class="hover:text-amber-400 transition-colors duration-300">首頁</NuxtLink>
            <Icon name="heroicons:chevron-right" class="w-4 h-4" />
            <NuxtLink to="/writing" class="hover:text-amber-400 transition-colors duration-300">寫作技巧</NuxtLink>
            <Icon name="heroicons:chevron-right" class="w-4 h-4" />
            <span class="text-amber-400">寫作技巧心得</span>
          </nav>
        </div>
      </section>

      <!-- Hero Section -->
      <section class="py-16 px-4 relative">
        <div class="container mx-auto max-w-6xl text-center">
          <div class="mb-12 animate-fade-in-up">
            <!-- 圖標容器 -->
            <div class="flex justify-center items-center mb-8">
              <div class="relative w-24 h-24 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-3xl flex items-center justify-center backdrop-blur-sm border border-amber-500/30">
                <div class="absolute inset-0 bg-gradient-to-br from-amber-400/10 to-orange-400/10 rounded-3xl animate-pulse-gentle"></div>
                <Icon name="heroicons:light-bulb" class="relative z-10 w-12 h-12 text-amber-400" />
              </div>
            </div>
            
            <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span class="bg-gradient-to-r from-amber-300 via-orange-300 via-yellow-300 to-amber-300 bg-clip-text text-transparent animate-gradient-shift">
                寫作技巧心得
              </span>
            </h1>
            
            <div class="w-32 h-1 bg-gradient-to-r from-amber-400 to-orange-400 mx-auto rounded-full mb-8 animate-glow-soft"></div>
            
            <p class="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              分享創作過程中的經驗與體悟，探討寫作技巧的實際應用與創作心路歷程
            </p>
          </div>
        </div>
      </section>

      <!-- 搜尋和篩選區域 -->
      <section class="py-8 px-4 relative">
        <div class="container mx-auto max-w-5xl">
          <WritingSearchFilter
            :search-query="searchQuery"
            :filters="filters"
            :active-filter="activeFilter"
            :result-count="filteredInsights.length"
            search-placeholder="搜尋寫作心得..."
            :search-suggestions="searchSuggestions"
            @search-change="handleSearchChange"
            @filter-change="handleFilterChange"
            @clear-search="clearSearch"
            @clear-filters="clearFilters"
            @reset-all="resetAll"
            @random-browse="randomBrowse"
          />
        </div>
      </section>

      <!-- Content Section -->
      <section class="py-16 px-4">
        <div class="container mx-auto max-w-7xl">
          <div class="flex flex-col lg:flex-row gap-8">
            
            <!-- 主要內容區域 -->
            <div class="flex-1">
              <div class="space-y-8">
                <!-- 寫作心得內容 -->
                <WritingContentCard
                  v-for="(insight, index) in filteredInsights"
                  :key="insight.id"
                  :content="insight"
                  :variant="getInsightVariant(insight.category)"
                  :categories="categories"
                  :animation-delay="index * 100"
                  @favorite="handleFavorite"
                  @share="handleShare"
                  @expand="handleExpand"
                />
                
                <!-- 沒有結果提示 -->
                <div 
                  v-if="filteredInsights.length === 0" 
                  class="text-center py-16"
                >
                  <div class="w-24 h-24 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon name="heroicons:magnifying-glass" class="w-12 h-12 text-gray-500" />
                  </div>
                  <h3 class="text-xl font-medium text-gray-400 mb-2">沒有找到相關內容</h3>
                  <p class="text-gray-500 mb-6">請嘗試調整搜尋條件或篩選設定</p>
                  <WritingButton
                    @click="resetAll"
                    variant="outline"
                    text="重置篩選"
                    leftIcon="heroicons:arrow-uturn-left"
                  />
                </div>
              </div>
            </div>
            
          </div>

        </div>
      </section>
    </main>
    
    <!-- 太空艦橋式導航系統 -->
    <div 
      class="fixed top-16 right-0 h-[calc(100vh-4rem)] z-50 transition-all duration-700 ease-out"
      :class="[
        showSidebar ? 'w-96' : 'w-16',
        showSidebar ? 'translate-x-0' : 'translate-x-0'
      ]"
    >
      <!-- 艦橋觸發器 - 全息投影式 -->
      <div 
        class="absolute left-0 top-1/2 -translate-y-1/2 h-32 cursor-pointer group transition-all duration-500"
        :class="showSidebar ? 'w-16 opacity-0 pointer-events-none' : 'w-16 opacity-100'"
        @click="showSidebar = true"
        @mouseenter="triggerHover = true"
        @mouseleave="triggerHover = false"
      >
        <!-- 全息投影觸發區域 -->
        <div class="relative w-full h-full">
          <!-- 主觸發面板 -->
          <div 
            class="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-800/95 to-slate-900/90 backdrop-blur-xl border-l border-y border-cyan-500/40 rounded-l-2xl shadow-2xl transition-all duration-500 overflow-hidden"
            :class="triggerHover ? 'border-cyan-400/80 shadow-[0_0_30px_rgba(34,211,238,0.3)]' : ''"
          >
            
            <!-- 能量流動條 -->
            <div class="absolute left-1 top-1/2 -translate-y-1/2 w-1 h-16 bg-gradient-to-b from-cyan-400/60 via-blue-500/80 to-purple-500/60 rounded-full transition-all duration-500"
                 :class="triggerHover ? 'w-1.5 shadow-[0_0_20px_rgba(34,211,238,0.8)] animate-pulse' : ''">
              <!-- 能量脈衝點 -->
              <div class="absolute top-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan-300 rounded-full animate-ping"></div>
              <div class="absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-purple-300 rounded-full animate-ping" style="animation-delay: 0.7s;"></div>
              <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-blue-300 rounded-full animate-ping" style="animation-delay: 1.2s;"></div>
            </div>
            
            <!-- 側邊觸發圖示 -->
            <div class="absolute right-2 top-1/2 -translate-y-1/2 transition-all duration-500"
                 :class="triggerHover ? 'scale-110 text-cyan-300' : 'text-gray-400'">
              <Icon name="heroicons:bars-3" class="w-6 h-6" />
            </div>
            
            <!-- 全息提示標籤 -->
            <div 
              class="absolute left-20 top-1/2 -translate-y-1/2 transition-all duration-500 transform"
              :class="triggerHover ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'"
            >
              <div class="bg-slate-900/95 backdrop-blur-sm border border-cyan-500/50 rounded-xl px-4 py-2 shadow-2xl">
                <div class="text-sm text-cyan-300 font-medium">導航控制台</div>
                <div class="text-xs text-gray-400 mt-1">點擊展開</div>
              </div>
              <!-- 全息箭頭 -->
              <div class="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-8 border-transparent border-r-cyan-500/50"></div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 主導航面板 - 艦橋控制台風格 -->
      <div 
        class="ml-16 h-full relative transition-all duration-700 ease-out"
        :class="showSidebar ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'"
      >
        <!-- 關閉按鈕 -->
        <button
          @click="showSidebar = false"
          class="absolute -left-12 top-4 w-8 h-8 bg-slate-900/95 backdrop-blur-sm border border-red-500/40 rounded-full flex items-center justify-center text-red-400 hover:text-red-300 hover:border-red-400/60 transition-all duration-300 z-10 group"
        >
          <Icon name="heroicons:x-mark" class="w-4 h-4" />
          <div class="absolute inset-0 bg-red-500/10 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse"></div>
        </button>
        
        <!-- 主面板容器 -->
        <div class="w-full h-full relative">
          <!-- 外層能量護盾 -->
          <div class="absolute -inset-2 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10 rounded-2xl blur-lg animate-pulse-slow"></div>
          
          <!-- 主面板結構 -->
          <div class="relative w-full h-full bg-gradient-to-br from-slate-900/98 via-slate-800/95 to-slate-900/98 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
            
            
            <!-- 主內容區域 -->
            <div class="flex-1 h-full relative">
              <!-- 目錄組件容器 -->
              <div class="absolute inset-0 p-4">
                <UniversalTableOfContents
                  :toc-items="tocData"
                  :active-section="activeSection"
                  :categories="tocCategories"
                  title="INSIGHTS_MATRIX"
                  search-placeholder="搜索寫作心得..."
                  @section-click="scrollToSection"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 回到頂部按鈕 -->
    <WritingBackToTop 
      :progress="scrollProgress"
      :threshold="500"
      variant="gradient"
      size="md"
      :show-progress="true"
      :show-glow="true"
    />
  </div>
</template>

<script setup lang="ts">
// SEO 設定
useHead({
  title: '寫作技巧心得 - 夢鈴領域',
  meta: [
    { 
      name: 'description', 
      content: '分享創作過程中的經驗與體悟，探討寫作技巧的實際應用，從構思到完稿的創作心路歷程。' 
    },
    { 
      name: 'keywords', 
      content: '寫作心得, 創作經驗, 寫作技巧, 創作過程, 靈感捕捉, 角色塑造, 對話寫作' 
    },
    {
      property: 'og:title',
      content: '寫作技巧心得 - 夢鈴領域'
    },
    {
      property: 'og:description',
      content: '分享創作過程中的經驗與體悟，探討寫作技巧的實際應用與創作心路歷程。'
    }
  ]
})

// 響應式數據
const searchQuery = ref('')
const activeFilter = ref('all')
const activeSection = ref('')
const scrollProgress = ref(0)
const showBackToTop = ref(false)
const readingProgress = ref(0)
const showSidebar = ref(false)
const triggerHover = ref(false)

// 分類篩選選項
const categories = [
  { key: 'rhythm', name: '節奏掌控', icon: 'heroicons:arrow-trending-up' },
  { key: 'emotion', name: '情感表達', icon: 'heroicons:heart' },
  { key: 'character', name: '角色描寫', icon: 'heroicons:sparkles' },
  { key: 'technique', name: '寫作技法', icon: 'heroicons:pencil-square' },
  { key: 'creativity', name: '創作心法', icon: 'heroicons:light-bulb' }
]

// 寫作心得數據
const insightsData = [
  {
    id: 'rhythm-control',
    title: '劇情節奏的掌控',
    category: 'rhythm',
    icon: 'heroicons:arrow-trending-up',
    quote: '劇情應該由慢，利用讀者們越來越對劇情熟悉，慢慢加快整個故事劇情的節奏。',
    content: `
      <p>這是一個關於故事節奏控制的重要觀點。就像音樂中的漸強一樣，故事的節奏應該有一個自然的發展曲線。</p>
      <p>開始時讓讀者適應故事世界，逐漸建立情感連結，然後隨著讀者投入度的增加，逐步加快情節發展的速度，最終達到高潮。</p>
    `,
    readTime: 3,
    wordCount: 150,
    date: '2024-01-15'
  },
  {
    id: 'love-expression',
    title: '愛的極致表達',
    category: 'emotion',
    icon: 'heroicons:heart',
    quote: '故事中表達愛的終極方式，是死亡，但現實千萬不要將這樣的觀念帶入。',
    content: `
      <p>在文學創作中，死亡常常被用作表達愛情強烈程度的終極手段。從《羅密歐與朱麗葉》到各種悲劇作品，死亡都象徵著愛的純粹與永恆。</p>
      <p class="text-amber-300 font-medium">但是，這僅僅是文學手法，絕不應該成為現實生活的指導原則。創作者必須明確區分虛構與現實。</p>
    `,
    readTime: 4,
    wordCount: 200,
    date: '2024-01-20'
  },
  {
    id: 'character-poetry',
    title: '純真角色的詩意描寫',
    category: 'character',
    icon: 'heroicons:sparkles',
    content: `
      <p class="text-amber-300 font-medium mb-4">要寫蘿莉，就不能只寫蘿莉。</p>
      
      <p>要寫風掠過她嗓音像浸了蜜的風鈴，脆生生喊「看鏡頭呀」。</p>
      <p>寫她舉著兩隻小手比耶，指節還帶著孩童的圓潤，在光線下泛著軟乎乎的白。</p>
      <p>寫她蹦跳時藍格裙角揚起，把春末夏初的鮮活都揉進每一步雀躍裡。</p>
      <p>寫她眼裡盛著未經雕琢的澄澈，把路邊野花視作寶藏，將水窪倒影當成魔法鏡。</p>
      <p>寫她攥著你衣角分享「今天螞蟻搬了三粒米」時，掌心傳來的溫熱與依賴。</p>
      
      <div class="bg-slate-700/30 rounded-xl p-4 my-4">
        <p>寫她笑起來時眼尾彎成月牙，雙馬尾時，髮梢輕掃過米白色校服領口的溫柔。
        而你在她毫無保留的雀躍裡忽然懂得——喜歡是被這份未染塵埃的天真輕輕撞了滿懷，是看她用稚嫩熱忱丈量世界時，自己也跟著心跳輕了半拍，甘願做她奇思妙想旁的守護者，陪她把尋常巷弄走成童話裡的冒險途。</p>
      </div>
      
      <p class="mb-4">這是一段關於如何描寫純真角色的精美範例。作者不是直接描述角色，而是通過細膩的感官描寫、動作描寫，營造出一種純真美好的氛圍。</p>
      
      <div class="bg-slate-700/30 rounded-xl p-4 my-4">
        <p class="text-yellow-300 font-medium mb-3">寫作技巧精髓：</p>
        <ul class="list-disc list-inside space-y-2 text-sm text-gray-400 ml-4">
          <li>使用具體的感官描寫（聲音、觸感、視覺）</li>
          <li>通過動作和細節展現角色特質</li>
          <li>運用詩意的語言營造氛圍</li>
          <li>將抽象情感具象化表達</li>
          <li>從觀察者視角展現情感共鳴</li>
        </ul>
      </div>
    `,
    readTime: 6,
    wordCount: 350,
    date: '2024-01-25'
  }
]

const filters = [
  { key: 'all', name: '全部', count: undefined },
  ...categories.map(cat => ({ 
    key: cat.key, 
    name: cat.name, 
    icon: cat.icon,
    count: insightsData.filter(item => item.category === cat.key).length 
  }))
]

// 搜尋建議
const searchSuggestions = [
  '劇情節奏',
  '角色描寫',
  '情感表達',
  '寫作技巧',
  '創作心得',
  '蘿莉描寫',
  '愛情表達',
  '文學手法'
]

// 計算屬性
const filteredInsights = computed(() => {
  let filtered = insightsData

  // 按分類篩選
  if (activeFilter.value !== 'all') {
    filtered = filtered.filter(insight => insight.category === activeFilter.value)
  }

  // 按搜尋詞篩選
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim()
    filtered = filtered.filter(insight => 
      insight.title.toLowerCase().includes(query) ||
      (insight.content && insight.content.toLowerCase().includes(query)) ||
      (insight.quote && insight.quote.toLowerCase().includes(query))
    )
  }

  return filtered
})

const tocItems = computed(() => {
  return filteredInsights.value.map(insight => ({
    id: insight.id,
    title: insight.title,
    category: insight.category,
    level: 1
  }))
})

// 側邊欄專用的目錄數據
const tocData = computed(() => {
  return filteredInsights.value.map(insight => ({
    id: insight.id,
    title: insight.title,
    subtitle: insight.quote,
    category: insight.category, // 使用category key而不是name
    level: 1,
    readTime: insight.readTime,
    wordCount: insight.wordCount
  }))
})

// 側邊欄專用的分類數據
const tocCategories = computed(() => [
  { key: 'rhythm', name: '節奏掌控', icon: 'heroicons:arrow-trending-up' },
  { key: 'emotion', name: '情感表達', icon: 'heroicons:heart' },
  { key: 'character', name: '角色描寫', icon: 'heroicons:sparkles' },
  { key: 'technique', name: '寫作技法', icon: 'heroicons:pencil-square' },
  { key: 'creativity', name: '創作心法', icon: 'heroicons:light-bulb' },
  { key: 'other', name: '其他', icon: 'heroicons:ellipsis-horizontal' }
])

// 側邊欄專用的分類數據
const categoryData = computed(() => {
  return [
    { key: 'all', name: '全部', count: insightsData.length },
    ...categories.map(cat => ({
      ...cat,
      count: insightsData.filter(insight => insight.category === cat.key).length
    }))
  ]
})

const activeCategory = computed(() => activeFilter.value)

// 工具函數
const getInsightVariant = (category: string) => {
  const variantMap: Record<string, 'default' | 'highlight' | 'subtle' | 'accent'> = {
    rhythm: 'default',
    emotion: 'highlight', 
    character: 'accent',
    technique: 'default',
    creativity: 'subtle'
  }
  return variantMap[category] || 'default'
}


// 事件處理
const handleSearchChange = (query: string) => {
  searchQuery.value = query
}

const handleFilterChange = (filterKey: string) => {
  activeFilter.value = filterKey
}

const clearSearch = () => {
  searchQuery.value = ''
}

const clearFilters = () => {
  activeFilter.value = 'all'
}

// 側邊欄相關方法
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    activeSection.value = sectionId
  }
}

const setActiveCategory = (categoryKey: string) => {
  activeFilter.value = categoryKey
}

const resetAll = () => {
  searchQuery.value = ''
  activeFilter.value = 'all'
}

const randomBrowse = () => {
  if (insightsData.length > 0 && process.client) {
    const randomIndex = Math.floor(Math.random() * insightsData.length)
    const randomInsight = insightsData[randomIndex]
    const element = document.getElementById(randomInsight.id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }
}

const handleSectionClick = (sectionId: string) => {
  activeSection.value = sectionId
}

const handleFavorite = (contentId: string, favorited: boolean) => {
  console.log(`${favorited ? '收藏' : '取消收藏'}: ${contentId}`)
}

const handleShare = (content: any) => {
  if (!process.client) return
  
  if (navigator.share) {
    navigator.share({
      title: content.title,
      text: content.quote || content.title,
      url: window.location.href + '#' + content.id
    })
  } else {
    // 後備方案：複製到剪貼板
    navigator.clipboard.writeText(window.location.href + '#' + content.id)
  }
}

const handleExpand = (contentId: string, expanded: boolean) => {
  console.log(`${expanded ? '展開' : '收合'}: ${contentId}`)
}


const updateScrollProgress = () => {
  if (!process.client) return
  
  const scrollTop = window.pageYOffset
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  scrollProgress.value = (scrollTop / docHeight) * 100
  readingProgress.value = scrollProgress.value
  
  showBackToTop.value = scrollTop > 500
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
onMounted(() => {
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

@keyframes float-gentle {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  33% {
    transform: translateY(-8px) rotate(1deg);
  }
  66% {
    transform: translateY(-4px) rotate(-1deg);
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
    box-shadow: 0 0 10px rgba(251, 191, 36, 0.3);
  }
  50% {
    box-shadow: 0 0 20px rgba(251, 191, 36, 0.5), 0 0 30px rgba(251, 191, 36, 0.3);
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

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out;
}

.animate-float-gentle {
  animation: float-gentle 6s ease-in-out infinite;
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

/* 太空風格動畫 */
@keyframes starfield-drift {
  0% { transform: translateX(0) translateY(0); }
  25% { transform: translateX(-2px) translateY(-1px); }
  50% { transform: translateX(2px) translateY(1px); }
  75% { transform: translateX(-1px) translateY(2px); }
  100% { transform: translateX(0) translateY(0); }
}

@keyframes energy-pulse {
  0%, 100% { 
    opacity: 0.4;
    transform: scale(1);
  }
  50% { 
    opacity: 1;
    transform: scale(1.1);
  }
}

@keyframes hologram-flicker {
  0%, 100% { opacity: 1; }
  98% { opacity: 1; }
  99% { opacity: 0.8; }
}

@keyframes data-stream {
  0% { 
    transform: translateY(-10px);
    opacity: 0;
  }
  20% { 
    opacity: 1;
  }
  80% { 
    opacity: 1;
  }
  100% { 
    transform: translateY(10px);
    opacity: 0;
  }
}

.animate-starfield-drift {
  animation: starfield-drift 12s ease-in-out infinite;
}

.animate-energy-pulse {
  animation: energy-pulse 2s ease-in-out infinite;
}

.animate-hologram-flicker {
  animation: hologram-flicker 5s ease-in-out infinite;
}

.animate-data-stream {
  animation: data-stream 2s ease-in-out infinite;
}

/* 新增的太空風格動畫 */
@keyframes pulse-slow {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
}

@keyframes pulse-gentle {
  0%, 100% { 
    transform: scale(1);
    opacity: 0.8;
  }
  50% { 
    transform: scale(1.1);
    opacity: 1;
  }
}

@keyframes scan-line {
  0% { transform: translateX(-100%); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateX(100%); opacity: 0; }
}

.animate-pulse-slow {
  animation: pulse-slow 4s ease-in-out infinite;
}

.animate-pulse-gentle {
  animation: pulse-gentle 3s ease-in-out infinite;
}

.animate-scan-line {
  animation: scan-line 3s ease-in-out infinite;
}
</style>