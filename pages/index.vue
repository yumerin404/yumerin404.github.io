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
useSEO({
  title: '夢鈴領域 - 不斷學習的創作與思考空間',
  description: '夢鈴領域是一個記錄學習歷程與創作的部落格，涵蓋輕小說、程式技術、AI心得、醫學知識、投資想法等多元內容。',
  keywords: 'Yumerin, 夢鈴領域, 學習, 創作, 程式設計, AI, 醫學, 投資, 小說, 部落格',
  type: 'website'
})

// 結構化資料 - 網站主頁
useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: '夢鈴領域',
      alternateName: 'Yumerin',
      url: 'https://yumerin.org',
      description: '夢鈴領域是一個記錄學習歷程與創作的部落格，涵蓋輕小說、程式技術、AI心得、醫學知識、投資想法等多元內容。',
      author: {
        '@type': 'Person',
        name: 'Yumerin',
        url: 'https://yumerin.org'
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://yumerin.org/search?q={search_term_string}'
        },
        'query-input': 'required name=search_term_string'
      },
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: [
          {
            '@type': 'SiteNavigationElement',
            position: 1,
            name: 'AI 技術',
            url: 'https://yumerin.org/ai'
          },
          {
            '@type': 'SiteNavigationElement', 
            position: 2,
            name: '程式設計',
            url: 'https://yumerin.org/programming'
          },
          {
            '@type': 'SiteNavigationElement',
            position: 3,
            name: '醫學知識',
            url: 'https://yumerin.org/medical'
          },
          {
            '@type': 'SiteNavigationElement',
            position: 4,
            name: '投資理財',
            url: 'https://yumerin.org/investment'
          },
          {
            '@type': 'SiteNavigationElement',
            position: 5,
            name: '小說創作',
            url: 'https://yumerin.org/novels'
          },
          {
            '@type': 'SiteNavigationElement',
            position: 6,
            name: '學習資源',
            url: 'https://yumerin.org/learning'
          }
        ]
      }
    })
  }]
})
</script>