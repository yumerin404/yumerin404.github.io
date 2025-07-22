<template>
  <div class="gradient-bg text-soft-text-primary min-h-screen">
    <!-- Hero Section -->
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
      <!-- Floating decorations -->
      <div class="floating-element w-32 h-32 top-20 left-20 animate-float-gentle" style="animation-delay: 0s;"></div>
      <div class="floating-element w-24 h-24 top-40 right-32 animate-float-gentle" style="animation-delay: 2s;"></div>
      <div class="floating-element w-40 h-40 bottom-32 left-40 animate-float-gentle" style="animation-delay: 4s;"></div>
      
      <!-- Sparkles -->
      <div class="sparkle top-1/4 left-1/3 animate-sparkle" style="animation-delay: 0s;"></div>
      <div class="sparkle top-1/3 right-1/4 animate-sparkle" style="animation-delay: 1s;"></div>
      <div class="sparkle bottom-1/3 left-1/4 animate-sparkle" style="animation-delay: 2s;"></div>
      <div class="sparkle top-1/2 right-1/3 animate-sparkle" style="animation-delay: 3s;"></div>

      <div class="relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="animate-slide-up">
          <h1 class="text-5xl sm:text-6xl md:text-7xl font-bold mb-6">
            <span class="text-gradient">夢鈴</span><br>
            <span class="text-soft-text-contrast">幻想</span>
          </h1>
          <p class="text-xl md:text-2xl text-soft-text-dim mb-10 max-w-3xl mx-auto leading-relaxed">
            一個充滿魔法的幻想國度，故事在此甦醒，魔法工具賦予創作靈感，思緒綻放成絢爛的奇幻篇章
          </p>

          <div class="flex flex-col sm:flex-row justify-center gap-6 mb-12">
            <Button 
              size="xl" 
              variant="primary" 
              icon="heroicons:book-open" 
              @click="$router.push('/novels')"
              class="animate-fade-in"
              style="animation-delay: 0.2s"
            >
              探索輕小說
            </Button>
            <Button 
              size="md" 
              variant="secondary" 
              icon="heroicons:wrench-screwdriver" 
              @click="$router.push('/tools')"
              class="animate-fade-in"
              style="animation-delay: 0.4s"
            >
              程式與工具
            </Button>
            <Button 
              size="md" 
              variant="ghost" 
              icon="heroicons:pencil-square" 
              @click="$router.push('/blog')"
              class="animate-fade-in"
              style="animation-delay: 0.6s"
            >
              心境筆記
            </Button>
          </div>

          <!-- Threads Button -->
          <div class="flex justify-center">
            <a href="https://www.threads.com/@yumerin.main.i" target="_blank" 
               class="threads-button px-8 py-4 rounded-extra-soft inline-flex items-center justify-center group transform hover:scale-105 transition-all duration-300 animate-zoom-in"
               style="animation-delay: 0.8s">
                <Icon name="heroicons:link" class="text-2xl mr-4 group-hover:scale-110 transition-transform" />
                <div class="text-left">
                    <div class="text-lg font-bold">追蹤我的創作</div>
                    <div class="text-sm opacity-80">在 Threads 上與我連結</div>
                </div>
                <Icon name="heroicons:arrow-right" class="ml-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      <!-- Floating book decoration -->
      <div class="hidden lg:block absolute top-1/4 right-10 animate-float-gentle" style="animation-delay: 1s;">
        <div class="relative w-16 h-20 transform rotate-12">
          <div class="absolute inset-0 bg-gradient-to-br from-soft-accent-primary to-soft-accent-secondary rounded-r-md rounded-b-md shadow-lg"></div>
          <div class="absolute inset-y-0 left-0 w-1/6 bg-soft-accent-tertiary rounded-l-md"></div>
          <div class="absolute inset-x-0 top-0 h-1/4 w-5/6 ml-auto bg-white bg-opacity-20 rounded-tr-md"></div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold mb-4 text-gradient">創意宇宙</h2>
          <p class="text-xl text-soft-text-dim max-w-3xl mx-auto">
            深入想像的奇幻世界，這裡每個故事都有靈魂，每個魔法工具都有其神聖使命
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Novel Feature Card -->
          <Card variant="featured" size="lg" class="animate-slide-in-left" style="animation-delay: 0.2s">
            <div class="h-64 overflow-hidden">
              <img src="/images/featured/novels.jpg" alt="Novel Collection"
                  class="w-full h-full object-cover transition-transform duration-700 hover:scale-110">
            </div>
            <div class="p-8">
              <div class="flex items-center mb-6">
                <div class="bg-gradient-to-br from-soft-accent-primary to-soft-accent-secondary rounded-full p-4 mr-4">
                  <Icon name="heroicons:book-open" class="text-soft-dark-primary text-xl" />
                </div>
                <h3 class="text-2xl font-bold text-soft-text-contrast">輕小說集</h3>
              </div>
              <p class="text-soft-text-secondary mb-6 leading-relaxed">
                沉浸於《來自第二次人生～命運交織的重生之旅～》的奇幻世界中，
                一個充滿愛情、魔法與可愛角色的溫馨故事。
              </p>
              <NuxtLink to="/novels" class="inline-flex items-center text-soft-accent-primary hover:text-soft-accent-secondary transition-colors font-medium">
                閱讀更多 <Icon name="heroicons:arrow-right" class="ml-2" />
              </NuxtLink>
            </div>
          </Card>

          <!-- Tools Feature Card -->
          <Card variant="featured" size="lg" class="animate-slide-in-right" style="animation-delay: 0.4s">
            <div class="h-64 overflow-hidden">
              <img src="/images/featured/tools.jpg" alt="Creative Tools"
                  class="w-full h-full object-cover transition-transform duration-700 hover:scale-110">
            </div>
            <div class="p-8">
              <div class="flex items-center mb-6">
                <div class="bg-gradient-to-br from-soft-accent-secondary to-soft-accent-tertiary rounded-full p-4 mr-4">
                  <Icon name="heroicons:wrench-screwdriver" class="text-soft-dark-primary text-xl" />
                </div>
                <h3 class="text-2xl font-bold text-soft-text-contrast">程式與工具</h3>
              </div>
              <p class="text-soft-text-secondary mb-6 leading-relaxed">
                探索強大的程式工具與實用軟體，它們被精心設計來提升你的數位體驗，
                並為創作流程注入便利性。
              </p>
              <NuxtLink to="/tools" class="inline-flex items-center text-soft-accent-primary hover:text-soft-accent-secondary transition-colors font-medium">
                探索工具 <Icon name="heroicons:arrow-right" class="ml-2" />
              </NuxtLink>
            </div>
          </Card>

          <!-- AI Feature Card -->
          <Card variant="featured" size="lg" class="animate-zoom-in" style="animation-delay: 0.6s">
            <div class="h-64 overflow-hidden bg-gradient-to-br from-soft-dark-secondary to-soft-dark-tertiary flex items-center justify-center">
              <div class="text-center">
                <Icon name="heroicons:cpu-chip" class="text-6xl text-soft-accent-primary mb-4 animate-pulse-soft" />
                <div class="text-soft-accent-primary font-bold text-lg">AI 心得分享</div>
              </div>
            </div>
            <div class="p-8">
              <div class="flex items-center mb-6">
                <div class="bg-gradient-to-br from-soft-accent-primary to-soft-accent-tertiary rounded-full p-4 mr-4">
                  <Icon name="heroicons:brain" class="text-soft-dark-primary text-xl" />
                </div>
                <h3 class="text-2xl font-bold text-soft-text-contrast">AI 心得</h3>
              </div>
              <p class="text-soft-text-secondary mb-6 leading-relaxed">
                探索人工智慧的無限可能，從 ComfyUI 工作流程到先進的生成模型，
                分享 AI 使用心得與技術見解。
              </p>
              <NuxtLink to="/ai" class="inline-flex items-center text-soft-accent-primary hover:text-soft-accent-secondary transition-colors font-medium">
                閱讀心得 <Icon name="heroicons:arrow-right" class="ml-2" />
              </NuxtLink>
            </div>
          </Card>

          <!-- Blog Feature Card -->
          <Card variant="featured" size="lg" class="animate-rotate-in" style="animation-delay: 0.8s">
            <div class="h-64 overflow-hidden bg-gradient-to-br from-soft-dark-secondary to-soft-dark-tertiary flex items-center justify-center">
              <div class="text-center">
                <Icon name="heroicons:pencil-square" class="text-6xl text-soft-accent-secondary mb-4 animate-pulse-soft" />
                <div class="text-soft-accent-secondary font-bold text-lg">創作心境</div>
              </div>
            </div>
            <div class="p-8">
              <div class="flex items-center mb-6">
                <div class="bg-gradient-to-br from-soft-accent-secondary to-soft-accent-primary rounded-full p-4 mr-4">
                  <Icon name="heroicons:pencil" class="text-soft-dark-primary text-xl" />
                </div>
                <h3 class="text-2xl font-bold text-soft-text-contrast">心境筆記</h3>
              </div>
              <p class="text-soft-text-secondary mb-6 leading-relaxed">
                記錄創作路上的點點滴滴，分享在夢想與現實之間游走的心境感悟，
                與你一同探索創作者的內心世界。
              </p>
              <NuxtLink to="/blog" class="inline-flex items-center text-soft-accent-primary hover:text-soft-accent-secondary transition-colors font-medium">
                閱讀筆記 <Icon name="heroicons:arrow-right" class="ml-2" />
              </NuxtLink>
            </div>
          </Card>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section class="py-20 glass-effect">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold mb-4 text-gradient">關於夢鈴</h2>
          <p class="text-xl text-soft-text-dim max-w-3xl mx-auto">
            一個遊走於現實與幻想之間的創作靈魂，用愛心編織故事與魔法工具
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div class="space-y-6">
            <p class="text-lg text-soft-text-secondary leading-relaxed">
              在這個鈴聲迴響的魔法國度裡，我是夢鈴——一位行走在現實與幻想邊界的文字編織者。
            </p>
            <p class="text-lg text-soft-text-secondary leading-relaxed">
              手持魔法之筆，我描繪著溫馨故事中的純真與美好，
              將細膩的情感與浪漫結晶於字裡行間。
            </p>
            <p class="text-lg text-soft-text-secondary leading-relaxed">
              白天穿梭於程式碼的森林；閒暇時探索金融、政治與醫學，
              吸收著這個世界的千姿百態。
            </p>
            <p class="text-lg text-soft-text-secondary leading-relaxed">
              我時常沉浸於視覺小說與各種故事中，讓思緒在二次元與三次元的世界間自由遨遊。
            </p>
          </div>

          <div class="relative">
            <div class="absolute -inset-4 bg-gradient-to-br from-soft-accent-primary to-soft-accent-secondary rounded-extra-soft opacity-20 blur-xl"></div>
            <div class="relative rounded-full overflow-hidden shadow-2xl border-4 border-soft-accent-primary h-80 w-80 mx-auto">
              <img src="/images/dreambell_profile.png" alt="Dream Bell Avatar" 
                   class="w-full h-full object-cover transition-transform duration-500 hover:scale-110">
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="py-16 text-center">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="glass-effect rounded-extra-soft p-12">
          <h2 class="text-3xl font-bold mb-6 text-gradient">開始你的奇幻旅程</h2>
          <p class="text-xl text-soft-text-dim mb-8">
            踏入一個創意無界限的魔法世界，每個故事都閃耀著獨特的光芒
          </p>
          <NuxtLink to="/novels"
              class="button-primary px-10 py-4 rounded-extra-soft text-lg font-medium inline-flex items-center justify-center">
              <Icon name="heroicons:sparkles" class="mr-3" />
              <span>開始閱讀</span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="glass-effect text-soft-text-dim py-8 mt-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="border-t border-soft-accent-primary border-opacity-20 pt-8 text-center">
          <p>&copy; 2025 夢鈴幻想. 所有權利保留，以愛創作.</p>
        </div>
      </div>
    </footer>

    <!-- Back to Top Button -->
    <button v-show="showBackToTop" @click="scrollToTop"
        class="fixed bottom-8 right-8 p-4 rounded-full bg-gradient-to-br from-soft-accent-primary to-soft-accent-secondary text-soft-dark-primary shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl">
        <Icon name="heroicons:arrow-up" class="text-lg" />
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const showBackToTop = ref(false)

