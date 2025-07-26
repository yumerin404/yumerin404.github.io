<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white">
    <Header />

    <main class="relative z-10 pt-20">
      <CommonIndexHero
        title="政治、思維、哲學"
        subtitle="探索政治智慧，提升思維品質，深化哲學思辨。在理性思考中尋找真理與智慧。"
        icon="heroicons:academic-cap"
        theme-color="purple-400"
        icon-gradient="from-purple-600/20 to-indigo-600/20"
        title-gradient="bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400"
      />

      <PoliticsIndexGrid
        :categories="categories"
        @navigate="handleNavigate"
      />
    </main>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: '政治、思維、哲學 - 夢鈴領域',
  meta: [
    { name: 'description', content: '政治觀察、思維訓練與哲學思辨，提升理性思考能力，探索人生智慧。' }
  ]
})

const { categories } = usePoliticsContent()

const handleNavigate = (categoryId: string) => {
  switch (categoryId) {
    case 'politics':
      // 政治觀察頁面（待實現）
      console.log('導航到政治觀察')
      break
    case 'thought':
      // 導航到思維方式頁面
      navigateTo('/politics/thought')
      break
    case 'philosophy':
      // 哲學思辨頁面（待實現）
      console.log('導航到哲學思辨')
      break
    default:
      console.log(`導航到政治分類: ${categoryId}`)
  }
}
</script>