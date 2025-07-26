<template>
  <div 
    :class="[
      'absolute inset-0 overflow-hidden pointer-events-none',
      opacityClasses
    ]"
  >
    <!-- 漸變背景層 -->
    <div 
      v-for="(layer, index) in backgroundLayers"
      :key="index"
      :class="['absolute inset-0', layer.gradient]"
      :style="{ opacity: layer.opacity }"
    ></div>
    
    <!-- 飄浮裝飾元素 -->
    <div 
      v-for="i in decorationCount" 
      :key="`decoration-${i}`"
      :class="[
        'absolute w-3 h-3 animate-float-gentle',
        decorationColor
      ]"
      :style="getDecorationStyle(i)"
    >{{ decorationSymbol }}</div>
    
    <!-- 動態粒子效果（可選） -->
    <template v-if="showParticles">
      <div 
        v-for="i in particleCount"
        :key="`particle-${i}`"
        :class="[
          'absolute w-1 h-1 rounded-full animate-pulse',
          particleColor
        ]"
        :style="getParticleStyle(i)"
      ></div>
    </template>
    
    <!-- 自定義內容插槽 -->
    <slot />
  </div>
</template>

<script setup lang="ts">
interface BackgroundLayer {
  gradient: string
  opacity: number
}

interface Props {
  // 外觀變體
  variant?: 'amber' | 'orange' | 'slate' | 'cosmic'
  
  // 透明度
  opacity?: 'light' | 'medium' | 'heavy'
  
  // 裝飾元素
  decorationCount?: number
  decorationSymbol?: string
  showParticles?: boolean
  particleCount?: number
  
  // 自定義樣式
  customGradients?: BackgroundLayer[]
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'amber',
  opacity: 'medium',
  decorationCount: 12,
  decorationSymbol: '✦',
  showParticles: false,
  particleCount: 20
})

// 計算樣式類別
const opacityClasses = computed(() => {
  const opacityMap = {
    light: 'opacity-5',
    medium: 'opacity-10',
    heavy: 'opacity-15'
  }
  return opacityMap[props.opacity]
})

const backgroundLayers = computed((): BackgroundLayer[] => {
  if (props.customGradients) {
    return props.customGradients
  }
  
  const layerMap = {
    amber: [
      { gradient: 'bg-gradient-to-br from-amber-500/5 via-transparent to-orange-500/5', opacity: 1 },
      { gradient: 'bg-gradient-to-tl from-yellow-500/2 via-transparent to-amber-600/2', opacity: 1 }
    ],
    orange: [
      { gradient: 'bg-gradient-to-br from-orange-500/5 via-transparent to-red-500/5', opacity: 1 },
      { gradient: 'bg-gradient-to-tl from-orange-400/3 via-transparent to-amber-500/3', opacity: 1 }
    ],
    slate: [
      { gradient: 'bg-gradient-to-br from-slate-600/5 via-transparent to-slate-800/5', opacity: 1 },
      { gradient: 'bg-gradient-to-tl from-slate-700/2 via-transparent to-slate-900/2', opacity: 1 }
    ],
    cosmic: [
      { gradient: 'bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5', opacity: 1 },
      { gradient: 'bg-gradient-to-tl from-indigo-500/3 via-transparent to-purple-600/3', opacity: 1 },
      { gradient: 'bg-gradient-to-r from-cyan-500/2 via-transparent to-purple-500/2', opacity: 1 }
    ]
  }
  
  return layerMap[props.variant]
})

const decorationColor = computed(() => {
  const colorMap = {
    amber: 'text-amber-400/40',
    orange: 'text-orange-400/40',
    slate: 'text-slate-400/40',
    cosmic: 'text-purple-400/40'
  }
  return colorMap[props.variant]
})

const particleColor = computed(() => {
  const colorMap = {
    amber: 'bg-amber-400/30',
    orange: 'bg-orange-400/30',
    slate: 'bg-slate-400/30',
    cosmic: 'bg-purple-400/30'
  }
  return colorMap[props.variant]
})

// 工具函數 - 使用固定值避免 hydration mismatch
const getDecorationStyle = (index: number) => {
  const positions = [
    { left: '5%', top: '10%' }, { left: '15%', top: '20%' }, { left: '25%', top: '15%' },
    { left: '35%', top: '25%' }, { left: '45%', top: '18%' }, { left: '55%', top: '22%' },
    { left: '65%', top: '12%' }, { left: '75%', top: '28%' }, { left: '85%', top: '16%' },
    { left: '95%', top: '24%' }, { left: '10%', top: '70%' }, { left: '20%', top: '75%' },
    { left: '30%', top: '68%' }, { left: '40%', top: '80%' }, { left: '50%', top: '72%' },
    { left: '60%', top: '85%' }, { left: '70%', top: '78%' }, { left: '80%', top: '82%' }
  ]
  
  const delays = [0.5, 1.2, 2.8, 4.1, 0.9, 3.5, 1.7, 4.6, 2.3, 0.7, 3.9, 1.4, 4.2, 0.3, 2.6, 4.8, 1.9, 3.1]
  const durations = [5.2, 7.8, 6.1, 4.9, 6.7, 5.5, 7.2, 4.3, 6.9, 5.8, 7.5, 4.7, 6.4, 5.1, 7.9, 4.6, 6.2, 5.9]
  
  const position = positions[(index - 1) % positions.length]
  return {
    ...position,
    animationDelay: `${delays[(index - 1) % delays.length]}s`,
    animationDuration: `${durations[(index - 1) % durations.length]}s`
  }
}

const getParticleStyle = (index: number) => {
  const leftPositions = [12, 23, 45, 67, 89, 34, 56, 78, 9, 91, 15, 38, 62, 84, 7, 29, 51, 73, 95, 18]
  const topPositions = [8, 32, 55, 76, 19, 43, 68, 84, 11, 39, 64, 87, 25, 49, 71, 93, 16, 41, 66, 82]
  const delays = [0.2, 0.8, 1.5, 2.1, 0.6, 1.9, 2.7, 0.4, 1.3, 2.5, 0.9, 1.7, 2.3, 0.1, 1.1, 2.9, 0.7, 1.6, 2.2, 0.5]
  const durations = [2.3, 4.1, 3.7, 2.8, 4.5, 3.2, 2.6, 4.8, 3.9, 2.4, 4.2, 3.5, 2.9, 4.6, 3.1, 2.7, 4.3, 3.8, 2.5, 4.4]
  
  return {
    left: `${leftPositions[(index - 1) % leftPositions.length]}%`,
    top: `${topPositions[(index - 1) % topPositions.length]}%`,
    animationDelay: `${delays[(index - 1) % delays.length]}s`,
    animationDuration: `${durations[(index - 1) % durations.length]}s`
  }
}
</script>

<style scoped>
/* 飄浮動畫 */
@keyframes float-gentle {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  33% {
    transform: translateY(-8px) rotate(1deg);
  }
  66% {
    transform: translateY(-4px) rotate(-1deg);
  }
}

.animate-float-gentle {
  animation: float-gentle 6s ease-in-out infinite;
}
</style>