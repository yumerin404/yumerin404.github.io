<template>
  <div class="space-y-4">
    <!-- 輸入框容器 -->
    <div class="relative group">
      <!-- 輸入框 -->
      <input
        :type="type"
        :placeholder="placeholder"
        v-model="inputValue"
        @focus="handleFocus"
        @blur="handleBlur"
        class="input-primary"
        :class="{ 'ring-2 ring-violet-500/30': isFocused }"
      />
      
      <!-- 浮動標籤 -->
      <label 
        v-if="label" 
        class="absolute left-4 transition-all duration-300 pointer-events-none"
        :class="labelClasses"
      >
        {{ label }}
      </label>
      
      <!-- 聚焦指示器 -->
      <div 
        class="absolute inset-0 rounded-xl border-2 border-transparent transition-all duration-300 pointer-events-none"
        :class="{ 'border-violet-500/50 shadow-lg shadow-violet-500/20': isFocused }"
      ></div>
      
      <!-- 聚焦時的光效 -->
      <div 
        class="absolute -inset-1 bg-gradient-to-r from-violet-500/0 via-purple-500/0 to-cyan-500/0 rounded-xl blur-lg opacity-0 transition-all duration-300 -z-10"
        :class="{ 'opacity-30 from-violet-500/20 via-purple-500/20 to-cyan-500/20': isFocused }"
      ></div>
    </div>
    
    <!-- 提交按鈕 -->
    <button 
      v-if="showButton"
      @click="handleSubmit"
      :disabled="isSubmitting"
      class="group relative w-full btn-primary py-4 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <!-- 載入狀態 -->
      <div v-if="isSubmitting" class="absolute inset-0 bg-slate-900/80 flex items-center justify-center">
        <Icon name="heroicons:arrow-path" class="w-5 h-5 animate-spin text-white" />
      </div>
      
      <!-- 按鈕內容 -->
      <div class="relative z-10 flex items-center justify-center" :class="{ 'opacity-0': isSubmitting }">
        <Icon name="heroicons:paper-airplane" class="w-5 h-5 mr-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
        <span>{{ buttonText }}</span>
      </div>
      
      <!-- 成功狀態動畫 -->
      <div 
        v-if="isSuccess" 
        class="absolute inset-0 bg-green-500 flex items-center justify-center animate-pulse"
      >
        <Icon name="heroicons:check" class="w-6 h-6 text-white" />
      </div>
      
      <!-- 點擊漣漪 -->
      <div class="absolute inset-0 bg-white/10 rounded-xl opacity-0 group-active:opacity-100 group-active:animate-ping transition-opacity duration-100"></div>
    </button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  type?: string
  placeholder?: string
  label?: string
  buttonText?: string
  showButton?: boolean
  modelValue?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  placeholder: '',
  label: '',
  buttonText: '發送',
  showButton: true,
  modelValue: ''
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'submit': [value: string]
}>()

const isFocused = ref(false)
const isSubmitting = ref(false)
const isSuccess = ref(false)

const inputValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const labelClasses = computed(() => {
  if (isFocused.value || inputValue.value) {
    return 'top-2 text-xs text-violet-400 font-medium'
  }
  return 'top-4 text-base text-gray-400'
})

const handleFocus = () => {
  isFocused.value = true
}

const handleBlur = () => {
  isFocused.value = false
}

const handleSubmit = async () => {
  if (isSubmitting.value) return
  
  isSubmitting.value = true
  
  // 模擬提交過程
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  emit('submit', inputValue.value)
  
  isSubmitting.value = false
  isSuccess.value = true
  
  // 重置成功狀態
  setTimeout(() => {
    isSuccess.value = false
  }, 2000)
}
</script>