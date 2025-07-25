<template>
  <section class="relative z-10 py-12 sm:py-16 lg:py-20 px-4">
    <div class="container mx-auto">
      <!-- 區段標題 -->
      <div class="text-center mb-12 sm:mb-16 animate-fade-in-up">
        <h2 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gradient-alt mb-4 sm:mb-6 animate-gradient-shift">
          探索領域
        </h2>
        <p class="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto px-4 sm:px-0">
          深入不同的知識領域，發現更多精彩內容
        </p>
      </div>
      
      <!-- 分類網格 -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        <div 
          v-for="(category, index) in categories"
          :key="category.path"
          class="animate-fade-in-up"
          :class="`delay-${Math.min(500, (index + 1) * 100)}`"
        >
          <CategoryCard
            :title="category.title"
            :description="category.description"
            :to="category.path"
            :icon="category.icon"
            :image="category.image"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// 分類資料
const categories = [
  {
    title: "輕小說",
    description: "沉浸於《來自第二次人生～命運交織的重生之旅～》的奇幻世界中，一個充滿愛情、魔法與可愛角色的故事。",
    path: "/novels",
    icon: "heroicons:book-open",
    image: "/images/categories/novels.jpg"
  },
  {
    title: "Galgame",
    description: "探索視覺小說的魅力世界，體驗互動式敘事的無限可能。",
    path: "/galgame",
    icon: "heroicons:puzzle-piece",
    image: "/images/categories/galgame.jpg"
  },
  {
    title: "程式工具與技術",
    description: "分享程式開發心得、工具使用技巧，以及最新技術趨勢的深度分析。",
    path: "/programming",
    icon: "heroicons:code-bracket",
    image: "/images/categories/programming.jpg"
  },
  {
    title: "AI 技巧與心得",
    description: "人工智慧時代的學習筆記，包含實用技巧與深度思考。",
    path: "/ai",
    icon: "heroicons:cpu-chip",
    image: "/images/categories/ai.jpg"
  },
  {
    title: "醫學、藥物、保健品知識",
    description: "基於科學證據的健康知識分享，幫助您做出更明智的健康決策。",
    path: "/medical",
    icon: "heroicons:heart",
    image: "/images/categories/medical.jpg"
  },
  {
    title: "經濟與投資想法",
    description: "理性分析市場趨勢，分享投資心得與財經觀點。",
    path: "/investment",
    icon: "heroicons:chart-bar",
    image: "/images/categories/investment.jpg"
  },
  {
    title: "政治與思想",
    description: "理性討論政治議題，追求中庸之道的思辨與反思。",
    path: "/politics",
    icon: "heroicons:academic-cap",
    image: "/images/categories/politics.jpg"
  },
  {
    title: "心境與學習筆記",
    description: "記錄生活感悟與學習歷程，分享成長路上的點點滴滴。",
    path: "/learning",
    icon: "heroicons:light-bulb",
    image: "/images/categories/learning.jpg"
  }
]
</script>
