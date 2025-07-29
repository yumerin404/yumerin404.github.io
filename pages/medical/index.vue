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
      <!-- Hero Section -->
      <section class="py-16 px-4 relative">
        <div class="container mx-auto max-w-6xl text-center">
          <div class="mb-16 animate-fade-in-up">
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
                醫學、藥物、保健品知識
              </span>
            </h1>
            
            <div class="w-32 h-1 bg-gradient-to-r from-teal-400 to-cyan-400 mx-auto rounded-full mb-8 animate-glow-soft"></div>
            
            <p class="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
              提供科學、準確、實用的健康資訊，幫助您做出明智的健康決策
            </p>

            <!-- 免責聲明 -->
            <div class="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 max-w-4xl mx-auto mb-12 backdrop-blur-sm">
              <div class="flex items-start space-x-3">
                <Icon name="heroicons:exclamation-triangle" class="w-6 h-6 text-red-400 mt-1 flex-shrink-0" />
                <div class="text-left">
                  <h3 class="text-red-300 font-semibold mb-2">{{ disclaimer.title }}</h3>
                  <p class="text-gray-300 text-sm leading-relaxed">
                    {{ disclaimer.content }}
                  </p>
                </div>
              </div>
            </div>

            <!-- 統計資訊 -->
            <div class="flex flex-wrap justify-center gap-8 mt-12">
              <div class="text-center">
                <div class="text-3xl font-bold text-teal-400 mb-1">{{ medicalStats.totalCategories }}</div>
                <div class="text-sm text-gray-400">個分類</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-cyan-400 mb-1">{{ medicalStats.totalArticles }}</div>
                <div class="text-sm text-gray-400">篇文章</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-emerald-400 mb-1">{{ medicalStats.totalReadTime }}</div>
                <div class="text-sm text-gray-400">分鐘閱讀</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 分類展示區域 -->
      <section class="py-16 px-4 relative">
        <div class="container mx-auto max-w-7xl">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
              專業醫療知識分類
            </h2>
            <p class="text-gray-300 max-w-2xl mx-auto">
              涵蓋健康知識、藥物資訊和保健品分析，為您提供全方位的醫療健康資訊
            </p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              v-for="(category, index) in medicalCategories"
              :key="category.id"
              class="group bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:border-teal-500/40 hover:shadow-teal-500/10"
              :style="{ animationDelay: `${index * 150}ms` }"
            >
              <div class="p-8">
                <!-- 圖示區域 -->
                <div class="flex justify-center mb-6">
                  <div class="w-20 h-20 rounded-2xl flex items-center justify-center border group-hover:scale-110 transition-transform duration-300"
                       :class="getCategoryStyles(category.color).background">
                    <Icon :name="category.icon" 
                          class="w-10 h-10"
                          :class="getCategoryStyles(category.color).icon" />
                  </div>
                </div>

                <h3 class="text-2xl font-bold text-white text-center mb-4">{{ category.name }}</h3>
                
                <p class="text-gray-300 text-center mb-8 leading-relaxed">
                  {{ category.description }}
                </p>

                <!-- 內容預覽 -->
                <div class="space-y-3 mb-8">
                  <div 
                    v-for="feature in category.features" 
                    :key="feature"
                    class="flex items-center text-sm text-gray-400"
                  >
                    <Icon name="heroicons:check-circle" class="w-4 h-4 text-emerald-400 mr-2 flex-shrink-0" />
                    <span>{{ feature }}</span>
                  </div>
                </div>

                <!-- 進入按鈕 -->
                <div class="text-center">
                  <MedicalButton
                    @click="handleNavigateToCategory(category.id)"
                    :class="getCategoryStyles(category.color).button"
                    class="w-full"
                    :right-icon="'heroicons:arrow-right'"
                  >
                    {{ category.buttonText }}
                  </MedicalButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 特色文章預覽 -->
      <section class="py-16 px-4 bg-slate-900/30 border-t border-slate-700/50">
        <div class="container mx-auto max-w-7xl">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
              特色醫療文章
            </h2>
            <p class="text-gray-300 max-w-2xl mx-auto">
              精選的高品質醫療健康文章，助您深入了解各種健康議題
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="(article, index) in featuredArticles"
              :key="article.id"
              class="bg-slate-800/40 backdrop-blur-sm border border-slate-700/30 rounded-xl p-6 hover:border-teal-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/10 group"
              :style="{ animationDelay: `${index * 100}ms` }"
            >
              <div class="flex items-center justify-between mb-4">
                <span class="text-xs bg-teal-500/20 text-teal-300 px-2 py-1 rounded-full">
                  {{ getCategoryName(article.category) }}
                </span>
                <span class="text-xs text-gray-400">{{ article.readTime }} 分鐘</span>
              </div>
              
              <h3 class="text-lg font-semibold text-white mb-2 group-hover:text-teal-100 transition-colors">
                {{ article.title }}
              </h3>
              
              <p class="text-gray-400 text-sm mb-4 line-clamp-2">
                {{ article.description }}
              </p>
              
              <div class="flex items-center justify-between">
                <div class="flex flex-wrap gap-1">
                  <span
                    v-for="tag in article.tags.slice(0, 2)"
                    :key="tag"
                    class="text-xs bg-slate-700/40 text-slate-300 px-2 py-1 rounded"
                  >
                    {{ tag }}
                  </span>
                </div>
                <button class="text-teal-400 hover:text-teal-300 transition-colors text-sm">
                  閱讀更多 →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 品質保證區域 -->
      <section class="py-16 px-4">
        <div class="container mx-auto max-w-6xl">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
              品質保證
            </h2>
            <p class="text-gray-300 max-w-2xl mx-auto">
              我們承諾提供最可靠、最新的醫療健康資訊
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
              v-for="(assurance, index) in qualityAssurances"
              :key="assurance.title"
              class="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 hover:border-teal-500/30 transition-all duration-300"
              :style="{ animationDelay: `${index * 200}ms` }"
            >
              <h3 class="text-xl font-bold text-teal-300 mb-6 flex items-center">
                <Icon name="heroicons:shield-check" class="w-6 h-6 mr-3" />
                {{ assurance.title }}
              </h3>
              <ul class="space-y-3">
                <li
                  v-for="item in assurance.items"
                  :key="item"
                  class="flex items-start text-gray-300"
                >
                  <Icon name="heroicons:check" class="w-5 h-5 text-emerald-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>

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
  title: '醫學、藥物、保健品知識 - 夢鈴領域',
  meta: [
    { 
      name: 'description', 
      content: '提供科學、準確、實用的健康資訊，包含醫學知識、藥物資訊和保健品指南。基於權威資料來源，幫助您做出明智的健康決策。' 
    },
    { 
      name: 'keywords', 
      content: '醫學知識, 藥物資訊, 保健品, 健康知識, 用藥安全, 疾病預防, 營養學, 臨床醫學' 
    },
    {
      property: 'og:title',
      content: '醫學、藥物、保健品知識 - 夢鈴領域'
    },
    {
      property: 'og:description',
      content: '科學、準確的醫療健康資訊平台，提供專業的醫學知識、藥物指導和保健品分析。'
    }
  ]
})

