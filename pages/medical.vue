<template>
  <div class="min-h-screen relative overflow-hidden">
    <!-- 魔法背景效果 -->
    <div class="fixed inset-0 z-0">
      <!-- 深邃宇宙背景 -->
      <div class="absolute inset-0 bg-gradient-to-br from-slate-950 via-emerald-950/30 to-slate-900"></div>
      
      <!-- 醫學主題魔法粒子層 -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <!-- 分子結構粒子 -->
        <div 
          v-for="i in 20" 
          :key="`molecule-particle-${i}`"
          class="absolute text-emerald-400/30 animate-pulse"
          :style="getMoleculeParticleStyle(i)"
        >{{ getRandomMoleculeSymbol() }}</div>
        
        <!-- 十字符號粒子 -->
        <div 
          v-for="i in 15" 
          :key="`cross-particle-${i}`"
          class="absolute text-red-400/20 animate-stellar-pulse"
          :style="getCrossParticleStyle(i)"
        >⚕</div>
        
        <!-- DNA 螺旋粒子 */
        <div 
          v-for="i in 12" 
          :key="`dna-particle-${i}`"
          class="absolute text-blue-400/25 animate-pulse"
          :style="getDNAParticleStyle(i)"
        >∿</div>
        
        <!-- 魔法流星 -->
        <div 
          v-for="i in 4" 
          :key="`magic-meteor-${i}`"
          class="absolute w-2 h-0.5 bg-gradient-to-r from-transparent via-emerald-400/70 to-transparent rounded-full animate-meteor-shower"
          :style="getMagicMeteorStyle(i)"
        ></div>
        
        <!-- 魔法能量波紋 -->
        <div 
          v-for="i in 6" 
          :key="`magic-ripple-${i}`"
          class="absolute rounded-full border border-emerald-400/10 animate-cosmic-glow"
          :style="getMagicRippleStyle(i)"
        ></div>
      </div>
      
      <!-- 魔法漸層覆蓋 -->
      <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-emerald-950/20"></div>
    </div>

    <!-- Header -->
    <Header />

    <!-- Main Content -->
    <main class="relative z-10 pt-20 pb-16">
      <!-- Hero Section -->
      <section class="py-16 px-4">
        <div class="container mx-auto max-w-4xl text-center">
          <!-- 裝飾性魔法線條 -->
          <div class="flex justify-center items-center mb-8 animate-fade-in-up">
            <div class="w-24 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-glow"></div>
            <div class="mx-6 w-3 h-3 border-2 border-emerald-400 rounded-full animate-pulse relative">
              <div class="absolute top-1 left-1 w-1 h-1 bg-emerald-300 rounded-full animate-ping"></div>
            </div>
            <div class="w-24 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-glow"></div>
          </div>

          <!-- 主標題 -->
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 animate-cosmic-text">
            <span class="bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-400 bg-clip-text text-transparent">
              醫學、藥物、保健品知識
            </span>
          </h1>
          
          <!-- 副標題 -->
          <p class="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed animate-fade-in-up delay-200">
            探索健康科學的奧秘，分享醫學知識與健康生活心得
          </p>

          <!-- 建設中卡片 -->
          <div class="card-primary p-12 mx-auto max-w-2xl animate-scale-in delay-300">
            <!-- 中心圖示 -->
            <div class="relative mb-8 flex justify-center">
              <div class="relative">
                <!-- 主圖示 -->
                <div class="w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center animate-icon-hover-glow">
                  <Icon name="heroicons:heart" class="w-12 h-12 text-white" />
                </div>
                
                <!-- 軌道環 -->
                <div class="absolute inset-0 rounded-full border border-emerald-400/30 animate-spin-slow"></div>
                <div class="absolute inset-2 rounded-full border border-teal-400/20 animate-spin-reverse"></div>
                
                <!-- 醫學符號軌道粒子 -->
                <div class="absolute top-0 left-1/2 w-4 h-4 text-emerald-400 animate-orbit-glow transform -translate-x-1/2">⚕</div>
                <div class="absolute bottom-0 left-1/2 w-4 h-4 text-red-400 animate-orbit-glow transform -translate-x-1/2" style="animation-delay: 1.25s">♥</div>
                <div class="absolute left-0 top-1/2 w-4 h-4 text-blue-400 animate-orbit-glow transform -translate-y-1/2" style="animation-delay: 2.5s">⊕</div>
                <div class="absolute right-0 top-1/2 w-4 h-4 text-teal-400 animate-orbit-glow transform -translate-y-1/2" style="animation-delay: 3.75s">※</div>
              </div>
            </div>

            <!-- 建設中標題 -->
            <h2 class="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              正在建設中
            </h2>

            <!-- 描述文字 -->
            <div class="space-y-4 text-lg text-gray-300 mb-8">
              <p class="leading-relaxed">
                我正在為您準備一個專業的健康知識分享平台，這裡將會有：
              </p>
              
              <div class="text-left max-w-md mx-auto space-y-3">
                <div class="flex items-center space-x-3 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <Icon name="heroicons:beaker" class="w-5 h-5 text-emerald-400" />
                  <span>藥物作用機制與用藥安全</span>
                </div>
                <div class="flex items-center space-x-3 p-3 rounded-lg bg-teal-500/10 border border-teal-500/20">
                  <Icon name="heroicons:shield-check" class="w-5 h-5 text-teal-400" />
                  <span>保健品成分分析與選購指南</span>
                </div>
                <div class="flex items-center space-x-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <Icon name="heroicons:book-open" class="w-5 h-5 text-blue-400" />
                  <span>醫學研究解讀與健康迷思</span>
                </div>
                <div class="flex items-center space-x-3 p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                  <Icon name="heroicons:heart" class="w-5 h-5 text-cyan-400" />
                  <span>預防保健與生活健康建議</span>
                </div>
              </div>
            </div>

            <!-- 免責聲明 -->
            <div class="mb-8 p-6 rounded-xl bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20">
              <h3 class="text-lg font-semibold text-yellow-400 mb-2 flex items-center justify-center">
                <Icon name="heroicons:exclamation-triangle" class="w-5 h-5 mr-2" />
                重要提醒
              </h3>
              <p class="text-gray-300 text-sm leading-relaxed">
                本站內容僅供學習參考，不構成醫療建議。任何健康問題請諮詢專業醫師。
              </p>
            </div>

            <!-- 預計完成時間 -->
            <div class="mb-8 p-6 rounded-xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20">
              <h3 class="text-lg font-semibold text-emerald-400 mb-2 flex items-center justify-center">
                <Icon name="heroicons:clock" class="w-5 h-5 mr-2" />
                預計完成時間
              </h3>
              <p class="text-gray-300">2025年9月 - 研發中的健康配方</p>
            </div>

            <!-- 行動按鈕 -->
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <NuxtLink
                to="/"
                class="group btn-primary px-8 py-4 rounded-xl text-lg font-semibold inline-flex items-center justify-center overflow-hidden relative"
              >
                <div class="absolute inset-0 bg-gradient-to-r from-emerald-600/80 to-teal-600/80 rounded-xl animate-glow"></div>
                <Icon name="heroicons:home" class="w-6 h-6 mr-3 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                <span class="relative z-10">回到首頁</span>
                <!-- 按鈕魔法粒子 -->
                <div class="absolute top-2 right-2 w-1 h-1 bg-white/80 rounded-full animate-ping"></div>
              </NuxtLink>
              
              <button
                @click="showNotification"
                class="group btn-secondary px-8 py-4 rounded-xl text-lg font-medium inline-flex items-center justify-center overflow-hidden relative"
              >
                <div class="absolute inset-0 bg-gradient-to-r from-emerald-500/0 to-teal-500/0 group-hover:from-emerald-500/20 group-hover:to-teal-500/20 rounded-xl transition-all duration-300"></div>
                <Icon name="heroicons:bell" class="w-6 h-6 mr-3 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                <span class="relative z-10">通知我更新</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- 預告內容區域 -->
      <section class="py-16 px-4">
        <div class="container mx-auto max-w-6xl">
          <h2 class="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent animate-fade-in-up">
            即將到來的精彩內容
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <!-- 預告卡片 1 -->
            <div class="card-primary p-6 text-center group animate-fade-in-up delay-100">
              <div class="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Icon name="heroicons:beaker" class="w-8 h-8 text-white" />
              </div>
              <h3 class="text-xl font-bold text-emerald-400 mb-3">藥物知識</h3>
              <p class="text-gray-300 text-sm leading-relaxed">深入解析藥物機制、副作用與正確用藥方法，守護用藥安全</p>
            </div>

            <!-- 預告卡片 2 -->
            <div class="card-primary p-6 text-center group animate-fade-in-up delay-200">
              <div class="w-16 h-16 bg-gradient-to-br from-teal-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Icon name="heroicons:shield-check" class="w-8 h-8 text-white" />
              </div>
              <h3 class="text-xl font-bold text-teal-400 mb-3">保健品指南</h3>
              <p class="text-gray-300 text-sm leading-relaxed">科學評估保健品功效、成分分析與選購建議，理性保健</p>
            </div>

            <!-- 預告卡片 3 -->
            <div class="card-primary p-6 text-center group animate-fade-in-up delay-300">
              <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Icon name="heroicons:heart" class="w-8 h-8 text-white" />
              </div>
              <h3 class="text-xl font-bold text-blue-400 mb-3">健康生活</h3>
              <p class="text-gray-300 text-sm leading-relaxed">預防醫學觀念、生活健康建議與醫學研究新知分享</p>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- 通知彈窗 -->
    <div 
      v-if="showNotificationModal"
      class="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-lg flex items-center justify-center p-4"
      @click="hideNotification"
    >
      <div class="relative max-w-md w-full bg-slate-900/95 border border-emerald-500/30 rounded-2xl p-8 animate-scale-in">
        <!-- 關閉按鈕 -->
        <button
          @click="hideNotification"
          class="absolute top-4 right-4 w-8 h-8 bg-slate-800/80 text-gray-400 rounded-full hover:bg-slate-700/80 hover:text-white transition-colors duration-300 flex items-center justify-center"
        >
          <Icon name="heroicons:x-mark" class="w-5 h-5" />
        </button>
        
        <!-- 內容 -->
        <div class="text-center">
          <div class="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="heroicons:heart" class="w-8 h-8 text-white" />
          </div>
          <h3 class="text-2xl font-bold text-emerald-400 mb-4">感謝您的關注！</h3>
          <p class="text-gray-300 mb-6 leading-relaxed">
            我會在醫學健康專區準備好時通知您。讓我們一起追求科學的健康知識，守護身心的平安與幸福！
          </p>
          <div class="flex items-center justify-center space-x-2 text-emerald-400">
            <span class="text-lg">⚕</span>
            <span class="text-sm">健康守護</span>
            <span class="text-lg">♥</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="relative z-10 py-16 border-t border-slate-800/50 bg-slate-950/80 backdrop-blur-xl mt-20">
      <div class="container mx-auto px-4 text-center">
        <div class="flex justify-center items-center space-x-4 mb-6 animate-fade-in-up">
          <div class="relative w-12 h-12 group">
            <img
              src="/images/avatar.png"
              alt="夢鈴領域"
              class="w-full h-full object-cover rounded-full border border-emerald-500/30 group-hover:border-emerald-400/60 transition-all duration-300"
            />
            <div class="absolute inset-0 rounded-full bg-emerald-400/20 opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-300"></div>
          </div>
          <span class="text-2xl font-bold text-gradient-alt animate-gradient-shift">
            夢鈴領域
          </span>
        </div>
        <p class="text-lg text-gray-400 animate-fade-in-up delay-200">
          © 2025 夢鈴領域. 所有權利保留，以愛創作.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// SEO Meta
