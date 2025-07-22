<template>
  <section class="relative py-24 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto text-center">
      <!-- 背景裝飾 -->
      <div class="absolute inset-0 bg-gradient-to-br from-midnight-blue/60 via-twilight-blue/40 to-midnight-blue/60 backdrop-blur-3xl rounded-3xl"></div>
      <div class="absolute inset-0 bg-gradient-to-br from-dream-purple/10 via-cosmic-pink/5 to-emerald-green/10 rounded-3xl"></div>
      
      <div class="relative z-10 py-16">
        <!-- 主標題 -->
        <div class="animate-fade-in-up" style="animation-delay: 0.2s;">
          <h2 class="text-4xl sm:text-5xl font-bold mb-6">
            <span class="bg-gradient-to-r from-dream-purple via-cosmic-pink to-emerald-green bg-clip-text text-transparent">
              開始你的奇幻旅程
            </span>
          </h2>
        </div>
        
        <!-- 描述 -->
        <div class="animate-fade-in-up" style="animation-delay: 0.4s;">
          <p class="text-xl text-starlight-gray mb-12 max-w-2xl mx-auto leading-relaxed">
            踏入一個創意無界限的魔法世界，每個故事都閃耀著獨特的光芒，每個工具都蘊含著無限可能
          </p>
        </div>
        
        <!-- 行動按鈕組 -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
          <AnimatedButton
            variant="primary"
            size="xl"
            icon="heroicons:sparkles"
            href="/novels"
            class="animate-fade-in-up hover:scale-110"
            style="animation-delay: 0.6s;"
          >
            開始閱讀
          </AnimatedButton>
          
          <AnimatedButton
            variant="secondary"
            size="lg"
            icon="heroicons:envelope"
            href="mailto:contact@yumerin.fantasy"
            external
            class="animate-fade-in-up"
            style="animation-delay: 0.8s;"
          >
            聯絡我
          </AnimatedButton>
        </div>
        
        <!-- 統計數據 -->
        <div class="animate-fade-in-up" style="animation-delay: 1s;">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <StatCard
              :number="12"
              label="故事章節"
              icon="heroicons:book-open"
              gradient="from-dream-purple to-cosmic-pink"
            />
            <StatCard
              :number="24"
              label="實用工具"
              icon="heroicons:wrench-screwdriver"
              gradient="from-cosmic-pink to-emerald-green"
            />
            <StatCard
              :number="36"
              label="心得筆記"
              icon="heroicons:pencil-square"
              gradient="from-emerald-green to-aurora-cyan"
            />
          </div>
        </div>
      </div>
      
      <!-- 裝飾粒子 -->
      <div class="absolute top-8 left-8 w-4 h-4 bg-dream-purple rounded-full animate-float-particle opacity-60"></div>
      <div class="absolute top-16 right-12 w-3 h-3 bg-cosmic-pink rounded-full animate-float-particle opacity-40" style="animation-delay: 2s;"></div>
      <div class="absolute bottom-12 left-16 w-5 h-5 bg-emerald-green rounded-full animate-float-particle opacity-50" style="animation-delay: 4s;"></div>
      <div class="absolute bottom-8 right-8 w-2 h-2 bg-aurora-cyan rounded-full animate-float-particle opacity-70" style="animation-delay: 6s;"></div>
    </div>
  </section>
</template>

<script setup>
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

.animate-float-particle {
  animation: floatParticle 8s ease-in-out infinite;
}

@keyframes floatParticle {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  25% {
    transform: translateY(-20px) rotate(90deg);
  }
  50% {
    transform: translateY(-10px) rotate(180deg);
  }
  75% {
    transform: translateY(-30px) rotate(270deg);
  }
}
</style>