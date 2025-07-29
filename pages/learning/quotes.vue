<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900/95 to-slate-950 text-white relative overflow-hidden">
    <!-- 簡化的背景效果 -->
    <div class="absolute inset-0 bg-gradient-to-br from-slate-950 via-amber-950/10 to-slate-900"></div>
    
    <!-- 滾動進度條 -->
    <div class="fixed top-0 left-0 right-0 h-1 bg-slate-800 z-50">
      <div 
        class="h-full bg-gradient-to-r from-amber-400 to-amber-500 transition-all duration-300"
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
            <NuxtLink to="/" class="hover:text-amber-400 transition-colors duration-300 flex items-center">
              <Icon name="heroicons:home" class="w-4 h-4 mr-1" />
              首頁
            </NuxtLink>
            <Icon name="heroicons:chevron-right" class="w-4 h-4" />
            <NuxtLink to="/learning" class="hover:text-amber-400 transition-colors duration-300">心境與學習筆記</NuxtLink>
            <Icon name="heroicons:chevron-right" class="w-4 h-4" />
            <span class="text-amber-400">名言佳句</span>
          </nav>
        </div>
      </section>

      <!-- Hero Section -->
      <section class="py-16 px-4">
        <div class="container mx-auto max-w-5xl text-center">
          <div class="mb-12">
            <div class="flex justify-center items-center mb-8">
              <div class="w-24 h-24 bg-gradient-to-br from-amber-500/20 to-amber-600/20 rounded-3xl flex items-center justify-center backdrop-blur-sm border border-amber-500/30">
                <Icon name="heroicons:academic-cap" class="w-12 h-12 text-amber-400" />
              </div>
            </div>
            
            <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span class="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
                品味名言佳句
              </span>
            </h1>
            
            <div class="w-32 h-1 bg-gradient-to-r from-amber-400 to-amber-500 mx-auto rounded-full mb-8"></div>
            
            <p class="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              收集與分享觸動人心的名言佳句，以及個人的思考與感悟
            </p>
          </div>
        </div>
      </section>

      <!-- Search Section -->
      <section class="py-8 px-4">
        <div class="container mx-auto max-w-5xl">
          <div class="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-amber-500/20 shadow-xl">
            <div class="relative group">
              <input
                v-model="searchQuery"
                type="search"
                placeholder="搜尋名言佳句、作者或標籤..."
                class="w-full rounded-xl border bg-slate-900/70 border-amber-500/40 text-white px-4 py-3 pl-12 text-base hover:border-amber-400/60 hover:bg-slate-900/80 focus:border-amber-400 focus:ring-amber-400/25 focus:bg-slate-900/85 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 placeholder:text-gray-500 transition-all duration-300 transform focus:scale-[1.02]"
              />
              <Icon name="heroicons:magnifying-glass" class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-amber-400 transition-colors duration-300" />
            </div>
          </div>
        </div>
      </section>

      <!-- Quotes Content Section -->
      <section class="py-16 px-4" data-content-section>
        <div class="container mx-auto max-w-5xl">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <!-- 名言佳句卡片 -->
            <div 
              v-for="(quote, index) in filteredQuotes"
              :key="quote.id"
              :id="quote.id"
              class="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-2xl border border-amber-500/20 shadow-xl hover:border-amber-400/40 hover:shadow-2xl transition-all duration-300 hover:scale-105 h-80 flex flex-col overflow-hidden"
            >
              <!-- 卡片內容容器 -->
              <div class="flex-1 flex flex-col p-6 min-h-0">
                <!-- 名言內容 - 可滾動 -->
                <div class="flex-1 mb-4 overflow-y-auto scrollbar-thin scrollbar-thumb-amber-500/30 scrollbar-track-slate-700/30 min-h-0">
                  <blockquote class="text-lg text-gray-200 leading-relaxed pr-2 word-break">
                    <span v-html="formatQuoteContent(quote.content)"></span>
                  </blockquote>
                </div>
                
                <!-- 作者 -->
                <div class="text-right mb-4 flex-shrink-0">
                  <cite class="text-amber-300 font-medium">— {{ quote.author }}</cite>
                </div>
                
                <!-- 標籤 -->
                <div class="flex flex-wrap gap-2 mb-4 flex-shrink-0">
                  <span 
                    v-for="tag in quote.tags"
                    :key="tag"
                    class="px-2 py-1 bg-amber-500/20 text-amber-300 text-xs rounded-full cursor-pointer hover:bg-amber-500/30 transition-colors duration-200"
                    @click="handleTagClick(tag)"
                  >
                    {{ tag }}
                  </span>
                </div>
                
                <!-- 操作按鈕 -->
                <div class="flex justify-end space-x-2 flex-shrink-0">
                  <button
                    @click="handleShare(quote)"
                    class="p-2 rounded-full bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 hover:text-amber-200 transition-all duration-200"
                    title="分享"
                  >
                    <Icon name="heroicons:share" class="w-4 h-4" />
                  </button>
                  <button
                    @click="handleCopy(quote)"
                    class="p-2 rounded-full bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 hover:text-amber-200 transition-all duration-200"
                    title="複製"
                  >
                    <Icon name="heroicons:clipboard-document" class="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            
            <!-- 沒有結果提示 -->
            <div 
              v-if="filteredQuotes.length === 0" 
              class="col-span-full text-center py-16"
            >
              <div class="w-24 h-24 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="heroicons:document-magnifying-glass" class="w-12 h-12 text-gray-500" />
              </div>
              <h3 class="text-xl font-medium text-gray-400 mb-2">沒有找到相關名言</h3>
              <p class="text-gray-500 mb-6">請嘗試調整搜尋條件</p>
              <button
                @click="resetAll"
                class="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 bg-transparent border-2 border-amber-500/60 text-amber-400 hover:bg-amber-500/15 hover:border-amber-400 hover:scale-105"
              >
                <Icon name="heroicons:arrow-uturn-left" class="w-4 h-4 mr-2" />
                重置篩選
              </button>
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
            class="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-800/95 to-slate-900/90 backdrop-blur-xl border-l border-y border-amber-500/40 rounded-l-2xl shadow-2xl transition-all duration-500 overflow-hidden"
            :class="triggerHover ? 'border-amber-400/80 shadow-[0_0_30px_rgba(245,158,11,0.3)]' : ''"
          >
            
            <!-- 能量流動條 -->
            <div class="absolute left-1 top-1/2 -translate-y-1/2 w-1 h-16 bg-gradient-to-b from-amber-400/60 via-orange-500/80 to-yellow-500/60 rounded-full transition-all duration-500"
                 :class="triggerHover ? 'w-1.5 shadow-[0_0_20px_rgba(245,158,11,0.8)] animate-pulse' : ''">
              <!-- 能量脈衝點 -->
              <div class="absolute top-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-amber-300 rounded-full animate-ping"></div>
              <div class="absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-yellow-300 rounded-full animate-ping" style="animation-delay: 0.7s;"></div>
              <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-orange-300 rounded-full animate-ping" style="animation-delay: 1.2s;"></div>
            </div>
            
            <!-- 側邊觸發圖示 -->
            <div class="absolute right-2 top-1/2 -translate-y-1/2 transition-all duration-500"
                 :class="triggerHover ? 'scale-110 text-amber-300' : 'text-gray-400'">
              <Icon name="heroicons:bars-3" class="w-6 h-6" />
            </div>
            
            <!-- 全息提示標籤 -->
            <div 
              class="absolute left-20 top-1/2 -translate-y-1/2 transition-all duration-500 transform"
              :class="triggerHover ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'"
            >
              <div class="bg-slate-900/95 backdrop-blur-sm border border-amber-500/50 rounded-xl px-4 py-2 shadow-2xl">
                <div class="text-sm text-amber-300 font-medium">名言導航</div>
                <div class="text-xs text-gray-400 mt-1">點擊展開</div>
              </div>
              <!-- 全息箭頭 -->
              <div class="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-8 border-transparent border-r-amber-500/50"></div>
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
          <div class="absolute -inset-2 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-yellow-500/10 rounded-2xl blur-lg animate-pulse-slow"></div>
          
          <!-- 主面板結構 -->
          <div class="relative w-full h-full bg-gradient-to-br from-slate-900/98 via-slate-800/95 to-slate-900/98 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
            
            <!-- 主內容區域 -->
            <div class="flex-1 h-full relative">
              <!-- 目錄組件容器 -->
              <div class="absolute inset-0 p-4">
                <UniversalSidebar
                  :items="tocData"
                  :categories="tocCategories"
                  :active-item="activeSection"
                  :loading="contentLoading"
                  theme="learning"
                  trigger-icon="heroicons:academic-cap"
                  trigger-title="名言導航"
                  system-title="QUOTES_MATRIX"
                  search-placeholder="搜索名言佳句..."
                  @item-click="scrollToSection"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Back to Top Button -->
    <button
      v-if="scrollProgress > 10"
      @click="scrollToTop"
      class="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 text-slate-900 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl z-50 flex items-center justify-center"
    >
      <Icon name="heroicons:arrow-up" class="w-5 h-5" />
    </button>
  </div>