useHead({
  title: '醫學、藥物、保健品知識 - 夢鈴領域',
  meta: [
    {
      name: 'description',
      content: '探索健康科學的奧秘，分享醫學知識、藥物安全與保健品指南。'
    },
    {
      property: 'og:title',
      content: '醫學、藥物、保健品知識 - 夢鈴領域'
    },
    {
      property: 'og:description',
      content: '即將為您帶來專業的健康知識內容，包含藥物知識、保健品指南與健康生活建議。'
    }
  ]
})

// Reactive Data
const showNotificationModal = ref(false)

// Medical symbols pool for particles
const moleculeSymbols = ['C₆H₁₂O₆', 'H₂O', 'O₂', 'CO₂', 'Ca²⁺', 'Na⁺', 'K⁺', 'Mg²⁺', 'ATP', 'DNA', 'RNA', 'Fe', 'Zn', 'Cu', 'Se']

// Methods
const getRandomMoleculeSymbol = () => {
  return moleculeSymbols[Math.floor(Math.random() * moleculeSymbols.length)]
}

const getMoleculeParticleStyle = (index: number) => {
  const positions = [
    { left: '8%', top: '15%' }, { left: '18%', top: '25%' }, { left: '28%', top: '12%' },
    { left: '38%', top: '28%' }, { left: '48%', top: '18%' }, { left: '58%', top: '22%' },
    { left: '68%', top: '15%' }, { left: '78%', top: '25%' }, { left: '88%', top: '12%' },
    { left: '12%', top: '45%' }, { left: '22%', top: '55%' }, { left: '32%', top: '42%' },
    { left: '42%', top: '58%' }, { left: '52%', top: '48%' }, { left: '62%', top: '52%' },
    { left: '72%', top: '45%' }, { left: '82%', top: '55%' }, { left: '15%', top: '75%' },
    { left: '35%', top: '85%' }, { left: '65%', top: '75%' }
  ]
  
  const position = positions[(index - 1) % positions.length]
  return {
    ...position,
    fontSize: `${0.7 + Math.random() * 0.4}rem`,
    animationDelay: `${Math.random() * 4}s`,
    animationDuration: `${2 + Math.random() * 2}s`
  }
}

