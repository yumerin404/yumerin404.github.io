<template>
  <section class="relative z-10 min-h-screen flex items-center justify-center px-4 py-20">
    <!-- 前景星空粒子 -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div 
        v-for="i in 30" 
        :key="`hero-star-${i}`"
        class="absolute w-1 h-1 bg-violet-200/40 rounded-full animate-stellar-pulse"
        :style="getHeroStarStyle(i)"
      ></div>
    </div>

    <div class="container mx-auto text-center relative z-10">
      <!-- 宇宙頭像 -->
      <div class="mb-16 animate-scale-in">
        <div class="relative inline-block group">
          <!-- 多層光環 -->
          <div class="absolute -inset-8 bg-gradient-to-r from-violet-500/30 via-purple-500/20 to-cyan-500/30 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 animate-cosmic-glow"></div>
          <div class="absolute -inset-6 bg-gradient-to-r from-cyan-500/20 to-violet-500/20 rounded-full blur-xl opacity-60 group-hover:opacity-100 transition-all duration-500"></div>
          
          <!-- 旋轉軌道環 -->
          <div class="absolute -inset-4 border border-violet-300/20 rounded-full animate-spin-slow"></div>
          <div class="absolute -inset-2 border border-cyan-300/15 rounded-full animate-spin-reverse"></div>
          
          <!-- 頭像容器 -->
          <div class="relative w-40 h-40 mx-auto">
            <img 
              src="/images/avatar.png" 
              alt="夢鈴領域" 
              class="w-full h-full object-cover rounded-full shadow-2xl border-2 border-violet-500/40 group-hover:border-violet-400/80 group-hover:shadow-violet-500/30 transition-all duration-500 group-hover:scale-105"
            />
            
            <!-- 多重脈衝環 -->
            <div class="absolute inset-0 rounded-full border-2 border-violet-400/30 animate-ping opacity-30"></div>
            <div class="absolute inset-2 rounded-full border border-cyan-400/20 animate-ping opacity-20" style="animation-delay: 1s"></div>
            
            <!-- 浮動光點 -->
            <div 
              v-for="i in 6" 
              :key="`orbital-${i}`"
              class="absolute w-1 h-1 bg-violet-400/80 rounded-full animate-cosmic-glow"
              :style="getOrbitalStyle(i)"
            ></div>
          </div>
        </div>
      </div>
      
      <!-- 宇宙標題 -->
      <div class="mb-8 sm:mb-12 animate-fade-in-up delay-200">
        <h1 class="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-4 sm:mb-6 tracking-wider">
          <span class="inline-block text-gradient animate-gradient-shift animate-cosmic-text">
            夢鈴領域
          </span>
        </h1>
        
        <!-- 副標題 -->
        <div class="max-w-4xl mx-auto space-y-3 sm:space-y-4">
          <p class="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-200 leading-relaxed animate-fade-in-up delay-300 px-4 sm:px-0">
            不斷的學習，不斷的進步，不斷的追求中庸之道。
          </p>
          <p class="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 animate-fade-in-up delay-400 px-4 sm:px-0">
            紀錄下我的創作與學習歷程。
          </p>
        </div>
      </div>
      
      <!-- 宇宙CTA按鈕 -->
      <div class="animate-fade-in-up delay-600">
        <a
          href="https://www.threads.com/@yumerin.main.i"
          target="_blank"
          rel="noopener noreferrer"
          class="group relative inline-flex items-center bg-slate-900/80 backdrop-blur-md border border-slate-700/60 text-sm sm:text-base lg:text-lg px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-2xl font-semibold text-white overflow-hidden transition-all duration-500 hover:border-violet-500/60 hover:shadow-2xl hover:shadow-violet-500/20 hover:-translate-y-1"
        >
          <!-- 多層背景效果 -->
          <div class="absolute inset-0 bg-gradient-to-r from-violet-500/0 via-purple-500/0 to-cyan-500/0 group-hover:from-violet-500/20 group-hover:via-purple-500/20 group-hover:to-cyan-500/20 transition-all duration-500"></div>
          <div class="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
          
          <!-- 按鈕粒子效果 -->
          <div class="absolute inset-0 pointer-events-none overflow-hidden">
            <div 
              v-for="i in 4" 
              :key="`cta-particle-${i}`"
              class="absolute w-1 h-1 bg-violet-400/60 rounded-full opacity-0 group-hover:opacity-100 animate-button-particle"
              :style="getCtaParticleStyle(i)"
            ></div>
          </div>
          
          <!-- 按鈕內容 -->
          <div class="relative z-10 flex items-center">
            <Icon name="simple-icons:threads" class="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 mr-2 sm:mr-3 lg:mr-4 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300 text-violet-400" />
            <span class="group-hover:text-gradient transition-all duration-300 whitespace-nowrap">
              <span class="sm:hidden">與我連結</span>
              <span class="hidden sm:inline">在 Threads 上與我連結</span>
            </span>
            <Icon name="heroicons:arrow-top-right-on-square" class="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 ml-2 sm:ml-3 lg:ml-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 text-cyan-400" />
          </div>
          
          <!-- 邊框光效 -->
          <div class="absolute -inset-0.5 bg-gradient-to-r from-violet-500/0 via-purple-500/0 to-cyan-500/0 group-hover:from-violet-500/40 group-hover:via-purple-500/40 group-hover:to-cyan-500/40 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10"></div>
          
          <!-- 點擊漣漪效果 -->
          <div class="absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-active:opacity-100 group-active:animate-ping transition-opacity duration-100"></div>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// 生成Hero區域星點樣式
const getHeroStarStyle = (index: number) => {
  return {
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 4}s`,
    animationDuration: `${3 + Math.random() * 2}s`
  }
}

// 生成軌道光點樣式
const getOrbitalStyle = (index: number) => {
  const radius = 90 // 軌道半徑
  const angle = (index * 60) // 每60度一個光點
  const x = radius * Math.cos(angle * Math.PI / 180)
  const y = radius * Math.sin(angle * Math.PI / 180)
  
  return {
    left: `calc(50% + ${x}px)`,
    top: `calc(50% + ${y}px)`,
    animationDelay: `${index * 0.5}s`,
    animationDuration: `${4 + Math.random()}s`
  }
}

// 生成CTA按鈕粒子樣式
const getCtaParticleStyle = (index: number) => {
  const positions = [
    { left: '20%', top: '30%' },
    { left: '80%', top: '30%' },
    { left: '30%', top: '70%' },
    { left: '70%', top: '70%' }
  ]
  
  const position = positions[(index - 1) % positions.length]
  return {
    ...position,
    animationDelay: `${Math.random() * 2}s`,
    animationDuration: `${1.5 + Math.random()}s`
  }
}
</script>