<template>
  <section class="relative py-24 px-4 sm:px-6 lg:px-8">
    <!-- 背景裝飾 -->
    <div class="absolute inset-0 bg-gradient-to-br from-midnight-blue/30 to-twilight-blue/30 backdrop-blur-3xl"></div>
    
    <div class="relative max-w-7xl mx-auto">
      <!-- 區域標題 -->
      <div class="text-center mb-16">
        <h2 class="text-4xl sm:text-5xl font-bold mb-6">
          <span class="bg-gradient-to-r from-dream-purple via-cosmic-pink to-emerald-green bg-clip-text text-transparent">
            關於夢鈴
          </span>
        </h2>
        <p class="text-xl text-starlight-gray max-w-3xl mx-auto">
          一個遊走於現實與幻想之間的創作靈魂
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <!-- 個人資訊 -->
        <div class="space-y-6">
          <div class="animate-fade-in-up" style="animation-delay: 0.2s;">
            <p class="text-lg text-starlight-gray leading-relaxed">
              在這個鈴聲迴響的魔法國度裡，我是夢鈴——一位行走在現實與幻想邊界的文字編織者。
            </p>
          </div>
          
          <div class="animate-fade-in-up" style="animation-delay: 0.4s;">
            <p class="text-lg text-starlight-gray leading-relaxed">
              手持魔法之筆，我描繪著溫馨故事中的純真與美好，將細膩的情感與浪漫結晶於字裡行間。
            </p>
          </div>
          
          <div class="animate-fade-in-up" style="animation-delay: 0.6s;">
            <p class="text-lg text-starlight-gray leading-relaxed">
              白天穿梭於程式碼的森林；閒暇時探索金融、政治與醫學，吸收著這個世界的千姿百態。
            </p>
          </div>
          
          <div class="animate-fade-in-up" style="animation-delay: 0.8s;">
            <p class="text-lg text-starlight-gray leading-relaxed">
              我時常沉浸於視覺小說與各種故事中，讓思緒在二次元與三次元的世界間自由遨遊。
            </p>
          </div>

          <!-- 技能標籤 -->
          <div class="animate-fade-in-up pt-8" style="animation-delay: 1s;">
            <h3 class="text-xl font-bold text-snow-white mb-4">專長領域</h3>
            <div class="flex flex-wrap gap-3">
              <SkillTag v-for="skill in skills" :key="skill.name" :skill="skill" />
            </div>
          </div>
        </div>

        <!-- 個人照片 -->
        <div class="relative animate-fade-in-up" style="animation-delay: 1.2s;">
          <div class="relative group">
            <!-- 背景光效 -->
            <div class="absolute -inset-8 bg-gradient-to-br from-dream-purple/20 via-cosmic-pink/20 to-emerald-green/20 rounded-3xl blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
            
            <!-- 圖片容器 -->
            <div class="relative w-80 h-80 mx-auto rounded-3xl overflow-hidden border-4 border-gradient-to-br from-dream-purple via-cosmic-pink to-emerald-green shadow-2xl group-hover:scale-105 transition-transform duration-500">
              <img 
                src="/images/dreambell_profile.png" 
                alt="Dream Bell Avatar" 
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              <!-- 懸停遮罩 -->
              <div class="absolute inset-0 bg-gradient-to-t from-midnight-blue/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <!-- 懸停文字 -->
              <div class="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                <p class="text-snow-white font-medium">夢想編織者</p>
                <p class="text-starlight-gray text-sm">創作 ✦ 程式 ✦ 思考</p>
              </div>
            </div>
            
            <!-- 裝飾元素 -->
            <div class="absolute top-4 -right-4 w-24 h-24 bg-gradient-to-br from-cosmic-pink/20 to-emerald-green/20 rounded-full blur-xl animate-pulse-gentle"></div>
            <div class="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-dream-purple/20 to-cosmic-pink/20 rounded-full blur-xl animate-pulse-gentle" style="animation-delay: 2s;"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const skills = [
  { name: '輕小說創作', color: 'from-dream-purple to-cosmic-pink', icon: 'heroicons:book-open' },
  { name: 'Vue.js 開發', color: 'from-emerald-green to-aurora-cyan', icon: 'heroicons:code-bracket' },
  { name: 'AI 工具應用', color: 'from-cosmic-pink to-rose-gold', icon: 'heroicons:cpu-chip' },
  { name: '投資分析', color: 'from-rose-gold to-emerald-green', icon: 'heroicons:chart-bar' },
  { name: '健康諮詢', color: 'from-aurora-cyan to-dream-purple', icon: 'heroicons:heart' },
  { name: '政治觀察', color: 'from-dream-purple to-emerald-green', icon: 'heroicons:light-bulb' }
]
</script>

<style scoped>
.animate-fade-in-up {
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 0.8s ease-out forwards;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-pulse-gentle {
  animation: pulseGentle 4s ease-in-out infinite;
}

@keyframes pulseGentle {
  0%, 100% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 0.9;
    transform: scale(1.1);
  }
}
</style>