const handleScroll = () => {
  showBackToTop.value = window.pageYOffset > 300
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// Meta tags
useSeoMeta({
  title: '夢鈴幻想 | 首頁',
  description: '一個充滿魔法的幻想國度，故事在此甦醒，魔法工具賦予創作靈感，思緒綻放成絢爛的奇幻篇章',
  keywords: '夢鈴幻想, 輕小說, 程式工具, AI心得, 創作, 幻想世界'
})
</script>

<style scoped>
.gradient-bg {
  background: linear-gradient(135deg, #0a0e1a 0%, #1a1e2e 50%, #2a2e3e 100%);
}

.text-gradient {
  background: linear-gradient(135deg, #c8a8e9 0%, #f8b4d9 50%, #a8e6cf 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.glass-effect {
  backdrop-filter: blur(20px);
  background: rgba(26, 30, 46, 0.7);
  border: 1px solid rgba(200, 168, 233, 0.2);
}

.button-primary {
  background: linear-gradient(135deg, #c8a8e9 0%, #f8b4d9 100%);
  color: #0a0e1a;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.button-primary::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.button-primary:hover::before {
  left: 100%;
}

.button-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(200, 168, 233, 0.4);
}

.threads-button {
  background: linear-gradient(135deg, #c8a8e9 0%, #f8b4d9 100%);
  color: #0a0e1a;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  border: 2px solid transparent;
  background-clip: padding-box;
}

.threads-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.6s;
}

.threads-button:hover::before {
  left: 100%;
}

.threads-button:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 15px 35px rgba(200, 168, 233, 0.4), 0 5px 15px rgba(248, 180, 217, 0.3);
}

.feature-card {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(200, 168, 233, 0.1);
  background: rgba(26, 30, 46, 0.8);
}

.feature-card:hover {
  transform: translateY(-8px) scale(1.02);
  border-color: rgba(200, 168, 233, 0.3);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(200, 168, 233, 0.2);
}

.sparkle {
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #c8a8e9;
}

.floating-element {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(200, 168, 233, 0.1) 0%, transparent 70%);
}

@keyframes float-gentle {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-8px) rotate(1deg); }
}

@keyframes pulse-soft {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 0.9; }
}

@keyframes sparkle {
  0%, 100% { opacity: 0; transform: scale(0); }
  50% { opacity: 1; transform: scale(1); }
}

@keyframes slide-up {
  0% { transform: translateY(30px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}

.animate-float-gentle {
  animation: float-gentle 6s ease-in-out infinite;
}

.animate-pulse-soft {
  animation: pulse-soft 3s ease-in-out infinite;
}

.animate-sparkle {
  animation: sparkle 2s ease-in-out infinite;
}

.animate-slide-up {
  animation: slide-up 0.6s ease-out;
}

.rounded-extra-soft {
  border-radius: 20px;
}
</style>