<template>
  <div class="min-h-screen relative overflow-hidden">
    <!-- 魔法背景效果 -->
    <div class="fixed inset-0 z-0">
      <!-- 深邃宇宙背景 -->
      <div class="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950/30 to-slate-900"></div>
      
      <!-- AI 主題魔法粒子層 -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <!-- 神經網路節點粒子 -->
        <div 
          v-for="i in 18" 
          :key="`neural-node-${i}`"
          class="absolute w-2 h-2 bg-gradient-to-r from-indigo-400/40 to-purple-400/40 rounded-full animate-pulse"
          :style="getNeuralNodeStyle(i)"
        ></div>
        
        <!-- 連接線粒子 -->
        <div 
          v-for="i in 12" 
          :key="`connection-line-${i}`"
          class="absolute h-0.5 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent animate-stellar-pulse"
          :style="getConnectionLineStyle(i)"
        ></div>
        
        <!-- 數據流粒子 -->
        <div 
          v-for="i in 15" 
          :key="`data-particle-${i}`"
          class="absolute text-indigo-400/30 font-mono text-xs animate-pulse"
          :style="getDataParticleStyle(i)"
        >{{ getRandomDataSymbol() }}</div>
        
        <!-- 魔法流星 -->
        <div 
          v-for="i in 4" 
          :key="`magic-meteor-${i}`"
          class="absolute w-2 h-0.5 bg-gradient-to-r from-transparent via-indigo-400/70 to-transparent rounded-full animate-meteor-shower"
          :style="getMagicMeteorStyle(i)"
        ></div>
        
        <!-- 魔法能量波紋 -->
        <div 
          v-for="i in 6" 
          :key="`magic-ripple-${i}`"
          class="absolute rounded-full border border-indigo-400/10 animate-cosmic-glow"
          :style="getMagicRippleStyle(i)"
        ></div>
      </div>
      
      <!-- 魔法漸層覆蓋 -->
      <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-indigo-950/20"></div>
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
            <div class="w-24 h-0.5 bg-gradient-to-r from-transparent via-indigo-400 to-transparent animate-glow"></div>
            <div class="mx-6 w-3 h-3 border-2 border-indigo-400 rounded-full animate-pulse relative">
              <div class="absolute top-1 left-1 w-1 h-1 bg-indigo-300 rounded-full animate-ping"></div>
            </div>
            <div class="w-24 h-0.5 bg-gradient-to-r from-transparent via-indigo-400 to-transparent animate-glow"></div>
          </div>

          <!-- 主標題 -->
          <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 animate-cosmic-text">
            <span class="bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              AI 技巧與心得
            </span>
          </h1>
          
          <!-- 副標題 -->
          <p class="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed animate-fade-in-up delay-200">
            探索人工智慧的奇妙世界，分享 AI 應用與深度學習心得
          </p>

          <!-- 建設中卡片 -->
          <div class="card-primary p-12 mx-auto max-w-2xl animate-scale-in delay-300">
            <!-- 中心圖示 -->
            <div class="relative mb-8 flex justify-center">
              <div class="relative">
                <!-- 主圖示 -->
                <div class="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center animate-icon-hover-glow">
                  <Icon name="heroicons:cpu-chip" class="w-12 h-12 text-white" />
                </div>
                
                <!-- 軌道環 -->
                <div class="absolute inset-0 rounded-full border border-indigo-400/30 animate-spin-slow"></div>
                <div class="absolute inset-2 rounded-full border border-purple-400/20 animate-spin-reverse"></div>
                
                <!-- AI 符號軌道粒子 -->
                <div class="absolute top-0 left-1/2 w-3 h-3 text-indigo-400 text-xs font-mono animate-orbit-glow transform -translate-x-1/2">AI</div>
                <div class="absolute bottom-0 left-1/2 w-3 h-3 text-purple-400 text-xs font-mono animate-orbit-glow transform -translate-x-1/2" style="animation-delay: 1.25s">ML</div>
                <div class="absolute left-0 top-1/2 w-3 h-3 text-blue-400 text-xs font-mono animate-orbit-glow transform -translate-y-1/2" style="animation-delay: 2.5s">NN</div>
                <div class="absolute right-0 top-1/2 w-3 h-3 text-indigo-400 text-xs font-mono animate-orbit-glow transform -translate-y-1/2" style="animation-delay: 3.75s">DL</div>
              </div>
            </div>

            <!-- 建設中標題 -->
            <h2 class="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              正在建設中
            </h2>

            <!-- 描述文字 -->
            <div class="space-y-4 text-lg text-gray-300 mb-8">
              <p class="leading-relaxed">
                我正在為您準備一個深入的 AI 技術分享平台，這裡將會有：
              </p>
              
              <div class="text-left max-w-md mx-auto space-y-3">
                <div class="flex items-center space-x-3 p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                  <Icon name="heroicons:sparkles" class="w-5 h-5 text-indigo-400" />
                  <span>AI 工具使用技巧與評測</span>
                </div>
                <div class="flex items-center space-x-3 p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  <Icon name="heroicons:academic-cap" class="w-5 h-5 text-purple-400" />
                  <span>機器學習與深度學習心得</span>
                </div>
                <div class="flex items-center space-x-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <Icon name="heroicons:chart-bar-square" class="w-5 h-5 text-blue-400" />
                  <span>AI 專案實戰經驗分享</span>
                </div>
                <div class="flex items-center space-x-3 p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                  <Icon name="heroicons:eye" class="w-5 h-5 text-cyan-400" />
                  <span>AI 趨勢觀察與未來展望</span>
                </div>
              </div>
            </div>

            <!-- 預計完成時間 -->
            <div class="mb-8 p-6 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20">
              <h3 class="text-lg font-semibold text-indigo-400 mb-2 flex items-center justify-center">
                <Icon name="heroicons:clock" class="w-5 h-5 mr-2" />
                預計完成時間
              </h3>
              <p class="text-gray-300">2025年8月 - 訓練中的智慧模型</p>
            </div>

            <!-- 行動按鈕 -->
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <NuxtLink
                to="/"
                class="group btn-primary px-8 py-4 rounded-xl text-lg font-semibold inline-flex items-center justify-center overflow-hidden relative"
              >
                <div class="absolute inset-0 bg-gradient-to-r from-indigo-600/80 to-purple-600/80 rounded-xl animate-glow"></div>
                <Icon name="heroicons:home" class="w-6 h-6 mr-3 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                <span class="relative z-10">回到首頁</span>
                <!-- 按鈕魔法粒子 -->
                <div class="absolute top-2 right-2 w-1 h-1 bg-white/80 rounded-full animate-ping"></div>
              </NuxtLink>
              
              <button
                @click="showNotification"
                class="group btn-secondary px-8 py-4 rounded-xl text-lg font-medium inline-flex items-center justify-center overflow-hidden relative"
              >
                <div class="absolute inset-0 bg-gradient-to-r from-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/20 group-hover:to-purple-500/20 rounded-xl transition-all duration-300"></div>
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
          <h2 class="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent animate-fade-in-up">
            即將到來的精彩內容
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <!-- 預告卡片 1 -->
            <div class="card-primary p-6 text-center group animate-fade-in-up delay-100">
              <div class="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Icon name="heroicons:sparkles" class="w-8 h-8 text-white" />
              </div>
              <h3 class="text-xl font-bold text-indigo-400 mb-3">AI 工具箱</h3>
              <p class="text-gray-300 text-sm leading-relaxed">精選實用 AI 工具，從文字生成到圖像處理的完整工具推薦</p>
            </div>

            <!-- 預告卡片 2 -->
            <div class="card-primary p-6 text-center group animate-fade-in-up delay-200">
              <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Icon name="heroicons:academic-cap" class="w-8 h-8 text-white" />
              </div>
              <h3 class="text-xl font-bold text-purple-400 mb-3">深度學習</h3>
              <p class="text-gray-300 text-sm leading-relaxed">機器學習算法解析、模型訓練技巧與實戰經驗分享</p>
            </div>

            <!-- 預告卡片 3 -->
            <div class="card-primary p-6 text-center group animate-fade-in-up delay-300">
              <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Icon name="heroicons:eye" class="w-8 h-8 text-white" />
              </div>
              <h3 class="text-xl font-bold text-blue-400 mb-3">未來展望</h3>
              <p class="text-gray-300 text-sm leading-relaxed">AI 技術趨勢分析、產業應用案例與未來發展預測</p>
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
      <div class="relative max-w-md w-full bg-slate-900/95 border border-indigo-500/30 rounded-2xl p-8 animate-scale-in">
        <!-- 關閉按鈕 -->
        <button
          @click="hideNotification"
          class="absolute top-4 right-4 w-8 h-8 bg-slate-800/80 text-gray-400 rounded-full hover:bg-slate-700/80 hover:text-white transition-colors duration-300 flex items-center justify-center"
        >
          <Icon name="heroicons:x-mark" class="w-5 h-5" />
        </button>
        
        <!-- 內容 -->
        <div class="text-center">
          <div class="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="heroicons:cpu-chip" class="w-8 h-8 text-white" />
          </div>
          <h3 class="text-2xl font-bold text-indigo-400 mb-4">感謝您的關注！</h3>
          <p class="text-gray-300 mb-6 leading-relaxed">
            我會在 AI 技術專區準備好時通知您。讓我們一起探索人工智慧的無限可能，用智慧創造更美好的未來！
          </p>
          <div class="flex items-center justify-center space-x-2 text-indigo-400 font-mono">
            <span class="text-lg">∧</span>
            <span class="text-sm">AI Magic</span>
            <span class="text-lg">∨</span>
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
              class="w-full h-full object-cover rounded-full border border-indigo-500/30 group-hover:border-indigo-400/60 transition-all duration-300"
            />
            <div class="absolute inset-0 rounded-full bg-indigo-400/20 opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-300"></div>
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
  title: 'AI 技巧與心得 - 夢鈴領域',
  meta: [
    {
      name: 'description',
      content: '探索人工智慧的奇妙世界，分享 AI 工具使用技巧、機器學習心得與技術趨勢。'
    },
    {
      property: 'og:title',
      content: 'AI 技巧與心得 - 夢鈴領域'
    },
    {
      property: 'og:description',
      content: '即將為您帶來豐富的 AI 技術內容，包含工具推薦、深度學習與未來展望。'
    }
  ]
})

