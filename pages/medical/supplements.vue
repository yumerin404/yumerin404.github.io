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
      <section class="py-12 px-4 relative">
        <div class="container mx-auto max-w-8xl">
          <!-- 使用時間安排 - 改進佈局 -->
          <div v-if="selectedCategory === 'all' && !searchQuery" class="mb-16">
            <div class="bg-gradient-to-br from-slate-900/90 to-slate-800/70 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl">
              <div class="text-center mb-8">
                <h2 class="text-3xl md:text-4xl font-bold text-white mb-4 flex items-center justify-center">
                  <Icon name="heroicons:clock" class="w-8 h-8 text-teal-400 mr-3" />
                  每日使用時間安排
                </h2>
                <div class="w-24 h-1 bg-gradient-to-r from-teal-400 to-cyan-400 mx-auto rounded-full"></div>
              </div>
              
              <!-- 時間排程網格 - 響應式改進 -->
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 md:gap-6">
                <div
                  v-for="(items, timeSlot, index) in usageSchedule"
                  :key="timeSlot"
                  class="bg-slate-800/40 rounded-2xl p-5 border border-slate-700/30 hover:border-teal-500/40 hover:bg-slate-800/60 transition-all duration-500 group"
                  :class="`animate-fade-in-up delay-${(index * 100) % 600}`"
                >
                  <div class="text-center mb-4">
                    <div class="w-12 h-12 bg-teal-500/15 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-teal-500/25 transition-colors duration-300">
                      <Icon name="heroicons:clock" class="w-6 h-6 text-teal-400" />
                    </div>
                    <h3 class="text-sm font-semibold text-teal-300 leading-tight">
                      {{ timeSlot }}
                    </h3>
                  </div>
                  
                  <div class="space-y-2">
                    <div 
                      v-for="item in items.slice(0, 3)" 
                      :key="item"
                      class="text-xs text-gray-300 flex items-start leading-relaxed"
                    >
                      <Icon name="heroicons:check-circle" class="w-3 h-3 text-teal-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span class="truncate">{{ item.replace(/\(.+?\)/g, '') }}</span>
                    </div>
                    <div v-if="items.length > 3" class="text-xs text-slate-400 text-center pt-2">
                      +{{ items.length - 3 }} 項目
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 保健品卡片網格 - 全新響應式佈局 -->
          <div class="relative">
            <!-- 統計資訊顯示 -->
            <div v-if="filteredSupplements.length > 0" class="mb-8 text-center">
              <div class="inline-flex items-center bg-slate-800/40 rounded-2xl px-6 py-3 border border-slate-700/30">
                <Icon name="heroicons:squares-2x2" class="w-5 h-5 text-teal-400 mr-3" />
                <span class="text-slate-300">
                  顯示 <span class="text-teal-400 font-semibold">{{ filteredSupplements.length }}</span> 個保健品
                  <span v-if="searchQuery || selectedCategory !== 'all'" class="text-slate-400">
                    / 共 {{ supplements.length }} 個
                  </span>
                </span>
              </div>
            </div>
            
            <!-- 保健品卡片網格 -->
            <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
              <SupplementCard
                v-for="(supplement, index) in filteredSupplements"
                :key="supplement.id"
                :supplement="supplement"
                :class="[
                  'animate-fade-in-up transition-all duration-500',
                  `delay-${(index * 100) % 600}`
                ]"
                :style="{ 
                  animationDelay: `${(index * 100)}ms`,
                  animationFillMode: 'both'
                }"
              />
            </div>
            
            <!-- 沒有結果提示 - 改進設計 -->
            <div 
              v-if="filteredSupplements.length === 0" 
              class="text-center py-20"
            >
              <div class="max-w-md mx-auto">
                <div class="w-32 h-32 bg-slate-800/30 rounded-full flex items-center justify-center mx-auto mb-8 relative">
                  <div class="absolute inset-0 bg-teal-500/10 rounded-full animate-pulse"></div>
                  <Icon name="heroicons:magnifying-glass" class="w-16 h-16 text-slate-500 relative z-10" />
                </div>
                <h3 class="text-2xl font-bold text-slate-300 mb-4">沒有找到相關保健品</h3>
                <p class="text-slate-400 mb-8 leading-relaxed">
                  請嘗試調整搜尋條件或選擇不同的分類篩選
                </p>
                <button
                  @click="resetFilters"
                  class="inline-flex items-center px-6 py-3 bg-teal-500/20 border border-teal-500/40 rounded-xl text-teal-300 font-medium hover:bg-teal-500/30 hover:border-teal-400/60 transition-all duration-300 group"
                >
                  <Icon name="heroicons:arrow-uturn-left" class="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
                  重置篩選條件
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- 通用側邊欄 -->
    <UniversalSidebar
      :items="tocItems"
      :categories="supplementCategories"
      :active-item="activeSection"
      :loading="contentLoading"
      theme="medical"
      trigger-icon="heroicons:heart"
      trigger-title="保健品目錄"
      system-title="SUPPLEMENT_MATRIX"
      search-placeholder="搜索保健品..."
      @item-click="scrollToSection"
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
// 導入組件
import SupplementCard from '~/components/medical/SupplementCard.vue'

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

