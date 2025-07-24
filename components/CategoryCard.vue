<template>
  <NuxtLink
    :to="to"
    class="group block card-primary p-6 h-full overflow-hidden"
  >
    <!-- 卡片背景效果 -->
    <div class="absolute inset-0 bg-gradient-to-br from-violet-500/0 via-purple-500/0 to-cyan-500/0 group-hover:from-violet-500/10 group-hover:via-purple-500/10 group-hover:to-cyan-500/10 transition-all duration-500"></div>
    
    <!-- 圖片區域 -->
    <div class="relative mb-6 overflow-hidden rounded-xl" v-if="image">
      <div class="aspect-video bg-slate-800/60 border border-slate-700/50 group-hover:border-violet-500/50 transition-all duration-300 overflow-hidden">
        <img 
          :src="image" 
          :alt="title"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <!-- 圖片懸停遮罩 -->
        <div class="absolute inset-0 bg-gradient-to-t from-violet-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
    </div>
    
    <!-- 宇宙風格Icon區域（當沒有圖片時顯示） -->
    <div class="relative mb-6 overflow-hidden rounded-xl" v-else>
      <div class="aspect-video bg-slate-800/60 border border-slate-700/50 group-hover:border-violet-500/50 transition-all duration-500 overflow-hidden relative">
        <!-- 深太空背景漸層 -->
        <div class="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900"></div>
        <div class="absolute inset-0 bg-gradient-to-br from-violet-900/10 via-transparent to-cyan-900/10"></div>
        
        <!-- 背景星點 -->
        <div class="absolute inset-0 overflow-hidden">
          <div 
            v-for="i in 12" 
            :key="`icon-star-${i}`"
            class="absolute w-0.5 h-0.5 bg-violet-300/40 rounded-full animate-pulse"
            :style="getIconStarStyle(i)"
          ></div>
        </div>
        
        <!-- 中央Icon容器 -->
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="group/icon relative">
            <!-- 多重軌道環 -->
            <div class="absolute -inset-8 border border-violet-400/20 rounded-full animate-spin-slow opacity-60"></div>
            <div class="absolute -inset-6 border border-cyan-400/15 rounded-full animate-spin-reverse opacity-40"></div>
            <div class="absolute -inset-4 border border-purple-400/10 rounded-full animate-spin-slow opacity-30" style="animation-duration: 25s"></div>
            
            <!-- Icon背景圓形 -->
            <div class="relative w-20 h-20 bg-slate-800/80 backdrop-blur-sm rounded-full border border-slate-700/60 group-hover:border-violet-500/60 transition-all duration-500 flex items-center justify-center group-hover:scale-110 group-hover:animate-icon-hover-glow">
              <!-- 內部發光 -->
              <div class="absolute inset-0 bg-gradient-to-br from-violet-500/0 to-cyan-500/0 group-hover:from-violet-500/20 group-hover:to-cyan-500/20 rounded-full transition-all duration-500"></div>
              
              <!-- 內層光圈 -->
              <div class="absolute inset-2 border border-violet-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-spin-slow"></div>
              
              <!-- Icon -->
              <Icon 
                :name="icon" 
                class="relative z-10 w-10 h-10 text-violet-400 group-hover:text-violet-300 group-hover:scale-110 transition-all duration-500 drop-shadow-lg" 
              />
              
              <!-- 多重脈衝光環 -->
              <div class="absolute inset-0 bg-violet-400/20 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-300"></div>
              <div class="absolute inset-1 bg-cyan-400/15 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-300" style="animation-delay: 0.2s"></div>
            </div>
            
            <!-- 浮動軌道光點 -->
            <div 
              v-for="i in 4" 
              :key="`orbital-${i}`"
              class="absolute w-1 h-1 bg-violet-400/60 rounded-full animate-orbit-glow shadow-lg shadow-violet-400/50"
              :style="getOrbitalIconStyle(i)"
            ></div>
          </div>
        </div>
        
        <!-- 懸停遮罩效果 -->
        <div class="absolute inset-0 bg-gradient-to-t from-violet-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <!-- 邊框光效 -->
        <div class="absolute -inset-0.5 bg-gradient-to-r from-violet-500/0 via-purple-500/0 to-cyan-500/0 group-hover:from-violet-500/30 group-hover:via-purple-500/30 group-hover:to-cyan-500/30 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10"></div>
      </div>
    </div>
    
    <!-- 內容 -->
    <div class="relative space-y-4">
      <!-- 標題 -->
      <h3 class="text-xl font-bold text-white group-hover:text-gradient transition-all duration-300">
        {{ title }}
      </h3>
      
      <!-- 描述 -->
      <p class="text-gray-400 group-hover:text-gray-300 leading-relaxed transition-colors duration-300">
        {{ description }}
      </p>
      
      <!-- CTA -->
      <div class="flex items-center text-violet-400 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
        <span class="text-sm font-medium mr-2">探索更多</span>
        <Icon name="heroicons:arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
      </div>
    </div>
    
    <!-- 懸停光效 -->
    <div class="absolute -inset-0.5 bg-gradient-to-r from-violet-500/0 via-purple-500/0 to-cyan-500/0 group-hover:from-violet-500/20 group-hover:via-purple-500/20 group-hover:to-cyan-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10"></div>
  </NuxtLink>
</template>

<script setup lang="ts">
interface Props {
  title: string
  description: string
  to: string
  icon: string
  image?: string
}

defineProps<Props>()

// 生成Icon區域背景星點樣式
const getIconStarStyle = (index: number) => {
  const positions = [
    { left: '15%', top: '20%' }, { left: '85%', top: '25%' }, { left: '25%', top: '80%' },
    { left: '75%', top: '75%' }, { left: '10%', top: '60%' }, { left: '90%', top: '45%' },
    { left: '50%', top: '15%' }, { left: '40%', top: '85%' }, { left: '70%', top: '35%' },
    { left: '30%', top: '55%' }, { left: '60%', top: '70%' }, { left: '20%', top: '40%' }
  ]
  
  const position = positions[(index - 1) % positions.length]
  return {
    ...position,
    animationDelay: `${Math.random() * 3}s`,
    animationDuration: `${2 + Math.random() * 2}s`
  }
}

// 生成Icon軌道光點樣式
const getOrbitalIconStyle = (index: number) => {
  const radius = 50 // 軌道半徑
  const angle = (index * 90) // 每90度一個光點
  const x = radius * Math.cos(angle * Math.PI / 180)
  const y = radius * Math.sin(angle * Math.PI / 180)
  
  return {
    left: `calc(50% + ${x}px)`,
    top: `calc(50% + ${y}px)`,
    animationDelay: `${index * 0.8}s`,
    animationDuration: `${3 + Math.random() * 2}s`
  }
}
</script>