<template>
  <div class="space-y-6">
    <!-- 輸入框容器 -->
    <div class="relative group">
      <!-- 星際輸入框背景 -->
      <div class="absolute inset-0 bg-slate-900/80 backdrop-blur-md rounded-xl border border-slate-700/60 transition-all duration-500"
        :class="{ 
          'border-violet-500/60 bg-slate-900/90': isFocused,
          'shadow-lg shadow-violet-500/20': isFocused 
        }"
      ></div>
      
      <!-- 輸入框 -->
      <input
        :type="type"
        :placeholder="placeholder"
        v-model="inputValue"
        @focus="handleFocus"
        @blur="handleBlur"
        @input="handleInput"
        class="relative z-10 w-full px-4 py-4 bg-transparent border-none rounded-xl text-white placeholder-gray-400 focus:outline-none transition-all duration-300"
        :class="{ 'text-shadow-glow': isFocused && inputValue }"
      />
      
      <!-- 浮動標籤 -->
      <label 
        v-if="label" 
        class="absolute left-4 transition-all duration-300 pointer-events-none z-20"
        :class="labelClasses"
      >
        {{ label }}
      </label>
      
      <!-- 聚焦粒子效果 -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden rounded-xl" v-if="isFocused">
        <div 
          v-for="i in 8" 
          :key="`particle-${i}`"
          class="absolute w-1 h-1 bg-violet-400/60 rounded-full animate-input-particle"
          :style="getParticleStyle(i)"
        ></div>
      </div>
      
      <!-- 輸入進度條 -->
      <div class="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-violet-500 to-cyan-500 transition-all duration-300 rounded-b-xl"
        :style="{ width: `${inputProgress}%` }"
      ></div>
      
      <!-- 外圍光環 -->
      <div 
        class="absolute -inset-1 bg-gradient-to-r from-violet-500/0 via-purple-500/0 to-cyan-500/0 rounded-xl blur-lg opacity-0 transition-all duration-500 -z-10"
        :class="{ 
          'opacity-40 from-violet-500/30 via-purple-500/30 to-cyan-500/30 animate-cosmic-glow': isFocused,
          'opacity-60': isTyping 
        }"
      ></div>
      
      <!-- 側邊狀態指示器 -->
      <div class="absolute right-4 top-1/2 -translate-y-1/2 transition-all duration-300"
        :class="{ 'scale-110': isFocused }"
      >
        <div v-if="inputValue" class="w-2 h-2 bg-violet-400 rounded-full animate-pulse shadow-lg shadow-violet-400/50"></div>
        <div v-else-if="isFocused" class="w-2 h-2 border border-violet-400/60 rounded-full animate-pulse"></div>
      </div>
    </div>
    
    <!-- 星際提交按鈕 -->
    <button 
      v-if="showButton"
      @click="handleSubmit"
      :disabled="isSubmitting || !inputValue"
      class="group relative w-full h-14 bg-slate-900/80 backdrop-blur-md border border-slate-700/60 rounded-xl overflow-hidden transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed hover:border-violet-500/60 hover:shadow-lg hover:shadow-violet-500/20"
      :class="{ 
        'bg-slate-900/90 border-violet-500/60 shadow-lg shadow-violet-500/20': inputValue && !isSubmitting,
        'animate-cosmic-glow': inputValue && !isSubmitting 
      }"
    >
      <!-- 按鈕背景粒子 -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden" v-if="inputValue && !isSubmitting">
        <div 
          v-for="i in 6" 
          :key="`btn-particle-${i}`"
          class="absolute w-0.5 h-0.5 bg-violet-400/50 rounded-full animate-button-particle"
          :style="getButtonParticleStyle(i)"
        ></div>
      </div>
      
      <!-- 載入狀態 -->
      <div v-if="isSubmitting" class="absolute inset-0 bg-slate-900/90 flex items-center justify-center">
        <div class="flex items-center space-x-3">
          <!-- 載入環 -->
          <div class="relative w-6 h-6">
            <div class="absolute inset-0 border-2 border-violet-500/30 rounded-full"></div>
            <div class="absolute inset-0 border-2 border-transparent border-t-violet-500 rounded-full animate-spin"></div>
          </div>
          <span class="text-gray-300">發送中...</span>
        </div>
      </div>
      
      <!-- 按鈕內容 -->
      <div class="relative z-10 flex items-center justify-center h-full" :class="{ 'opacity-0': isSubmitting }">
        <Icon name="heroicons:paper-airplane" class="w-5 h-5 mr-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 text-violet-400" />
        <span class="font-medium text-white group-hover:text-gradient transition-all duration-300">{{ buttonText }}</span>
        
        <!-- 發射軌跡 -->
        <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div class="absolute top-1/2 left-8 w-0 h-0.5 bg-gradient-to-r from-violet-400 to-transparent group-hover:w-8 transition-all duration-500 -translate-y-1/2"></div>
        </div>
      </div>
      
      <!-- 成功狀態動畫 -->
      <div 
        v-if="isSuccess" 
        class="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center animate-fade-in-up"
      >
        <div class="flex items-center space-x-2">
          <Icon name="heroicons:check-circle" class="w-6 h-6 text-white animate-scale-in" />
          <span class="font-medium text-white">發送成功!</span>
        </div>
      </div>
      
      <!-- 懸停漣漪效果 -->
      <div class="absolute inset-0 bg-gradient-to-r from-violet-500/0 via-purple-500/0 to-cyan-500/0 rounded-xl opacity-0 group-hover:opacity-20 group-hover:from-violet-500/20 group-hover:via-purple-500/20 group-hover:to-cyan-500/20 transition-all duration-300"></div>
      
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
const isTyping = ref(false)

const inputValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const inputProgress = computed(() => {
  const maxLength = props.type === 'email' ? 50 : 100
  return Math.min((inputValue.value.length / maxLength) * 100, 100)
})

const labelClasses = computed(() => {
  if (isFocused.value || inputValue.value) {
    return 'top-2 text-xs text-violet-400 font-medium animate-fade-in-up'
  }
  return 'top-4 text-base text-gray-400'
})

// 生成輸入框粒子樣式
const getParticleStyle = (index: number) => {
  const positions = [
    { left: '20%', top: '20%' }, { left: '80%', top: '20%' },
    { left: '20%', top: '80%' }, { left: '80%', top: '80%' },
    { left: '50%', top: '10%' }, { left: '50%', top: '90%' },
    { left: '10%', top: '50%' }, { left: '90%', top: '50%' }
  ]
  
  const position = positions[(index - 1) % positions.length]
  return {
    ...position,
    animationDelay: `${Math.random() * 2}s`,
    animationDuration: `${2 + Math.random()}s`
  }
}

// 生成按鈕粒子樣式
const getButtonParticleStyle = (index: number) => {
  return {
    left: `${10 + Math.random() * 80}%`,
    top: `${20 + Math.random() * 60}%`,
    animationDelay: `${Math.random() * 3}s`,
    animationDuration: `${1.5 + Math.random()}s`
  }
}

const handleFocus = () => {
  isFocused.value = true
}

const handleBlur = () => {
  isFocused.value = false
  isTyping.value = false
}

const handleInput = () => {
  isTyping.value = true
  // 停止輸入後延遲重置
  setTimeout(() => {
    isTyping.value = false
  }, 1000)
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