// 導入醫療內容解析器
const {
  parseMedicalContent,
  extractQuickInfo,
  generateContentSummary
} = useMedicalContentParser()

// 響應式數據
const activeSection = ref('')
const selectedCategory = ref('all')
const searchQuery = ref('')
const scrollProgress = ref(0)
const supplementContent = ref('')
const supplements = ref<any[]>([])
const usageSchedule = ref<Record<string, string[]>>({})
const contentLoading = ref(true)

// 完整的保健品數據，基於 supple.md 內容
const loadSupplementData = () => {
  supplements.value = [
    // 胺基酸類補充劑
    {
      id: 'l-citrulline',
      title: 'NOW Foods - L-瓜胺酸 750mg',
      category: 'amino-acids',
      usage: '一天兩顆',
      manufacturer: 'NOW Foods',
      productName: 'L‑瓜胺酸 750 mg (L‑Citrulline)',
      url: 'https://tw.iherb.com/pr/now-foods-l-citrulline-750-mg-180-veg-capsules/14209',
      description: '支持血管擴張、增加末梢血流與運動表現的胺基酸補充劑',
      benefits: ['尿素循環', '一氧化氮前驅物', '血壓調節', '組織修復'],
      dosage: '每日 1–2 次，每次 1–2 粒／植物膠囊',
      tags: ['血管健康', '運動表現', '血壓', '循環'],
      content: `
**製造商**：NOW Foods (美國)

**成分（每 1 植物膠囊）**：
- **L‑瓜胺酸（L‑Citrulline）750 mg** — DV 未建立
  - 來源：以玉米澱粉等植物性糖源經發酵純化之游離型胺基酸

**主要功效**：
1. **尿素循環**：於肝臟轉為精胺酸後參與尿素循環，有助於清除多餘氨
2. **一氧化氮前驅物**：經 Arg‑NOS 路徑提升 NO 生合成，促血管擴張、增加末梢血流與運動泵感
3. **血壓調節**：多項臨床試驗顯示每日 3–6g 持續 4–8 週可降低收縮壓 3–6 mmHg
4. **組織修復**：動物研究顯示可促進傷口再上皮化與膠原沉積

**機制與細節**：
- **Arginine sparing**：CIT 於腸肝循環不被高度代謝，可有效提升血中 Arg 濃度
- **NO／CGMP 軸**：增加內皮 NOS 基質 → NO ↑ → sGC 活化 → cGMP↑ → 血管平滑肌鬆弛

**使用方法**：成人每日 1–2 粒，1–2 次，建議兩餐間或運動前 30–60 分鐘空腹服用

**注意事項**：
- 僅供 18 歲以上成人
- 孕哺婦、低血壓、腎功能不全者應先諮詢醫師
- 可能出現輕微胃腸不適、頭暈

**保存條件**：開封後置於 15–25 °C 陰涼乾燥避光處，6 個月內食用完畢
      `
    },
    {
      id: 'l-glutamine',
      title: 'NOW Foods - L-麩醯胺酸 500mg',
      category: 'amino-acids',
      usage: '一天兩顆',
      manufacturer: 'NOW Foods',
      productName: 'L‑麩醯胺酸 500 mg (L‑Glutamine)',
      url: 'https://tw.iherb.com/pr/now-foods-l-glutamine-500-mg-120-veg-capsules/622',
      description: '維護腸道屏障、支持免疫系統和運動恢復的條件必需胺基酸',
      benefits: ['腸道屏障', '免疫支持', '組織修復', '運動恢復'],
      dosage: '每日 1‑3 粒／植物膠囊',
      tags: ['腸道健康', '免疫', '運動恢復', '蛋白質合成'],
      content: `
**製造商**：NOW Foods (美國)

**成分（每 1 膠囊）**：
- **L‑麩醯胺酸（L‑Glutamine，游離型）500 mg** — DV 未建立
  - 來源：以植物性葡萄糖發酵純化之游離胺基酸；純素、Non‑GMO

**主要功效**：
1. **維護腸道屏障**：降低腸漏並改善腸黏膜修復
2. **支持免疫**：為 T/B 淋巴球與腸上皮的首要能量來源，可提升黏膜 IgA 與減少上呼吸道感染
3. **促進組織修復與運動恢復**：作為氮運載體，維持正氮平衡；運動後補充可降低肌肉損傷與延遲性痠痛

**機制與細節**：
1. **腸屏障**：增加 tight‑junction 蛋白表達，抑制 NF‑κB 發炎訊號，強化屏障功能
2. **免疫代謝**：供應免疫細胞醣解後所需的碳源與 NADPH，促進淋巴球增殖與抗體生成
3. **肌肉保護**：運動後可抑制肌肉蛋白分解標誌物，透過 mTOR/4E‑BP1 途徑促進蛋白質合成

**其他成分**：Hypromellose（植物纖維膠囊殼）、米粉、Ascorbyl Palmitate（抗氧化劑）

**使用方法**：成人每日 1–3 粒，建議兩餐間空腹服用；若用於運動恢復，可於運動結束後 30 分鐘內補充

**注意事項**：
- 僅供 18 歲以上成人使用
- 孕哺婦、肝腎功能不全、肝性腦病變患者請先諮詢醫師
- 偶見腹脹、噁心等輕微腸胃不適

**保存條件**：置於 15–25 °C 陰涼乾燥處，避免高溫潮濕與陽光直射
      `
    },
    {
      id: 'omega-3',
      title: 'California Gold Nutrition - Omega 800 魚油',
      category: 'fish-oil',
      usage: '一天一顆',
      manufacturer: 'California Gold Nutrition',
      productName: 'Omega 800 超濃縮 Omega‑3 魚油 1,000 mg',
      url: 'https://tw.iherb.com/pr/california-gold-nutrition-omega-800-ultra-concentrated-omega-3-fish-oil-kd-pur-triglyceride-form-30-fish-gelatin-softgels-1-000-mg-per-softgel/82845',
      description: '高純度 TG 型魚油，富含 EPA+DHA，支持心血管和大腦健康',
      benefits: ['心血管健康', '抗發炎', '腦部支持', '視網膜保護'],
      dosage: '每日 1 粒／魚明膠軟膠囊',
      tags: ['心血管', 'Omega-3', 'EPA', 'DHA', '抗發炎'],
      content: `
**製造商**：California Gold Nutrition (美國) — kd‑pür® 高純度魚油濃縮物由 KD Pharma (德國) 精製

**成分（每 1 魚明膠軟膠囊）**：
- **高純度 Omega‑3 魚油濃縮物（kd‑pür® TG，沙丁魚／鯷魚／鯖魚）1,000 mg**
  - 含 **EPA 480 mg + DHA 320 mg → 總 ω‑3 840 mg** — DV 未建立
  - 來源：秘魯、智利野生小型遠洋魚 → 德國超臨界分子蒸餾，保持天然三酸甘油酯 (TG) 型態

**主要功效**：
1. **心血管**：中高劑量 EPA+DHA 可降低三酸甘油脂 15–30 %、輔助調節血壓及血小板活性，減少動脈硬化風險
2. **抗發炎**：EPA/DHA 代謝為 resolvin、protectin、maresin，下調 NF‑κB 與 NLRP3，改善系統性發炎
3. **腦部與視網膜**：DHA 為神經突觸與視紫質結構要素，支持認知、情緒與視覺功能

**機制與細節**：
- **TG 型態生體可利用率↑**：交叉試驗顯示 TG 魚油 EPA/DHA 血漿 AUC 高於 EE 型 20–50 %
- 活化 PPAR‑α/γ ⇒ β‑氧化↑；競爭抑制 AA 炎性 eicosanoid；GPR120 介導抗發炎訊號

**其他成分**：魚明膠 (Tilapia)、植物甘油、水；混合生育醇 (< 0.2 %) 抗氧化

**使用方法**：成人每日 1 粒隨含脂肪餐服用；欲進一步降低血脂或發炎指標者，可依醫囑增至每日 2–3 粒

**注意事項**：
- 對魚類或大豆過敏者請避免使用
- 併用抗凝血劑或手術前兩週，須諮詢醫師
- 孕哺婦與兒童應控制 EPA 攝取

**品質保證**：IFOS® 5 星、重金屬與二噁英檢測 < 0.1 ppb；MSC 可持續漁獲；Non‑GMO、無麩質、低過敏性

**保存條件**：密封置於 15–25 °C 陰涼乾燥處，避免日光與潮濕；開封後建議 6 個月內食用完畢
      `
    },
    {
      id: 'astaxanthin',
      title: 'California Gold Nutrition - 蝦青素 12mg',
      category: 'eye-health',
      usage: '一天一顆',
      manufacturer: 'California Gold Nutrition',
      productName: 'Astalif® 純冰島蝦青素 12 mg',
      url: 'https://tw.iherb.com/pr/california-gold-nutrition-astaxanthin-astalif-pure-icelandic-12-mg-30-veggie-softgels/71683',
      description: '強效抗氧化劑，保護視力、皮膚和心血管健康',
      benefits: ['抗氧化', '視網膜保護', '皮膚健康', '關節保護', '心血管'],
      dosage: '每日 1 粒／植物軟膠囊',
      tags: ['抗氧化', '眼部健康', '皮膚', '運動', '心血管'],
      content: `
**製造商**：California Gold Nutrition (美國)

**成分（每 1 植物軟膠囊）**：
- **蝦青素（Astaxanthin，Haematococcus pluvialis Extract）12 mg** — DV 未建立
  - 來源：Astalif® 純冰島微藻，零溶劑超臨界 CO₂ 萃取；含 ≥ 99 % (3S, 3'S) 生物活性異構體

**主要功效**：
1. **高效清除 ROS/RNS**：抗氧化力約 β‑胡蘿蔔素 10 倍、維生素 E 50 倍
2. **跨越生理屏障**：可跨越血腦與血視網膜屏障，保護神經、視網膜細胞不受氧化與光毒傷害
3. **多系統保護**：支援皮膚、心血管、關節與眼睛健康，降低紫外線與發炎損傷

**機制與細節**：
- **膜內外雙向抗氧化**：極性末端插入磷脂頭部，非極性多烯鏈橫跨脂雙層，犧牲性捕捉 ¹O₂、•OH
- **Nrf2 ↑ / NF‑κB ↓**：提升內源抗氧化酶 (SOD, CAT) 並抑制 COX‑2、IL‑6、CRP
- **LDL 氧化抑制 & eNOS 活化**：減少 LDL‑ox，改善血管內皮功能與微循環
- **視覺與神經保護**：在視桿細胞、黃斑部累積，減少藍光誘導 ROS

**臨床證據**：
- 皮膚護理 RCT 8 週：彈性↑12 %，TEWL↓14 %
- VDT 眼疲勞 RCT 4 週：眼疲勞指數↓32 %，VA 恢復↑
- 膝關節 OA RCT 12 週：WOMAC‑Pain ↓18 %

**其他成分**：葵花籽油、植物膠囊殼（純化水、卡拉膠、改性澱粉、植物甘油、山梨醇）

**使用方法**：成人每日 1 粒，隨含脂肪之餐食吞服；高強度紫外線曝露或劇烈運動期間可酌情增至 2 粒

**注意事項**：
- 僅供 18 歲以上成人使用
- 孕哺期、血液疾患或使用抗凝血藥者須先諮詢醫師
- 高劑量可能導致輕微膚色變深，停用後可恢復
- 手術前兩週內建議停用

**品質保證**：純素軟膠囊、Non‑GMO、無麩質及大豆；iTested® 第三方檢驗

**保存條件**：密封置於 15–25 °C 陰涼乾燥避光處；開封後 3 個月內使用完畢
      `
    },
    {
      id: 'lutein',
      title: "Doctor's Best - 葉黃素 20mg",
      category: 'eye-health',
      usage: '一天一顆',
      manufacturer: "Doctor's Best",
      productName: '葉黃素 20mg',
      description: '保護黃斑部，過濾藍光',
      benefits: ['黃斑保護', '藍光過濾', '視力支持', '抗氧化'],
      dosage: '每日 1 粒',
      content: `
**製造商**：Doctor's Best (美國)

**主要功效**：
- 在視網膜黃斑部形成「黃斑色素光篩」，濾除400-500nm高能藍光
- 具強力singlet-oxygen與自由基清除能力
- 每日10-20mg，12-24週可顯著提升黃斑色素光密度

**使用方法**：成人每日 1 粒，可隨餐或空腹吞服
      `
    },
    {
      id: 'bilberry-grape',
      title: 'Jarrow Formulas - 越橘+葡萄皮多酚',
      category: 'eye-health',
      usage: '一天一顆',
      manufacturer: 'Jarrow Formulas',
      productName: '全素三桑子+葡萄皮多酚',
      description: '支持視覺健康和循環系統',
      benefits: ['視覺疲勞', '夜間視力', '血管彈性', '抗氧化'],
      dosage: '每日 1-2 次，每次 1 粒',
      content: `
**製造商**：Jarrow Formulas (美國)

**主要功效**：
- 減輕螢幕使用導致的視覺疲勞與睫狀肌痙攣
- 促進暗適應、夜間視覺靈敏度與對比感知
- 支援微血管彈性、降低毛細血管脆性

**使用方法**：成人每日 1 粒，隨餐或餐後配150-250mL溫水吞服
      `
    },
    {
      id: 'dgl-aloe',
      title: 'NOW Foods - DGL甘草萃取含蘆薈',
      category: 'stomach-protection',
      usage: '一天兩顆',
      manufacturer: 'NOW Foods',
      productName: 'DGL with Aloe Vera 400mg',
      description: '保護胃腸黏膜，舒緩胃酸逆流',
      benefits: ['胃黏膜保護', '潰瘍癒合', '胃酸逆流', '消化支持'],
      dosage: '每日 2 粒，餐前 20-30 分鐘',
      content: `
**製造商**：NOW Foods (美國)

**主要功效**：
- 支持胃腸黏膜屏障、舒緩胃酸逆流等不適感
- 已去除甘草酸，降低對血壓及電解質的潛在影響
- 增強胃與十二指腸黏膜屏障、促進潰瘍癒合

**使用方法**：成人每日 2 粒，建議於餐前20-30分鐘配200mL溫水吞服
      `
    },
    {
      id: 'mastic-gum',
      title: 'Jarrow Formulas - 希臘乳香樹脂',
      category: 'stomach-protection',
      usage: '一天兩顆',
      manufacturer: 'Jarrow Formulas',
      productName: 'Vegan Mastic Gum 500mg',
      description: '保護胃部，抑制幽門螺旋桿菌',
      benefits: ['胃黏膜保護', '抗菌', '消化不良', '潰瘍癒合'],
      dosage: '每日 2 粒，餐前 15-30 分鐘',
      content: `
**製造商**：Jarrow Formulas (美國)

**主要功效**：
- 保護胃與十二指腸黏膜，促進潰瘍癒合
- 抑制幽門螺旋桿菌黏附與增殖
- 舒緩功能性消化不良、胃酸逆流與胃痛

**使用方法**：成人每日 2 粒，建議早餐前15-30分鐘空腹配≈200mL溫開水
      `
    },
    {
      id: 'super-enzymes',
      title: 'NOW Foods - Super Enzymes 全方位消化酵素',
      category: 'enzymes',
      usage: '中餐一顆',
      manufacturer: 'NOW Foods',
      productName: 'Super Enzymes 全方位消化酵素',
      description: '全方位消化酵素，支持三大營養素消化',
      benefits: ['蛋白質消化', '脂肪消化', '澱粉消化', '減少脹氣'],
      dosage: '隨每餐 1 粒',
      content: `
**製造商**：NOW Foods (美國)

**主要成分**：
- Betaine HCl 200mg：提升胃酸，協助蛋白質變性
- Ox Bile Extract 100mg：促進脂質乳化與脂溶性維生素吸收
- Pancreatin 11X 134mg：全面分解三大營養素
- Bromelain 40mg：蛋白水解＋抗發炎

**主要功效**：
- 改善營養吸收，減少飯後沉重感
- 分解麩質胜肽，減少麩質敏感不適
- 支持高蛋白飲食的蛋白質利用率

**使用方法**：隨每餐 1 粒，與第一口食物同服
      `
    },
    {
      id: 'zinc-glycinate',
      title: 'NOW Foods - 鋅甘胺酸螯合 30mg',
      category: 'minerals',
      usage: '一週一顆',
      manufacturer: 'NOW Foods',
      productName: 'Zinc Glycinate 30mg + 冷壓南瓜籽油',
      description: '高生物利用率鋅補充劑，支持免疫與前列腺健康',
      benefits: ['免疫支持', '前列腺健康', '傷口癒合', '抗氧化'],
      dosage: '每日 1 粒隨含脂正餐',
      content: `
**製造商**：NOW Foods (美國)

**主要成分**：
- 鋅（雙甘胺酸螯合）30mg - 273% DV
- 冷壓南瓜籽油 250mg

**主要功效**：
- 支援先天／後天免疫、維持黏膜屏障
- 促進 >300 種鋅酶活性
- 參與賀爾蒙生成、精子品質與前列腺健康
- 加速傷口癒合並抑制氧化壓力

**使用方法**：成人每日 1 粒，隨含脂正餐吞服
      `
    },
    {
      id: 'vitamin-d3-k2',
      title: 'NOW Foods - Mega D-3 5,000 IU + MK-7 180μg',
      category: 'vitamins',
      usage: '一週一顆',
      manufacturer: 'NOW Foods',
      productName: 'Mega D-3 & MK-7',
      description: '維生素D3與K2的完美組合，支持骨骼與心血管健康',
      benefits: ['骨骼健康', '免疫調節', '心血管保護', '鈣質調節'],
      dosage: '每日 1 粒餐中或餐後',
      content: `
**製造商**：NOW Foods (美國)

**主要成分**：
- 維生素 D₃（膽鈣化醇）125μg (5,000 IU) - 625% DV
- 維生素 K₂-MK-7 180μg

**主要功效**：
- 鈣／磷吸收與骨骼礦化：刺激腸上皮轉運子，提升 BMD
- 免疫調節：活化 VDR→抑制 NF-κB，促進先天免疫
- 骨鈣素 γ-羧化：促鈣質沉積於骨基質
- 基質 Gla 蛋白活化：抑制血管與軟組織鈣化

**使用方法**：成人每日 1 粒，餐中或餐後含 ≥5g 脂肪食物併服
      `
    },
    {
      id: 'alinamin-medical-gold',
      title: 'アリナミン製薬 - 阿利納明醫療金強錠',
      category: 'vitamins',
      usage: '一個禮拜一錠',
      manufacturer: 'アリナミン製薬',
      productName: 'Alinamin Medical Gold',
      description: '高劑量活性維生素配方，改善神經肌肉代謝症狀',
      benefits: ['眼睛疲勞', '肩頸僵硬', '神經功能', '能量代謝'],
      dosage: '每日 3 次，每次 1 錠',
      content: `
**製造商**：アリナミン製薬株式会社（日本）

**主要成分（每錠）**：
- 富司硫胺 33.3mg (活性維生素 B₁)
- 磷酸吡哆醛 20mg (活性維生素 B₆)
- 甲鈷胺 0.5mg (活性維生素 B₁₂)
- d-α-生育醇琥珀酸酯 33.3mg
- γ-穀維素 3.33mg
- 葉酸 0.333mg

**主要功效**：
- 改善眼睛疲勞、肩頸僵硬、腰背痠痛等症狀
- 支援醣類→能量代謝、提高耐力
- 修復髓鞘、促進軸突再生
- 調節自律神經、緩和焦慮

**使用方法**：成人每日 3 次，每次 1 錠，餐後整錠吞服
      `
    },
    {
      id: 'berberine',
      title: 'Natural Factors - WellBetX 小檗鹼 500mg',
      category: 'others',
      usage: '一天兩顆',
      manufacturer: 'Natural Factors',
      productName: 'WellBetX Berberine 500mg',
      description: '血糖調節與心血管支持',
      benefits: ['血糖控制', '胰島素敏感度', '血脂調節', '體重管理'],
      dosage: '每日 2 次，每次 1 粒',
      content: `
**製造商**：Natural Factors (加拿大)

**主要成分**：
- 小檗鹼鹽酸鹽 500mg（≥90% berberine HCl）

**主要功效**：
- 改善空腹與餐後血糖、提升胰島素敏感度
- 降低總膽固醇、LDL-C、三酸甘油酯
- 輔助體重與脂肪肝管理
- AMPK 活化→葡萄糖攝取↑、脂肪生成↓

**使用方法**：成人每日 2 次、每次 1 粒，建議隨餐或餐後 15 分鐘內吞服
      `
    },
    {
      id: 'probiotics-dophilus',
      title: 'Solgar - Advanced Multi-Billion Dophilus 5×10⁹ CFU',
      category: 'probiotics',
      usage: '一天一顆',
      manufacturer: 'Solgar',
      productName: 'Advanced Multi-Billion Dophilus',
      description: '四株專利益生菌複合配方',
      benefits: ['腸道健康', '免疫支持', '抗生素相關腹瀉預防', '消化改善'],
      dosage: '每日 1-2 粒',
      content: `
**製造商**：Solgar (美國)

**主要成分**：
- 總活菌數：5×10⁹ CFU
- Lactobacillus acidophilus LA-5® 1.25×10⁹ CFU
- Bifidobacterium animalis subsp. lactis BB-12® 1.25×10⁹ CFU
- Lacticaseibacillus paracasei L. CASEI 431® 1.25×10⁹ CFU
- Lacticaseibacillus rhamnosus GG (LGG®) 1.25×10⁹ CFU

**主要功效**：
- 優化腸道菌叢、改善腹脹與排便規律
- 預防／減輕抗生素相關腹瀉
- 調節腸道與呼吸道黏膜免疫
- 提高上呼吸道感染防禦

**使用方法**：成人每日 1 粒；需求高時可增至 2 粒
      `
    },
    {
      id: 'saccharomyces-boulardii',
      title: 'Jarrow Formulas - 純素布拉氏酵母 + MOS 5×10⁹ CFU',
      category: 'probiotics',
      usage: '一天一顆',
      manufacturer: 'Jarrow Formulas',
      productName: 'Vegan Saccharomyces boulardii + MOS',
      description: '益生酵母與甘露寡糖組合，支持腸道健康',
      benefits: ['急性腹瀉', '抗生素相關腹瀉', '旅遊者腹瀉', 'CDI輔助'],
      dosage: '每日 1 粒',
      content: `
**製造商**：Jarrow Formulas (美國)

**主要成分**：
- 布拉氏酵母 S. boulardii CNCM I-745：5×10⁹ CFU
- MOS（甘露寡糖）200mg

**主要功效**：
- 縮短急性感染性與抗生素相關腹瀉病程
- 降低兒科與成人 AAD 發生率
- 輔助治療 C. difficile 感染
- 抗毒素作用：水解 C. difficile 毒素 A/B

**使用方法**：成人每日 1 粒可隨餐或空腹；抗生素併用請錯開 ≥2 小時
      `
    },
    {
      id: 'coq10-pqq',
      title: "Doctor's Best - CoQ10 + PQQ",
      category: 'others',
      usage: '一天一顆',
      manufacturer: "Doctor's Best",
      productName: 'High Absorption CoQ10 Plus PQQ',
      description: '支持細胞能量生產和線粒體健康',
      benefits: ['ATP生成', '線粒體保護', '心臟支持', '神經保護'],
      dosage: '每日 1 粒隨含脂餐服用',
      content: `
**製造商**：Doctor's Best (美國)

**主要成分**：
- 輔酶 Q10 100mg
- 吡咯醌醌二鈉鹽（PQQ）20mg
- 黑胡椒萃取（BioPerine）5mg

**主要功效**：
- 參與電子傳遞鏈，促進ATP生成，支持心肌收縮與全身能量
- 具脂溶性抗氧化能力，保護線粒體與細胞膜脂質
- PQQ刺激線粒體新生，增強細胞能量
- 改善因 statin 與老化導致的 CoQ10 耗竭

**使用方法**：成人每日 1 粒，隨含脂肪餐服用可進一步增強吸收
      `
    }
  ]

  // 使用時間安排 - 完全依照 supple.md 的安排
  usageSchedule.value = {
    '早上睡醒': [
      'L-瓜胺酸 (L-Citrulline)',
      'L-麩醯胺酸 (L-Glutamine)'
    ],
    '早餐前 30 分鐘': [
      '希臘乳香樹脂 (Mastic Gum)',
      'DGL 甘草萃取＋蘆薈'
    ],
    '早餐後（配合脂肪）': [
      'Omega-3 魚油 (Omega 800)',
      '蝦青素 (Astaxanthin)',
      '葉黃素 (Lutein)',
      'Jarrow 越橘＋葡萄皮',
      '輔酶 CoQ10 + PQQ',
      '小檗鹼 (Berberine)',
      '洋薊萃取 (Artichoke Extract)',
      '薑根萃取 (Ginger Root)',
      '益生菌組合',
      '[每週特定日] 鋅甘胺酸螯合 (Zinc Glycinate)',
      '[每週特定日] 維生素 D3 + K2',
      '[每週特定日] 合利他命 (Alinamin Medical Gold) - 各 1 顆'
    ],
    '午餐中': [
      '全方位消化酵素 (Super Enzymes)'
    ],
    '晚餐前 30 分鐘': [
      '希臘乳香樹脂 (Mastic Gum)',
      'DGL 甘草萃取＋蘆薈'
    ],
    '晚餐後': [
      '小檗鹼 (Berberine)',
      '洋薊萃取 (Artichoke Extract)',
      '薑根萃取 (Ginger Root)'
    ]
  }
}