</template>

<script setup lang="ts">
// SEO 設定
useHead({
  title: '名言佳句 - 夢鈴領域',
  meta: [
    { 
      name: 'description', 
      content: '收集與分享觸動人心的名言佳句，包含人生哲理、歷史智慧、溝通藝術等各類精選名言，品味古今智者的思想精華。' 
    },
    { 
      name: 'keywords', 
      content: '名言佳句, 人生哲理, 古典智慧, 歷史名言, 思想精華, 溝通藝術, 哲學思辨' 
    },
    {
      property: 'og:title',
      content: '名言佳句 - 夢鈴領域'
    },
    {
      property: 'og:description',
      content: '收集與分享觸動人心的名言佳句，品味古今智者的思想精華。'
    },
    {
      property: 'og:type',
      content: 'article'
    }
  ]
})

// 響應式數據
const searchQuery = ref('')
const scrollProgress = ref(0)
const activeSection = ref('')
const showSidebar = ref(false)
const triggerHover = ref(false)
const contentLoading = ref(true)

// 名言數據

// 名言數據 - 從 .old/quotes.html 轉換
const quotes = [
  {
    id: 'nietzsche-stronger',
    content: '凡殺不死我的、必使我更強大。',
    author: '尼采',
    category: 'philosophy',
    tags: ['堅韌', '成長', '困難'],
    date: '2024-01-15',
    featured: true
  },
  {
    id: 'farewell-may-be-last',
    content: '每一次再見，可能真的是最後一次再見了。',
    author: '佚名',
    category: 'philosophy',
    tags: ['珍惜', '離別', '時光'],
    date: '2024-01-16'
  },
  {
    id: 'serious-people-legacy',
    content: '認真的人可能下場都不是太好，但他們留下的東西將會永遠流傳。',
    author: '佚名',
    category: 'philosophy',
    tags: ['認真', '傳承', '價值'],
    date: '2024-01-17',
    featured: true
  },
  {
    id: 'power-through-time',
    content: 'XX 擊穿了時間，功力是深厚的，打穿了幾千多年的時間。',
    author: '佚名',
    category: 'philosophy',
    tags: ['時間', '力量', '穿越'],
    date: '2024-01-18'
  },
  {
    id: 'fate-and-freedom',
    content: '時來天地皆同力，運去英雄不自由。',
    author: '羅隱',
    category: 'history',
    tags: ['命運', '英雄', '時勢'],
    date: '2024-01-19',
    featured: true
  },
  {
    id: 'historical-eyes',
    content: '誰生誰死，我們決定不了，到底有一天誰講我們的故事，我們也決定不了。但歷史最後會給我們一個定位，歷史的眼睛將會看著你。對與錯都是任人憑說，你也不知道到底是誰最後來講你的故事。或者你的故事根本不值得一提，但歷史的眼睛將會盯著你。自己能力不強被騙了，就被騙了。還是要說，自己相信的事情。而不是像他們那個樣子。',
    author: '佚名',
    category: 'history',
    tags: ['歷史', '定位', '信念'],
    date: '2024-01-20'
  },
  {
    id: 'four-establishments',
    content: '為天地立心，為生民立命，為往聖繼絕學，為萬世開太平。',
    author: '張載',
    category: 'classical',
    tags: ['理想', '責任', '使命'],
    date: '2024-01-21',
    featured: true
  },
  {
    id: 'eternal-flow',
    content: '爾曹身與名俱滅，不廢江河萬古流。',
    author: '杜甫',
    category: 'classical',
    tags: ['永恆', '流逝', '自然'],
    date: '2024-01-22'
  },
  {
    id: 'negotiation-wisdom',
    content: '談判時要說服的不是對面的人，而是對面那個人背後的所有人。',
    author: '佚名',
    category: 'communication',
    tags: ['談判', '說服', '策略'],
    date: '2024-01-23',
    featured: true
  },
  {
    id: 'life-feeling',
    content: '人生很多事情是要感受的，喪失了感受，很多東西才會看不懂。那不是看懂的事，那就是感受。',
    author: '佚名',
    category: 'philosophy',
    tags: ['感受', '人生', '理解'],
    date: '2024-01-24',
    featured: false
  },
  {
    id: 'zero-helpless-thoughts',
    content: '沒有辦法的想法等於 0。',
    author: '佚名',
    category: 'philosophy',
    tags: ['行動', '思維', '效率'],
    date: '2024-01-25',
    featured: false
  },
  {
    id: 'vinegar-dumplings',
    content: '就是為了這點醋，才包的這頓餃子。',
    author: '佚名',
    category: 'philosophy',
    tags: ['目的', '手段', '策略'],
    date: '2024-01-26',
    featured: false
  }
]