// 使用醫療內容管理
const { 
  medicalCategories, 
  qualityAssurances, 
  disclaimer,
  getFeaturedArticles,
  getStats,
  getCategoryStats
} = useMedicalContent()

// 響應式數據
const scrollProgress = ref(0)

// 計算屬性
const medicalStats = computed(() => {
  const stats = getStats()
  return {
    totalCategories: stats.totalCategories,
    totalArticles: stats.totalArticles,
    totalReadTime: stats.totalReadTime
  }
})

const featuredArticles = computed(() => getFeaturedArticles())

// 工具函數
const getCategoryStyles = (color: string) => {
  const styleMap: Record<string, any> = {
    blue: {
      background: 'bg-gradient-to-br from-blue-500/20 to-blue-600/20 border-blue-500/30',
      icon: 'text-blue-400',
      button: 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500'
    },
    green: {
      background: 'bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 border-emerald-500/30',
      icon: 'text-emerald-400',
      button: 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500'
    },
    teal: {
      background: 'bg-gradient-to-br from-teal-500/20 to-teal-600/20 border-teal-500/30',
      icon: 'text-teal-400',
      button: 'bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500'
    }
  }
  
  return styleMap[color] || styleMap.teal
}

const getCategoryName = (categoryId: string) => {
  const categoryMap: Record<string, string> = {
    health: '健康知識',
    medicine: '藥物資訊',
    supplement: '保健品'
  }
  return categoryMap[categoryId] || categoryId
}

// 事件處理方法
const handleNavigateToCategory = (categoryId: string) => {
  console.log(`導航到 ${categoryId} 分類`)
  
  // 導航到對應的子頁面
  switch(categoryId) {
    case 'health':
      // navigateTo('/medical/health')
      console.log('健康知識頁面尚未建立')
      break
    case 'medicine':
      // navigateTo('/medical/medicine')
      console.log('藥物資訊頁面尚未建立')
      break
    case 'supplement':
      navigateTo('/medical/supplements')
      break
    default:
      console.warn(`Unknown category: ${categoryId}`)
  }
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

// 生命週期
onMounted(() => {
  if (process.client) {
    window.addEventListener('scroll', updateScrollProgress)
    updateScrollProgress()
  }
})

onUnmounted(() => {
  if (process.client) {
    window.removeEventListener('scroll', updateScrollProgress)
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

.animate-heartbeat {
  animation: heartbeat 2s ease-in-out infinite;
}

/* 文本截斷 */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
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

/* 高對比度模式支援 */
@media (prefers-contrast: high) {
  .bg-slate-900\/60 {
    background-color: rgba(15, 23, 42, 0.8);
    border-color: rgba(20, 184, 166, 0.6);
  }
}

/* 減少動畫偏好支援 */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* 醫療風格增強效果 */
.group:hover .medical-card-glow {
  box-shadow: 0 0 20px rgba(20, 184, 166, 0.2), inset 0 1px 0 rgba(20, 184, 166, 0.1);
}

.medical-gradient-text {
  background: linear-gradient(135deg, #14b8a6, #06b6d4, #10b981);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient-shift 3s ease infinite;
}

.medical-blur-card {
  backdrop-filter: blur(12px);
  background: rgba(15, 23, 42, 0.4);
  border: 1px solid rgba(20, 184, 166, 0.1);
}

.medical-hover-lift {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.medical-hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(20, 184, 166, 0.1);
}
</style>