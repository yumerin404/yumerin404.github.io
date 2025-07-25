<template>
  <transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0 transform scale-75 translate-y-4"
    enter-to-class="opacity-100 transform scale-100 translate-y-0"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="opacity-100 transform scale-100 translate-y-0"
    leave-to-class="opacity-0 transform scale-75 translate-y-4"
  >
    <button
      v-show="isVisible"
      @click="scrollToTop"
      :class="[
        'fixed z-50 flex items-center justify-center transition-all duration-300',
        'transform hover:scale-110 active:scale-95',
        'focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-offset-slate-900',
        buttonClasses,
        positionClasses
      ]"
      :aria-label="ariaLabel"
    >
      <!-- 背景發光效果 -->
      <div 
        v-if="showGlow"
        :class="[
          'absolute inset-0 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300',
          glowClasses
        ]"
      ></div>
      
      <!-- 進度環（可選） -->
      <svg 
        v-if="showProgress"
        :class="['absolute inset-0 w-full h-full transform -rotate-90', progressRingClasses]"
        viewBox="0 0 36 36"
      >
        <path
          class="stroke-current opacity-20"
          :stroke-width="strokeWidth"
          fill="transparent"
          d="M18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
        />
        <path
          :class="['stroke-current transition-all duration-300', progressClasses]"
          :stroke-width="strokeWidth"
          :stroke-dasharray="`${normalizedProgress}, 100`"
          stroke-linecap="round"
          fill="transparent"
          d="M18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
        />
      </svg>
      
      <!-- 圖標 -->
      <Icon 
        :name="icon" 
        :class="['relative z-10 transition-transform duration-300 group-hover:-translate-y-1', iconClasses]"
      />
      
      <!-- 百分比文字（可選） -->
      <span 
        v-if="showPercentage && showProgress"
        :class="['absolute inset-0 flex items-center justify-center text-xs font-bold', textClasses]"
      >
        {{ Math.round(progress) }}%
      </span>
      
      <!-- 點擊漣漪效果 -->
      <div 
        v-for="(ripple, index) in ripples" 
        :key="index"
        class="absolute inset-0 rounded-full bg-white/30 animate-ping pointer-events-none"
        :style="ripple.style"
      ></div>
    </button>
  </transition>
</template>

<script setup lang="ts">
interface Props {
  // 顯示控制
  threshold?: number
  progress?: number
  
  // 外觀變體
  variant?: 'amber' | 'orange' | 'gradient' | 'minimal'
  size?: 'sm' | 'md' | 'lg'
  
  // 位置
  position?: 'bottom-right' | 'bottom-left' | 'bottom-center'
  
  // 功能選項
  showProgress?: boolean
  showPercentage?: boolean
  showGlow?: boolean
  
  // 圖標
  icon?: string
  
  // 自定義樣式
  customClass?: string
  
  // 無障礙
  ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  threshold: 500,
  progress: 0,
  variant: 'gradient',
  size: 'md',
  position: 'bottom-right',
  showProgress: true,
  showPercentage: false,
  showGlow: true,
  icon: 'heroicons:arrow-up',
  ariaLabel: '回到頂部'
})

// 響應式狀態
const isVisible = ref(false)
const scrollY = ref(0)
const ripples = ref<Array<{ style: Record<string, string> }>>([])

// 計算屬性
const normalizedProgress = computed(() => {
  return Math.max(0, Math.min(100, props.progress))
})

const buttonClasses = computed(() => {
  const variantMap = {
    amber: [
      'bg-amber-500 text-slate-900',
      'hover:bg-amber-400',
      'focus:ring-amber-500',
      'shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40'
    ],
    orange: [
      'bg-orange-500 text-white',
      'hover:bg-orange-400',
      'focus:ring-orange-500',
      'shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40'
    ],
    gradient: [
      'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-900',
      'hover:from-amber-400 hover:to-orange-400',
      'focus:ring-amber-500',
      'shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/40'
    ],
    minimal: [
      'bg-slate-800/90 text-white border border-amber-500/30',
      'hover:bg-slate-700/90 hover:border-amber-500/50',
      'focus:ring-amber-500',
      'shadow-lg shadow-slate-900/50 hover:shadow-xl'
    ]
  }
  
  const sizeMap = {
    sm: 'w-10 h-10 rounded-xl',
    md: 'w-12 h-12 rounded-2xl',
    lg: 'w-14 h-14 rounded-2xl'
  }
  
  return [
    'group',
    sizeMap[props.size],
    ...variantMap[props.variant],
    props.customClass
  ].filter(Boolean).join(' ')
})

const positionClasses = computed(() => {
  const positionMap = {
    'bottom-right': 'bottom-8 right-8',
    'bottom-left': 'bottom-8 left-8',
    'bottom-center': 'bottom-8 left-1/2 transform -translate-x-1/2'
  }
  return positionMap[props.position]
})

const iconClasses = computed(() => {
  const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }
  return sizeMap[props.size]
})

const textClasses = computed(() => {
  const variants = ['amber', 'gradient']
  return variants.includes(props.variant) ? 'text-slate-900' : 'text-white'
})

const strokeWidth = computed(() => {
  const sizeMap = {
    sm: 3,
    md: 2,
    lg: 2
  }
  return sizeMap[props.size]
})

const progressRingClasses = computed(() => {
  const variantMap = {
    amber: 'text-amber-400',
    orange: 'text-orange-400',
    gradient: 'text-amber-400',
    minimal: 'text-amber-500'
  }
  return variantMap[props.variant]
})

const progressClasses = computed(() => {
  return 'drop-shadow-sm'
})

const glowClasses = computed(() => {
  const variantMap = {
    amber: 'bg-amber-500/50',
    orange: 'bg-orange-500/50',
    gradient: 'bg-gradient-to-r from-amber-500/50 to-orange-500/50',
    minimal: 'bg-amber-500/30'
  }
  return variantMap[props.variant]
})

// 方法
const scrollToTop = () => {
  // 添加漣漪效果
  addRipple()
  
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

const addRipple = () => {
  const newRipple = {
    style: {
      animationDuration: '600ms'
    }
  }
  
  ripples.value.push(newRipple)
  
  setTimeout(() => {
    ripples.value.shift()
  }, 600)
}

const updateScrollPosition = () => {
  scrollY.value = window.pageYOffset
  
  // 更新可見性
  isVisible.value = scrollY.value > props.threshold
  
  // 如果顯示進度，計算滾動進度
  if (props.showProgress) {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const progress = (scrollY.value / docHeight) * 100
    // 通過 emit 傳遞進度給父組件，或直接使用內部計算
  }
}

// 生命週期
onMounted(() => {
  window.addEventListener('scroll', updateScrollPosition, { passive: true })
  updateScrollPosition()
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateScrollPosition)
})
</script>

<style scoped>
/* 進度環動畫 */
.progress-ring {
  transition: stroke-dasharray 0.3s ease-in-out;
}
</style>