// 立即載入數據
loadSupplementData()

// 保健品分類映射 - 完全對應 supple.md 的分類結構
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
  'amino-acids': '胺基酸類補充劑',
  'fish-oil': '魚油補充劑', 
  'eye-health': '眼部健康補充劑',
  'stomach-protection': '保護胃部',
  'minerals': '礦物質補充劑',
  'vitamins': '維生素補充劑',
  'others': '其他類補充',
  'enzymes': '酶',
  'probiotics': '益生菌補充劑'
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

// 增強的保健品數據，包含解析後的結構化資訊
const enhancedSupplements = computed(() => {
  return supplements.value.map(supplement => {
    try {
      const quickInfo = extractQuickInfo(supplement)
      const summary = generateContentSummary(supplement.content)
      
      return {
        ...supplement,
        description: summary || supplement.description,
        benefits: quickInfo.benefits || supplement.benefits || [],
        dosage: quickInfo.dosage || supplement.dosage,
        quickInfo
      }
    } catch (error) {
      console.warn('Error processing supplement:', supplement.title, error)
      // 如果解析失败，直接返回原始數據
      return {
        ...supplement,
        description: supplement.description || '詳細資訊請展開查看。',
        benefits: supplement.benefits || [],
        dosage: supplement.dosage || '請參考產品標籤',
        quickInfo: {
          dosage: supplement.dosage || '請參考產品標籤',
          timing: supplement.usage || '依醫囑使用',
          benefits: supplement.benefits || [],
          warnings: [],
          manufacturer: supplement.manufacturer || '未指定',
          category: supplement.category || 'other'
        }
      }
    }
  })
})

