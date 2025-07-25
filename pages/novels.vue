<template>
  <div class="min-h-screen relative overflow-hidden">
    <!-- 魔法背景效果 -->
    <div class="fixed inset-0 z-0">
      <!-- 深邃宇宙背景 -->
      <div class="absolute inset-0 bg-gradient-to-br from-slate-950 via-violet-950/30 to-slate-900"></div>
      
      <!-- 魔法粒子層 -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <!-- 漂浮的魔法星塵 -->
        <div 
          v-for="i in 30" 
          :key="`magic-particle-${i}`"
          class="absolute w-1 h-1 bg-violet-400/30 rounded-full animate-pulse"
          :style="getMagicParticleStyle(i)"
        ></div>
        
        <!-- 魔法流星 -->
        <div 
          v-for="i in 5" 
          :key="`magic-meteor-${i}`"
          class="absolute w-2 h-0.5 bg-gradient-to-r from-transparent via-purple-400/70 to-transparent rounded-full animate-meteor-shower"
          :style="getMagicMeteorStyle(i)"
        ></div>
        
        <!-- 魔法能量波紋 -->
        <div 
          v-for="i in 8" 
          :key="`magic-ripple-${i}`"
          class="absolute rounded-full border border-violet-400/10 animate-cosmic-glow"
          :style="getMagicRippleStyle(i)"
        ></div>
      </div>
      
      <!-- 魔法漸層覆蓋 -->
      <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-violet-950/20"></div>
    </div>

    <!-- Header -->
    <Header />

    <!-- Main Content -->
    <main class="relative z-10 pt-20 pb-16">
      <!-- Hero Section -->
      <section class="py-16 px-4">
        <div class="container mx-auto max-w-6xl">
          <!-- 魔法標題區域 -->
          <div class="text-center mb-16 animate-fade-in-up">
            <!-- 裝飾性魔法線條 -->
            <div class="flex justify-center items-center mb-8">
              <div class="w-24 h-0.5 bg-gradient-to-r from-transparent via-violet-400 to-transparent animate-glow"></div>
              <div class="mx-6 w-3 h-3 border-2 border-violet-400 rounded-full animate-pulse"></div>
              <div class="w-24 h-0.5 bg-gradient-to-r from-transparent via-violet-400 to-transparent animate-glow"></div>
            </div>

            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gradient animate-cosmic-text">
              魔法輕小說世界
            </h1>
            
            <p class="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-200">
              踏入奇幻的魔法領域，體驗跨越時空的浪漫冒險故事
            </p>
          </div>
        </div>
      </section>

      <!-- Tab Navigation -->
      <section class="px-4 mb-12">
        <div class="container mx-auto max-w-6xl">
          <div class="glass rounded-2xl p-2 mb-8">
            <nav class="flex flex-wrap justify-center space-x-2">
              <button
                v-for="(tab, index) in tabs"
                :key="tab.id"
                @click="activeTab = tab.id"
                :class="[
                  'relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 group overflow-hidden',
                  activeTab === tab.id 
                    ? 'text-white bg-gradient-to-r from-violet-600 to-purple-600 shadow-lg shadow-violet-500/25' 
                    : 'text-gray-400 hover:text-white hover:bg-slate-800/60'
                ]"
                :style="{ animationDelay: `${index * 100}ms` }"
                class="animate-fade-in-up"
              >
                <!-- 按鈕魔法效果 -->
                <div v-if="activeTab === tab.id" class="absolute inset-0 bg-gradient-to-r from-violet-600/80 to-purple-600/80 rounded-xl animate-glow"></div>
                <div v-else class="absolute inset-0 bg-gradient-to-r from-violet-500/0 to-purple-500/0 group-hover:from-violet-500/20 group-hover:to-purple-500/20 rounded-xl transition-all duration-300"></div>
                
                <!-- 魔法粒子效果 -->
                <div v-if="activeTab === tab.id" class="absolute top-1 right-1 w-1 h-1 bg-white rounded-full animate-ping"></div>
                
                <Icon :name="tab.icon" class="inline-block w-5 h-5 mr-2 relative z-10" />
                <span class="relative z-10">{{ tab.name }}</span>
              </button>
            </nav>
          </div>
        </div>
      </section>

      <!-- Tab Content -->
      <section class="px-4">
        <div class="container mx-auto max-w-6xl">
          
          <!-- 故事概要 Tab -->
          <div v-show="activeTab === 'info'" class="animate-fade-in-up">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              <!-- 小說封面 -->
              <div class="lg:col-span-1">
                <div class="card-primary p-6 text-center group">
                  <!-- 封面圖片 -->
                  <div class="relative mb-6 mx-auto max-w-sm group-hover:scale-105 transition-transform duration-500">
                    <div class="absolute inset-0 bg-gradient-to-tr from-violet-600/20 to-purple-600/20 rounded-2xl blur-xl animate-glow"></div>
                    <img 
                      src="/images/novels/featured.jpg" 
                      alt="小說封面" 
                      class="relative z-10 w-full h-auto rounded-2xl shadow-2xl border border-violet-500/30"
                    />
                  </div>

                  <!-- 標籤雲 -->
                  <div class="flex flex-wrap gap-2 justify-center mb-6">
                    <span 
                      v-for="(tag, index) in tags"
                      :key="tag"
                      class="px-3 py-1 rounded-full text-sm font-medium border transition-all duration-300 hover:scale-110 cursor-default"
                      :class="getTagStyle(index)"
                      :style="{ animationDelay: `${index * 100}ms` }"
                    >
                      {{ tag }}
                    </span>
                  </div>

                  <!-- 閱讀統計 -->
                  <div class="grid grid-cols-2 gap-4 text-center">
                    <div class="p-4 rounded-xl bg-slate-800/50 border border-violet-500/20 hover:border-violet-500/40 transition-all duration-300">
                      <div class="text-2xl font-bold text-violet-400 mb-1">3+</div>
                      <div class="text-sm text-gray-400">已完成卷數</div>
                    </div>
                    <div class="p-4 rounded-xl bg-slate-800/50 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
                      <div class="text-2xl font-bold text-purple-400 mb-1">連載中</div>
                      <div class="text-sm text-gray-400">更新狀態</div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 故事內容 -->
              <div class="lg:col-span-2">
                <div class="card-primary p-8">
                  <!-- 標題 -->
                  <h2 class="text-3xl font-bold mb-8 text-gradient">
                    來自第二次人生～命運交織的重生之旅～
                  </h2>

                  <!-- 作者留言 -->
                  <div class="mb-8 p-6 rounded-xl bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/20">
                    <h3 class="text-lg font-semibold text-violet-400 mb-3 flex items-center">
                      <Icon name="heroicons:chat-bubble-left-ellipsis" class="w-5 h-5 mr-2" />
                      作者留言
                    </h3>
                    <p class="text-gray-300 italic">
                      「如果我超過三個月沒有更新或者動靜，那大概就是死了」
                    </p>
                  </div>

                  <!-- 故事大綱 -->
                  <div class="mb-8">
                    <h3 class="text-xl font-semibold text-purple-400 mb-4 flex items-center">
                      <Icon name="heroicons:book-open" class="w-6 h-6 mr-2" />
                      故事大綱
                    </h3>
                    <div class="space-y-4 text-gray-300 leading-relaxed">
                      <p>如果有機會重來一次，你會選擇怎樣的人生？</p>
                      <p>短暫的人類壽命註定了我必須早早離開這個世界，留下兩位摯愛的妻子和我最珍視的家人...</p>
                      <p>那一刻，我迫切地渴望著——如果能再次與她們共度時光，再次守護她們...</p>
                      <p>奇蹟般地，我帶著前世的記憶重生到了這個世界。</p>
                      <p>全新的人生，全新的青梅竹馬，以及依然存在的妻子和女兒們。</p>
                      <p>但是，命運的齒輪已悄然開始轉動，全新的故事即將展開。</p>
                      <p>這一次，我能改變未來，守護我深愛的人嗎？還是說命運早已註定，無法逃脫？</p>
                      <p>這是一部跨越時空的浪漫喜劇，編織著前世今生、不同視角和異世界冒險的故事。</p>
                      <p>這不僅僅是一個關於愛情與記憶的故事，更是一段挑戰命運本身的旅程。</p>
                    </div>
                  </div>

                  <!-- 閱讀指南 -->
                  <div class="p-6 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20">
                    <h3 class="text-lg font-semibold text-cyan-400 mb-3 flex items-center">
                      <Icon name="heroicons:light-bulb" class="w-5 h-5 mr-2" />
                      閱讀指南
                    </h3>
                    <p class="text-gray-300 leading-relaxed">
                      這是一部充滿浪漫喜劇元素的作品。故事在不同的時間線、記憶和前世之間穿梭，
                      涉及國家、異世界和多重視角轉換。讀者需要沉浸在每個角色的內心世界中，
                      而不是僅僅從自己的角度去理解故事。請特別注意每章的時間線和視角變化，
                      才能真正感受這個跨越時空的動人故事。
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- 快速閱讀按鈕 -->
            <div class="flex flex-col sm:flex-row justify-center gap-4 mt-12">
              <a
                href="https://masiro.me/admin/novelView?novel_id=711"
                target="_blank"
                class="group btn-primary px-8 py-4 rounded-xl text-lg font-semibold inline-flex items-center justify-center overflow-hidden relative"
                @click="onButtonClick"
              >
                <div class="absolute inset-0 bg-gradient-to-r from-violet-600/80 to-purple-600/80 rounded-xl animate-glow"></div>
                <Icon name="heroicons:book-open" class="w-6 h-6 mr-3 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                <span class="relative z-10">在 Masiro 閱讀（主站）</span>
                <!-- 按鈕魔法粒子 -->
                <div class="absolute top-2 right-2 w-1 h-1 bg-white/80 rounded-full animate-ping"></div>
              </a>
              
              <a
                href="https://www.pixiv.net/users/108590809/novels"
                target="_blank"
                class="group btn-secondary px-8 py-4 rounded-xl text-lg font-medium inline-flex items-center justify-center overflow-hidden relative"
                @click="onButtonClick"
              >
                <div class="absolute inset-0 bg-gradient-to-r from-pink-500/0 to-purple-500/0 group-hover:from-pink-500/20 group-hover:to-purple-500/20 rounded-xl transition-all duration-300"></div>
                <Icon name="heroicons:paint-brush" class="w-6 h-6 mr-3 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                <span class="relative z-10">在 Pixiv 閱讀</span>
              </a>
            </div>
          </div>

          <!-- 角色圖廊 Tab -->
          <div v-show="activeTab === 'gallery'" class="animate-fade-in-up">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div 
                v-for="(character, index) in characters"
                :key="character.id"
                class="character-card group cursor-pointer"
                :style="{ animationDelay: `${index * 100}ms` }"
                @click="openImageSpotlight(character.image)"
              >
                <!-- 卡片魔法邊框 -->
                <div class="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500/0 to-purple-500/0 group-hover:from-violet-500/30 group-hover:to-purple-500/30 transition-all duration-500 blur-sm"></div>
                
                <div class="relative z-10 card-primary overflow-hidden">
                  <!-- 圖片容器 -->
                  <div class="relative h-64 overflow-hidden">
                    <img 
                      :src="character.image" 
                      :alt="character.title"
                      class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    <!-- 圖片覆蓋層 -->
                    <div class="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <!-- 點擊提示 -->
                    <div class="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                      <div class="flex items-center justify-center space-x-2 text-white">
                        <Icon name="heroicons:magnifying-glass-plus" class="w-5 h-5" />
                        <span class="text-sm font-medium">點擊放大</span>
                      </div>
                    </div>
                  </div>
                  
                  <!-- 角色信息 -->
                  <div class="p-6">
                    <h3 class="text-xl font-bold mb-2 text-white group-hover:text-violet-300 transition-colors duration-300">
                      {{ character.title }}
                    </h3>
                    <p class="text-gray-400 text-sm leading-relaxed">
                      {{ character.description }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 閱讀平台 Tab -->
          <div v-show="activeTab === 'platforms'" class="animate-fade-in-up">
            <div class="text-center mb-12">
              <h2 class="text-3xl font-bold text-gradient mb-4">選擇您的閱讀平台</h2>
              <p class="text-xl text-gray-400">在您喜愛的平台上開始魔法冒險</p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <!-- Masiro 平台 -->
              <a
                href="https://masiro.me/admin/novelView?novel_id=711"
                target="_blank"
                class="group block card-primary p-8 text-center overflow-hidden relative"
                @click="onButtonClick"
              >
                <!-- 背景魔法效果 -->
                <div class="absolute inset-0 bg-gradient-to-br from-violet-500/0 to-purple-500/0 group-hover:from-violet-500/10 group-hover:to-purple-500/10 transition-all duration-500"></div>
                
                <!-- 圖示 -->
                <div class="relative z-10 mb-6">
                  <div class="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-violet-500/25">
                    <Icon name="heroicons:book-open" class="w-10 h-10 text-white" />
                  </div>
                  <!-- 環繞光環 -->
                  <div class="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full border border-violet-400/30 group-hover:border-violet-400/60 transition-colors duration-300 animate-spin-slow"></div>
                </div>
                
                <h3 class="text-2xl font-bold text-white mb-4 group-hover:text-violet-300 transition-colors duration-300">
                  Masiro（主要平台）
                </h3>
                
                <p class="text-gray-300 mb-6 leading-relaxed">
                  我的主要發佈平台，一個專業的輕小說平台，提供舒適的閱讀體驗和穩定的更新
                </p>
                
                <div class="inline-flex items-center text-violet-400 font-medium group-hover:text-violet-300 transition-colors duration-300">
                  <span>開始閱讀</span>
                  <Icon name="heroicons:arrow-right" class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </a>

              <!-- Pixiv 平台 -->
              <a
                href="https://www.pixiv.net/users/108590809/novels"
                target="_blank"
                class="group block card-primary p-8 text-center overflow-hidden relative"
                @click="onButtonClick"
              >
                <!-- 背景魔法效果 -->
                <div class="absolute inset-0 bg-gradient-to-br from-pink-500/0 to-purple-500/0 group-hover:from-pink-500/10 group-hover:to-purple-500/10 transition-all duration-500"></div>
                
                <!-- 圖示 -->
                <div class="relative z-10 mb-6">
                  <div class="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-pink-600 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-pink-500/25">
                    <Icon name="heroicons:paint-brush" class="w-10 h-10 text-white" />
                  </div>
                  <!-- 環繞光環 -->
                  <div class="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full border border-pink-400/30 group-hover:border-pink-400/60 transition-colors duration-300 animate-spin-reverse"></div>
                </div>
                
                <h3 class="text-2xl font-bold text-white mb-4 group-hover:text-pink-300 transition-colors duration-300">
                  Pixiv
                </h3>
                
                <p class="text-gray-300 mb-6 leading-relaxed">
                  歡迎留言和私訊！在這個創作平台上與我連結，分享您的想法和感受
                </p>
                
                <div class="inline-flex items-center text-pink-400 font-medium group-hover:text-pink-300 transition-colors duration-300">
                  <span>造訪 Pixiv</span>
                  <Icon name="heroicons:arrow-right" class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </a>
            </div>
          </div>

        </div>
      </section>
    </main>

    <!-- 圖片放大燈箱 -->
    <div 
      v-if="spotlightImage"
      class="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-lg flex items-center justify-center p-4"
      @click="closeImageSpotlight"
    >
      <div class="relative max-w-4xl max-h-full animate-scale-in">
        <!-- 關閉按鈕 -->
        <button
          @click="closeImageSpotlight"
          class="absolute -top-4 -right-4 z-10 w-10 h-10 bg-slate-800/80 text-white rounded-full hover:bg-slate-700/80 transition-colors duration-300 flex items-center justify-center"
        >
          <Icon name="heroicons:x-mark" class="w-6 h-6" />
        </button>
        
        <!-- 圖片 -->
        <img 
          :src="spotlightImage" 
          alt="放大圖片" 
          class="max-w-full max-h-full object-contain rounded-xl shadow-2xl border border-violet-500/30"
        />
        
        <!-- 魔法邊框效果 -->
        <div class="absolute inset-0 rounded-xl border border-violet-400/20 animate-glow"></div>
      </div>
    </div>

    <!-- 返回頂部按鈕 -->
    <Transition
      enter-active-class="transition-all duration-300"
      enter-from-class="opacity-0 translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-300"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-4"
    >
      <button
        v-if="showBackToTop"
        @click="scrollToTop"
        class="fixed bottom-8 right-8 z-40 w-12 h-12 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-violet-500/25 hover:scale-110 transition-all duration-300 flex items-center justify-center group"
      >
        <Icon name="heroicons:arrow-up" class="w-6 h-6 group-hover:-translate-y-0.5 transition-transform duration-300" />
        <!-- 魔法粒子 -->
        <div class="absolute top-1 right-1 w-1 h-1 bg-white/60 rounded-full animate-ping"></div>
      </button>
    </Transition>

    <!-- Footer -->
    <footer class="relative z-10 py-16 border-t border-slate-800/50 bg-slate-950/80 backdrop-blur-xl mt-20">
      <div class="container mx-auto px-4 text-center">
        <div class="flex justify-center items-center space-x-4 mb-6 animate-fade-in-up">
          <div class="relative w-12 h-12 group">
            <img
              src="/images/avatar.png"
              alt="夢鈴領域"
              class="w-full h-full object-cover rounded-full border border-violet-500/30 group-hover:border-violet-400/60 transition-all duration-300"
            />
            <div class="absolute inset-0 rounded-full bg-violet-400/20 opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-300"></div>
          </div>
          <span class="text-2xl font-bold text-gradient-alt animate-gradient-shift">
            夢鈴領域
          </span>
        </div>
        <p class="text-lg text-gray-400 animate-fade-in-up delay-200">
          © 2025 夢鈴領域. 所有權利保留，以愛創作.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// SEO Meta
useHead({
  title: '魔法輕小說世界 - 夢鈴領域',
  meta: [
    {
      name: 'description',
      content: '探索跨越時空的魔法輕小說世界，體驗「來自第二次人生～命運交織的重生之旅～」的奇幻冒險。'
    },
    {
      property: 'og:title',
      content: '魔法輕小說世界 - 夢鈴領域'
    },
    {
      property: 'og:description',
      content: '踏入奇幻的魔法領域，體驗跨越時空的浪漫冒險故事。'
    }
  ]
})

// Reactive Data
const activeTab = ref('info')
const spotlightImage = ref('')
const showBackToTop = ref(false)

// Tab Configuration
const tabs = [
  { id: 'info', name: '故事概要', icon: 'heroicons:book-open' },
  { id: 'gallery', name: '角色圖廊', icon: 'heroicons:photo' },
  { id: 'platforms', name: '閱讀平台', icon: 'heroicons:link' }
]

// Tags
const tags = [
  '原創', '異世界', '奇幻', '戀愛', '可愛', '魔法', '青梅竹馬', '後宮'
]

// Character Data
const characters = [
  {
    id: 1,
    title: '第一卷 - 封面 - 悠閑的雷娜',
    description: '「哥哥，今天天氣真好呢~~」',
    image: '/images/novels/char1.jpg'
  },
  {
    id: 2,
    title: '前傳 - 月之夢 - 封面',
    description: '「...」『亞當...我想上廁所...』「月亮...你真直接...」「...」『嗯，只有亞當知道~』',
    image: '/images/novels/char2.jpg'
  },
  {
    id: 3,
    title: '第二卷 - 封面 - 焦慮的雷娜',
    description: '(哥哥...)',
    image: '/images/novels/char3.jpg'
  },
  {
    id: 4,
    title: '第2.5卷 - 結尾插圖',
    description: '我最愛哥哥了！',
    image: '/images/novels/char4.jpg'
  },
  {
    id: 5,
    title: '第三卷 - 封面 - 新娘雷娜',
    description: '「哥哥，今天是我們的婚禮~喔~！」',
    image: '/images/novels/char5.jpg'
  }
]

// Methods
const getMagicParticleStyle = (index: number) => {
  const positions = [
    { left: '5%', top: '10%' }, { left: '15%', top: '20%' }, { left: '25%', top: '15%' },
    { left: '35%', top: '25%' }, { left: '45%', top: '10%' }, { left: '55%', top: '30%' },
    { left: '65%', top: '15%' }, { left: '75%', top: '25%' }, { left: '85%', top: '20%' },
    { left: '95%', top: '10%' }, { left: '10%', top: '40%' }, { left: '20%', top: '50%' },
    { left: '30%', top: '45%' }, { left: '40%', top: '55%' }, { left: '50%', top: '40%' },
    { left: '60%', top: '50%' }, { left: '70%', top: '45%' }, { left: '80%', top: '55%' },
    { left: '90%', top: '40%' }, { left: '8%', top: '70%' }, { left: '18%', top: '80%' },
    { left: '28%', top: '75%' }, { left: '38%', top: '85%' }, { left: '48%', top: '70%' },
    { left: '58%', top: '80%' }, { left: '68%', top: '75%' }, { left: '78%', top: '85%' },
    { left: '88%', top: '70%' }, { left: '12%', top: '60%' }, { left: '72%', top: '60%' }
  ]
  
  const position = positions[(index - 1) % positions.length]
  return {
    ...position,
    animationDelay: `${Math.random() * 6}s`,
    animationDuration: `${3 + Math.random() * 3}s`
  }
}

const getMagicMeteorStyle = (index: number) => {
  const startPositions = [
    { left: '-5%', top: '15%' },
    { left: '-5%', top: '35%' },
    { left: '-5%', top: '55%' },
    { left: '-5%', top: '75%' },
    { left: '-5%', top: '25%' }
  ]
  
  const position = startPositions[(index - 1) % startPositions.length]
  return {
    ...position,
    animationDelay: `${index * 3 + Math.random() * 2}s`,
    animationDuration: `${6 + Math.random() * 4}s`
  }
}

const getMagicRippleStyle = (index: number) => {
  const positions = [
    { left: '20%', top: '30%', width: '100px', height: '100px' },
    { left: '70%', top: '20%', width: '80px', height: '80px' },
    { left: '15%', top: '70%', width: '120px', height: '120px' },
    { left: '80%', top: '60%', width: '90px', height: '90px' },
    { left: '45%', top: '15%', width: '70px', height: '70px' },
    { left: '60%', top: '80%', width: '110px', height: '110px' },
    { left: '10%', top: '45%', width: '95px', height: '95px' },
    { left: '85%', top: '35%', width: '85px', height: '85px' }
  ]
  
  const position = positions[(index - 1) % positions.length]
  return {
    ...position,
    animationDelay: `${index * 2}s`,
    animationDuration: `${8 + Math.random() * 4}s`
  }
}

const getTagStyle = (index: number) => {
  const styles = [
    'bg-violet-500/20 text-violet-400 border-violet-500/30 hover:border-violet-500/60',
    'bg-purple-500/20 text-purple-400 border-purple-500/30 hover:border-purple-500/60',
    'bg-pink-500/20 text-pink-400 border-pink-500/30 hover:border-pink-500/60',
    'bg-cyan-500/20 text-cyan-400 border-cyan-500/30 hover:border-cyan-500/60'
  ]
  return styles[index % styles.length]
}

const onButtonClick = (event: Event) => {
  const button = event.currentTarget as HTMLElement
  // 添加點擊動畫
  button.style.animation = 'none'
  button.offsetHeight // 觸發重排
  button.style.animation = 'bounce 0.3s ease'
  
  // 創建粒子效果
  createClickParticles(event as MouseEvent)
}

const createClickParticles = (event: MouseEvent) => {
  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  
  for (let i = 0; i < 6; i++) {
    const particle = document.createElement('div')
    particle.className = 'absolute w-1 h-1 bg-white rounded-full pointer-events-none animate-button-particle'
    particle.style.left = `${x}px`
    particle.style.top = `${y}px`
    particle.style.animationDelay = `${i * 50}ms`
    
    const parent = event.currentTarget as HTMLElement
    parent.style.position = 'relative'
    parent.appendChild(particle)
    
    setTimeout(() => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle)
      }
    }, 1500)
  }
}

const openImageSpotlight = (imageSrc: string) => {
  spotlightImage.value = imageSrc
}

const closeImageSpotlight = () => {
  spotlightImage.value = ''
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

// Scroll Handler
const handleScroll = () => {
  showBackToTop.value = window.pageYOffset > 500
}

// Lifecycle
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  
  // 初始化滾動位置
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* 角色卡片樣式 */
.character-card {
  position: relative;
  animation: fadeInUp 0.6s ease-out both;
}

/* 自定義動畫 */
@keyframes bounce {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.95);
  }
}

/* 魔法粒子按鈕效果 */
.animate-button-particle {
  animation: buttonParticleFloat 1.5s ease-out forwards;
}

@keyframes buttonParticleFloat {
  0% {
    opacity: 1;
    transform: translate(0, 0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(var(--random-x, 0), var(--random-y, -20px)) scale(0);
  }
}

/* 確保圖片放大燈箱在最高層 */
.fixed.inset-0.z-50 {
  z-index: 9999;
}
</style>