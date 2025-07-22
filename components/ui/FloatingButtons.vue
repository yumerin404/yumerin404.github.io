<template>
  <div class="fixed bottom-8 right-8 z-40 flex flex-col space-y-4">
    <!-- 回到頂部按鈕 -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 scale-50 translate-y-4"
      enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 scale-100 translate-y-0"
      leave-to-class="opacity-0 scale-50 translate-y-4"
    >
      <button
        v-if="showBackToTop"
        @click="scrollToTop"
        class="w-14 h-14 bg-gradient-to-br from-dream-purple to-cosmic-pink rounded-2xl shadow-xl shadow-dream-purple/25 hover:shadow-2xl hover:shadow-dream-purple/40 text-snow-white hover:scale-110 active:scale-95 transition-all duration-300 group flex items-center justify-center"
      >
        <Icon name="heroicons:arrow-up" class="w-6 h-6 group-hover:-translate-y-1 transition-transform duration-300" />
      </button>
    </Transition>
    
    <!-- 主題切換按鈕 -->
    <button
      @click="toggleTheme"
      class="w-14 h-14 bg-midnight-blue/80 backdrop-blur-xl border border-twilight-blue/50 rounded-2xl shadow-xl text-starlight-gray hover:text-snow-white hover:bg-midnight-blue hover:border-dream-purple/50 hover:scale-110 active:scale-95 transition-all duration-300 group flex items-center justify-center"
    >
      <Icon 
        :name="isDark ? 'heroicons:sun' : 'heroicons:moon'" 
        class="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" 
      />
    </button>
    
    <!-- 分享按鈕 -->
    <button
      @click="shareContent"
      class="w-14 h-14 bg-midnight-blue/80 backdrop-blur-xl border border-twilight-blue/50 rounded-2xl shadow-xl text-starlight-gray hover:text-snow-white hover:bg-midnight-blue hover:border-emerald-green/50 hover:scale-110 active:scale-95 transition-all duration-300 group flex items-center justify-center"
    >
      <Icon name="heroicons:share" class="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
    </button>
    
    <!-- 聯絡按鈕 -->
    <a
      href="mailto:contact@yumerin.fantasy"
      class="w-14 h-14 bg-midnight-blue/80 backdrop-blur-xl border border-twilight-blue/50 rounded-2xl shadow-xl text-starlight-gray hover:text-snow-white hover:bg-midnight-blue hover:border-cosmic-pink/50 hover:scale-110 active:scale-95 transition-all duration-300 group flex items-center justify-center"
    >
      <Icon name="heroicons:envelope" class="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
    </a>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const showBackToTop = ref(false)
const isDark = ref(true) // 預設暗色主題

const handleScroll = () => {
  showBackToTop.value = window.pageYOffset > 300
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

const toggleTheme = () => {
  isDark.value = !isDark.value
  // 這裡可以實作主題切換邏輯
  document.documentElement.classList.toggle('light-mode', !isDark.value)
}

const shareContent = async () => {
  const shareData = {
    title: '夢鈴幻想 | 創意與技術的奇幻世界',
    text: '歡迎來到夢鈴幻想，探索創意與技術交融的奇幻世界！',
    url: window.location.href
  }

  try {
    if (navigator.share) {
      await navigator.share(shareData)
    } else {
      // 降級處理：複製到剪貼簿
      await navigator.clipboard.writeText(window.location.href)
      // 可以顯示成功訊息
      console.log('連結已複製到剪貼簿')
    }
  } catch (error) {
    console.error('分享失敗:', error)
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll() // 初始檢查
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>