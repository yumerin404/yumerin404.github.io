<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 text-white">
    <Header />

    <main class="relative z-10 pt-20">
      <CommonIndexHero
        title="投資理財"
        subtitle="理性投資，穩健增值。分享投資心得與市場觀察，助您在投資路上行穩致遠。"
        icon="heroicons:chart-bar"
        theme-color="emerald-400"
        icon-gradient="from-emerald-600/20 to-blue-600/20"
        title-gradient="bg-gradient-to-r from-emerald-400 via-blue-400 to-teal-400"
      >
        <template #extra-content>
          <!-- 投資風險警告 -->
          <div class="bg-red-500/10 border border-red-500/30 rounded-xl p-6 max-w-4xl mx-auto">
            <div class="flex items-start space-x-3">
              <Icon name="heroicons:exclamation-triangle" class="w-6 h-6 text-red-400 mt-1 flex-shrink-0" />
              <div class="text-left">
                <h3 class="text-red-400 font-semibold mb-2">投資風險提醒</h3>
                <p class="text-gray-300 text-sm leading-relaxed">
                  投資有風險，入市需謹慎。本站內容僅為個人觀點分享，不構成投資建議。
                  過往表現不代表未來收益，請根據自身情況做出理性決策，並承擔相應風險。
                </p>
              </div>
            </div>
          </div>
        </template>
      </CommonIndexHero>

      <CommonIndexGrid
        :categories="categories"
        @navigate="handleNavigate"
      />
    </main>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: '投資理財 - 夢鈴領域',
  meta: [
    { name: 'description', content: '投資理財心得與市場分析，包含宏觀經濟觀察與個人投資策略分享。' }
  ]
})

const { categories } = useInvestmentContent()

const handleNavigate = (categoryId: string) => {
  console.log(`導航到投資分類: ${categoryId}`)
}
</script>