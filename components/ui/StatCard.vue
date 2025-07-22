<template>
  <div class="text-center group">
    <div class="relative mb-4">
      <!-- 圖示背景 -->
      <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500" :class="gradient">
        <Icon :name="icon" class="w-8 h-8 text-snow-white" />
      </div>
      
      <!-- 發光效果 -->
      <div class="absolute inset-0 bg-gradient-to-br rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" :class="gradient"></div>
    </div>
    
    <!-- 數字 -->
    <div class="text-3xl font-bold text-snow-white mb-2 group-hover:scale-110 transition-transform duration-300">
      {{ animatedNumber }}+
    </div>
    
    <!-- 標籤 -->
    <div class="text-starlight-gray group-hover:text-snow-white transition-colors duration-300">
      {{ label }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
  number: {
    type: Number,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  gradient: {
    type: String,
    required: true
  }
})

const animatedNumber = ref(0)

const animateNumber = () => {
  const duration = 2000
  const start = 0
  const end = props.number
  const startTime = Date.now()

  const updateNumber = () => {
    const now = Date.now()
    const elapsed = now - startTime
    const progress = Math.min(elapsed / duration, 1)
    
    // 使用緩動函數
    const easeOutQuart = 1 - Math.pow(1 - progress, 4)
    animatedNumber.value = Math.floor(start + (end - start) * easeOutQuart)
    
    if (progress < 1) {
      requestAnimationFrame(updateNumber)
    }
  }
  
  requestAnimationFrame(updateNumber)
}

onMounted(() => {
  // 延遲啟動動畫，讓組件先出現
  setTimeout(() => {
    animateNumber()
  }, 500)
})
</script>