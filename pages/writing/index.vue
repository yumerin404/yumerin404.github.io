<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
    <!-- Header -->
    <Header />

    <!-- Decorative Background Elements -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none opacity-30">
      <div class="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-full blur-2xl animate-float"></div>
      <div class="absolute top-1/3 right-20 w-20 h-20 bg-gradient-to-br from-amber-400/20 to-yellow-500/20 rounded-full blur-xl animate-float-delayed"></div>
      <div class="absolute bottom-20 left-1/3 w-16 h-16 bg-gradient-to-br from-orange-400/15 to-amber-500/15 rounded-full blur-lg animate-float-slow"></div>
    </div>

    <!-- Main Content -->
    <main class="relative z-10 pt-20">
      <!-- Hero Section -->
      <section class="py-16 px-4 relative">
        <div class="container mx-auto max-w-6xl text-center">
          <div class="mb-12 animate-fade-in-up">
            <!-- Classical Icon -->
            <div class="flex justify-center items-center mb-8">
              <div class="relative">
                <div class="w-24 h-24 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-3xl flex items-center justify-center backdrop-blur-sm border border-amber-500/30 group hover:scale-105 transition-all duration-500">
                  <Icon name="heroicons:book-open" class="w-12 h-12 text-amber-400 group-hover:rotate-12 transition-transform duration-500" />
                  
                  <!-- Floating particles -->
                  <div class="absolute -top-1 -right-1 w-3 h-3 bg-amber-400/60 rounded-full animate-ping"></div>
                  <div class="absolute -bottom-2 -left-1 w-2 h-2 bg-orange-400/60 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
            
            <h1 class="text-5xl md:text-7xl font-bold mb-8 relative">
              <span class="bg-gradient-to-r from-amber-300 via-orange-300 to-yellow-300 bg-clip-text text-transparent drop-shadow-lg">
                寫作技巧
              </span>
              <div class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full opacity-80"></div>
            </h1>
            
            <p class="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12">
              深入探索說故事的藝術，從技法到心法，從形式到本質
            </p>

            <!-- Decorative separator -->
            <div class="flex items-center justify-center mb-12">
              <div class="h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent w-32"></div>
              <div class="mx-4 w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
              <div class="h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent w-32"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Navigation Cards Section -->
      <section class="py-16 px-4">
        <div class="container mx-auto max-w-5xl">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Writing Insights Card -->
            <NuxtLink 
              to="/writing/insights"
              class="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-amber-500/20 hover:border-amber-500/40 transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl hover:shadow-amber-500/20"
            >
              <!-- Card Background Pattern -->
              <div class="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              <!-- Card Content -->
              <div class="relative p-8 md:p-12">
                <!-- Icon -->
                <div class="mb-6">
                  <div class="w-16 h-16 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-2xl flex items-center justify-center border border-amber-500/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <Icon name="heroicons:light-bulb" class="w-8 h-8 text-amber-400" />
                  </div>
                </div>

                <!-- Title -->
                <h2 class="text-3xl font-bold mb-4 bg-gradient-to-r from-amber-300 to-orange-300 bg-clip-text text-transparent">
                  寫作技巧心得
                </h2>

                <!-- Description -->
                <p class="text-gray-300 text-lg leading-relaxed mb-6">
                  分享創作過程中的經驗與體悟，探討寫作技巧的實際應用，從構思到完稿的創作心路歷程。
                </p>

                <!-- Features -->
                <ul class="space-y-2 mb-8">
                  <li class="flex items-center text-gray-400">
                    <div class="w-1.5 h-1.5 bg-amber-400 rounded-full mr-3"></div>
                    創作經驗分享
                  </li>
                  <li class="flex items-center text-gray-400">
                    <div class="w-1.5 h-1.5 bg-amber-400 rounded-full mr-3"></div>
                    寫作技巧實踐
                  </li>
                  <li class="flex items-center text-gray-400">
                    <div class="w-1.5 h-1.5 bg-amber-400 rounded-full mr-3"></div>
                    創作心法探討
                  </li>
                </ul>

                <!-- CTA -->
                <div class="flex items-center text-amber-400 font-medium group-hover:text-amber-300 transition-colors duration-300">
                  <span>探索心得</span>
                  <Icon name="heroicons:arrow-right" class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>

              <!-- Hover glow effect -->
              <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent"></div>
                <div class="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-400/50 to-transparent"></div>
              </div>
            </NuxtLink>

            <!-- Story Anatomy Card -->
            <NuxtLink 
              to="/writing/story-anatomy"
              class="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-orange-500/20 hover:border-orange-500/40 transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl hover:shadow-orange-500/20"
            >
              <!-- Card Background Pattern -->
              <div class="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              <!-- Card Content -->
              <div class="relative p-8 md:p-12">
                <!-- Icon -->
                <div class="mb-6">
                  <div class="w-16 h-16 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl flex items-center justify-center border border-orange-500/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <Icon name="heroicons:beaker" class="w-8 h-8 text-orange-400" />
                  </div>
                </div>

                <!-- Title -->
                <h2 class="text-3xl font-bold mb-4 bg-gradient-to-r from-orange-300 to-red-300 bg-clip-text text-transparent">
                  故事的解剖筆記
                </h2>

                <!-- Description -->
                <p class="text-gray-300 text-lg leading-relaxed mb-6">
                  深入分析故事結構的本質，探討角色塑造、情節發展、主題表達等核心元素的創作原理。
                </p>

                <!-- Features -->
                <ul class="space-y-2 mb-8">
                  <li class="flex items-center text-gray-400">
                    <div class="w-1.5 h-1.5 bg-orange-400 rounded-full mr-3"></div>
                    故事結構分析
                  </li>
                  <li class="flex items-center text-gray-400">
                    <div class="w-1.5 h-1.5 bg-orange-400 rounded-full mr-3"></div>
                    角色塑造技法
                  </li>
                  <li class="flex items-center text-gray-400">
                    <div class="w-1.5 h-1.5 bg-orange-400 rounded-full mr-3"></div>
                    創作理論探索
                  </li>
                </ul>

                <!-- CTA -->
                <div class="flex items-center text-orange-400 font-medium group-hover:text-orange-300 transition-colors duration-300">
                  <span>深入解剖</span>
                  <Icon name="heroicons:arrow-right" class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>

              <!-- Hover glow effect -->
              <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-400/50 to-transparent"></div>
                <div class="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-red-400/50 to-transparent"></div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </section>

      <!-- Inspirational Quote Section -->
      <section class="py-16 px-4">
        <div class="container mx-auto max-w-4xl">
          <div class="relative">
            <!-- Background decoration -->
            <div class="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-orange-500/5 rounded-3xl blur-3xl"></div>
            
            <!-- Quote container -->
            <div class="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-amber-500/20">
              <!-- Quote mark -->
              <div class="text-6xl text-amber-400/30 font-serif mb-4">"</div>
              
              <!-- Quote text -->
              <blockquote class="text-2xl md:text-3xl font-light text-gray-200 leading-relaxed text-center mb-8">
                創作的本質是你必須熱愛你所創作的。<br>
                <span class="text-amber-400 font-medium">這是你寫的故事，你想要看到的故事。</span>
              </blockquote>
              
              <!-- Attribution -->
              <div class="text-center">
                <div class="inline-flex items-center">
                  <div class="w-12 h-0.5 bg-gradient-to-r from-transparent to-amber-400/50 mr-4"></div>
                  <span class="text-amber-400/80 font-medium">故事的解剖</span>
                  <div class="w-12 h-0.5 bg-gradient-to-l from-transparent to-amber-400/50 ml-4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
