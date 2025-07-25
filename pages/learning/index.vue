<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-950 via-teal-950 to-slate-900 text-white">
    <Header />

    <main class="relative z-10 pt-20">
      <CommonIndexHero
        title="心境與學習筆記"
        subtitle="探索內心的寧靜智慧，分享學習成長與心靈感悟，在知識的花園中綻放智慧之花。"
        icon="heroicons:academic-cap"
        theme-color="teal-400"
        icon-gradient="from-teal-600/20 to-green-600/20"
        title-gradient="bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400"
      />

      <CommonIndexGrid
        :categories="categories"
        @navigate="handleNavigate"
      />
    </main>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: '心境與學習筆記 - 夢鈴領域',
  meta: [
    { name: 'description', content: '心境感悟與學習成長筆記，包含名言佳句與發文紀錄。' }
  ]
})

const { categories } = useLearningContent()

const handleNavigate = (categoryId: string) => {
  // 根據分類 ID 導航到對應頁面
  switch (categoryId) {
    case 'posts':
      navigateTo('/learning/posts')
      break
    case 'quotes':
      // TODO: 創建名言佳句頁面
      console.log('導航到名言佳句頁面')
      break
    default:
      console.log(`導航到學習分類: ${categoryId}`)
  }
}
</script>
