<template>
  <div 
    :id="supplement.id"
    class="medical-supplement-card bg-gradient-to-br from-slate-900/95 to-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 hover:border-teal-500/60 hover:shadow-[0_8px_60px_rgba(20,184,166,0.25)] hover:scale-[1.02] group"
    :class="{ 
      'expanded': isExpanded,
      'ring-2 ring-teal-500/30': isExpanded
    }"
  >
    <!-- 卡片標題區域 - 重新設計 -->
    <div class="relative px-6 py-6 border-b border-slate-700/30 bg-gradient-to-r from-slate-900/50 to-slate-800/30">
      <!-- 背景裝飾 -->
      <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-teal-500/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
      
      <div class="relative z-10">
        <!-- 主要標題區域 -->
        <div class="flex items-start justify-between mb-4">
          <div class="flex items-center space-x-4 flex-1 min-w-0">
            <!-- 增強的圖示設計 -->
            <div class="relative flex-shrink-0">
              <div class="w-16 h-16 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center border border-teal-500/30 group-hover:border-teal-400/50 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                <div class="absolute inset-0 bg-teal-400/5 rounded-2xl blur-sm group-hover:blur-md transition-all duration-500"></div>
                <Icon :name="categoryIcon" class="relative z-10 w-8 h-8 text-teal-400 group-hover:text-teal-300 transition-colors duration-300" />
              </div>
              <!-- 脈衝環效果 -->
              <div class="absolute inset-0 rounded-2xl border border-teal-400/20 animate-ping opacity-0 group-hover:opacity-75"></div>
            </div>
            
            <!-- 標題和簡介 -->
            <div class="flex-1 min-w-0">
              <h3 class="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-teal-100 transition-colors duration-300 leading-tight">
                {{ supplement.title }}
              </h3>
              <p v-if="supplement.description" class="text-sm text-slate-300 leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                {{ supplement.description.substring(0, 100) }}{{ supplement.description.length > 100 ? '...' : '' }}
              </p>
            </div>
          </div>
          
          <!-- 改良的展開按鈕 -->
          <button
            @click="toggleExpanded"
            class="relative ml-4 w-12 h-12 flex items-center justify-center rounded-xl bg-slate-800/60 border border-slate-600/40 text-slate-400 hover:bg-teal-500/15 hover:border-teal-500/50 hover:text-teal-300 transition-all duration-300 flex-shrink-0 group/btn"
            :aria-label="isExpanded ? '收起詳細資訊' : '展開詳細資訊'"
          >
            <div class="absolute inset-0 rounded-xl bg-teal-500/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
            <Icon 
              name="heroicons:chevron-down" 
              class="relative z-10 w-5 h-5 transition-transform duration-500 group-hover/btn:scale-110" 
              :class="{ 'rotate-180': isExpanded }"
            />
          </button>
        </div>
        
        <!-- 重新設計的標籤區域 -->
        <div class="flex flex-wrap items-center gap-2">
          <!-- 分類標籤 -->
          <div class="inline-flex items-center px-3 py-2 rounded-xl text-xs font-semibold bg-teal-500/15 border border-teal-500/30 text-teal-300 hover:bg-teal-500/25 transition-colors duration-300">
            <Icon :name="categoryIcon" class="w-3 h-3 mr-1.5" />
            {{ getCategoryName(supplement.category) }}
          </div>
          
          <!-- 製造商標籤 -->
          <div class="inline-flex items-center px-3 py-2 rounded-xl text-xs font-semibold bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/25 transition-colors duration-300">
            <Icon name="heroicons:building-storefront" class="w-3 h-3 mr-1.5" />
            {{ supplement.manufacturer }}
          </div>
          
          <!-- 使用頻率標籤 -->
          <div class="inline-flex items-center px-3 py-2 rounded-xl text-xs font-semibold bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/25 transition-colors duration-300">
            <Icon name="heroicons:clock" class="w-3 h-3 mr-1.5" />
            {{ supplement.usage }}
          </div>
        </div>
      </div>
    </div>
    
    <!-- 改良的可展開詳細內容 -->
    <div 
      class="expandable-content overflow-hidden transition-all duration-700 ease-in-out"
      :class="{ 
        'max-h-0 opacity-0': !isExpanded, 
        'max-h-[8000px] opacity-100': isExpanded 
      }"
    >
      <!-- 快速資訊卡片區域 - 全新設計 -->
      <div class="px-6 py-6 bg-gradient-to-r from-slate-800/20 to-slate-700/10 border-b border-slate-700/30">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <!-- 建議劑量卡片 -->
          <div class="bg-gradient-to-br from-slate-800/60 to-slate-700/40 rounded-2xl p-5 border border-slate-600/30 hover:border-teal-500/40 transition-all duration-300 group/info">
            <div class="flex items-center space-x-3 mb-3">
              <div class="w-10 h-10 bg-teal-500/15 rounded-xl flex items-center justify-center group-hover/info:bg-teal-500/25 transition-colors duration-300">
                <Icon name="heroicons:beaker" class="w-5 h-5 text-teal-400" />
              </div>
              <h4 class="text-base font-bold text-teal-300">建議劑量</h4>
            </div>
            <p class="text-sm text-slate-200 leading-relaxed pl-1">{{ supplement.dosage }}</p>
          </div>
          
          <!-- 主要益處卡片 -->
          <div class="bg-gradient-to-br from-slate-800/60 to-slate-700/40 rounded-2xl p-5 border border-slate-600/30 hover:border-emerald-500/40 transition-all duration-300 group/info">
            <div class="flex items-center space-x-3 mb-3">
              <div class="w-10 h-10 bg-emerald-500/15 rounded-xl flex items-center justify-center group-hover/info:bg-emerald-500/25 transition-colors duration-300">
                <Icon name="heroicons:heart" class="w-5 h-5 text-emerald-400" />
              </div>
              <h4 class="text-base font-bold text-emerald-300">主要益處</h4>
            </div>
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="benefit in supplement.benefits?.slice(0, 4)" 
                :key="benefit"
                class="inline-block px-3 py-1.5 bg-emerald-500/15 text-emerald-200 text-xs font-medium rounded-lg border border-emerald-500/20 hover:bg-emerald-500/25 transition-colors duration-200"
              >
                {{ benefit }}
              </span>
            </div>
          </div>
          
          <!-- 使用時機卡片 -->
          <div class="bg-gradient-to-br from-slate-800/60 to-slate-700/40 rounded-2xl p-5 border border-slate-600/30 hover:border-cyan-500/40 transition-all duration-300 group/info">
            <div class="flex items-center space-x-3 mb-3">
              <div class="w-10 h-10 bg-cyan-500/15 rounded-xl flex items-center justify-center group-hover/info:bg-cyan-500/25 transition-colors duration-300">
                <Icon name="heroicons:clock" class="w-5 h-5 text-cyan-400" />
              </div>
              <h4 class="text-base font-bold text-cyan-300">使用時機</h4>
            </div>
            <p class="text-sm text-slate-200 leading-relaxed pl-1">{{ supplement.usage }}</p>
          </div>
        </div>
      </div>
      
      <!-- 改良的標籤頁區域 -->
      <div class="px-6 py-6">
        <!-- 重新設計的標籤導航 -->
        <div class="relative mb-8">
          <div class="flex flex-wrap gap-2">
            <button
              v-for="tab in availableTabs"
              :key="tab.key"
              @click="activeTab = tab.key"
              class="relative px-5 py-3 text-sm font-semibold rounded-xl border transition-all duration-300 group"
              :class="activeTab === tab.key 
                ? 'bg-teal-500/20 border-teal-400/60 text-teal-300 shadow-lg shadow-teal-500/10' 
                : 'bg-slate-800/40 border-slate-600/30 text-slate-400 hover:bg-teal-500/10 hover:text-teal-400 hover:border-teal-500/40'"
            >
              <!-- 活躍指示器 -->
              <div v-if="activeTab === tab.key" class="absolute inset-0 bg-teal-400/5 rounded-xl animate-pulse"></div>
              <div class="relative flex items-center space-x-2">
                <Icon :name="tab.icon" class="w-4 h-4" />
                <span>{{ tab.name }}</span>
              </div>
            </button>
          </div>
        </div>
        
        <!-- 改良的標籤內容區域 -->
        <div class="tab-content relative min-h-[300px]">
          <!-- 詳細說明標籤 -->
          <div v-if="activeTab === 'details'" class="animate-fade-in">
            <div class="bg-gradient-to-br from-slate-900/60 to-slate-800/40 rounded-2xl p-6 border border-slate-700/30">
              <div 
                v-html="renderSupplementContent(supplement.content)"
                class="medical-content prose prose-invert max-w-none text-slate-300 leading-relaxed"
              ></div>
            </div>
          </div>
          
          <!-- 成分資訊標籤 -->
          <div v-if="activeTab === 'ingredients'" class="animate-fade-in space-y-6">
            <div class="bg-gradient-to-br from-slate-900/60 to-slate-800/40 rounded-2xl p-6 border border-slate-700/30">
              <div class="flex items-center space-x-3 mb-6">
                <div class="w-12 h-12 bg-teal-500/15 rounded-xl flex items-center justify-center">
                  <Icon name="heroicons:beaker" class="w-6 h-6 text-teal-400" />
                </div>
                <h4 class="text-2xl font-bold text-teal-300">主要成分</h4>
              </div>
              <div class="space-y-4">
                <div class="bg-slate-800/40 rounded-xl p-4 border border-slate-600/30">
                  <p class="text-slate-300 leading-relaxed">
                    詳細成分資訊請參考產品標籤或製造商官方說明。每個保健品的成分配比都經過精心設計，以確保最佳的生物利用度和功效。
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 科學機制標籤 -->
          <div v-if="activeTab === 'mechanism'" class="animate-fade-in space-y-6">
            <div class="bg-gradient-to-br from-slate-900/60 to-slate-800/40 rounded-2xl p-6 border border-slate-700/30">
              <div class="flex items-center space-x-3 mb-6">
                <div class="w-12 h-12 bg-cyan-500/15 rounded-xl flex items-center justify-center">
                  <Icon name="heroicons:academic-cap" class="w-6 h-6 text-cyan-400" />
                </div>
                <h4 class="text-2xl font-bold text-cyan-300">作用機制</h4>
              </div>
              <div class="space-y-4">
                <div class="bg-slate-800/40 rounded-xl p-4 border border-slate-600/30">
                  <p class="text-slate-300 leading-relaxed">
                    作用機制的詳細說明請參考詳細說明標籤頁中的科學原理部分。每個補充品都有其特定的生理作用路徑和分子機制。
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 臨床證據標籤 -->
          <div v-if="activeTab === 'clinical'" class="animate-fade-in space-y-6">
            <div class="bg-gradient-to-br from-slate-900/60 to-slate-800/40 rounded-2xl p-6 border border-slate-700/30">
              <div class="flex items-center space-x-3 mb-6">
                <div class="w-12 h-12 bg-purple-500/15 rounded-xl flex items-center justify-center">
                  <Icon name="heroicons:document-text" class="w-6 h-6 text-purple-400" />
                </div>
                <h4 class="text-2xl font-bold text-purple-300">臨床研究</h4>
              </div>
              <div class="space-y-4">
                <div class="bg-slate-800/40 rounded-xl p-4 border border-slate-600/30">
                  <p class="text-slate-300 leading-relaxed">
                    相關的臨床研究證據和試驗結果請參考詳細說明中的研究數據。所有推薦都基於同行評議的科學文獻。
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 安全性標籤 -->
          <div v-if="activeTab === 'safety'" class="animate-fade-in space-y-6">
            <div class="bg-gradient-to-br from-red-900/40 to-red-800/20 rounded-2xl p-6 border border-red-500/30">
              <div class="flex items-center space-x-3 mb-6">
                <div class="w-12 h-12 bg-red-500/15 rounded-xl flex items-center justify-center">
                  <Icon name="heroicons:exclamation-triangle" class="w-6 h-6 text-red-400" />
                </div>
                <h4 class="text-2xl font-bold text-red-300">重要注意事項</h4>
              </div>
              <div class="space-y-4">
                <div class="bg-red-900/30 rounded-xl p-5 border border-red-500/20">
                  <ul class="space-y-3 text-red-200">
                    <li class="flex items-start space-x-3">
                      <Icon name="heroicons:check-circle" class="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                      <span>使用前請仔細閱讀產品標籤和使用說明</span>
                    </li>
                    <li class="flex items-start space-x-3">
                      <Icon name="heroicons:check-circle" class="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                      <span>如有任何疑問，請諮詢合格的醫療專業人員</span>
                    </li>
                    <li class="flex items-start space-x-3">
                      <Icon name="heroicons:check-circle" class="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                      <span>孕婦、哺乳期婦女及兒童使用前必須先諮詢醫師</span>
                    </li>
                    <li class="flex items-start space-x-3">
                      <Icon name="heroicons:check-circle" class="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                      <span>請存放在兒童接觸不到的地方</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 精美的標籤區域 -->
    <div v-if="supplement.tags && supplement.tags.length > 0" class="px-6 py-5 border-t border-slate-700/30 bg-gradient-to-r from-slate-800/10 to-slate-700/5">
      <div class="flex flex-wrap gap-2">
        <span
          v-for="(tag, index) in supplement.tags"
          :key="tag"
          class="inline-flex items-center px-3 py-2 rounded-xl text-xs font-semibold bg-slate-700/40 text-slate-300 border border-slate-600/30 hover:bg-slate-600/50 hover:border-slate-500/60 hover:text-white transition-all duration-300 hover:scale-105 group"
          :style="{ animationDelay: `${index * 50}ms` }"
        >
          <Icon name="heroicons:tag" class="w-3 h-3 mr-1.5 group-hover:rotate-12 transition-transform duration-200" />
          {{ tag }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Props 介面定義
interface SupplementData {
  id: string
  title: string
  category: string
  usage: string
  manufacturer: string
  productName?: string
  description?: string
  benefits?: string[]
  dosage?: string
  tags?: string[]
  content: string
}

interface Props {
  supplement: SupplementData
}

const props = defineProps<Props>()

// 響應式狀態
const isExpanded = ref(false)
const activeTab = ref('details')

// 分類圖示映射
const categoryIconMap: Record<string, string> = {
  'amino-acids': 'heroicons:bolt',
  'fish-oil': 'heroicons:water',
  'eye-health': 'heroicons:eye', 
  'stomach-protection': 'heroicons:heart',
  'minerals': 'heroicons:cube',
  'vitamins': 'heroicons:sparkles',
  'others': 'heroicons:star',
  'enzymes': 'heroicons:beaker',
  'probiotics': 'heroicons:squares-plus'
}

const categoryNameMap: Record<string, string> = {
  'amino-acids': '胺基酸類',
  'fish-oil': '魚油類', 
  'eye-health': '眼部保健',
  'stomach-protection': '胃部保護',
  'minerals': '礦物質',
  'vitamins': '維生素',
  'others': '其他類別',
  'enzymes': '消化酶',
  'probiotics': '益生菌'
}

// 計算屬性
const categoryIcon = computed(() => {
  return categoryIconMap[props.supplement.category] || 'heroicons:circle'
})

const availableTabs = computed(() => [
  { key: 'details', name: '詳細說明', icon: 'heroicons:document-text' },
  { key: 'ingredients', name: '成分資訊', icon: 'heroicons:beaker' },
  { key: 'mechanism', name: '科學機制', icon: 'heroicons:academic-cap' },
  { key: 'clinical', name: '臨床證據', icon: 'heroicons:chart-bar' },
  { key: 'safety', name: '安全性', icon: 'heroicons:shield-check' }
])

// 方法
const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value
}