// 計算屬性
const filteredSupplements = computed(() => {
  let filtered = enhancedSupplements.value
  
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
      (supplement.description && supplement.description.toLowerCase().includes(query)) ||
      (supplement.tags && supplement.tags.some((tag: string) => tag.toLowerCase().includes(query))) ||
      (supplement.benefits && supplement.benefits.some((benefit: string) => benefit.toLowerCase().includes(query)))
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
  try {
    // 模擬載入延遲
    await new Promise(resolve => setTimeout(resolve, 500))
  } finally {
    contentLoading.value = false
  }
  
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

/* 新增的醫療頁面特色動畫 */
@keyframes medical-pulse {
  0%, 100% {
    box-shadow: 0 0 20px rgba(20, 184, 166, 0.1);
    transform: scale(1);
  }
  50% {
    box-shadow: 0 0 30px rgba(20, 184, 166, 0.3), 0 0 40px rgba(20, 184, 166, 0.1);
    transform: scale(1.02);
  }
}

@keyframes grid-fade-in {
  0% {
    opacity: 0;
    transform: translateY(30px) scale(0.9);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes stats-counter {
  0% { opacity: 0; transform: scale(0.8); }
  50% { opacity: 0.7; transform: scale(1.1); }
  100% { opacity: 1; transform: scale(1); }
}

.animate-medical-pulse {
  animation: medical-pulse 3s ease-in-out infinite;
}

.animate-grid-fade-in {
  animation: grid-fade-in 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

.animate-stats-counter {
  animation: stats-counter 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}

/* 延遲動畫類別擴充 */
.delay-100 { animation-delay: 100ms; }
.delay-200 { animation-delay: 200ms; }
.delay-300 { animation-delay: 300ms; }
.delay-400 { animation-delay: 400ms; }
.delay-500 { animation-delay: 500ms; }
.delay-600 { animation-delay: 600ms; }

/* 響應式調整 - 增強版 */
@media (max-width: 1024px) {
  .animate-fade-in-up {
    animation-duration: 0.6s;
  }
  
  .animate-grid-fade-in {
    animation-duration: 0.7s;
  }
}

@media (max-width: 768px) {
  .animate-fade-in-up {
    animation-delay: 0.1s;
    animation-duration: 0.5s;
  }
  
  .prose :deep(h2) {
    font-size: 1.5rem;
  }
  
  .prose :deep(h3) {
    font-size: 1.25rem;
  }
  
  /* 行動裝置減少動畫效果 */
  .animate-medical-pulse {
    animation: none;
  }
}

@media (max-width: 640px) {
  .delay-100, .delay-200, .delay-300, 
  .delay-400, .delay-500, .delay-600 {
    animation-delay: 0ms;
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