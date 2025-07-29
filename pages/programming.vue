<template>
  <div class="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#0d1117] via-[#161b22] to-[#21262d]">
    <!-- 背景效果 -->
    <ProgrammingHackerBackground />

    <!-- Header -->
    <Header />

    <!-- Main Content -->
    <main class="relative z-10 pt-20">
      <!-- Hero Section -->
      <ProgrammingHackerHero
        title="程式與工具"
        subtitle="工具集合"
        :tags="[
          { text: '自動化', color: '[#7ce38a]' },
          { text: '效率工具', color: '[#ffa657]' }
        ]"
      />

      <!-- 工具展示區域 -->
      <ProgrammingToolsManager
        :tools="tools"
        title="工具集合"
        :show-filters="true"
      />

      <!-- 支持與反饋區域 -->
      <ProgrammingSupportSection
        title="支持與反饋"
        subtitle="您的支持是我持續開發優質工具的動力"
        :support-links="supportLinks"
      />
    </main>
  </div>
</template>

<script setup lang="ts">
// SEO 設定
useSEO({
  title: '程式設計技術分享 - 夢鈴領域',
  description: '分享程式設計技術、開發經驗與工具推薦。涵蓋前端、後端、資料庫、DevOps 等全端開發知識。',
  keywords: '程式設計, 軟體開發, JavaScript, TypeScript, Python, Vue, React, Node.js, 全端開發',
  type: 'website'
})

// 結構化資料 - 程式設計頁面
useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: '程式設計技術分享',
      description: '分享程式設計技術、開發經驗與工具推薦',
      url: 'https://yumerin.org/programming',
      dateModified: '2025-07-28',
      author: {
        '@type': 'Person',
        name: 'Yumerin',
        url: 'https://yumerin.org'
      },
      publisher: {
        '@type': 'Organization',
        name: '夢鈴領域',
        url: 'https://yumerin.org'
      },
      about: {
        '@type': 'Thing',
        name: '程式設計技術'
      },
      keywords: ['程式設計', '軟體開發', 'JavaScript', 'TypeScript', 'Python'],
      inLanguage: 'zh-TW'
    })
  }]
})

// 使用工具數據管理
const { tools, supportLinks } = useProgrammingTools()
</script>

<style scoped>
/* 響應式優化 */
@media (max-width: 768px) {
  .animate-fade-in-up {
    animation: none;
  }
}
</style>