// 計算屬性
const filteredQuotes = computed(() => {
  let filtered = [...quotes]

  // 按搜尋詞篩選
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim()
    filtered = filtered.filter(quote => 
      quote.content.toLowerCase().includes(query) ||
      quote.author.toLowerCase().includes(query) ||
      quote.tags?.some(tag => tag.toLowerCase().includes(query))
    )
  }

  return filtered
})

// 側邊欄專用的目錄數據
const tocData = computed(() => {
  return filteredQuotes.value.map(quote => ({
    id: quote.id,
    title: `${quote.author}: ${quote.content.substring(0, 20)}...`,
    subtitle: quote.content.substring(0, 50) + '...',
    category: quote.category,
    level: 1
  }))
})

// 側邊欄專用的分類數據
const tocCategories = computed(() => [
  { key: 'philosophy', name: '哲學思辨', icon: 'heroicons:light-bulb' },
  { key: 'history', name: '歷史智慧', icon: 'heroicons:book-open' },
  { key: 'classical', name: '古典文學', icon: 'heroicons:academic-cap' },
  { key: 'communication', name: '溝通藝術', icon: 'heroicons:chat-bubble-left-right' },
  { key: 'other', name: '其他', icon: 'heroicons:ellipsis-horizontal' }
])

// 側邊欄相關方法
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    activeSection.value = sectionId
  }
}

