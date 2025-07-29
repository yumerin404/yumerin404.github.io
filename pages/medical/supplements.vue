<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-950 via-teal-950/20 to-slate-900 text-white relative overflow-hidden">
    <!-- 醫療背景效果 -->
    <div class="absolute inset-0 opacity-5">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_rgba(20,184,166,0.3)_0%,transparent_50%)]"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(59,130,246,0.2)_0%,transparent_50%)]"></div>
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
                <Icon name="heroicons:heart" class="relative z-10 w-12 h-12 text-teal-400" />
              </div>
            </div>
            
            <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span class="bg-gradient-to-r from-teal-300 via-cyan-300 via-emerald-300 to-teal-300 bg-clip-text text-transparent animate-gradient-shift">
                保健品指南
              </span>
            </h1>
            
            <div class="w-32 h-1 bg-gradient-to-r from-teal-400 to-cyan-400 mx-auto rounded-full mb-8 animate-glow-soft"></div>
            
            <p class="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              科學分析保健品成分與功效，提供專業選購建議與使用指導
            </p>
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
                
                <!-- 保健品內容 -->
                <div
                  v-for="(supplement, index) in filteredSupplements"
                  :key="supplement.id"
                  :id="supplement.id"
                  class="bg-gradient-to-br from-slate-900/80 to-slate-800/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-2xl transition-all duration-500 hover:border-teal-500/30 hover:shadow-[0_0_30px_rgba(20,184,166,0.1)]"
                  :style="{ animationDelay: `${index * 100}ms` }"
                >
                  <!-- 保健品標題 -->
                  <div class="flex items-start justify-between mb-4">
                    <div class="flex items-center space-x-3">
                      <div class="w-8 h-8 bg-teal-500/20 rounded-lg flex items-center justify-center">
                        <Icon :name="getCategoryIcon(supplement.category)" class="w-5 h-5 text-teal-400" />
                      </div>
                      <div>
                        <h2 class="text-2xl font-bold text-white mb-1">{{ supplement.name }}</h2>
                        <div class="flex items-center space-x-2">
                          <span class="text-sm text-slate-400">{{ getCategoryName(supplement.category) }}</span>
                          <span 
                            class="text-xs px-2 py-1 rounded-full"
                            :class="getEffectivenessBadge(supplement.effectiveness)"
                          >
                            {{ supplement.effectiveness }}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <!-- 使用頻率 -->
                    <div 
                      class="text-xs px-3 py-1 rounded-full font-mono"
                      :class="getFrequencyBadge(supplement.frequency)"
                    >
                      {{ supplement.frequency }}
                    </div>
                  </div>
                  
                  <!-- 保健品描述 -->
                  <p class="text-gray-300 leading-relaxed mb-6">{{ supplement.description }}</p>
                  
                  <!-- 功效與成分 -->
                  <div class="grid md:grid-cols-2 gap-6 mb-6">
                    <!-- 主要功效 -->
                    <div class="bg-slate-800/40 rounded-xl p-4 border border-slate-700/30">
                      <h3 class="text-teal-300 font-semibold mb-3 flex items-center">
                        <Icon name="heroicons:sparkles" class="w-4 h-4 mr-2" />
                        主要功效
                      </h3>
                      <ul class="space-y-2">
                        <li 
                          v-for="benefit in supplement.benefits" 
                          :key="benefit"
                          class="text-sm text-gray-300 flex items-start"
                        >
                          <Icon name="heroicons:check" class="w-4 h-4 text-teal-400 mr-2 mt-0.5 flex-shrink-0" />
                          {{ benefit }}
                        </li>
                      </ul>
                    </div>
                    
                    <!-- 主要成分 -->
                    <div class="bg-slate-800/40 rounded-xl p-4 border border-slate-700/30">
                      <h3 class="text-cyan-300 font-semibold mb-3 flex items-center">
                        <Icon name="heroicons:beaker" class="w-4 h-4 mr-2" />
                        主要成分
                      </h3>
                      <div class="flex flex-wrap gap-2">
                        <span 
                          v-for="ingredient in supplement.ingredients" 
                          :key="ingredient"
                          class="text-xs bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded border border-cyan-500/30"
                        >
                          {{ ingredient }}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <!-- 使用建議與注意事項 -->
                  <div class="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
                    <h3 class="text-yellow-300 font-semibold mb-2 flex items-center">
                      <Icon name="heroicons:exclamation-triangle" class="w-4 h-4 mr-2" />
                      使用建議與注意事項
                    </h3>
                    <div class="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
                      <div>
                        <strong class="text-yellow-200">建議用量：</strong>{{ supplement.dosage }}
                      </div>
                      <div>
                        <strong class="text-yellow-200">最佳時間：</strong>{{ supplement.timing }}
                      </div>
                      <div class="md:col-span-2">
                        <strong class="text-yellow-200">注意事項：</strong>{{ supplement.precautions }}
                      </div>
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
    <section class="py-8 px-4 bg-slate-900/80 border-t border-slate-700/50">
      <div class="container mx-auto max-w-5xl text-center">
        <div class="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
          <h3 class="text-red-300 font-semibold mb-2 flex items-center justify-center">
            <Icon name="heroicons:exclamation-triangle" class="w-5 h-5 mr-2" />
            重要聲明
          </h3>
          <p class="text-sm text-gray-300 leading-relaxed">
            本頁面提供的保健品資訊僅供參考，不能替代專業醫療建議。保健品的效果因人而異，使用前請諮詢醫療專業人員。孕婦、哺乳期婦女、兒童或有特殊疾病者，使用前必須先諮詢醫師。
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// SEO 設定
useHead({
  title: '保健品指南 - 醫學知識 - 夢鈴領域',
  meta: [
    { 
      name: 'description', 
      content: '科學分析各類保健品的成分、功效與使用建議。包含維生素、礦物質、草本植物等保健品的專業評估與選購指南。' 
    },
    { 
      name: 'keywords', 
      content: '保健品, 維生素, 礦物質, 營養補充品, 草本保健品, 保健食品, 營養學, 健康補給' 
    },
    {
      property: 'og:title',
      content: '保健品指南 - 醫學知識 - 夢鈴領域'
    },
    {
      property: 'og:description',
      content: '專業的保健品分析與選購指南，基於科學證據的營養補充建議。'
    }
  ]
})