// SEO 設定
useHead({
  title: '寫作技巧 - 夢鈴領域',
  meta: [
    { 
      name: 'description', 
      content: '探索說故事的藝術，分享寫作技巧心得與故事解剖筆記。深入了解創作的技法與心法，從構思到完稿的創作歷程。' 
    },
    { 
      name: 'keywords', 
      content: '寫作技巧, 創作心得, 故事結構, 角色塑造, 小說寫作, 文學創作, 說故事技法, 創作理論' 
    },
    {
      property: 'og:title',
      content: '寫作技巧 - 夢鈴領域'
    },
    {
      property: 'og:description',
      content: '深入探索說故事的藝術，分享創作經驗與寫作技巧，從技法到心法的全面指南。'
    }
  ]
})
</script>

<style scoped>
@keyframes fade-in-up {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  33% {
    transform: translateY(-10px) rotate(1deg);
  }
  66% {
    transform: translateY(-5px) rotate(-1deg);
  }
}

@keyframes float-delayed {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  33% {
    transform: translateY(-15px) rotate(-1deg);
  }
  66% {
    transform: translateY(-8px) rotate(1deg);
  }
}

@keyframes float-slow {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-12px) rotate(2deg);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out;
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 8s ease-in-out infinite;
  animation-delay: 2s;
}

.animate-float-slow {
  animation: float-slow 10s ease-in-out infinite;
  animation-delay: 4s;
}
</style>