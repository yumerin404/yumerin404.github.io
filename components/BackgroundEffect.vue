<template>
  <div class="fixed inset-0 pointer-events-none overflow-hidden">
    <!-- 深太空基底 -->
    <div class="absolute inset-0 bg-gradient-radial from-slate-900 via-gray-950 to-black"></div>
    
    <!-- 星雲漸層 -->
    <div class="absolute inset-0 bg-gradient-to-br from-violet-900/10 via-transparent via-purple-900/5 to-cyan-900/10"></div>
    
    <!-- 深層星點 - 小星星 -->
    <div class="absolute inset-0">
      <div 
        v-for="i in 150" 
        :key="`star-${i}`"
        class="absolute rounded-full animate-pulse"
        :class="getStarClass(i)"
        :style="getStarStyle(i)"
      ></div>
    </div>
    
    <!-- 中層粒子 - 彩色星點 -->
    <div class="absolute inset-0">
      <div 
        v-for="i in 40" 
        :key="`colored-star-${i}`"
        class="absolute rounded-full animate-glow"
        :class="getColoredStarClass(i)"
        :style="getColoredStarStyle(i)"
      ></div>
    </div>
    
    <!-- 流星雨效果 -->
    <div class="absolute inset-0">
      <div 
        v-for="i in 8" 
        :key="`meteor-${i}`"
        class="absolute w-1 h-0.5 bg-gradient-to-r from-transparent via-white/80 to-transparent rounded-full animate-meteor-shower"
        :style="getMeteorStyle(i)"
      ></div>
    </div>
    
    <!-- 星雲光暈 - 多層次 -->
    <div class="absolute top-1/6 left-1/5 w-[800px] h-[600px] bg-violet-500/3 rounded-full blur-3xl animate-pulse" :style="{ animationDelay: '0s' }"></div>
    <div class="absolute bottom-1/4 right-1/6 w-[600px] h-[500px] bg-cyan-500/4 rounded-full blur-3xl animate-pulse" :style="{ animationDelay: '2s' }"></div>
    <div class="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-purple-500/2 rounded-full blur-3xl animate-pulse" :style="{ animationDelay: '4s' }"></div>
    
    <!-- 深度遠景星雲 -->
    <div class="absolute inset-0 opacity-30">
      <div class="absolute top-0 left-0 w-full h-full bg-gradient-radial from-transparent via-violet-500/1 to-transparent"></div>
      <div class="absolute top-0 right-0 w-full h-full bg-gradient-radial from-transparent via-cyan-500/1 to-transparent"></div>
    </div>
    
    <!-- 前景光效 -->
    <div class="absolute inset-0">
      <div 
        v-for="i in 6" 
        :key="`glow-${i}`"
        class="absolute rounded-full animate-cosmic-glow"
        :class="getGlowClass(i)"
        :style="getGlowStyle(i)"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 生成深層星點樣式
const getStarClass = (index: number) => {
  const sizes = ['w-0.5 h-0.5', 'w-1 h-1', 'w-px h-px']
  const colors = ['bg-white/40', 'bg-violet-200/30', 'bg-cyan-200/30', 'bg-white/60']
  return `${sizes[index % sizes.length]} ${colors[index % colors.length]}`
}

const getStarStyle = (index: number) => {
  return {
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 5}s`,
    animationDuration: `${3 + Math.random() * 4}s`
  }
}

// 生成彩色星點樣式
const getColoredStarClass = (index: number) => {
  const sizes = ['w-1 h-1', 'w-1.5 h-1.5', 'w-2 h-2']
  const colors = ['bg-violet-400/50', 'bg-cyan-400/50', 'bg-purple-400/50', 'bg-pink-400/40']
  return `${sizes[index % sizes.length]} ${colors[index % colors.length]}`
}

const getColoredStarStyle = (index: number) => {
  return {
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 6}s`,
    animationDuration: `${4 + Math.random() * 3}s`
  }
}

// 生成流星樣式
const getMeteorStyle = (index: number) => {
  return {
    left: `${-10 + Math.random() * 20}%`,
    top: `${Math.random() * 80}%`,
    animationDelay: `${Math.random() * 10}s`,
    animationDuration: `${3 + Math.random() * 4}s`,
    transform: `rotate(${25 + Math.random() * 10}deg)`
  }
}

// 生成光暈效果
const getGlowClass = (index: number) => {
  const sizes = ['w-4 h-4', 'w-6 h-6', 'w-8 h-8']
  const colors = ['bg-violet-400/10', 'bg-cyan-400/10', 'bg-purple-400/10']
  return `${sizes[index % sizes.length]} ${colors[index % colors.length]} blur-sm`
}

const getGlowStyle = (index: number) => {
  return {
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 8}s`,
    animationDuration: `${6 + Math.random() * 4}s`
  }
}
</script>