// 響應式數據
const activeSection = ref('')
const selectedCategory = ref('all')
const scrollProgress = ref(0)

// 保健品數據
const supplements = [
  {
    id: 'vitamin-d3',
    name: '維生素 D3',
    category: 'vitamins',
    description: '維生素D3是維持骨骼健康、免疫系統功能的重要營養素。現代人因日照不足，維生素D缺乏相當普遍。',
    effectiveness: '科學證實',
    frequency: '高頻使用',
    benefits: [
      '促進鈣質吸收，維護骨骼健康',
      '支持免疫系統正常功能',
      '有助於維持正常血壓',
      '可能降低某些癌症風險'
    ],
    ingredients: ['膽鈣化醇(D3)', '載體油脂'],
    dosage: '每日1000-4000 IU',
    timing: '隨餐服用，提高吸收率',
    precautions: '避免過量服用，定期檢測血中濃度'
  },
  {
    id: 'omega-3',
    name: 'Omega-3 脂肪酸',
    category: 'omega',
    description: 'Omega-3脂肪酸是人體必需脂肪酸，對心血管、大腦、眼睛健康都有重要作用。',
    effectiveness: '科學證實',
    frequency: '高頻使用',
    benefits: [
      '降低心血管疾病風險',
      '支持大腦認知功能',
      '具有抗炎作用',
      '維護視網膜健康'
    ],
    ingredients: ['EPA', 'DHA', '魚油或藻油'],
    dosage: 'EPA+DHA 每日1-3克',
    timing: '隨餐服用，減少魚腥味',
    precautions: '服用抗凝血藥物者需諮詢醫師'
  },
  {
    id: 'probiotics',
    name: '益生菌',
    category: 'probiotics',
    description: '益生菌有助於維持腸道菌相平衡，支持消化健康和免疫功能。',
    effectiveness: '部分證實',
    frequency: '中等使用',
    benefits: [
      '改善腸道菌相平衡',
      '促進消化系統健康',
      '增強免疫反應',
      '可能改善某些過敏症狀'
    ],
    ingredients: ['乳酸菌', '雙歧桿菌', '益生元'],
    dosage: '每日10億-1000億CFU',
    timing: '空腹或隨餐服用',
    precautions: '免疫功能嚴重受損者應避免使用'
  },
  {
    id: 'magnesium',
    name: '鎂',
    category: 'minerals',
    description: '鎂是參與300多種酶反應的重要礦物質，對肌肉、神經、心臟功能都很重要。',
    effectiveness: '科學證實',
    frequency: '中等使用',
    benefits: [
      '支持肌肉和神經正常功能',
      '維持心臟節律穩定',
      '有助於骨骼形成',
      '可能改善睡眠品質'
    ],
    ingredients: ['檸檬酸鎂', '氧化鎂', '甘胺酸鎂'],
    dosage: '每日200-400毫克',
    timing: '睡前服用有助放鬆',
    precautions: '腎功能不全者需調整劑量'
  },
  {
    id: 'turmeric',
    name: '薑黃素',
    category: 'herbs',
    description: '薑黃素是薑黃中的活性成分，具有強大的抗炎和抗氧化特性。',
    effectiveness: '研究中',
    frequency: '低頻使用',
    benefits: [
      '具有抗炎作用',
      '強效抗氧化劑',
      '可能支持關節健康',
      '可能有護肝作用'
    ],
    ingredients: ['薑黃素', '胡椒鹼(增強吸收)'],
    dosage: '每日500-1000毫克',
    timing: '隨餐服用',
    precautions: '服用抗凝血藥物者需注意交互作用'
  },
  {
    id: 'whey-protein',
    name: '乳清蛋白',
    category: 'protein',
    description: '乳清蛋白是高品質的完全蛋白質，含有所有必需胺基酸，適合運動後恢復。',
    effectiveness: '科學證實',
    frequency: '中等使用',
    benefits: [
      '支持肌肉合成和修復',
      '提供高品質蛋白質',
      '有助於體重管理',
      '增強運動表現恢復'
    ],
    ingredients: ['乳清蛋白分離物', '乳清蛋白濃縮物'],
    dosage: '每次20-40克',
    timing: '運動後30分鐘內服用',
    precautions: '乳糖不耐症者選擇分離蛋白'
  }
]

