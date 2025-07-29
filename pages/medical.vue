<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-800 text-white">
    <!-- Header -->
    <Header />

    <!-- Main Content -->
    <main class="relative z-10 pt-20">
      <!-- Hero Section -->
      <MedicalMedicalHero
        title="醫學、藥物、保健品知識"
        subtitle="提供科學、準確、實用的健康資訊，幫助您做出明智的健康決策"
        :disclaimer="disclaimer"
      />

      <!-- 分類展示區域 -->
      <section class="py-16 px-4">
        <div class="container mx-auto max-w-7xl">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <MedicalCategoryCard
              v-for="category in medicalCategories"
              :key="category.id"
              :category="category"
              @navigate="handleNavigateToCategory"
            />
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
// SEO 設定
useHead({
  title: '醫學、藥物、保健品知識 - 夢鈴領域',
  meta: [
    { 
      name: 'description', 
      content: '提供科學、準確、實用的健康資訊，包含醫學知識、藥物資訊和保健品指南。基於權威資料來源，幫助您做出明智的健康決策。' 
    },
    { 
      name: 'keywords', 
      content: '醫學知識, 藥物資訊, 保健品, 健康知識, 用藥安全, 疾病預防, 營養學, 臨床醫學' 
    },
    {
      property: 'og:title',
      content: '醫學、藥物、保健品知識 - 夢鈴領域'
    },
    {
      property: 'og:description',
      content: '科學、準確的醫療健康資訊平台，提供專業的醫學知識、藥物指導和保健品分析。'
    }
  ]
})

// 使用醫療內容管理
const { 
  medicalCategories, 
  qualityAssurances, 
  disclaimer 
} = useMedicalContent()

// 方法
const handleNavigateToCategory = (categoryId: string) => {
  console.log(`導航到 ${categoryId} 分類`)
  
  // 導航到對應的子頁面
  switch(categoryId) {
    case 'health':
      // navigateTo('/medical/health')
      break
    case 'medicine':
      // navigateTo('/medical/medicine')
      break
    case 'supplement':
      navigateTo('/medical/supplements')
      break
    default:
      console.warn(`Unknown category: ${categoryId}`)
  }
}

const handleFeedback = () => {
  console.log('處理意見反饋')
  // 這裡可以打開反饋表單或導航到反饋頁面
  // 例如：打開 modal 或導航到聯繫頁面
}
</script>