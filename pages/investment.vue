<template>
  <div class="min-h-screen relative overflow-hidden">
    <!-- 魔法背景效果 -->
    <div class="fixed inset-0 z-0">
      <!-- 深邃宇宙背景 -->
      <div class="absolute inset-0 bg-gradient-to-br from-slate-950 via-amber-950/30 to-slate-900"></div>
      
      <!-- 投資主題魔法粒子層 -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <!-- 金幣粒子 -->
        <div 
          v-for="i in 15" 
          :key="`coin-particle-${i}`"
          class="absolute text-amber-400/30 animate-pulse"
          :style="getCoinParticleStyle(i)"
        >●</div>
        
        <!-- 圖表符號粒子 -->
        <div 
          v-for="i in 12" 
          :key="`chart-particle-${i}`"
          class="absolute text-green-400/25 animate-stellar-pulse"
          :style="getChartParticleStyle(i)"
        >{{ getRandomChartSymbol() }}</div>
        
        <!-- 貨幣符號粒子 -->
        <div 
          v-for="i in 18" 
          :key="`currency-particle-${i}`"
          class="absolute text-yellow-400/20 animate-pulse"
          :style="getCurrencyParticleStyle(i)"
        >{{ getRandomCurrencySymbol() }}</div>
        
        <!-- 魔法流星 -->
        <div 
          v-for="i in 4" 
          :key="`magic-meteor-${i}`"
          class="absolute w-2 h-0.5 bg-gradient-to-r from-transparent via-amber-400/70 to-transparent rounded-full animate-meteor-shower"
          :style="getMagicMeteorStyle(i)"
        ></div>
        
        <!-- 魔法能量波紋 -->
        <div 
          v-for="i in 6" 
          :key="`magic-ripple-${i}`"
          class="absolute rounded-full border border-amber-400/10 animate-cosmic-glow"
          :style="getMagicRippleStyle(i)"
        ></div>
      </div>
      
      <!-- 魔法漸層覆蓋 -->
      <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-amber-950/20"></div>
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
            <div class="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent animate-glow"></div>
            <div class="mx-6 w-3 h-3 border-2 border-amber-400 rounded-full animate-pulse relative">
              <div class="absolute top-1 left-1 w-1 h-1 bg-amber-300 rounded-full animate-ping"></div>
            </div>
            <div class="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent animate-glow"></div>
          </div>

          <!-- 主標題 -->
          <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 animate-cosmic-text">
            <span class="bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
              經濟與投資想法
            </span>
          </h1>
          
          <!-- 副標題 -->
          <p class="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed animate-fade-in-up delay-200">
            探索財富增長的智慧，分享投資理念與經濟觀察
          </p>

          <!-- 建設中卡片 -->
          <div class="card-primary p-12 mx-auto max-w-2xl animate-scale-in delay-300">
            <!-- 中心圖示 -->
            <div class="relative mb-8 flex justify-center">
              <div class="relative">
                <!-- 主圖示 -->
                <div class="w-24 h-24 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center animate-icon-hover-glow">
                  <Icon name="heroicons:chart-bar-square" class="w-12 h-12 text-white" />
                </div>
                
                <!-- 軌道環 -->
                <div class="absolute inset-0 rounded-full border border-amber-400/30 animate-spin-slow"></div>
                <div class="absolute inset-2 rounded-full border border-yellow-400/20 animate-spin-reverse"></div>
                
                <!-- 財經符號軌道粒子 -->
                <div class="absolute top-0 left-1/2 w-4 h-4 text-amber-400 animate-orbit-glow transform -translate-x-1/2">$</div>
                <div class="absolute bottom-0 left-1/2 w-4 h-4 text-green-400 animate-orbit-glow transform -translate-x-1/2" style="animation-delay: 1.25s">↗</div>
                <div class="absolute left-0 top-1/2 w-4 h-4 text-yellow-400 animate-orbit-glow transform -translate-y-1/2" style="animation-delay: 2.5s">€</div>
                <div class="absolute right-0 top-1/2 w-4 h-4 text-orange-400 animate-orbit-glow transform -translate-y-1/2" style="animation-delay: 3.75s">₿</div>
              </div>
            </div>

            <!-- 建設中標題 -->
            <h2 class="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              正在建設中
            </h2>

            <!-- 描述文字 -->
            <div class="space-y-4 text-lg text-gray-300 mb-8">
              <p class="leading-relaxed">
                我正在為您準備一個深入的投資理財分享空間，這裡將會有：
              </p>
              
              <div class="text-left max-w-md mx-auto space-y-3">
                <div class="flex items-center space-x-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <Icon name="heroicons:chart-bar" class="w-5 h-5 text-amber-400" />
                  <span>投資策略分析與市場觀察</span>
                </div>
                <div class="flex items-center space-x-3 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                  <Icon name="heroicons:banknotes" class="w-5 h-5 text-yellow-400" />
                  <span>理財規劃與風險管理心得</span>
                </div>
                <div class="flex items-center space-x-3 p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                  <Icon name="heroicons:academic-cap" class="w-5 h-5 text-orange-400" />
                  <span>經濟趨勢解讀與學習資源</span>
                </div>
                <div class="flex items-center space-x-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                  <Icon name="heroicons:light-bulb" class="w-5 h-5 text-green-400" />
                  <span>投資工具評測與實戰心得</span>
                </div>
              </div>
            </div>

            <!-- 風險警告 -->
            <div class="mb-8 p-6 rounded-xl bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20">
              <h3 class="text-lg font-semibold text-red-400 mb-2 flex items-center justify-center">
                <Icon name="heroicons:exclamation-triangle" class="w-5 h-5 mr-2" />
                投資風險警告
              </h3>
              <p class="text-gray-300 text-sm leading-relaxed">
                投資有風險，所有內容僅供參考學習，不構成投資建議。請理性投資，量力而為。
              </p>
            </div>

            <!-- 預計完成時間 -->
            <div class="mb-8 p-6 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20">
              <h3 class="text-lg font-semibold text-amber-400 mb-2 flex items-center justify-center">
                <Icon name="heroicons:clock" class="w-5 h-5 mr-2" />
                預計完成時間
              </h3>
              <p class="text-gray-300">2025年9月 - 投資中的智慧組合</p>
            </div>

            <!-- 行動按鈕 -->
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <NuxtLink
                to="/"
                class="group btn-primary px-8 py-4 rounded-xl text-lg font-semibold inline-flex items-center justify-center overflow-hidden relative"
              >
                <div class="absolute inset-0 bg-gradient-to-r from-amber-600/80 to-orange-600/80 rounded-xl animate-glow"></div>
                <Icon name="heroicons:home" class="w-6 h-6 mr-3 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                <span class="relative z-10">回到首頁</span>
                <!-- 按鈕魔法粒子 -->
                <div class="absolute top-2 right-2 w-1 h-1 bg-white/80 rounded-full animate-ping"></div>
              </NuxtLink>
              
              <button
                @click="showNotification"
                class="group btn-secondary px-8 py-4 rounded-xl text-lg font-medium inline-flex items-center justify-center overflow-hidden relative"
              >
                <div class="absolute inset-0 bg-gradient-to-r from-amber-500/0 to-orange-500/0 group-hover:from-amber-500/20 group-hover:to-orange-500/20 rounded-xl transition-all duration-300"></div>
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
          <h2 class="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent animate-fade-in-up">
            即將到來的精彩內容
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <!-- 預告卡片 1 -->
            <div class="card-primary p-6 text-center group animate-fade-in-up delay-100">
              <div class="w-16 h-16 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Icon name="heroicons:chart-bar" class="w-8 h-8 text-white" />
              </div>
              <h3 class="text-xl font-bold text-amber-400 mb-3">投資策略</h3>
              <p class="text-gray-300 text-sm leading-relaxed">深度分析各種投資策略、市場趨勢與資產配置原理</p>
            </div>

            <!-- 預告卡片 2 -->
            <div class="card-primary p-6 text-center group animate-fade-in-up delay-200">
              <div class="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Icon name="heroicons:banknotes" class="w-8 h-8 text-white" />
              </div>
              <h3 class="text-xl font-bold text-yellow-400 mb-3">理財規劃</h3>
              <p class="text-gray-300 text-sm leading-relaxed">個人財務管理、風險控制與長期理財規劃心得分享</p>
            </div>

            <!-- 預告卡片 3 -->
            <div class="card-primary p-6 text-center group animate-fade-in-up delay-300">
              <div class="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Icon name="heroicons:globe-alt" class="w-8 h-8 text-white" />
              </div>
              <h3 class="text-xl font-bold text-orange-400 mb-3">經濟觀察</h3>
              <p class="text-gray-300 text-sm leading-relaxed">全球經濟動態、政策影響分析與投資機會探討</p>
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
      <div class="relative max-w-md w-full bg-slate-900/95 border border-amber-500/30 rounded-2xl p-8 animate-scale-in">
        <!-- 關閉按鈕 -->
        <button
          @click="hideNotification"
          class="absolute top-4 right-4 w-8 h-8 bg-slate-800/80 text-gray-400 rounded-full hover:bg-slate-700/80 hover:text-white transition-colors duration-300 flex items-center justify-center"
        >
          <Icon name="heroicons:x-mark" class="w-5 h-5" />
        </button>
        
        <!-- 內容 -->
        <div class="text-center">
          <div class="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="heroicons:chart-bar-square" class="w-8 h-8 text-white" />
          </div>
          <h3 class="text-2xl font-bold text-amber-400 mb-4">感謝您的關注！</h3>
          <p class="text-gray-300 mb-6 leading-relaxed">
            我會在投資理財專區準備好時通知您。讓我們一起學習投資智慧，追求財務自由與穩健成長！
          </p>
          <div class="flex items-center justify-center space-x-2 text-amber-400">
            <span class="text-lg">$</span>
            <span class="text-sm">財富智慧</span>
            <span class="text-lg">↗</span>
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
              class="w-full h-full object-cover rounded-full border border-amber-500/30 group-hover:border-amber-400/60 transition-all duration-300"
            />
            <div class="absolute inset-0 rounded-full bg-amber-400/20 opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-300"></div>
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
  title: '經濟與投資想法 - 夢鈴領域',
  meta: [
    {
      name: 'description',
      content: '探索財富增長的智慧，分享投資策略、理財規劃與經濟觀察心得。'
    },
    {
      property: 'og:title',
      content: '經濟與投資想法 - 夢鈴領域'
    },
    {
      property: 'og:description',
      content: '即將為您帶來深入的投資理財內容，包含投資策略、理財規劃與經濟觀察。'
    }
  ]
})