// 保健品分類
const supplementCategories = [
  { key: 'all', name: '全部', icon: 'heroicons:squares-2x2', count: supplements.length },
  { key: 'vitamins', name: '維生素', icon: 'heroicons:sparkles', count: supplements.filter(s => s.category === 'vitamins').length },
  { key: 'minerals', name: '礦物質', icon: 'heroicons:cube', count: supplements.filter(s => s.category === 'minerals').length },
  { key: 'herbs', name: '草本', icon: 'heroicons:leaf', count: supplements.filter(s => s.category === 'herbs').length },
  { key: 'protein', name: '蛋白質', icon: 'heroicons:bolt', count: supplements.filter(s => s.category === 'protein').length },
  { key: 'omega', name: 'Omega脂肪酸', icon: 'heroicons:heart', count: supplements.filter(s => s.category === 'omega').length },
  { key: 'probiotics', name: '益生菌', icon: 'heroicons:beaker', count: supplements.filter(s => s.category === 'probiotics').length }
]

// 計算屬性
const filteredSupplements = computed(() => {
  if (selectedCategory.value === 'all') {
    return supplements
  }
  return supplements.filter(supplement => supplement.category === selectedCategory.value)
})

const tocItems = computed(() => {
  return filteredSupplements.value.map(supplement => ({
    id: supplement.id,
    title: supplement.name,
    subtitle: supplement.description.substring(0, 50) + '...',
    category: supplement.category,
    frequency: (supplement.frequency === '高頻使用' ? 'high' : supplement.frequency === '中等使用' ? 'medium' : 'low') as 'high' | 'medium' | 'low'
  }))
})

// 工具函數
const getCategoryIcon = (categoryKey: string) => {
  const category = supplementCategories.find(cat => cat.key === categoryKey)
  return category?.icon || 'heroicons:circle'
}

const getCategoryName = (categoryKey: string) => {
  const category = supplementCategories.find(cat => cat.key === categoryKey)
  return category?.name || '其他'
}

const getEffectivenessBadge = (effectiveness: string) => {
  switch (effectiveness) {
    case '科學證實':
      return 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
    case '部分證實':
      return 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
    case '研究中':
      return 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
    default:
      return 'bg-slate-500/20 text-slate-300 border border-slate-500/30'
  }
}

const getFrequencyBadge = (frequency: string) => {
  switch (frequency) {
    case '高頻使用':
      return 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
    case '中等使用':
      return 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
    case '低頻使用':
      return 'bg-slate-500/20 text-slate-300 border border-slate-500/30'
    default:
      return 'bg-slate-500/20 text-slate-300 border border-slate-500/30'
  }
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

const updateScrollProgress = () => {
  if (!process.client) return
  
  const scrollTop = window.pageYOffset
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  scrollProgress.value = (scrollTop / docHeight) * 100
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
</style>