const getCrossParticleStyle = (index: number) => {
  const positions = [
    { left: '12%', top: '20%' }, { left: '25%', top: '30%' }, { left: '40%', top: '15%' },
    { left: '55%', top: '35%' }, { left: '70%', top: '20%' }, { left: '85%', top: '30%' },
    { left: '15%', top: '50%' }, { left: '30%', top: '60%' }, { left: '45%', top: '45%' },
    { left: '60%', top: '65%' }, { left: '75%', top: '50%' }, { left: '20%', top: '80%' },
    { left: '50%', top: '85%' }, { left: '80%', top: '75%' }, { left: '35%', top: '70%' }
  ]
  
  const position = positions[(index - 1) % positions.length]
  return {
    ...position,
    fontSize: `${1 + Math.random() * 0.5}rem`,
    animationDelay: `${Math.random() * 6}s`,
    animationDuration: `${3 + Math.random() * 3}s`
  }
}

const getDNAParticleStyle = (index: number) => {
  const positions = [
    { left: '10%', top: '25%' }, { left: '30%', top: '35%' }, { left: '50%', top: '20%' },
    { left: '70%', top: '40%' }, { left: '90%', top: '25%' }, { left: '20%', top: '55%' },
    { left: '40%', top: '65%' }, { left: '60%', top: '50%' }, { left: '80%', top: '70%' },
    { left: '25%', top: '80%' }, { left: '55%', top: '90%' }, { left: '75%', top: '85%' }
  ]
  
  const position = positions[(index - 1) % positions.length]
  return {
    ...position,
    fontSize: `${1.2 + Math.random() * 0.8}rem`,
    animationDelay: `${Math.random() * 5}s`,
    animationDuration: `${4 + Math.random() * 2}s`
  }
}

