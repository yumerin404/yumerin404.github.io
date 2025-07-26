<template>
  <div class="relative group">
    <!-- 標籤 -->
    <label 
      v-if="label" 
      :for="inputId"
      class="block text-sm font-medium text-gray-300 mb-2 transition-all duration-300 group-focus-within:text-amber-300 group-focus-within:transform group-focus-within:scale-105"
    >
      {{ label }}
      <span v-if="required" class="text-red-400 ml-1">*</span>
    </label>
    
    <!-- 輸入框容器 -->
    <div class="relative">
      <!-- 左側圖標 -->
      <div 
        v-if="leftIcon" 
        class="absolute left-4 top-1/2 transform -translate-y-1/2 z-10"
      >
        <Icon 
          :name="leftIcon" 
          :class="[
            'transition-colors duration-300',
            isFocused ? 'text-amber-400' : 'text-gray-400',
            iconSize
          ]"
        />
      </div>
      
      <!-- 輸入框 -->
      <input
        :id="inputId"
        ref="inputRef"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="maxlength"
        :class="inputClasses"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @keyup.enter="$emit('enter', $event)"
        @keyup.escape="$emit('escape', $event)"
      />
      
      <!-- 右側內容 -->
      <div 
        v-if="rightIcon || clearable || $slots.right" 
        class="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2"
      >
        <!-- 清除按鈕 -->
        <button
          v-if="clearable && modelValue"
          type="button"
          @click="handleClear"
          class="text-gray-400 hover:text-amber-300 transition-all duration-300 p-1 rounded-full hover:bg-amber-500/20 transform hover:scale-110 active:scale-95"
          :class="iconSize"
        >
          <Icon name="heroicons:x-mark" :class="iconSize" />
        </button>
        
        <!-- 右側插槽 -->
        <slot name="right" />
        
        <!-- 右側圖標 -->
        <Icon 
          v-if="rightIcon" 
          :name="rightIcon" 
          :class="[
            'transition-colors duration-300',
            isFocused ? 'text-amber-400' : 'text-gray-400',
            iconSize
          ]"
        />
      </div>
      
      <!-- Focus 發光效果 -->
      <div 
        v-show="isFocused && !disabled"
        class="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-400/25 to-orange-400/25 blur-md -z-10 animate-pulse shadow-lg shadow-amber-500/20"
      ></div>
    </div>
    
    <!-- 字數統計 -->
    <div 
      v-if="maxlength && showCount"
      class="mt-2 text-right"
    >
      <span 
        :class="[
          'text-xs transition-colors duration-300',
          characterCount > maxlength * 0.8 
            ? characterCount >= maxlength 
              ? 'text-red-400' 
              : 'text-yellow-400'
            : 'text-gray-500'
        ]"
      >
        {{ characterCount }}/{{ maxlength }}
      </span>
    </div>
    
    <!-- 錯誤訊息 -->
    <transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 transform -translate-y-2"
      enter-to-class="opacity-100 transform translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 transform translate-y-0"
      leave-to-class="opacity-0 transform -translate-y-2"
    >
      <div 
        v-if="error" 
        class="mt-2 text-sm text-red-400 flex items-center space-x-2"
      >
        <Icon name="heroicons:exclamation-triangle" class="w-4 h-4 flex-shrink-0" />
        <span>{{ error }}</span>
      </div>
    </transition>
    
    <!-- 說明文字 -->
    <div v-if="hint && !error" class="mt-2 text-sm text-gray-500">
      {{ hint }}
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  // 基礎屬性
  modelValue?: string | number
  type?: 'text' | 'email' | 'password' | 'search' | 'url' | 'tel' | 'number'
  placeholder?: string
  label?: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  
  // 樣式屬性
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'filled' | 'ghost'
  
  // 功能屬性
  maxlength?: number
  showCount?: boolean
  clearable?: boolean
  
  // 圖標
  leftIcon?: string
  rightIcon?: string
  
  // 驗證
  error?: string
  hint?: string
  
  // 自定義
  customClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  size: 'md',
  variant: 'default',
  showCount: false,
  clearable: false,
  disabled: false,
  readonly: false,
  required: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  enter: [event: KeyboardEvent]
  escape: [event: KeyboardEvent]
  clear: []
}>()

