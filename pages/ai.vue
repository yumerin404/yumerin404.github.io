<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 text-white overflow-hidden relative">
    <!-- Cyberpunk 背景效果 -->
    <AiCyberpunkBackground />

    <!-- Header -->
    <Header />

    <!-- Main Content -->
    <main class="relative z-10 pt-20">
      <!-- Hero Section -->
      <AiAIHero
        title="AI 技巧與心得"
        subtitle="探索人工智能的無限前沿，掌握未來科技的核心力量"
        :technologies="aiTechnologies"
        :typewriter-texts="typewriterTexts"
        :orbit-symbols="orbitSymbols"
      />

      <!-- Construction Section -->
      <AiConstructionSection
        title="系統建構中..."
        description="AI 知識庫正在快速擴展中，即將為您帶來最前沿的人工智能技術分享與實戰心得"
        :features="aiFeatures"
        :show-subscription="true"
        subscription-title="保持聯繫"
        subscription-description="第一時間獲取 AI 技術更新與深度見解"
        @subscribe="handleSubscribe"
      />
    </main>
  </div>
</template>

<script setup lang="ts">
// SEO 設定
useHead({
  title: 'AI 技巧與心得 - 夢鈴領域',
  meta: [
    { 
      name: 'description', 
      content: '探索人工智能的前沿技術，分享 AI 工具使用心得與深度學習經驗。包含機器學習、深度學習、自然語言處理等技術分享。' 
    },
    {
      property: 'og:title',
      content: 'AI 技巧與心得 - 夢鈴領域'
    },
    {
      property: 'og:description',
      content: '最前沿的人工智能技術分享與實戰心得，探索 AI 的無限可能。'
    }
  ]
})

// 使用 AI 內容管理
const { 
  aiTechnologies, 
  aiFeatures, 
  typewriterTexts, 
  orbitSymbols 
} = useAIContent()

// 方法
const handleSubscribe = (email: string) => {
  console.log('Subscribe email:', email)
  // 這裡可以處理訂閱邏輯
  // 例如發送到後端 API 或第三方服務
}
</script>