const updateActiveSection = () => {
  if (!process.client) return
  
  const quotes = document.querySelectorAll('[id]')
  let currentSection = ''
  
  quotes.forEach(quote => {
    const rect = quote.getBoundingClientRect()
    if (rect.top <= 200 && rect.bottom >= 200) {
      currentSection = quote.id
    }
  })
  
  activeSection.value = currentSection
}

// 事件處理
const resetAll = () => {
  searchQuery.value = ''
}

const handleShare = (quote: any) => {
  if (!process.client) return
  
  const shareText = `"${quote.content}" - ${quote.author}`
  
  if (navigator.share) {
    navigator.share({
      title: '名言分享',
      text: shareText,
      url: window.location.href + '#' + quote.id
    })
  } else {
    navigator.clipboard.writeText(shareText)
  }
}

const handleCopy = (quote: any) => {
  if (!process.client) return
  
  const copyText = `"${quote.content}" - ${quote.author}`
  navigator.clipboard.writeText(copyText)
}

const handleTagClick = (tag: string) => {
  searchQuery.value = tag
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const formatQuoteContent = (content: string) => {
  // 將句號後面添加換行符
  return content.replace(/。/g, '。<br>')
}

const updateScrollProgress = () => {
  if (!process.client) return
  
  const scrollTop = window.pageYOffset
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  scrollProgress.value = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
}

// 生命週期
onMounted(async () => {
  try {
    // 模擬載入延遲
    await new Promise(resolve => setTimeout(resolve, 500))
  } finally {
    contentLoading.value = false
  }
  
  if (process.client) {
    const handleScroll = () => {
      updateScrollProgress()
      updateActiveSection()
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    updateScrollProgress()
    updateActiveSection()
  }
})

onUnmounted(() => {
  if (process.client) {
    window.removeEventListener('scroll', updateScrollProgress)
  }
})
</script>

<style scoped>
/* 古典雅典風格動畫 */
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

@keyframes spin-slow {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes athena-glow {
  0%, 100% { 
    opacity: 0.4;
    transform: scale(1);
  }
  50% { 
    opacity: 1;
    transform: scale(1.05);
  }
}

@keyframes classical-drift {
  0% { transform: translateX(0) translateY(0); }
  25% { transform: translateX(-3px) translateY(-2px); }
  50% { transform: translateX(3px) translateY(2px); }
  75% { transform: translateX(-2px) translateY(3px); }
  100% { transform: translateX(0) translateY(0); }
}

@keyframes golden-pulse {
  0%, 100% { 
    box-shadow: 0 0 10px rgba(245, 158, 11, 0.3);
  }
  50% { 
    box-shadow: 0 0 20px rgba(245, 158, 11, 0.6), 0 0 30px rgba(245, 158, 11, 0.4);
  }
}

@keyframes marble-shimmer {
  0% { 
    background-position: 0% 50%;
  }
  50% { 
    background-position: 100% 50%;
  }
  100% { 
    background-position: 0% 50%;
  }
}

@keyframes pulse-slow {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
}

/* 動畫類別 */
.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out;
}

.animate-float-gentle {
  animation: float-gentle 6s ease-in-out infinite;
}

.animate-pulse-gentle {
  animation: pulse-gentle 3s ease-in-out infinite;
}

.animate-spin-slow {
  animation: spin-slow 20s linear infinite;
}

.animate-athena-glow {
  animation: athena-glow 3s ease-in-out infinite;
}

.animate-classical-drift {
  animation: classical-drift 10s ease-in-out infinite;
}

.animate-golden-pulse {
  animation: golden-pulse 2s ease-in-out infinite;
}

.animate-marble-shimmer {
  background-size: 200% 200%;
  animation: marble-shimmer 6s ease-in-out infinite;
}

.animate-pulse-slow {
  animation: pulse-slow 4s ease-in-out infinite;
}

/* 古典裝飾效果 */
.classical-border {
  position: relative;
}

.classical-border::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(245, 158, 11, 0.6), transparent);
}

.classical-border::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(245, 158, 11, 0.6), transparent);
}

/* 自定義滾動條樣式 */
.scrollbar-thin::-webkit-scrollbar {
  width: 6px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: rgba(51, 65, 85, 0.3);
  border-radius: 10px;
}

.scrollbar-thumb-amber-500\/30::-webkit-scrollbar-thumb {
  background: rgba(245, 158, 11, 0.3);
  border-radius: 10px;
}

.scrollbar-thumb-amber-500\/30::-webkit-scrollbar-thumb:hover {
  background: rgba(245, 158, 11, 0.5);
}

.scrollbar-track-slate-700\/30::-webkit-scrollbar-track {
  background: rgba(51, 65, 85, 0.3);
}

/* Firefox 滾動條樣式 */
.scrollbar-thin {
  scrollbar-width: thin;
  scrollbar-color: rgba(245, 158, 11, 0.3) rgba(51, 65, 85, 0.3);
}

/* 文字換行和溢出處理 */
.word-break {
  word-wrap: break-word;
  word-break: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
}

/* 確保 flex 容器正確處理溢出 */
.min-h-0 {
  min-height: 0;
}
</style>