// 響應式狀態
const inputRef = ref<HTMLInputElement>()
const isFocused = ref(false)

// 使用 useId 生成穩定的 ID，避免 hydration mismatch
const inputId = useId()

// 計算屬性
const characterCount = computed(() => {
  return String(props.modelValue || '').length
})

const iconSize = computed(() => {
  const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }
  return sizeMap[props.size]
})

const inputClasses = computed(() => {
  const baseClasses = [
    'w-full rounded-xl border transition-all duration-300',
    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900',
    'placeholder:text-gray-500'
  ]
  
  // 尺寸樣式
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-5 py-4 text-lg'
  }
  
  // 左右內邊距調整
  const paddingClasses = []
  if (props.leftIcon) {
    const leftPadding = {
      sm: 'pl-10',
      md: 'pl-12',
      lg: 'pl-14'
    }
    paddingClasses.push(leftPadding[props.size])
  }
  
  if (props.rightIcon || props.clearable) {
    const rightPadding = {
      sm: 'pr-10',
      md: 'pr-12', 
      lg: 'pr-14'
    }
    paddingClasses.push(rightPadding[props.size])
  }
  
  // 變體樣式
  const variantClasses = {
    default: [
      'bg-slate-900/70 border-amber-500/40 text-white',
      'hover:border-amber-400/60 hover:bg-slate-900/80',
      'focus:border-amber-400 focus:ring-amber-400/25 focus:bg-slate-900/85',
      'disabled:bg-slate-800/40 disabled:border-slate-700/50 disabled:text-slate-500'
    ],
    filled: [
      'bg-slate-800/80 border-slate-700/50 text-white',
      'hover:bg-slate-800/90 hover:border-slate-600/50',
      'focus:bg-slate-800/90 focus:border-amber-500 focus:ring-amber-500/20',
      'disabled:bg-slate-800/40 disabled:border-slate-700/30 disabled:text-slate-500'
    ],
    ghost: [
      'bg-transparent border-slate-600/30 text-white',
      'hover:border-slate-500/50 hover:bg-slate-900/20',
      'focus:border-amber-500 focus:ring-amber-500/20 focus:bg-slate-900/30',
      'disabled:border-slate-700/30 disabled:text-slate-500'
    ]
  }
  
  // 錯誤狀態樣式
  const errorClasses = props.error ? [
    'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
  ] : []
  
  return [
    ...baseClasses,
    sizeClasses[props.size],
    ...paddingClasses,
    ...variantClasses[props.variant],
    ...errorClasses,
    props.disabled && 'cursor-not-allowed',
    props.readonly && 'cursor-default',
    props.customClass
  ].filter(Boolean).join(' ')
})

// 事件處理
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  let value: string | number = target.value
  
  if (props.type === 'number') {
    value = Number(value)
  }
  
  emit('update:modelValue', value)
}

const handleFocus = (event: FocusEvent) => {
  isFocused.value = true
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  isFocused.value = false
  emit('blur', event)
}

const handleClear = () => {
  emit('update:modelValue', '')
  emit('clear')
  inputRef.value?.focus()
}

// Expose 方法
defineExpose({
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
  select: () => inputRef.value?.select()
})
</script>

<style scoped>
/* 自定義輸入框樣式 */
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus {
  -webkit-box-shadow: 0 0 0 1000px rgb(15 23 42) inset !important;
  -webkit-text-fill-color: white !important;
  transition: background-color 5000s ease-in-out 0s;
}

/* 數字輸入框隱藏箭頭 */
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style>