// Reactive Data
const showNotificationModal = ref(false)

// Financial symbols pool for particles
const chartSymbols = ['↗', '↘', '→', '↖', '↙', '▲', '▼', '●', '○', '■', '□', '◆']
const currencySymbols = ['$', '€', '£', '¥', '₿', '₹', '₽', '₩', '₪', '₫', '₦', '₡', '₴', '₸', '₵', '₲', '₱', '₳']

// Methods
const getRandomChartSymbol = () => {
  return chartSymbols[Math.floor(Math.random() * chartSymbols.length)]
}

const getRandomCurrencySymbol = () => {
  return currencySymbols[Math.floor(Math.random() * currencySymbols.length)]
}

const getCoinParticleStyle = (index: number) => {
  const positions = [
    { left: '10%', top: '20%' }, { left: '25%', top: '15%' }, { left: '40%', top: '25%' },
    { left: '55%', top: '12%' }, { left: '70%', top: '22%' }, { left: '85%', top: '18%' },
    { left: '15%', top: '50%' }, { left: '30%', top: '45%' }, { left: '50%', top: '55%' },
    { left: '65%', top: '48%' }, { left: '80%', top: '52%' }, { left: '20%', top: '80%' },
    { left: '45%', top: '85%' }, { left: '70%', top: '78%' }, { left: '90%', top: '82%' }
  ]
  
  const position = positions[(index - 1) % positions.length]
  return {
    ...position,
    fontSize: `${1.5 + Math.random() * 1}rem`,
    animationDelay: `${Math.random() * 4}s`,
    animationDuration: `${2 + Math.random() * 2}s`,
    color: `hsl(${45 + Math.random() * 30}, 70%, ${60 + Math.random() * 20}%)`
  }
}

