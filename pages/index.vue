<template>
  <div class="min-h-screen relative">
    <!-- 背景效果 -->
    <BackgroundEffect />

    <!-- Hero Section -->
    <HeroSection />

    <!-- Categories Section -->
    <CategorySection />

    <!-- 現代化 Footer -->
    <footer class="relative z-10 py-16 border-t border-slate-800/50 bg-slate-950/80 backdrop-blur-xl">
      <div class="container mx-auto px-4 text-center">
        <div class="flex justify-center items-center space-x-4 mb-6 animate-fade-in-up">
          <div class="relative w-12 h-12 group">
            <img
              src="/images/avatar.png"
              alt="夢鈴領域"
              class="w-full h-full object-cover rounded-full border border-violet-500/30 group-hover:border-violet-400/60 transition-all duration-300"
            />
            <div class="absolute inset-0 rounded-full bg-violet-400/20 opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-300"></div>
          </div>
          <span class="text-2xl font-bold text-gradient-alt animate-gradient-shift">
            夢鈴領域
          </span>
        </div>
        <p class="text-lg text-gray-400 animate-fade-in-up delay-200">
          © 2025 夢鈴領域. 持續學習，持續進步.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// SEO Meta
useHead({
  title: '夢鈴領域 - 不斷學習的創作與思考空間',
  meta: [
    {
      name: 'description',
      content: '夢鈴領域是一個記錄學習歷程與創作的部落格，涵蓋輕小說、程式技術、AI心得、醫學知識、投資想法等多元內容。'
    },
    {
      property: 'og:title',
      content: '夢鈴領域 - 不斷學習的創作與思考空間'
    },
    {
      property: 'og:description',
      content: '不斷的學習，不斷的進步，不斷的追求中庸之道。紀錄下我的創作與學習歷程。'
    },
    {
      property: 'og:type',
      content: 'website'
    }
  ]
})
</script>