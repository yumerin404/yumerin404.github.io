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
// SEO Meta
useHead({
  title: '程式與工具 - 夢鈴幻想',
  meta: [
    {
      name: 'description',
      content: '黑客風格的程式工具集合，包含自動化腳本、性能優化工具和安全監控系統。'
    },
    {
      property: 'og:title',
      content: '程式與工具 - 夢鈴幻想'
    },
    {
      property: 'og:description',
      content: '提供高效的程式開發工具和自動化腳本，提升您的開發效率。'
    }
  ]
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