// Reactive Data
const showNotificationModal = ref(false)

// Data symbols pool for particles
const dataSymbols = ['λ', 'Σ', '∞', '∂', '∇', '∫', 'α', 'β', 'γ', 'δ', 'θ', 'π', 'σ', 'φ', 'ψ', 'ω']

// Methods
const getRandomDataSymbol = () => {
  return dataSymbols[Math.floor(Math.random() * dataSymbols.length)]
}

const getNeuralNodeStyle = (index: number) => {
  const positions = [
    { left: '15%', top: '20%' }, { left: '25%', top: '15%' }, { left: '35%', top: '25%' },
    { left: '45%', top: '12%' }, { left: '55%', top: '22%' }, { left: '65%', top: '18%' },
    { left: '75%', top: '28%' }, { left: '85%', top: '15%' }, { left: '20%', top: '45%' },
    { left: '30%', top: '50%' }, { left: '40%', top: '40%' }, { left: '50%', top: '55%' },
    { left: '60%', top: '48%' }, { left: '70%', top: '52%' }, { left: '80%', top: '45%' },
    { left: '25%', top: '75%' }, { left: '45%', top: '80%' }, { left: '65%', top: '78%' }
  ]
  
  const position = positions[(index - 1) % positions.length]
  return {
    ...position,
    animationDelay: `${Math.random() * 5}s`,
    animationDuration: `${3 + Math.random() * 2}s`
  }
}