const getMagicMeteorStyle = (index: number) => {
  const startPositions = [
    { left: '-5%', top: '20%' },
    { left: '-5%', top: '45%' },
    { left: '-5%', top: '70%' },
    { left: '-5%', top: '30%' }
  ]
  
  const position = startPositions[(index - 1) % startPositions.length]
  return {
    ...position,
    animationDelay: `${index * 4 + Math.random() * 2}s`,
    animationDuration: `${7 + Math.random() * 3}s`
  }
}

const getMagicRippleStyle = (index: number) => {
  const positions = [
    { left: '25%', top: '25%', width: '90px', height: '90px' },
    { left: '65%', top: '15%', width: '70px', height: '70px' },
    { left: '20%', top: '65%', width: '100px', height: '100px' },
    { left: '75%', top: '55%', width: '80px', height: '80px' },
    { left: '45%', top: '20%', width: '60px', height: '60px' },
    { left: '55%', top: '75%', width: '95px', height: '95px' }
  ]
  
  const position = positions[(index - 1) % positions.length]
  return {
    ...position,
    animationDelay: `${index * 2.5}s`,
    animationDuration: `${7 + Math.random() * 3}s`
  }
}

const showNotification = () => {
  showNotificationModal.value = true
}

const hideNotification = () => {
  showNotificationModal.value = false
}

// Lifecycle
onMounted(() => {
  // 頁面初始化動畫
  document.body.style.overflow = 'auto'
})
</script>

<style scoped>
/* 響應式優化 */
@media (max-width: 768px) {
  .animate-glow,
  .animate-gradient-shift,
  .animate-meteor-shower,
  .animate-cosmic-glow {
    animation: none;
  }
}
</style>