<template>
  <header class="fixed top-0 w-full z-50 backdrop-blur-xl bg-slate-900/60 border-b border-slate-700/20 overflow-hidden">
    <!-- 宇宙背景粒子效果 -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <!-- 漂浮星點 -->
      <div 
        v-for="i in 20" 
        :key="`star-${i}`"
        class="absolute w-0.5 h-0.5 bg-violet-300/40 rounded-full animate-pulse"
        :style="getStarStyle(i)"
      ></div>
      
      <!-- 流星效果 -->
      <div 
        v-for="i in 3" 
        :key="`meteor-${i}`"
        class="absolute w-1 h-0.5 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent rounded-full animate-meteor"
        :style="getMeteorStyle(i)"
      ></div>
      
      <!-- 深空漸層 -->
      <div class="absolute inset-0 bg-gradient-to-r from-violet-500/5 via-transparent to-cyan-500/5"></div>
    </div>

    <div class="container mx-auto px-4 py-2 sm:py-4 relative z-10">
      <nav class="flex items-center justify-between h-12 sm:h-16">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center space-x-1 xs:space-x-2 sm:space-x-4 group min-w-0 flex-shrink-0">
          <div class="relative w-9 h-9 xs:w-10 xs:h-10 sm:w-14 sm:h-14">
            <!-- 軌道環 -->
            <div class="absolute inset-0 rounded-full border border-violet-400/30 group-hover:border-violet-400/60 transition-all duration-500 animate-spin-slow"></div>
            <div class="absolute inset-1 rounded-full border border-cyan-400/20 group-hover:border-cyan-400/40 transition-all duration-500 animate-spin-reverse"></div>
            
            <img 
              src="/images/avatar.png" 
              alt="夢鈴領域" 
              class="relative z-10 w-full h-full object-cover rounded-full shadow-lg group-hover:shadow-violet-500/40 transition-all duration-500 group-hover:scale-110"
            />
            
            <!-- 光暈效果 -->
            <div class="absolute inset-0 rounded-full bg-violet-400/20 opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-300"></div>
          </div>
          
          <!-- 響應式標題 -->
          <div class="hidden xs:block text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-black tracking-wider min-w-0 flex-shrink">
            <span class="inline-block animate-cosmic-text bg-gradient-to-r from-white via-violet-200 via-cyan-200 via-purple-200 to-white bg-clip-text text-transparent animate-gradient-shift">
              <span class="hidden sm:inline">夢鈴領域</span>
            </span>
          </div>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <div class="hidden lg:flex items-center space-x-1">
          <NuxtLink
            v-for="(item, index) in navItems"
            :key="item.path"
            :to="item.path"
            class="relative px-2 xl:px-4 py-2 rounded-lg text-gray-300 hover:text-white transition-all duration-300 group/nav overflow-hidden"
          >
            <!-- 背景效果 -->
            <div class="absolute inset-0 bg-gradient-to-r from-violet-500/0 to-cyan-500/0 group-hover/nav:from-violet-500/20 group-hover/nav:to-cyan-500/20 rounded-lg transition-all duration-300"></div>
            
            <!-- 邊框光效 -->
            <div class="absolute inset-0 rounded-lg border border-transparent group-hover/nav:border-violet-400/30 transition-all duration-300"></div>
            
            <span class="relative z-10 text-xs xl:text-sm font-medium whitespace-nowrap">{{ item.name }}</span>
            
            <!-- 底部光線 -->
            <div class="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-violet-400 to-cyan-400 group-hover/nav:w-full group-hover/nav:left-0 transition-all duration-300"></div>
          </NuxtLink>
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="toggleMobileMenu"
          class="lg:hidden relative p-2 sm:p-3 rounded-lg bg-slate-800/60 text-gray-300 hover:text-white hover:bg-slate-700/60 transition-all duration-300 group overflow-hidden"
        >
          <!-- 按鈕背景效果 -->
          <div class="absolute inset-0 bg-gradient-to-r from-violet-500/0 to-cyan-500/0 group-hover:from-violet-500/20 group-hover:to-cyan-500/20 rounded-lg transition-all duration-300"></div>
          
          <Icon name="heroicons:bars-3" class="relative z-10 w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform duration-300" />
        </button>
      </nav>

      <!-- Mobile Navigation -->
      <div
        v-if="isMobileMenuOpen"
        class="lg:hidden mt-2 sm:mt-4 space-y-1 sm:space-y-2 pb-3 sm:pb-4 border-t border-slate-700/30 pt-3 sm:pt-4 animate-fade-in-up"
      >
        <NuxtLink
          v-for="(item, index) in navItems"
          :key="item.path"
          :to="item.path"
          @click="closeMobileMenu"
          class="relative block px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-gray-300 hover:text-white transition-all duration-300 group/mobile overflow-hidden animate-slide-in-left"
          :style="{ animationDelay: `${index * 50}ms` }"
        >
          <!-- 背景效果 -->
          <div class="absolute inset-0 bg-gradient-to-r from-violet-500/0 to-cyan-500/0 group-hover/mobile:from-violet-500/20 group-hover/mobile:to-cyan-500/20 rounded-lg transition-all duration-300"></div>
          
          <!-- 左側光線 -->
          <div class="absolute left-0 top-1/2 w-0 h-3 sm:h-4 bg-gradient-to-r from-violet-400 to-cyan-400 group-hover/mobile:w-1 -translate-y-1/2 transition-all duration-300"></div>
          
          <span class="relative z-10 text-sm sm:text-base font-medium">{{ item.name }}</span>
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const isMobileMenuOpen = ref(false)