const getCategoryName = (categoryKey: string) => {
  return categoryNameMap[categoryKey] || categoryKey
}

const renderSupplementContent = (content: string) => {
  if (!content) return ''
  
  // 增強的 markdown 渲染，專門針對醫療內容
  let html = content
    // 處理主要標題
    .replace(/^###\s+(.+)$/gm, '<h3 class="text-xl font-semibold text-teal-300 mb-4 mt-6 flex items-center"><span class="w-2 h-2 bg-teal-400 rounded-full mr-3"></span>$1</h3>')
    .replace(/^##\s+(.+)$/gm, '<h2 class="text-2xl font-bold text-teal-200 mb-6 mt-8 pb-2 border-b border-teal-500/20">$1</h2>')
    
    // 處理醫療專業格式
    .replace(/\*\*製造商\*\*：(.+)/g, '<div class="medical-info-block manufacturer"><div class="info-label">製造商</div><div class="info-value">$1</div></div>')
    .replace(/\*\*成分.*?\*\*：/g, '<div class="medical-info-block ingredients"><div class="info-label">主要成分</div><div class="info-content">')
    .replace(/\*\*主要功效\*\*：/g, '</div></div><div class="medical-info-block effects"><div class="info-label">主要功效</div><div class="info-content">')
    .replace(/\*\*使用方法\*\*：/g, '</div></div><div class="medical-info-block usage"><div class="info-label">使用方法</div><div class="info-content">')
    .replace(/\*\*注意事項\*\*：/g, '</div></div><div class="medical-info-block warnings"><div class="info-label">注意事項</div><div class="info-content warnings-content">')
    
    // 處理一般粗體文字
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-teal-200 font-semibold">$1</strong>')
    
    // 處理列表項目
    .replace(/^\s*-\s+(.+)$/gm, '<li class="mb-2 flex items-start text-sm"><Icon name="heroicons:check-circle" class="w-4 h-4 text-teal-400 mr-2 mt-0.5 flex-shrink-0" />$1</li>')
    
    // 處理數字列表
    .replace(/^\s*\d+\.\s+(.+)$/gm, '<li class="mb-2 flex items-start text-sm"><span class="w-5 h-5 bg-teal-500/20 rounded-full flex items-center justify-center text-xs text-teal-300 mr-2 mt-0.5 flex-shrink-0">•</span>$1</li>')
    
    // 處理段落
    .replace(/\n\n/g, '</p><p class="mb-4 text-slate-300">')
    
    // 處理連結
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener" class="text-cyan-400 hover:text-cyan-300 underline decoration-cyan-400/30 hover:decoration-cyan-300/50 transition-colors duration-200">$1 <Icon name="heroicons:arrow-top-right-on-square" class="w-3 h-3 inline ml-1" /></a>')
  
  // 包裝段落
  html = '<p class="mb-4 text-slate-300">' + html + '</div></div></p>'
  
  // 清理多餘標籤
  html = html
    .replace(/<p class="mb-4 text-slate-300"><\/p>/g, '')
    .replace(/(<li[^>]*>.*?<\/li>)/gs, '<ul class="space-y-2 mb-4">$1</ul>')
  
  return html
}
</script>

<style scoped>
/* 擴展動畫 - 增強版 */
.expandable-content {
  transition: max-height 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94), 
              opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transform-origin: top;
}

/* 醫療資訊區塊樣式 - 重新設計 */
.medical-content :deep(.medical-info-block) {
  background: linear-gradient(135deg, rgba(51, 65, 85, 0.4) 0%, rgba(30, 41, 59, 0.3) 100%);
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(71, 85, 105, 0.4);
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;
}

.medical-content :deep(.medical-info-block:hover) {
  background: linear-gradient(135deg, rgba(51, 65, 85, 0.6) 0%, rgba(30, 41, 59, 0.5) 100%);
  border-color: rgba(20, 184, 166, 0.3);
  transform: translateY(-2px);
}

.medical-content :deep(.medical-info-block.warnings) {
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(220, 38, 38, 0.1) 100%);
  border-color: rgba(239, 68, 68, 0.4);
}