const getConnectionLineStyle = (index: number) => {
  const connections = [
    { left: '15%', top: '20%', width: '100px', transform: 'rotate(45deg)' },
    { left: '35%', top: '25%', width: '120px', transform: 'rotate(-30deg)' },
    { left: '55%', top: '22%', width: '80px', transform: 'rotate(60deg)' },
    { left: '25%', top: '45%', width: '150px', transform: 'rotate(15deg)' },
    { left: '50%', top: '55%', width: '90px', transform: 'rotate(-45deg)' },
    { left: '70%', top: '52%', width: '110px', transform: 'rotate(30deg)' },
    { left: '20%', top: '75%', width: '200px', transform: 'rotate(-15deg)' },
    { left: '45%', top: '80%', width: '130px', transform: 'rotate(75deg)' },
    { left: '65%', top: '78%', width: '70px', transform: 'rotate(-60deg)' },
    { left: '40%', top: '40%', width: '160px', transform: 'rotate(0deg)' },
    { left: '30%', top: '30%', width: '140px', transform: 'rotate(90deg)' },
    { left: '60%', top: '35%', width: '95px', transform: 'rotate(-75deg)' }
  ]
  
  const connection = connections[(index - 1) % connections.length]
  return {
    ...connection,
    animationDelay: `${Math.random() * 6}s`,
    animationDuration: `${4 + Math.random() * 3}s`
  }
}

const getDataParticleStyle = (index: number) => {
  const positions = [
    { left: '12%', top: '18%' }, { left: '28%', top: '22%' }, { left: '42%', top: '16%' },
    { left: '58%', top: '24%' }, { left: '72%', top: '20%' }, { left: '88%', top: '18%' },
    { left: '18%', top: '48%' }, { left: '32%', top: '52%' }, { left: '48%', top: '44%' },
    { left: '62%', top: '56%' }, { left: '78%', top: '50%' }, { left: '22%', top: '78%' },
    { left: '38%', top: '82%' }, { left: '54%', top: '76%' }, { left: '68%', top: '80%' }
  ]
  
  const position = positions[(index - 1) % positions.length]
  return {
    ...position,
    animationDelay: `${Math.random() * 4}s`,
    animationDuration: `${2 + Math.random() * 2}s`
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