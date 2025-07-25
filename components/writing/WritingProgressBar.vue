<template>
  <div 
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      containerClasses
    ]"
  >
    <!-- 主進度條 -->
    <div 
      :class="[
        'h-1 transition-all duration-300',
        progressClasses
      ]"
      :style="{ width: `${progress}%` }"
    ></div>
    
    <!-- 發光效果 -->
    <div 
      v-if="showGlow"
      :class="[
        'absolute top-0 left-0 h-1 transition-all duration-300 blur-sm',
        glowClasses
      ]"
      :style="{ width: `${progress}%` }"
    ></div>
    
    <!-- 進度指示器 -->
    <div 
      v-if="showIndicator && progress > 0"
      :class="[
        'absolute top-0 w-3 h-3 rounded-full transform -translate-y-1 transition-all duration-300',
        indicatorClasses
      ]"
      :style="{ left: `calc(${progress}% - 6px)` }"
    ></div>
    
    <!-- 自定義內容插槽 -->
    <slot :progress="progress" />
  </div>
</template>

<script setup lang="ts">
interface Props {
  // 進度值 (0-100)
  progress: number
  
  // 外觀變體
  variant?: 'amber' | 'orange' | 'gradient' | 'rainbow'
  
  // 功能選項
  showGlow?: boolean
  showIndicator?: boolean
  showPercentage?: boolean
  
  // 動畫選項
  animated?: boolean
  animationSpeed?: 'slow' | 'normal' | 'fast'
  
  // 自定義樣式
  height?: 'thin' | 'normal' | 'thick'
  customClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'gradient',
  showGlow: true,
  showIndicator: false,
  showPercentage: false,
  animated: true,
  animationSpeed: 'normal',
  height: 'thin'
})

// 計算樣式類別
const containerClasses = computed(() => {
  const heightMap = {
    thin: 'h-1',
    normal: 'h-2',
    thick: 'h-3'
  }
  
  return [
    heightMap[props.height],
    props.customClass
  ].filter(Boolean).join(' ')
})

const progressClasses = computed(() => {
  const variantMap = {
    amber: 'bg-amber-400',
    orange: 'bg-orange-400',
    gradient: 'bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400',
    rainbow: 'bg-gradient-to-r from-amber-400 via-orange-400 via-red-400 via-pink-400 to-purple-400'
  }
  
  const speedMap = {
    slow: 'transition-all duration-700',
    normal: 'transition-all duration-500',
    fast: 'transition-all duration-300'
  }
  
  return [
    variantMap[props.variant],
    props.animated ? speedMap[props.animationSpeed] : '',
    props.animated && props.variant === 'gradient' ? 'animate-gradient-shift' : ''
  ].filter(Boolean).join(' ')
})

const glowClasses = computed(() => {
  const variantMap = {
    amber: 'bg-amber-400/50',
    orange: 'bg-orange-400/50',
    gradient: 'bg-gradient-to-r from-amber-400/50 via-orange-400/50 to-yellow-400/50',
    rainbow: 'bg-gradient-to-r from-amber-400/50 via-orange-400/50 via-red-400/50 via-pink-400/50 to-purple-400/50'
  }
  
  return variantMap[props.variant]
})

const indicatorClasses = computed(() => {
  const variantMap = {
    amber: 'bg-amber-400 shadow-lg shadow-amber-400/50',
    orange: 'bg-orange-400 shadow-lg shadow-orange-400/50',
    gradient: 'bg-gradient-to-r from-amber-400 to-orange-400 shadow-lg shadow-amber-400/50',
    rainbow: 'bg-gradient-to-r from-amber-400 to-purple-400 shadow-lg shadow-purple-400/50'
  }
  
  return [
    variantMap[props.variant],
    'animate-pulse'
  ].join(' ')
})

// 格式化百分比顯示
const formattedProgress = computed(() => {
  return Math.round(props.progress)
})
</script>

<style scoped>
/* 漸變動畫 */
@keyframes gradient-shift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.animate-gradient-shift {
  background-size: 200% 200%;
  animation: gradient-shift 3s ease-in-out infinite;
}
</style>