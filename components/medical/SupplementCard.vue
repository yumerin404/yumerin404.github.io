<template>
  <div 
    :id="supplement.id"
    class="bg-gradient-to-br from-slate-900/90 to-slate-800/70 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 hover:border-teal-500/40 hover:shadow-[0_0_40px_rgba(20,184,166,0.15)] group medical-card"
    :class="{ 'expanded': isExpanded }"
  >
    <!-- 卡片標題區域 -->
    <div class="px-6 py-5 border-b border-slate-700/30">
      <div class="flex items-start justify-between">
        <div class="flex items-start space-x-4 flex-1">
          <!-- 圖示 -->
          <div class="w-14 h-14 bg-teal-500/15 rounded-xl flex items-center justify-center border border-teal-500/25 group-hover:border-teal-400/40 transition-all duration-300 flex-shrink-0">
            <Icon :name="categoryIcon" class="w-7 h-7 text-teal-400" />
          </div>
          
          <!-- 標題資訊 -->
          <div class="flex-1 min-w-0">
            <h3 class="text-xl font-bold text-white mb-2 group-hover:text-teal-100 transition-colors duration-300">
              {{ supplement.title }}
            </h3>
            
            <!-- 基本資訊標籤 -->
            <div class="flex flex-wrap items-center gap-3 mb-3">
              <!-- 分類標籤 -->
              <span class="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-teal-500/10 border border-teal-500/30 text-teal-300">
                <Icon :name="categoryIcon" class="w-3 h-3 mr-1.5" />
                {{ getCategoryName(supplement.category) }}
              </span>
              
              <!-- 製造商標籤 -->
              <span class="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
                <Icon name="heroicons:building-storefront" class="w-3 h-3 mr-1.5" />
                {{ supplement.manufacturer }}
              </span>
              
              <!-- 使用頻率標籤 -->
              <span class="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                <Icon name="heroicons:clock" class="w-3 h-3 mr-1.5" />
                {{ supplement.usage }}
              </span>
            </div>
            
            <!-- 快速概覽 -->
            <p v-if="supplement.description" class="text-sm text-slate-300 leading-relaxed">
              {{ supplement.description }}
            </p>
          </div>
        </div>
        
        <!-- 展開/收起按鈕 -->
        <button
          @click="toggleExpanded"
          class="ml-4 w-10 h-10 flex items-center justify-center rounded-lg bg-slate-800/50 border border-slate-600/30 text-slate-400 hover:bg-teal-500/10 hover:border-teal-500/40 hover:text-teal-300 transition-all duration-300 flex-shrink-0"
          :aria-label="isExpanded ? '收起詳細資訊' : '展開詳細資訊'"
        >
          <Icon 
            name="heroicons:chevron-down" 
            class="w-5 h-5 transition-transform duration-300" 
            :class="{ 'rotate-180': isExpanded }"
          />
        </button>
      </div>
    </div>
    
    <!-- 可展開的詳細內容 -->
    <div 
      class="expandable-content overflow-hidden transition-all duration-500 ease-in-out"
      :class="{ 'max-h-0': !isExpanded, 'max-h-[5000px]': isExpanded }"
    >
      <!-- 快速資訊區塊 -->
      <div class="px-6 py-4 bg-slate-800/30 border-b border-slate-700/30">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- 建議劑量 -->
          <div class="bg-slate-700/30 rounded-lg p-4">
            <div class="flex items-center space-x-2 mb-2">
              <Icon name="heroicons:beaker" class="w-4 h-4 text-teal-400" />
              <h4 class="text-sm font-semibold text-teal-300">建議劑量</h4>
            </div>
            <p class="text-sm text-slate-200">{{ supplement.dosage }}</p>
          </div>
          
          <!-- 主要益處 -->
          <div class="bg-slate-700/30 rounded-lg p-4">
            <div class="flex items-center space-x-2 mb-2">
              <Icon name="heroicons:heart" class="w-4 h-4 text-emerald-400" />
              <h4 class="text-sm font-semibold text-emerald-300">主要益處</h4>
            </div>
            <div class="flex flex-wrap gap-1">
              <span 
                v-for="benefit in supplement.benefits?.slice(0, 3)" 
                :key="benefit"
                class="inline-block px-2 py-1 bg-emerald-500/10 text-emerald-200 text-xs rounded-md"
              >
                {{ benefit }}
              </span>
            </div>
          </div>
          
          <!-- 適用時機 -->
          <div class="bg-slate-700/30 rounded-lg p-4">
            <div class="flex items-center space-x-2 mb-2">
              <Icon name="heroicons:clock" class="w-4 h-4 text-blue-400" />
              <h4 class="text-sm font-semibold text-blue-300">使用時機</h4>
            </div>
            <p class="text-sm text-slate-200">{{ supplement.usage }}</p>
          </div>
        </div>
      </div>
      
      <!-- 詳細資訊標籤頁 -->
      <div class="px-6 py-5">
        <!-- 標籤導航 -->
        <div class="flex flex-wrap border-b border-slate-700/30 mb-6">
          <button
            v-for="tab in availableTabs"
            :key="tab.key"
            @click="activeTab = tab.key"
            class="px-4 py-2 text-sm font-medium border-b-2 transition-all duration-300 mr-6 mb-2"
            :class="activeTab === tab.key 
              ? 'border-teal-400 text-teal-300' 
              : 'border-transparent text-slate-400 hover:text-teal-400 hover:border-teal-500/30'"
          >
            <Icon :name="tab.icon" class="w-4 h-4 inline mr-2" />
            {{ tab.name }}
          </button>
        </div>
        
        <!-- 標籤內容 -->
        <div class="tab-content">
          <!-- 詳細說明標籤 -->
          <div v-if="activeTab === 'details'" class="prose prose-invert max-w-none">
            <div 
              v-html="renderSupplementContent(supplement.content)"
              class="medical-content text-slate-300 leading-relaxed"
            ></div>
          </div>
          
          <!-- 成分資訊標籤 -->
          <div v-if="activeTab === 'ingredients'" class="space-y-4">
            <div class="bg-slate-800/40 rounded-lg p-4">
              <h4 class="text-lg font-semibold text-teal-300 mb-3 flex items-center">
                <Icon name="heroicons:beaker" class="w-5 h-5 mr-2" />
                主要成分
              </h4>
              <div class="space-y-2">
                <div class="text-sm text-slate-300">
                  詳細成分資訊請參考產品標籤或製造商官方說明。
                </div>
              </div>
            </div>
          </div>
          
          <!-- 科學機制標籤 -->
          <div v-if="activeTab === 'mechanism'" class="space-y-4">
            <div class="bg-slate-800/40 rounded-lg p-4">
              <h4 class="text-lg font-semibold text-cyan-300 mb-3 flex items-center">
                <Icon name="heroicons:academic-cap" class="w-5 h-5 mr-2" />
                作用機制
              </h4>
              <div class="text-sm text-slate-300">
                作用機制請參考詳細說明中的科學原理部分。
              </div>
            </div>
          </div>
          
          <!-- 臨床證據標籤 -->
          <div v-if="activeTab === 'clinical'" class="space-y-4">
            <div class="bg-slate-800/40 rounded-lg p-4">
              <h4 class="text-lg font-semibold text-purple-300 mb-3 flex items-center">
                <Icon name="heroicons:document-text" class="w-5 h-5 mr-2" />
                臨床研究
              </h4>
              <div class="text-sm text-slate-300">
                相關研究證據請參考詳細說明中的臨床試驗結果。
              </div>
            </div>
          </div>
          
          <!-- 安全性標籤 -->
          <div v-if="activeTab === 'safety'" class="space-y-4">
            <div class="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <h4 class="text-lg font-semibold text-red-300 mb-3 flex items-center">
                <Icon name="heroicons:exclamation-triangle" class="w-5 h-5 mr-2" />
                注意事項
              </h4>
              <div class="text-sm text-red-200 space-y-2">
                <p>使用前請仔細閱讀產品標籤和說明。</p>
                <p>如有疑問，請諮詢醫療專業人員。</p>
                <p>孕婦、哺乳期婦女及兒童使用前須諮詢醫師。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 標籤區域 -->
    <div v-if="supplement.tags && supplement.tags.length > 0" class="px-6 py-4 border-t border-slate-700/30 bg-slate-800/20">
      <div class="flex flex-wrap gap-2">
        <span
          v-for="tag in supplement.tags"
          :key="tag"
          class="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-700/40 text-slate-300 border border-slate-600/30 hover:bg-slate-700/60 hover:border-slate-500/50 transition-all duration-200"
        >
          <Icon name="heroicons:tag" class="w-3 h-3 mr-1" />
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
/* 擴展動畫 */
.expandable-content {
  transition: max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 醫療資訊區塊樣式 */
.medical-content :deep(.medical-info-block) {
  background-color: rgba(51, 65, 85, 0.3);
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid rgba(71, 85, 105, 0.3);
}

.medical-content :deep(.medical-info-block.warnings) {
  background-color: rgba(239, 68, 68, 0.1);
  border-color: rgba(239, 68, 68, 0.3);
}

.medical-content :deep(.info-label) {
  font-size: 0.875rem;
  font-weight: 600;
  color: rgb(94, 234, 212);
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
}

.medical-content :deep(.warnings-content .info-label) {
  color: rgb(252, 165, 165);
}

.medical-content :deep(.info-value) {
  color: rgb(226, 232, 240);
  font-size: 0.875rem;
}

.medical-content :deep(.info-content) {
  color: rgb(203, 213, 225);
  font-size: 0.875rem;
}

.medical-content :deep(.info-content) > * + * {
  margin-top: 0.5rem;
}

.medical-content :deep(.warnings-content) {
  color: rgb(254, 202, 202);
}

/* 標籤頁動畫 */
.tab-content {
  animation: fade-in 0.3s ease-in-out;
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* 卡片懸停效果 */
.medical-card {
  transform: translateZ(0);
}

.medical-card:hover {
  transform: translateZ(0) scale(1.01);
}

/* 響應式調整 */
@media (max-width: 768px) {
  .medical-card {
    margin-bottom: 1rem;
  }
  
  .tab-content {
    font-size: 0.875rem;
  }
}
</style>