const getChartParticleStyle = (index: number) => {
  const positions = [
    { left: '12%', top: '25%' }, { left: '28%', top: '35%' }, { left: '42%', top: '20%' },
    { left: '58%', top: '40%' }, { left: '72%', top: '25%' }, { left: '88%', top: '35%' },
    { left: '18%', top: '55%' }, { left: '35%', top: '65%' }, { left: '52%', top: '50%' },
    { left: '68%', top: '70%' }, { left: '85%', top: '60%' }, { left: '22%', top: '85%' }
  ]
  
  const position = positions[(index - 1) % positions.length]
  return {
    ...position,
    fontSize: `${1 + Math.random() * 0.5}rem`,
    animationDelay: `${Math.random() * 6}s`,
    animationDuration: `${3 + Math.random() * 3}s`
  }
}

const getCurrencyParticleStyle = (index: number) => {
  const positions = [
    { left: '8%', top: '18%' }, { left: '22%', top: '28%' }, { left: '38%', top: '15%' },
    { left: '52%', top: '32%' }, { left: '68%', top: '20%' }, { left: '82%', top: '28%' },
    { left: '95%', top: '15%' }, { left: '12%', top: '48%' }, { left: '28%', top: '58%' },
    { left: '45%', top: '42%' }, { left: '62%', top: '62%' }, { left: '78%', top: '48%' },
    { left: '92%', top: '58%' }, { left: '18%', top: '78%' }, { left: '35%', top: '88%' },
    { left: '55%', top: '72%' }, { left: '72%', top: '88%' }, { left: '88%', top: '78%' }
  ]
  
  const position = positions[(index - 1) % positions.length]
  return {
    ...position,
    fontSize: `${0.8 + Math.random() * 0.6}rem`,
    animationDelay: `${Math.random() * 5}s`,
    animationDuration: `${2.5 + Math.random() * 2.5}s`
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