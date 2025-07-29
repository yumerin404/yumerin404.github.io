<template>
  <button
    :class="buttonClasses"
    :disabled="disabled || loading"
    :aria-label="ariaLabel"
    :type="type"
    @click="handleClick"
  >
    <!-- 左側圖標 -->
    <Icon 
      v-if="leftIcon && !loading" 
      :name="leftIcon" 
      :class="iconClasses"
    />
    
    <!-- 載入動畫 -->
    <div 
      v-if="loading" 
      :class="loadingClasses"
    >
      <div class="medical-spinner"></div>
    </div>
    
    <!-- 按鈕文字 -->
    <span v-if="!iconOnly" :class="textClasses">
      <slot>{{ label }}</slot>
    </span>
    
    <!-- 右側圖標 -->
    <Icon 
      v-if="rightIcon && !loading && !iconOnly" 
      :name="rightIcon" 
      :class="iconClasses"
    />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// 型別定義
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'
type ButtonType = 'button' | 'submit' | 'reset'
type ButtonRadius = 'rounded' | 'md' | 'lg'

// Props 定義
interface Props {
  variant?: ButtonVariant
  size?: ButtonSize
  type?: ButtonType
  radius?: ButtonRadius
  disabled?: boolean
  loading?: boolean
  block?: boolean
  iconOnly?: boolean
  leftIcon?: string
  rightIcon?: string
  label?: string
  ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  radius: 'md',
  disabled: false,
  loading: false,
  block: false,
  iconOnly: false,
  leftIcon: '',
  rightIcon: '',
  label: '',
  ariaLabel: ''
})

// Events 定義
const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

// 計算屬性 - 基礎樣式
const baseClasses = computed(() => [
  // 基礎佈局
  'relative inline-flex items-center justify-center font-medium',
  'transition-all duration-200 ease-in-out',
  'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900',
  
  // 響應式觸控
  'touch-manipulation select-none',
  
  // 禁用游標樣式
  props.disabled || props.loading ? 'cursor-not-allowed' : 'cursor-pointer',
  
  // 寬度控制
  props.block ? 'w-full' : 'w-auto',
  
  // 圓角樣式
  {
    'rounded': props.radius === 'rounded',
    'rounded-md': props.radius === 'md',
    'rounded-lg': props.radius === 'lg'
  }
])

// 計算屬性 - 尺寸樣式
const sizeClasses = computed(() => {
  const sizeMap = {
    sm: props.iconOnly ? 'h-8 w-8' : 'h-8 px-3 text-sm',
    md: props.iconOnly ? 'h-10 w-10' : 'h-10 px-4 text-base',
    lg: props.iconOnly ? 'h-12 w-12' : 'h-12 px-6 text-lg'
  }
  return sizeMap[props.size]
})

// 計算屬性 - 變體樣式
const variantClasses = computed(() => {
  if (props.disabled) {
    return [
      'bg-gray-700 text-gray-500 border-gray-600',
      'shadow-none ring-gray-600'
    ]
  }
  
  if (props.loading) {
    return [
      'bg-teal-700 text-teal-100 border-teal-600',
      'shadow-md ring-teal-400/50'
    ]
  }
  
  const variantMap = {
    primary: [
      // 背景與邊框
      'bg-gradient-to-r from-teal-600 to-teal-700',
      'border border-teal-500',
      'text-white',
      
      // Hover 效果
      'hover:from-teal-500 hover:to-teal-600',
      'hover:border-teal-400',
      'hover:shadow-lg hover:shadow-teal-500/25',
      'hover:scale-105',
      
      // Focus 效果
      'focus:ring-teal-400/50',
      
      // Active 效果
      'active:scale-95 active:from-teal-700 active:to-teal-800'
    ],
    
    secondary: [
      // 背景與邊框
      'bg-gradient-to-r from-gray-700 to-gray-800',
      'border border-gray-600',
      'text-teal-100',
      
      // Hover 效果
      'hover:from-gray-600 hover:to-gray-700',
      'hover:border-gray-500',
      'hover:text-white',
      'hover:shadow-lg hover:shadow-gray-500/25',
      'hover:scale-105',
      
      // Focus 效果
      'focus:ring-gray-400/50',
      
      // Active 效果
      'active:scale-95 active:from-gray-800 active:to-gray-900'
    ],
    
    outline: [
      // 背景與邊框
      'bg-transparent',
      'border-2 border-teal-500',
      'text-teal-400',
      
      // Hover 效果
      'hover:bg-teal-500/10',
      'hover:border-teal-400',
      'hover:text-teal-300',
      'hover:shadow-lg hover:shadow-teal-500/20',
      'hover:scale-105',
      
      // Focus 效果
      'focus:ring-teal-400/50',
      
      // Active 效果
      'active:scale-95 active:bg-teal-500/20'
    ],
    
    ghost: [
      // 背景與邊框
      'bg-transparent',
      'border border-transparent',
      'text-teal-400',
      
      // Hover 效果
      'hover:bg-teal-500/10',
      'hover:text-teal-300',
      'hover:shadow-md',
      'hover:scale-105',
      
      // Focus 效果
      'focus:ring-teal-400/50',
      'focus:bg-teal-500/5',
      
      // Active 效果
      'active:scale-95 active:bg-teal-500/20'
    ]
  }
  
  return variantMap[props.variant] || variantMap.primary
})

// 計算屬性 - 最終按鈕樣式
const buttonClasses = computed(() => [
  ...baseClasses.value,
  sizeClasses.value,
  ...variantClasses.value
])

// 計算屬性 - 圖標樣式
const iconClasses = computed(() => {
  const sizeMap = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  }
  
  return [
    sizeMap[props.size],
    'flex-shrink-0',
    props.loading ? 'opacity-0' : 'opacity-100'
  ]
})

// 計算屬性 - 文字樣式
const textClasses = computed(() => [
  'font-medium',
  props.loading ? 'opacity-0' : 'opacity-100',
  (props.leftIcon || props.rightIcon) && !props.iconOnly ? 'mx-2' : ''
])

// 計算屬性 - 載入動畫樣式
const loadingClasses = computed(() => [
  'absolute inset-0 flex items-center justify-center'
])

// 點擊處理函數
const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<style scoped>
/* 自定義載入動畫 */
.medical-spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: medical-spin 1s linear infinite;
}

@keyframes medical-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* 醫療風格脈衝效果 */
.medical-button-primary:not(:disabled):not(.loading) {
  animation: medical-pulse 2s ease-in-out infinite;
}

@keyframes medical-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(20, 184, 166, 0.4); }
  50% { box-shadow: 0 0 0 6px rgba(20, 184, 166, 0); }
}

/* 高對比度模式支援 */
@media (prefers-contrast: high) {
  .medical-button {
    border-width: 2px;
  }
}

/* 減少動畫偏好支援 */
@media (prefers-reduced-motion: reduce) {
  .medical-button {
    transition: none;
  }
  
  .medical-spinner {
    animation: none;
    border-left-color: transparent;
  }
}

/* Focus-visible 支援 */
.medical-button:focus-visible {
  box-shadow: 0 0 0 2px rgb(17 24 39), 0 0 0 4px rgb(20 184 166);
}
</style>