const navItems = [
  { name: '首頁', path: '/' },
  { name: '輕小說', path: '/novels' },
  { name: 'Galgame', path: '/galgame' },
  { name: '程式工具與技術', path: '/programming' },
  { name: 'AI 技巧與心得', path: '/ai' },
  { name: '醫學、藥物、保健品知識', path: '/medical' },
  { name: '經濟與投資想法', path: '/investment' },
  { name: '政治與思想', path: '/politics' },
  { name: '寫作技巧', path: '/writing' },
  { name: '心境與學習筆記', path: '/learning' }
]

// 生成星點位置和動畫 - 使用固定值避免 hydration mismatch
const getStarStyle = (index: number) => {
  const positions = [
    { left: '10%', top: '20%' }, { left: '25%', top: '15%' }, { left: '40%', top: '25%' },
    { left: '60%', top: '10%' }, { left: '75%', top: '20%' }, { left: '90%', top: '15%' },
    { left: '15%', top: '70%' }, { left: '30%', top: '65%' }, { left: '50%', top: '75%' },
    { left: '70%', top: '60%' }, { left: '85%', top: '70%' }, { left: '95%', top: '65%' },
    { left: '5%', top: '45%' }, { left: '20%', top: '50%' }, { left: '35%', top: '40%' },
    { left: '55%', top: '45%' }, { left: '80%', top: '40%' }, { left: '12%', top: '85%' },
    { left: '45%', top: '90%' }, { left: '78%', top: '88%' }
  ]
  
  const delays = [0.5, 1.2, 2.3, 0.8, 1.8, 2.7, 1.1, 0.3, 2.1, 1.5, 0.7, 2.5, 1.9, 0.4, 2.8, 1.3, 0.9, 2.2, 1.6, 0.6]
  const durations = [3.2, 2.8, 3.5, 2.5, 3.8, 2.9, 3.1, 2.7, 3.6, 2.4, 3.3, 2.6, 3.9, 2.3, 3.4, 2.8, 3.7, 2.9, 3.2, 2.5]
  
  const position = positions[(index - 1) % positions.length]
  return {
    ...position,
    animationDelay: `${delays[(index - 1) % delays.length]}s`,
    animationDuration: `${durations[(index - 1) % durations.length]}s`
  }
}

// 生成流星位置和動畫
const getMeteorStyle = (index: number) => {
  const startPositions = [
    { left: '0%', top: '20%' },
    { left: '0%', top: '60%' },
    { left: '0%', top: '40%' }
  ]
  
  const position = startPositions[(index - 1) % startPositions.length]
  return {
    ...position,
    animationDelay: `${index * 2}s`,
    animationDuration: '4s'
  }
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

// Close mobile menu when clicking outside
onMounted(() => {
  document.addEventListener('click', (e) => {
    if (!e.target?.closest('header')) {
      isMobileMenuOpen.value = false
    }
  })
})
</script>

<style scoped>
/* 簡潔的現代化樣式 */
header {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}
</style>