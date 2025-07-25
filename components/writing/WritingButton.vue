<template>
  <component 
    :is="href ? 'NuxtLink' : 'button'"
    :to="href"
    :type="!href ? type : undefined"
    :disabled="!href ? disabled : undefined"
    :class="buttonClasses"
    @click="!href ? $emit('click', $event) : undefined"
    class="group relative overflow-hidden transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900"
  >
    <!-- 載入中狀態背景動畫 -->
    <div 
      v-if="loading" 
      class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"
    ></div>
    
    <!-- Hover 發光效果 -->
    <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <div class="absolute inset-0 bg-gradient-to-r from-transparent via-current/10 to-transparent blur-sm"></div>
    </div>
    
    <!-- 內容容器 -->
    <div class="relative flex items-center justify-center space-x-2">
      <!-- 載入中圖標 -->
      <div 
        v-if="loading" 
        class="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"
      ></div>
      
      <!-- 左側圖標 -->
      <Icon 
        v-if="leftIcon && !loading" 
        :name="leftIcon" 
        :class="iconClasses"
      />
      
      <!-- 按鈕文字 -->
      <span :class="textClasses">
        <slot>{{ text }}</slot>
      </span>
      
      <!-- 右側圖標 -->
      <Icon 
        v-if="rightIcon && !loading" 
        :name="rightIcon" 
        :class="[iconClasses, 'group-hover:translate-x-0.5 transition-transform duration-300']"
      />
    </div>
    
    <!-- 點擊漣漪效果 -->
    <div 
      v-if="ripple"
      class="absolute inset-0 overflow-hidden"
    >
      <div 
        v-for="(rippleItem, index) in ripples" 
        :key="index"
        class="absolute rounded-full bg-white/30 animate-ping"
        :style="rippleItem.style"
      ></div>
    </div>
  </component>
</template>

<script setup lang="ts">
interface Props {
  // 基礎屬性
  text?: string
  href?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
  
  // 樣式變體
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  
  // 圖標
  leftIcon?: string
  rightIcon?: string
  
  // 互動效果
  ripple?: boolean
  
  // 自定義樣式
  customClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  variant: 'primary',
  size: 'md',
  ripple: true,
  disabled: false,
  loading: false
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

// 漣漪效果狀態
const ripples = ref<Array<{ style: Record<string, string> }>>([])

// 計算樣式類別
const buttonClasses = computed(() => {
  const baseClasses = [
    'inline-flex items-center justify-center font-medium rounded-xl',
    'transform active:scale-95 transition-all duration-300',
    props.customClass
  ]
  
  // 尺寸樣式
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl'
  }
  
  // 變體樣式
  const variantClasses = {
    primary: [
      'bg-gradient-to-r from-amber-400 to-orange-400',
      'text-slate-900 font-semibold',
      'hover:from-amber-300 hover:to-orange-300 hover:scale-105',
      'hover:shadow-xl hover:shadow-amber-400/30',
      'focus:ring-amber-400 focus:ring-4',
      'active:scale-95',
      'disabled:from-slate-600 disabled:to-slate-700 disabled:text-slate-400',
      'disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:scale-100'
    ],
    secondary: [
      'bg-gradient-to-r from-slate-700 to-slate-800',
      'text-white border border-slate-600',
      'hover:from-slate-600 hover:to-slate-700 hover:border-slate-500 hover:scale-105',
      'hover:shadow-lg hover:shadow-slate-700/30',
      'focus:ring-slate-500 focus:ring-4',
      'active:scale-95',
      'disabled:bg-slate-800 disabled:text-slate-500 disabled:border-slate-700',
      'disabled:cursor-not-allowed disabled:hover:scale-100'
    ],
    outline: [
      'bg-transparent border-2',
      'border-amber-500/60 text-amber-400',
      'hover:bg-amber-500/15 hover:border-amber-400 hover:scale-105 hover:text-amber-200',
      'hover:shadow-lg hover:shadow-amber-500/25',
      'focus:ring-amber-500 focus:ring-4',
      'active:scale-95',
      'disabled:border-slate-600 disabled:text-slate-500',
      'disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:scale-100'
    ],
    ghost: [
      'bg-transparent text-gray-300',
      'hover:bg-slate-800/50 hover:text-white',
      'focus:ring-slate-500',
      'disabled:text-slate-600 disabled:cursor-not-allowed',
      'disabled:hover:bg-transparent'
    ],
    danger: [
      'bg-gradient-to-r from-red-500 to-rose-500',
      'text-white font-semibold',
      'hover:from-red-400 hover:to-rose-400',
      'hover:shadow-lg hover:shadow-red-500/25',
      'focus:ring-red-500',
      'disabled:from-slate-600 disabled:to-slate-700 disabled:text-slate-400',
      'disabled:cursor-not-allowed'
    ]
  }
  
  return [
    ...baseClasses,
    sizeClasses[props.size],
    ...variantClasses[props.variant],
    props.disabled && 'opacity-60',
    props.loading && 'cursor-wait'
  ].filter(Boolean).join(' ')
})

const iconClasses = computed(() => {
  const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5', 
    lg: 'w-6 h-6',
    xl: 'w-7 h-7'
  }
  return sizeMap[props.size]
})

const textClasses = computed(() => {
  return props.loading ? 'opacity-75' : ''
})

// 處理點擊漣漪效果
const handleRipple = (event: MouseEvent) => {
  if (!props.ripple || props.disabled || props.loading) return
  
  const button = event.currentTarget as HTMLElement
  const rect = button.getBoundingClientRect()
  const size = Math.max(rect.width, rect.height)
  const x = event.clientX - rect.left - size / 2
  const y = event.clientY - rect.top - size / 2
  
  const newRipple = {
    style: {
      width: `${size}px`,
      height: `${size}px`,
      left: `${x}px`,
      top: `${y}px`
    }
  }
  
  ripples.value.push(newRipple)
  
  // 移除漣漪效果
  setTimeout(() => {
    ripples.value.shift()
  }, 600)
}

// 監聽點擊事件添加漣漪
const handleClick = (event: MouseEvent) => {
  handleRipple(event)
  if (!props.href) {
    emit('click', event)
  }
}
</script>

<style scoped>
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.animate-shimmer {
  animation: shimmer 1.5s ease-in-out infinite;
}

@keyframes ping {
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
}
</style>