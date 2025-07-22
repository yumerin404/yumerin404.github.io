<template>
  <div class="input-group" :class="{ 'input-group--focused': isFocused, 'input-group--error': hasError }">
    <!-- 標籤 -->
    <label 
      v-if="label" 
      :for="inputId" 
      class="input-label"
      :class="{ 'input-label--required': required }"
    >
      {{ label }}
      <span v-if="required" class="text-red-400 ml-1">*</span>
    </label>

    <!-- 輸入框容器 -->
    <div class="input-container">
      <!-- 左側圖示 -->
      <div v-if="leftIcon" class="input-icon input-icon--left">
        <Icon :name="leftIcon" class="text-soft-text-secondary group-focus-within:text-soft-accent-primary transition-colors duration-300" />
      </div>

      <!-- 輸入框 -->
      <input
        :id="inputId"
        ref="inputRef"
        :type="inputType"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :maxlength="maxlength"
        :minlength="minlength"
        :autocomplete="autocomplete"
        class="input-field"
        :class="inputClasses"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown="handleKeydown"
        v-bind="$attrs"
      />

      <!-- 密碼顯示切換 -->
      <button
        v-if="type === 'password'"
        type="button"
        class="input-icon input-icon--right"
        @click="togglePasswordVisibility"
        tabindex="-1"
      >
        <Icon 
          :name="showPassword ? 'heroicons:eye-slash' : 'heroicons:eye'" 
          class="text-soft-text-secondary hover:text-soft-accent-primary transition-colors duration-300" 
        />
      </button>

      <!-- 右側圖示 -->
      <div v-else-if="rightIcon" class="input-icon input-icon--right">
        <Icon :name="rightIcon" class="text-soft-text-secondary group-focus-within:text-soft-accent-primary transition-colors duration-300" />
      </div>

      <!-- 清除按鈕 -->
      <button
        v-if="clearable && modelValue && !disabled && !readonly"
        type="button"
        class="input-icon input-icon--right input-clear"
        @click="clearInput"
        tabindex="-1"
      >
        <Icon name="heroicons:x-mark" class="text-soft-text-secondary hover:text-red-400 transition-colors duration-300" />
      </button>

      <!-- 載入指示器 -->
      <div v-if="loading" class="input-icon input-icon--right">
        <Icon name="heroicons:arrow-path" class="text-soft-accent-primary animate-spin" />
      </div>

      <!-- 輸入框底線動畫 -->
      <div class="input-underline"></div>
    </div>

    <!-- 幫助文字或錯誤訊息 -->
    <div class="input-message">
      <div v-if="hasError" class="input-error">
        <Icon name="heroicons:exclamation-triangle" class="text-sm mr-1" />
        {{ errorMessage }}
      </div>
      <div v-else-if="helpText" class="input-help">
        {{ helpText }}
      </div>
      <div v-if="showCharCount && maxlength" class="input-count">
        {{ characterCount }}/{{ maxlength }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, watch } from 'vue'

const props = defineProps({
  modelValue: [String, Number],
  type: {
    type: String,
    default: 'text'
  },
  label: String,
  placeholder: String,
  leftIcon: String,
  rightIcon: String,
  disabled: Boolean,
  readonly: Boolean,
  required: Boolean,
  clearable: Boolean,
  loading: Boolean,
  error: Boolean,
  errorMessage: String,
  helpText: String,
  maxlength: Number,
  minlength: Number,
  showCharCount: Boolean,
  autocomplete: String,
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  }
})

const emit = defineEmits(['update:modelValue', 'focus', 'blur', 'keydown', 'clear'])

const inputRef = ref(null)
const isFocused = ref(false)
const showPassword = ref(false)

// 生成唯一ID
const inputId = computed(() => `input-${Math.random().toString(36).substr(2, 9)}`)

// 計算輸入類型
const inputType = computed(() => {
  if (props.type === 'password') {
    return showPassword.value ? 'text' : 'password'
  }
  return props.type
})

// 錯誤狀態
const hasError = computed(() => props.error || !!props.errorMessage)

