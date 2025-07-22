<template>
  <button 
    :class="buttonClasses"
    :disabled="disabled || loading"
    @click="handleClick"
    v-bind="$attrs"
  >
    <div v-if="loading" class="flex items-center">
      <Icon name="heroicons:arrow-path" class="animate-spin mr-2" />
      <span>處理中...</span>
    </div>
    <div v-else class="flex items-center justify-center">
      <Icon v-if="icon && iconPosition === 'left'" :name="icon" :class="iconClasses" />
      <span v-if="$slots.default"><slot /></span>
      <Icon v-if="icon && iconPosition === 'right'" :name="icon" :class="iconClasses" />
    </div>
    
    <!-- 互動光效 -->
    <div class="button-shine"></div>
    
    <!-- 點擊漣漪效果 -->
    <div ref="rippleContainer" class="button-ripple-container"></div>
  </button>
</template>

<script setup>
import { computed, ref, nextTick } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'ghost', 'danger'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg', 'xl'].includes(value)
  },
  icon: String,
  iconPosition: {
    type: String,
    default: 'left',
    validator: (value) => ['left', 'right'].includes(value)
  },
  loading: Boolean,
  disabled: Boolean,
  fullWidth: Boolean
})

const emit = defineEmits(['click'])

const rippleContainer = ref(null)

const buttonClasses = computed(() => {
  const baseClasses = [
    'relative',
    'inline-flex',
    'items-center',
    'justify-center',
    'font-medium',
    'transition-all',
    'duration-300',
    'ease-out',
    'transform',
    'focus:outline-none',
    'focus:ring-4',
    'focus:ring-offset-2',
    'focus:ring-offset-soft-dark-primary',
    'disabled:opacity-50',
    'disabled:cursor-not-allowed',
    'disabled:transform-none',
    'overflow-hidden',
    'group'
  ]

  // 尺寸樣式
  const sizeClasses = {
    sm: ['px-3', 'py-2', 'text-sm', 'rounded-lg'],
    md: ['px-6', 'py-3', 'text-base', 'rounded-xl'],
    lg: ['px-8', 'py-4', 'text-lg', 'rounded-2xl'],
    xl: ['px-10', 'py-5', 'text-xl', 'rounded-2xl']
  }

  // 變體樣式
  const variantClasses = {
    primary: [
      'bg-gradient-to-r',
      'from-soft-accent-primary',
      'to-soft-accent-secondary',
      'text-soft-dark-primary',
      'hover:from-soft-accent-primary/90',
      'hover:to-soft-accent-secondary/90',
      'hover:shadow-lg',
      'hover:shadow-soft-accent-primary/25',
      'hover:-translate-y-1',
      'hover:scale-105',
      'active:scale-95',
      'focus:ring-soft-accent-primary/50'
    ],
    secondary: [
      'bg-transparent',
      'border-2',
      'border-soft-accent-primary',
      'text-soft-accent-primary',
      'hover:bg-soft-accent-primary',
      'hover:text-soft-dark-primary',
      'hover:border-soft-accent-primary',
      'hover:shadow-lg',
      'hover:shadow-soft-accent-primary/25',
      'hover:-translate-y-1',
      'active:scale-95',
      'focus:ring-soft-accent-primary/50'
    ],
    ghost: [
      'bg-soft-dark-secondary/50',
      'text-soft-text-contrast',
      'hover:bg-soft-dark-secondary',
      'hover:text-soft-accent-primary',
      'hover:-translate-y-0.5',
      'hover:shadow-md',
      'active:scale-95',
      'focus:ring-soft-text-secondary/30'
    ],
    danger: [
      'bg-gradient-to-r',
      'from-red-500',
      'to-red-600',
      'text-white',
      'hover:from-red-600',
      'hover:to-red-700',
      'hover:shadow-lg',
      'hover:shadow-red-500/25',
      'hover:-translate-y-1',
      'active:scale-95',
      'focus:ring-red-500/50'
    ]
  }

  const widthClasses = props.fullWidth ? ['w-full'] : []

  return [
    ...baseClasses,
    ...sizeClasses[props.size],
    ...variantClasses[props.variant],
    ...widthClasses
  ].join(' ')
})

const iconClasses = computed(() => {
  const sizeMap = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  }
  
  const spacing = props.iconPosition === 'left' ? 'mr-2' : 'ml-2'
  
  return `${sizeMap[props.size]} ${spacing}`
})

const handleClick = async (event) => {
  if (props.disabled || props.loading) return
  
  // 創建漣漪效果
  createRipple(event)
  
  emit('click', event)
}

const createRipple = (event) => {
  if (!rippleContainer.value) return
  
  const button = event.currentTarget
  const rect = button.getBoundingClientRect()
  const size = Math.max(rect.width, rect.height)
  const x = event.clientX - rect.left - size / 2
  const y = event.clientY - rect.top - size / 2
  
  const ripple = document.createElement('div')
  ripple.classList.add('button-ripple')
  ripple.style.cssText = `
    width: ${size}px;
    height: ${size}px;
    left: ${x}px;
    top: ${y}px;
  `
  
  rippleContainer.value.appendChild(ripple)
  
  setTimeout(() => {
    ripple.remove()
  }, 600)
}
</script>

<style scoped>
.button-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  transition: left 0.6s ease;
  pointer-events: none;
}

.group:hover .button-shine {
  left: 100%;
}

.button-ripple-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  border-radius: inherit;
}

.button-ripple {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.4);
  transform: scale(0);
  animation: ripple 0.6s ease-out;
  pointer-events: none;
}

@keyframes ripple {
  to {
    transform: scale(4);
    opacity: 0;
  }
}

/* 特殊按鈕效果 */
.group:active {
  animation: button-press 0.15s ease-out;
}

@keyframes button-press {
  0% { transform: scale(1); }
  50% { transform: scale(0.95); }
  100% { transform: scale(1); }
}

/* 按鈕發光效果 */
.group:hover {
  filter: brightness(1.1);
}

.group:focus {
  animation: pulse-glow 1.5s ease-in-out infinite;
}

@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(200, 168, 233, 0.4);
  }
  50% {
    box-shadow: 0 0 0 8px rgba(200, 168, 233, 0);
  }
}
</style>