.medical-content :deep(.info-label) {
  font-size: 0.95rem;
  font-weight: 700;
  color: rgb(94, 234, 212);
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  text-shadow: 0 0 10px rgba(94, 234, 212, 0.3);
}

.medical-content :deep(.warnings-content .info-label) {
  color: rgb(252, 165, 165);
  text-shadow: 0 0 10px rgba(252, 165, 165, 0.3);
}

.medical-content :deep(.info-value) {
  color: rgb(241, 245, 249);
  font-size: 0.9rem;
  line-height: 1.6;
}

.medical-content :deep(.info-content) {
  color: rgb(226, 232, 240);
  font-size: 0.9rem;
  line-height: 1.6;
}

.medical-content :deep(.warnings-content) {
  color: rgb(254, 202, 202);
}

/* 標籤頁動畫 - 增強版 */
.tab-content {
  animation: fade-in-up 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

@keyframes fade-in-up {
  from { 
    opacity: 0; 
    transform: translateY(20px) scale(0.98);
  }
  to { 
    opacity: 1; 
    transform: translateY(0) scale(1);
  }
}

@keyframes fade-in {
  from { 
    opacity: 0; 
    transform: translateY(15px);
  }
  to { 
    opacity: 1; 
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

/* 卡片主體效果 - 增強版 */
.medical-supplement-card {
  transform: translateZ(0);
  will-change: transform, box-shadow;
}

.medical-supplement-card:hover {
  transform: translateZ(0) translateY(-4px);
}

.medical-supplement-card.expanded {
  transform: translateZ(0) scale(1.01);
}

/* 新增的脇動動畫 */
@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(20, 184, 166, 0.1);
  }
  50% {
    box-shadow: 0 0 30px rgba(20, 184, 166, 0.3), 0 0 40px rgba(20, 184, 166, 0.1);
  }
}

.medical-supplement-card:hover {
  animation: pulse-glow 2s ease-in-out infinite;
}

/* 標籤按鈕動畫 */
@keyframes tab-select {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

.tab-content button[aria-selected="true"] {
  animation: tab-select 0.3s ease-out;
}

/* 響應式設計 - 增強版 */
@media (max-width: 1024px) {
  .medical-supplement-card {
    margin-bottom: 1.5rem;
  }
  
  .medical-content :deep(.medical-info-block) {
    padding: 1.25rem;
  }
}

@media (max-width: 768px) {
  .medical-supplement-card {
    margin-bottom: 1rem;
    border-radius: 1.5rem;
  }
  
  .medical-supplement-card:hover {
    transform: translateZ(0) translateY(-2px) scale(1.01);
  }
  
  .tab-content {
    font-size: 0.875rem;
  }
  
  .medical-content :deep(.medical-info-block) {
    padding: 1rem;
    margin-bottom: 1rem;
  }
  
  .medical-content :deep(.info-label) {
    font-size: 0.875rem;
  }
  
  .medical-content :deep(.info-value),
  .medical-content :deep(.info-content) {
    font-size: 0.825rem;
  }
}

@media (max-width: 640px) {
  .medical-supplement-card {
    border-radius: 1.25rem;
  }
  
  /* 行動裝置簡化動畫 */
  .medical-supplement-card:hover {
    animation: none;
    transform: translateZ(0);
  }
  
  .expandable-content {
    transition: max-height 0.5s ease-in-out, opacity 0.4s ease;
  }
}

/* 新增的精美滿載動畫 */
@keyframes shimmer {
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
}

.loading-shimmer {
  background: linear-gradient(90deg, 
    rgba(51, 65, 85, 0.3) 25%, 
    rgba(20, 184, 166, 0.1) 50%, 
    rgba(51, 65, 85, 0.3) 75%);
  background-size: 200px 100%;
  animation: shimmer 1.5s infinite;
}

/* 精美的微互動效果 */
.micro-interaction {
  transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.micro-interaction:hover {
  transform: translateY(-1px);
}

.micro-interaction:active {
  transform: translateY(0);
  transition-duration: 0.1s;
}

/* 特殊的光暈效果 */
.glow-effect {
  position: relative;
  overflow: hidden;
}

.glow-effect::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, 
    transparent, 
    rgba(20, 184, 166, 0.1), 
    transparent);
  transition: left 0.5s;
}

.glow-effect:hover::before {
  left: 100%;
}

/* 響應式設計大幅改進 */
@media (max-width: 640px) {
  .medical-supplement-card {
    border-radius: 1.5rem;
    margin-bottom: 1rem;
  }
  
  .medical-supplement-card:hover {
    transform: none;
    scale: 1;
  }
  
  .tab-content {
    font-size: 0.875rem;
    padding: 1rem;
  }
  
  /* 移動端圖示優化 */
  .medical-supplement-card .w-16 {
    width: 3.5rem;
    height: 3.5rem;
  }
  
  .medical-supplement-card .text-xl {
    font-size: 1.125rem;
    line-height: 1.4;
  }
  
  /* 減少移動端動畫 */
  .medical-supplement-card * {
    animation-duration: 0.3s !important;
  }
}

@media (min-width: 641px) and (max-width: 1024px) {
  .medical-supplement-card {
    border-radius: 2rem;
  }
  
  .medical-supplement-card:hover {
    transform: translateY(-2px) scale(1.01);
  }
}

@media (min-width: 1025px) {
  .medical-supplement-card {
    border-radius: 2.5rem;
  }
  
  .medical-supplement-card:hover {
    transform: translateY(-6px) scale(1.02);
  }
}

/* 無障礙和性能優化 */
@media (prefers-reduced-motion: reduce) {
  .medical-supplement-card,
  .medical-supplement-card *,
  .expandable-content {
    animation: none !important;
    transition: none !important;
  }
  
  .medical-supplement-card:hover {
    transform: none;
  }
}

@media (prefers-contrast: high) {
  .medical-supplement-card {
    border-width: 2px;
    border-color: rgba(20, 184, 166, 0.8);
  }
}

/* Focus 和觸控優化 */
.medical-supplement-card:focus-within {
  outline: 2px solid rgba(20, 184, 166, 0.6);
  outline-offset: 4px;
}

/* GPU 加速優化 */
.medical-supplement-card {
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
}
</style>