// 字符計數
const characterCount = computed(() => {
  return props.modelValue ? String(props.modelValue).length : 0
})

// 輸入框樣式類
const inputClasses = computed(() => {
  const sizeClasses = {
    sm: 'py-2 text-sm',
    md: 'py-3 text-base',
    lg: 'py-4 text-lg'
  }

  return [
    sizeClasses[props.size],
    {
      'pl-12': props.leftIcon,
      'pr-12': props.rightIcon || props.clearable || props.loading || props.type === 'password',
      'cursor-not-allowed opacity-60': props.disabled,
      'bg-soft-dark-tertiary/50': props.readonly
    }
  ]
})

// 事件處理
const handleInput = (event) => {
  emit('update:modelValue', event.target.value)
}

const handleFocus = (event) => {
  isFocused.value = true
  emit('focus', event)
}

const handleBlur = (event) => {
  isFocused.value = false
  emit('blur', event)
}

const handleKeydown = (event) => {
  emit('keydown', event)
}

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const clearInput = () => {
  emit('update:modelValue', '')
  emit('clear')
  nextTick(() => {
    inputRef.value?.focus()
  })
}

// 對外暴露方法
defineExpose({
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
  select: () => inputRef.value?.select()
})
</script>

<style scoped>
.input-group {
  @apply relative w-full;
}

.input-label {
  @apply block text-sm font-medium text-soft-text-contrast mb-2 transition-colors duration-300;
}

.input-label--required {
  @apply text-soft-accent-primary;
}

.input-container {
  @apply relative group;
}

.input-field {
  @apply w-full px-4 bg-soft-dark-secondary/80 border border-soft-dark-tertiary text-soft-text-contrast placeholder-soft-text-faded rounded-xl backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-0 focus:border-soft-accent-primary focus:bg-soft-dark-secondary/90;
}

.input-field:focus {
  @apply shadow-lg shadow-soft-accent-primary/20;
  transform: translateY(-1px);
}

.input-field:hover:not(:disabled):not(:focus) {
  @apply border-soft-text-secondary/50 bg-soft-dark-secondary/90;
}

.input-icon {
  @apply absolute top-1/2 transform -translate-y-1/2 flex items-center justify-center w-10 h-10 transition-all duration-300;
}

.input-icon--left {
  @apply left-1;
}

.input-icon--right {
  @apply right-1;
}

.input-clear {
  @apply hover:bg-soft-dark-tertiary/50 rounded-lg cursor-pointer;
}

.input-underline {
  @apply absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-soft-accent-primary to-soft-accent-secondary transform scale-x-0 transition-transform duration-300 rounded-full;
  width: 100%;
}

.input-group--focused .input-underline {
  @apply scale-x-100;
}

.input-group--error .input-field {
  @apply border-red-400 focus:border-red-400 focus:shadow-red-400/20;
}

.input-group--error .input-underline {
  @apply bg-red-400 scale-x-100;
}

.input-message {
  @apply flex items-center justify-between mt-2 min-h-[1.25rem];
}

.input-error {
  @apply flex items-center text-sm text-red-400;
}

.input-help {
  @apply text-sm text-soft-text-dim;
}

.input-count {
  @apply text-xs text-soft-text-faded ml-auto;
}

/* 聚焦時的發光效果 */
.input-group--focused .input-field {
  animation: input-glow 2s ease-in-out infinite;
}

@keyframes input-glow {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(200, 168, 233, 0.2);
  }
  50% {
    box-shadow: 0 0 0 4px rgba(200, 168, 233, 0.1);
  }
}

/* 輸入時的動畫效果 */
.input-field:not(:placeholder-shown) {
  animation: input-type 0.3s ease-out;
}

@keyframes input-type {
  0% {
    transform: scale(0.98);
  }
  100% {
    transform: scale(1);
  }
}

/* 錯誤狀態動畫 */
.input-group--error .input-field {
  animation: input-error-shake 0.5s ease-in-out;
}

@keyframes input-error-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
}
</style>