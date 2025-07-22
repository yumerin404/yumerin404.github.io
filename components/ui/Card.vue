<template>
  <div 
    :class="cardClasses"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- 卡片發光邊框 -->
    <div class="card-glow-border"></div>
    
    <!-- 卡片內容 -->
    <div class="card-content">
      <slot />
    </div>
    
    <!-- 互動光效 -->
    <div class="card-shine"></div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'glass', 'elevated', 'featured'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg', 'xl'].includes(value)
  },
  interactive: {
    type: Boolean,
    default: true
  },
  glowing: Boolean
})

const isHovered = ref(false)

const cardClasses = computed(() => {
  const baseClasses = [
    'relative',
    'overflow-hidden',
    'transition-all',
    'duration-500',
    'ease-out',
    'group'
  ]

  // 尺寸樣式
  const sizeClasses = {
    sm: ['p-4', 'rounded-lg'],
    md: ['p-6', 'rounded-xl'],
    lg: ['p-8', 'rounded-2xl'],
    xl: ['p-10', 'rounded-2xl']
  }

  // 變體樣式
  const variantClasses = {
    default: [
      'bg-soft-dark-secondary/80',
      'border',
      'border-soft-dark-tertiary',
      'backdrop-blur-sm'
    ],
    glass: [
      'bg-soft-dark-secondary/60',
      'border',
      'border-soft-accent-primary/20',
      'backdrop-blur-lg'
    ],
    elevated: [
      'bg-soft-dark-secondary/90',
      'border',
      'border-soft-dark-tertiary',
      'shadow-xl',
      'shadow-black/20'
    ],
    featured: [
      'bg-gradient-to-br',
      'from-soft-dark-secondary/80',
      'to-soft-dark-tertiary/80',
      'border',
      'border-soft-accent-primary/30',
      'backdrop-blur-lg'
    ]
  }

  // 互動樣式
  const interactiveClasses = props.interactive ? [
    'cursor-pointer',
    'hover:transform',
    'hover:-translate-y-2',
    'hover:scale-105',
    'hover:shadow-2xl',
    'hover:shadow-soft-accent-primary/20',
    'hover:border-soft-accent-primary/40'
  ] : []

  // 發光效果
  const glowingClasses = props.glowing ? [
    'animate-pulse-glow'
  ] : []

  return [
    ...baseClasses,
    ...sizeClasses[props.size],
    ...variantClasses[props.variant],
    ...interactiveClasses,
    ...glowingClasses
  ].join(' ')
})

const handleMouseEnter = () => {
  isHovered.value = true
}

const handleMouseLeave = () => {
  isHovered.value = false
}
</script>

<style scoped>
.card-glow-border {
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, 
    rgba(200, 168, 233, 0.5), 
    rgba(248, 180, 217, 0.5), 
    rgba(168, 230, 207, 0.5)
  );
  border-radius: inherit;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
  filter: blur(8px);
}

.group:hover .card-glow-border {
  opacity: 1;
  animation: rotate-gradient 3s linear infinite;
}

.card-content {
  position: relative;
  z-index: 1;
  height: 100%;
}

.card-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  transition: left 0.8s ease;
  pointer-events: none;
}

.group:hover .card-shine {
  left: 100%;
}

/* 旋轉漸層動畫 */
@keyframes rotate-gradient {
  0% {
    filter: hue-rotate(0deg) blur(8px);
  }
  100% {
    filter: hue-rotate(360deg) blur(8px);
  }
}

/* 卡片進入動畫 */
.group {
  animation: card-enter 0.6s ease-out;
}

@keyframes card-enter {
  0% {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* 點擊時的脈衝效果 */
.group:active {
  animation: card-pulse 0.2s ease-out;
}

@keyframes card-pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.98);
  }
  100% {
    transform: scale(1);
  }
}

/* 特殊發光效果 */
.group:hover {
  filter: brightness(1.05);
}

/* 立體陰影效果 */
.group:hover {
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(200, 168, 233, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

/* 內容淡入效果 */
.card-content > * {
  animation: content-fade-in 0.8s ease-out;
}

@keyframes content-fade-in {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>