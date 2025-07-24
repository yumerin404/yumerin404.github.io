<template>
  <section class="relative z-10 min-h-screen flex items-center justify-center px-4 py-20">
    <div class="container mx-auto text-center">
      <!-- 頭像 -->
      <div class="mb-12 animate-scale-in">
        <div class="relative inline-block group">
          <!-- 外發光效果 -->
          <div class="absolute -inset-4 bg-gradient-to-r from-violet-500/20 to-cyan-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
          
          <!-- 頭像容器 -->
          <div class="relative w-32 h-32 mx-auto">
            <img 
              src="/images/avatar.png" 
              alt="夢鈴領域" 
              class="w-full h-full object-cover rounded-full shadow-2xl border-2 border-violet-500/30 group-hover:border-violet-400/60 transition-all duration-300"
            />
            
            <!-- 脈衝環 -->
            <div class="absolute inset-0 rounded-full border-2 border-violet-400/50 animate-ping opacity-20"></div>
          </div>
        </div>
      </div>
      
      <!-- 標題 -->
      <div class="mb-8 animate-fade-in-up delay-200">
        <h1 class="text-6xl md:text-7xl font-bold mb-4">
          <span class="text-gradient animate-gradient-shift">
            夢鈴領域
          </span>
        </h1>
        
        <!-- 副標題 -->
        <div class="max-w-3xl mx-auto space-y-3">
          <p class="text-2xl md:text-3xl text-gray-300 leading-relaxed">
            不斷的學習，不斷的進步，不斷的追求中庸之道。
          </p>
          <p class="text-xl md:text-2xl text-gray-400">
            紀錄下我的創作與學習歷程。
          </p>
        </div>
      </div>
      
      <!-- CTA 按鈕 -->
      <div class="animate-fade-in-up delay-400">
        <a
          href="https://threads.net/"
          target="_blank"
          rel="noopener noreferrer"
          class="group relative inline-flex items-center btn-primary text-lg px-8 py-4 overflow-hidden"
        >
          <!-- 按鈕背景動畫 -->
          <div class="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <!-- 按鈕內容 -->
          <div class="relative z-10 flex items-center">
            <Icon name="simple-icons:threads" class="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
            <span>在 Threads 上與我連結</span>
            <Icon name="heroicons:arrow-top-right-on-square" class="w-6 h-6 ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
          </div>
          
          <!-- 點擊漣漪效果 -->
          <div class="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-active:opacity-100 group-active:animate-ping transition-opacity duration-100"></div>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// 無需額外的 JavaScript 邏輯，全部使用 Tailwind CSS 和 CSS 動畫
</script>