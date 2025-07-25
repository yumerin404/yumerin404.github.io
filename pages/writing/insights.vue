<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
    <!-- Header -->
    <Header />

    <!-- Decorative Background -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
      <div class="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-full blur-2xl animate-float"></div>
      <div class="absolute top-1/3 right-20 w-20 h-20 bg-gradient-to-br from-amber-400/20 to-yellow-500/20 rounded-full blur-xl animate-float-delayed"></div>
      <div class="absolute bottom-20 left-1/3 w-16 h-16 bg-gradient-to-br from-orange-400/15 to-amber-500/15 rounded-full blur-lg animate-float-slow"></div>
    </div>

    <!-- Main Content -->
    <main class="relative z-10 pt-20">
      <!-- Breadcrumb -->
      <section class="py-4 px-4">
        <div class="container mx-auto max-w-6xl">
          <nav class="flex items-center space-x-2 text-sm text-gray-400">
            <NuxtLink to="/" class="hover:text-amber-400 transition-colors duration-300">首頁</NuxtLink>
            <Icon name="heroicons:chevron-right" class="w-4 h-4" />
            <NuxtLink to="/writing" class="hover:text-amber-400 transition-colors duration-300">寫作技巧</NuxtLink>
            <Icon name="heroicons:chevron-right" class="w-4 h-4" />
            <span class="text-amber-400">寫作技巧心得</span>
          </nav>
        </div>
      </section>

      <!-- Hero Section -->
      <section class="py-16 px-4">
        <div class="container mx-auto max-w-6xl text-center">
          <div class="mb-12 animate-fade-in-up">
            <div class="flex justify-center items-center mb-8">
              <div class="w-20 h-20 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-amber-500/30">
                <Icon name="heroicons:light-bulb" class="w-10 h-10 text-amber-400" />
              </div>
            </div>
            
            <h1 class="text-5xl md:text-6xl font-bold mb-6">
              <span class="bg-gradient-to-r from-amber-300 via-orange-300 to-yellow-300 bg-clip-text text-transparent">
                寫作技巧心得
              </span>
            </h1>
            
            <p class="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              分享創作過程中的經驗與體悟，探討寫作技巧的實際應用
            </p>
          </div>
        </div>
      </section>

      <!-- Content Section -->
      <section class="py-16 px-4">
        <div class="container mx-auto max-w-4xl">
          
          <!-- Writing Insights Content -->
          <div class="space-y-12">
            
            <!-- Insight 1: 劇情節奏 -->
            <div class="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-amber-500/20 hover:border-amber-500/40 transition-all duration-500 group">
              <div class="flex items-center mb-6">
                <div class="w-12 h-12 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon name="heroicons:arrow-trending-up" class="w-6 h-6 text-amber-400" />
                </div>
                <h3 class="text-2xl font-bold text-amber-400">劇情節奏的掌控</h3>
              </div>
              
              <div class="bg-slate-700/20 rounded-xl p-6 border-l-4 border-amber-400/50">
                <p class="text-lg text-gray-200 leading-relaxed italic">
                  "劇情應該由慢，利用讀者們越來越對劇情熟悉，慢慢加快整個故事劇情的節奏。"
                </p>
              </div>
              
              <div class="mt-6 text-gray-300 leading-relaxed">
                <p class="mb-4">
                  這是一個關於故事節奏控制的重要觀點。就像音樂中的漸強一樣，故事的節奏應該有一個自然的發展曲線。
                </p>
                <p>
                  開始時讓讀者適應故事世界，逐漸建立情感連結，然後隨著讀者投入度的增加，逐步加快情節發展的速度，最終達到高潮。
                </p>
              </div>
            </div>

            <!-- Insight 2: 愛與死亡 -->
            <div class="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-orange-500/20 hover:border-orange-500/40 transition-all duration-500 group">
              <div class="flex items-center mb-6">
                <div class="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon name="heroicons:heart" class="w-6 h-6 text-orange-400" />
                </div>
                <h3 class="text-2xl font-bold text-orange-400">愛的極致表達</h3>
              </div>
              
              <div class="bg-slate-700/20 rounded-xl p-6 border-l-4 border-orange-400/50">
                <p class="text-lg text-gray-200 leading-relaxed italic">
                  "故事中表達愛的終極方式，是死亡，但現實千萬不要將這樣的觀念帶入。"
                </p>
              </div>
              
              <div class="mt-6 text-gray-300 leading-relaxed">
                <p class="mb-4">
                  在文學創作中，死亡常常被用作表達愛情強烈程度的終極手段。從《羅密歐與朱麗葉》到各種悲劇作品，死亡都象徵著愛的純粹與永恆。
                </p>
                <p class="text-amber-300 font-medium">
                  但是，這僅僅是文學手法，絕不應該成為現實生活的指導原則。創作者必須明確區分虛構與現實。
                </p>
              </div>
            </div>

            <!-- Insight 3: 角色描寫的藝術 -->
            <div class="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-500 group">
              <div class="flex items-center mb-6">
                <div class="w-12 h-12 bg-gradient-to-br from-yellow-500/20 to-amber-500/20 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon name="heroicons:sparkles" class="w-6 h-6 text-yellow-400" />
                </div>
                <h3 class="text-2xl font-bold text-yellow-400">純真角色的詩意描寫</h3>
              </div>
              
              <div class="bg-slate-700/20 rounded-xl p-6 border-l-4 border-yellow-400/50">
                <div class="text-gray-200 leading-relaxed space-y-3">
                  <p class="text-amber-300 font-medium mb-4">要寫蘿莉，就不能只寫蘿莉。</p>
                  
                  <p>要寫風掠過她嗓音像浸了蜜的風鈴，脆生生喊「看鏡頭呀」。</p>
                  <p>寫她舉著兩隻小手比耶，指節還帶著孩童的圓潤，在光線下泛著軟乎乎的白。</p>
                  <p>寫她蹦跳時藍格裙角揚起，把春末夏初的鮮活都揉進每一步雀躍裡。</p>
                  <p>寫她眼裡盛著未經雕琢的澄澈，把路邊野花視作寶藏，將水窪倒影當成魔法鏡。</p>
                  <p>寫她攥著你衣角分享「今天螞蟻搬了三粒米」時，掌心傳來的溫熱與依賴。</p>
                  
                  <p class="pt-4 border-t border-gray-600/30">
                    寫她笑起來時眼尾彎成月牙，雙馬尾時，髮梢輕掃過米白色校服領口的溫柔。
                    而你在她毫無保留的雀躍裡忽然懂得——喜歡是被這份未染塵埃的天真輕輕撞了滿懷，是看她用稚嫩熱忱丈量世界時，自己也跟著心跳輕了半拍，甘願做她奇思妙想旁的守護者，陪她把尋常巷弄走成童話裡的冒險途。
                  </p>
                </div>
              </div>
              
              <div class="mt-6 text-gray-300 leading-relaxed">
                <p class="mb-4">
                  這是一段關於如何描寫純真角色的精美範例。作者不是直接描述角色，而是通過細膩的感官描寫、動作描寫，營造出一種純真美好的氛圍。
                </p>
                <p class="mb-4 text-yellow-300">
                  <strong>寫作技巧精髓：</strong>
                </p>
                <ul class="list-disc list-inside space-y-2 text-sm text-gray-400 ml-4">
                  <li>使用具體的感官描寫（聲音、觸感、視覺）</li>
                  <li>通過動作和細節展現角色特質</li>
                  <li>運用詩意的語言營造氛圍</li>
                  <li>將抽象情感具象化表達</li>
                  <li>從觀察者視角展現情感共鳴</li>
                </ul>
              </div>
            </div>

          </div>

          <!-- Preview Cards -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <!-- Card 1 -->
            <div class="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-amber-500/20 hover:border-amber-500/40 transition-all duration-500 group">
              <div class="w-12 h-12 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Icon name="heroicons:sparkles" class="w-6 h-6 text-amber-400" />
              </div>
              
              <h3 class="text-xl font-bold mb-4 text-amber-400">靈感捕捉術</h3>
              <p class="text-gray-300 leading-relaxed mb-4">
                如何在日常生活中捕捉創作靈感，並將零碎的想法整理成完整的故事構想。
              </p>
              
              <div class="flex items-center text-sm text-gray-400">
                <Icon name="heroicons:calendar" class="w-4 h-4 mr-2" />
                <span>即將發布</span>
              </div>
            </div>

            <!-- Card 2 -->
            <div class="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-orange-500/20 hover:border-orange-500/40 transition-all duration-500 group">
              <div class="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Icon name="heroicons:users" class="w-6 h-6 text-orange-400" />
              </div>
              
              <h3 class="text-xl font-bold mb-4 text-orange-400">角色塑造心得</h3>
              <p class="text-gray-300 leading-relaxed mb-4">
                分享角色創作的實戰經驗，如何賦予角色生命力，讓讀者產生共鳴。
              </p>
              
              <div class="flex items-center text-sm text-gray-400">
                <Icon name="heroicons:calendar" class="w-4 h-4 mr-2" />
                <span>即將發布</span>
              </div>
            </div>

            <!-- Card 3 -->
            <div class="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-500 group">
              <div class="w-12 h-12 bg-gradient-to-br from-yellow-500/20 to-amber-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Icon name="heroicons:chat-bubble-left-right" class="w-6 h-6 text-yellow-400" />
              </div>
              
              <h3 class="text-xl font-bold mb-4 text-yellow-400">對話寫作技巧</h3>
              <p class="text-gray-300 leading-relaxed mb-4">
                探討如何寫出自然流暢的對話，讓角色的個性透過言語展現出來。
              </p>
              
              <div class="flex items-center text-sm text-gray-400">
                <Icon name="heroicons:calendar" class="w-4 h-4 mr-2" />
                <span>即將發布</span>
              </div>
            </div>

            <!-- Card 4 -->
            <div class="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-red-500/20 hover:border-red-500/40 transition-all duration-500 group">
              <div class="w-12 h-12 bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Icon name="heroicons:bolt" class="w-6 h-6 text-red-400" />
              </div>
              
              <h3 class="text-xl font-bold mb-4 text-red-400">克服創作瓶頸</h3>
              <p class="text-gray-300 leading-relaxed mb-4">
                分享面對創作瓶頸時的應對策略，如何重新找回創作的動力與方向。
              </p>
              
              <div class="flex items-center text-sm text-gray-400">
                <Icon name="heroicons:calendar" class="w-4 h-4 mr-2" />
                <span>即將發布</span>
              </div>
            </div>
          </div>

          <!-- Back to Main -->
          <div class="text-center">
            <NuxtLink 
              to="/writing"
              class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-sm rounded-xl border border-amber-500/30 hover:border-amber-500/50 text-amber-400 hover:text-amber-300 transition-all duration-300 group"
            >
              <Icon name="heroicons:arrow-left" class="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
              <span>返回寫作技巧主頁</span>
            </NuxtLink>
          </div>

        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
// SEO 設定
useHead({
  title: '寫作技巧心得 - 夢鈴領域',
  meta: [
    { 
      name: 'description', 
      content: '分享創作過程中的經驗與體悟，探討寫作技巧的實際應用，從構思到完稿的創作心路歷程。' 
    },
    { 
      name: 'keywords', 
      content: '寫作心得, 創作經驗, 寫作技巧, 創作過程, 靈感捕捉, 角色塑造, 對話寫作' 
    },
    {
      property: 'og:title',
      content: '寫作技巧心得 - 夢鈴領域'
    },
    {
      property: 'og:description',
      content: '分享創作過程中的經驗與體悟，探討寫作技巧的實際應用與創作心路歷程。'
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