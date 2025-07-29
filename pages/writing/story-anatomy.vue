<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-950 via-amber-950/20 to-slate-900 text-white relative overflow-hidden">
    <!-- 古典書籍背景效果 -->
    <WritingGradientBackground 
      variant="amber"
      opacity="light"
      :decoration-count="18"
      decoration-symbol="✦"
    />

    <!-- 滾動進度條 -->
    <WritingProgressBar 
      :progress="scrollProgress"
      variant="gradient"
      :show-glow="true"
      :animated="true"
    />

    <!-- Header -->
    <Header />

    <!-- Main Content -->
    <main class="relative z-10 pt-20">
      <!-- Breadcrumb -->
      <section class="py-4 px-4">
        <div class="container mx-auto max-w-7xl">
          <nav class="flex items-center space-x-2 text-sm text-gray-400">
            <NuxtLink to="/" class="hover:text-amber-400 transition-colors duration-300">首頁</NuxtLink>
            <Icon name="heroicons:chevron-right" class="w-4 h-4" />
            <NuxtLink to="/writing" class="hover:text-amber-400 transition-colors duration-300">寫作技巧</NuxtLink>
            <Icon name="heroicons:chevron-right" class="w-4 h-4" />
            <span class="text-amber-400">故事的解剖</span>
          </nav>
        </div>
      </section>

      <!-- Hero Section -->
      <section class="py-16 px-4 relative">
        <div class="container mx-auto max-w-5xl text-center">
          <div class="mb-12 animate-fade-in-up">
            <!-- 古典書籍圖標 -->
            <div class="flex justify-center items-center mb-8">
              <div class="relative w-24 h-24 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-3xl flex items-center justify-center backdrop-blur-sm border border-amber-500/30">
                <div class="absolute inset-0 bg-gradient-to-br from-amber-400/10 to-orange-400/10 rounded-3xl animate-pulse-gentle"></div>
                <Icon name="heroicons:book-open" class="relative z-10 w-12 h-12 text-amber-400" />
              </div>
            </div>
            
            <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span class="bg-gradient-to-r from-amber-300 via-orange-300 via-yellow-300 to-amber-300 bg-clip-text text-transparent animate-gradient-shift">
                故事的解剖
              </span>
            </h1>
            
            <div class="w-32 h-1 bg-gradient-to-r from-amber-400 to-orange-400 mx-auto rounded-full mb-8 animate-glow-soft"></div>
            
            <p class="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              深入探索說故事的藝術，從技法到心法，從形式到本質
            </p>
          </div>
        </div>
      </section>

      <!-- 搜尋和篩選區域 -->
      <section class="py-8 px-4 relative">
        <div class="container mx-auto max-w-5xl">
          <WritingSearchFilter
            :search-query="searchQuery"
            :filters="filters"
            :active-filter="activeFilter"
            :result-count="filteredSections.length"
            search-placeholder="搜尋故事解剖內容..."
            :search-suggestions="searchSuggestions"
            @search-change="handleSearchChange"
            @filter-change="handleFilterChange"
            @clear-search="clearSearch"
            @clear-filters="clearFilters"
            @reset-all="resetAll"
            @random-browse="randomBrowse"
          />
        </div>
      </section>

      <!-- Content Section -->
      <section class="py-16 px-4 relative">
        <div class="container mx-auto max-w-7xl">
          <div class="flex flex-col lg:flex-row gap-8">
            
            <!-- Main Content -->
            <div class="flex-1">
              <div class="space-y-8">
                
                <!-- 故事解剖內容 -->
                <WritingContentCard
                  v-for="(section, index) in filteredSections"
                  :key="section.id"
                  :content="section"
                  :variant="getSectionVariant(section.category)"
                  :categories="categories"
                  :animation-delay="index * 100"
                  @favorite="handleFavorite"
                  @share="handleShare"
                  @expand="handleExpand"
                />
                
                <!-- 沒有結果提示 -->
                <div 
                  v-if="filteredSections.length === 0" 
                  class="text-center py-16"
                >
                  <div class="w-24 h-24 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon name="heroicons:magnifying-glass" class="w-12 h-12 text-gray-500" />
                  </div>
                  <h3 class="text-xl font-medium text-gray-400 mb-2">沒有找到相關內容</h3>
                  <p class="text-gray-500 mb-6">請嘗試調整搜尋條件或篩選設定</p>
                  <WritingButton
                    @click="resetAll"
                    variant="outline"
                    text="重置篩選"
                    leftIcon="heroicons:arrow-uturn-left"
                  />
                </div>

              </div>
            </div>
            
          </div>
        </div>
      </section>
    </main>

    <!-- 太空艦橋式導航系統 -->
    <div 
      class="fixed top-16 right-0 h-[calc(100vh-4rem)] z-50 transition-all duration-700 ease-out"
      :class="[
        showSidebar ? 'w-96' : 'w-16',
        showSidebar ? 'translate-x-0' : 'translate-x-0'
      ]"
    >
      <!-- 艦橋觸發器 - 全息投影式 -->
      <div 
        class="absolute left-0 top-1/2 -translate-y-1/2 h-32 cursor-pointer group transition-all duration-500"
        :class="showSidebar ? 'w-16 opacity-0 pointer-events-none' : 'w-16 opacity-100'"
        @click="showSidebar = true"
        @mouseenter="triggerHover = true"
        @mouseleave="triggerHover = false"
      >
        <!-- 全息投影觸發區域 -->
        <div class="relative w-full h-full">
          <!-- 主觸發面板 -->
          <div 
            class="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-800/95 to-slate-900/90 backdrop-blur-xl border-l border-y border-purple-500/40 rounded-l-2xl shadow-2xl transition-all duration-500 overflow-hidden"
            :class="triggerHover ? 'border-purple-400/80 shadow-[0_0_30px_rgba(147,51,234,0.3)]' : ''"
          >
            
            <!-- 能量流動條 -->
            <div class="absolute left-1 top-1/2 -translate-y-1/2 w-1 h-16 bg-gradient-to-b from-purple-400/60 via-violet-500/80 to-indigo-500/60 rounded-full transition-all duration-500"
                 :class="triggerHover ? 'w-1.5 shadow-[0_0_20px_rgba(147,51,234,0.8)] animate-pulse' : ''">
              <!-- 能量脈衝點 -->
              <div class="absolute top-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-purple-300 rounded-full animate-ping"></div>
              <div class="absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-indigo-300 rounded-full animate-ping" style="animation-delay: 0.7s;"></div>
              <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-violet-300 rounded-full animate-ping" style="animation-delay: 1.2s;"></div>
            </div>
            
            <!-- 側邊觸發圖示 -->
            <div class="absolute right-2 top-1/2 -translate-y-1/2 transition-all duration-500"
                 :class="triggerHover ? 'scale-110 text-purple-300' : 'text-gray-400'">
              <Icon name="heroicons:bars-3" class="w-6 h-6" />
            </div>
            
            <!-- 全息提示標籤 -->
            <div 
              class="absolute left-20 top-1/2 -translate-y-1/2 transition-all duration-500 transform"
              :class="triggerHover ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'"
            >
              <div class="bg-slate-900/95 backdrop-blur-sm border border-purple-500/50 rounded-xl px-4 py-2 shadow-2xl">
                <div class="text-sm text-purple-300 font-medium">結構分析台</div>
                <div class="text-xs text-gray-400 mt-1">點擊展開</div>
              </div>
              <!-- 全息箭頭 -->
              <div class="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-8 border-transparent border-r-purple-500/50"></div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 主導航面板 - 艦橋控制台風格 -->
      <div 
        class="ml-16 h-full relative transition-all duration-700 ease-out"
        :class="showSidebar ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'"
      >
        <!-- 關閉按鈕 -->
        <button
          @click="showSidebar = false"
          class="absolute -left-12 top-4 w-8 h-8 bg-slate-900/95 backdrop-blur-sm border border-red-500/40 rounded-full flex items-center justify-center text-red-400 hover:text-red-300 hover:border-red-400/60 transition-all duration-300 z-10 group"
        >
          <Icon name="heroicons:x-mark" class="w-4 h-4" />
          <div class="absolute inset-0 bg-red-500/10 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse"></div>
        </button>
        
        <!-- 主面板容器 -->
        <div class="w-full h-full relative">
          <!-- 外層能量護盾 -->
          <div class="absolute -inset-2 bg-gradient-to-br from-purple-500/10 via-violet-500/5 to-indigo-500/10 rounded-2xl blur-lg animate-pulse-slow"></div>
          
          <!-- 主面板結構 -->
          <div class="relative w-full h-full bg-gradient-to-br from-slate-900/98 via-slate-800/95 to-slate-900/98 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
            
            
            <!-- 主內容區域 -->
            <div class="flex-1 h-full relative">
              <!-- 目錄組件容器 -->
              <div class="absolute inset-0 p-4">
                <UniversalSidebar
                  :items="tocData"
                  :categories="tocCategories"
                  :active-item="activeSection"
                  theme="writing"
                  trigger-icon="heroicons:book-open"
                  trigger-title="故事解剖導航"
                  system-title="ANATOMY_MATRIX"
                  search-placeholder="搜索故事解剖..."
                  @item-click="scrollToSection"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Back to Top Button -->
    <WritingBackToTop 
      :progress="scrollProgress"
      :threshold="500"
      variant="gradient"
      size="md"
      :show-progress="true"
      :show-glow="true"
    />
  </div>
</template>

<script setup lang="ts">
// SEO 設定
useHead({
  title: '故事的解剖 - 夢鈴領域',
  meta: [
    { 
      name: 'description', 
      content: '深入探索說故事的藝術，從寫作技法到創作心法，從故事形式到文學本質。包含25個故事解剖章節，涵蓋角色塑造、情節發展、主題表達等完整寫作指南。' 
    },
    { 
      name: 'keywords', 
      content: '故事解剖, 寫作技巧, 創作指南, 角色塑造, 情節設計, 主題表達, 說故事藝術, 文學創作, 小說寫作' 
    },
    {
      property: 'og:title',
      content: '故事的解剖 - 夢鈴領域'
    },
    {
      property: 'og:description',
      content: '深入探索說故事的藝術，完整的寫作技法與創作心法指南。'
    },
    {
      property: 'og:type',
      content: 'article'
    }
  ]
})

// 響應式數據
const searchQuery = ref('')
const activeFilter = ref('all')
const activeTocSection = ref('')
const activeSection = ref('')
const scrollProgress = ref(0)
const showBackToTop = ref(false)
const readingProgress = ref(0)
const showSidebar = ref(false)
const triggerHover = ref(false)

// 分類資料
const categories = [
  { key: 'writing-techniques', name: '寫作技法', icon: 'heroicons:pencil-square' },
  { key: 'character-development', name: '角色塑造', icon: 'heroicons:users' },
  { key: 'story-structure', name: '故事結構', icon: 'heroicons:building-library' },
  { key: 'creative-process', name: '創作心法', icon: 'heroicons:light-bulb' },
  { key: 'genre-understanding', name: '類型理解', icon: 'heroicons:book-open' }
]

// 故事解剖內容數據
const sections = [
  {
    id: 'writing-focus',
    title: '寫作焦點的掌握',
    category: 'writing-techniques',
    content: `
      <p>在故事中，那些應該強調與深入的描寫，那些應該一筆帶過，要是能掌握好，能從千篇一律的故事中脫穎而出。</p>
    `
  },
  {
    id: 'originality-credibility',
    title: '原創性與可信度',
    category: 'creative-process',
    content: `
      <p>原創創意的出現，有賴於致力追求可信度而非追求特立獨行。</p>
      <p>具個人特色的風格不可能是在高度自覺下完成的。身為作者的你，如果對角色和故事設定的認知掌握符合自己的個性，你所作的選擇，以及你從大量素材中創造出來的種種巧妙安排，就會成為專屬於你的獨特作品。</p>
      <p>你的作品反映出你這個人，它是具原創創意的作品。</p>
    `
  },
  {
    id: 'story-opening',
    title: '故事開場的陷阱',
    category: 'story-structure',
    content: `
      <p>身為作者的我們，在設計和安排觸發事件時如果有所謂的通病，那就是我們經常會延遲中心劇情出現的時機，在開場的場景段落塞進太多背景說明。</p>
      <p>我們老是低估觀眾的認知和生活經驗，用冗長無趣的細節來呈現角色和角色的世界，偏偏這些細節對觀眾來說早已是常識的一部分。</p>
    `
  },
  {
    id: 'character-vs-characterization',
    title: '角色與角色塑造的區別',
    category: 'character-development',
    content: `
      <p><strong>角色跟角色塑造是兩個不同的概念。</strong></p>
      <p>角色塑造指的是角色是甚麼人？職業、外在、風格、特質。如同一個醫生，有錢、有能力、聰明、富有愛心。</p>
      <p>而角色指的是角色的本質，而角色的本質必須要在壓力下才能顯現，如果選擇可有可無，那麼角色的選擇絲毫沒有意義。</p>
      <p>例如：醫生選擇捐錢給兒童還是大學學生，對這個角色來說並不能表現出本質。但如果是：這筆錢是自己知道自己剩下不到一個月壽命，並且無妻子小孩與家人，那麼這筆錢的捐給學生還是孩子就反映出的角色本質。</p>
      <p>角色跟角色塑造要是一致，那麼故事會很無聊，讀者們看過太多的故事，對於陳腔濫調早就毫無耐心。</p>
    `
  },
  {
    id: 'scene-creation-method',
    title: '場景創作的十倍法則',
    category: 'writing-techniques',
    content: `
      <p>想要一個故事片段優秀，可以試著創造10個不同場景，並思考推演角色的反應與行為，再將最優秀的拿出來，並在這個場景下再創造 10 個不同的反應、行為、互動，選出最喜歡的一個，基本上故事就會優良許多。</p>
      <p>在創作的時候，人往往根據經驗創作，而經驗很大一部分來自於看過、閱讀過的故事，通常這種模板化到創作令人感到無趣，因此必須要跳脫這種直覺與經驗思維。</p>
    `
  },
  {
    id: 'theme-expression',
    title: '主題表達的藝術',
    category: 'creative-process',
    content: `
      <p>作者在寫故事時其實就是表達自己的價值觀與想法。但往往以說教的方式出現來灌輸想法，這種方式並不能讓讀者信服，而是會讓讀者感覺厭煩。</p>
      <p>同時，如果塞入過多想法，故事最終將會碎片化，讀完後看起來就是：甚麼也沒講。而某個想法上很優秀的靠著故事與人物傳達出來，讀者們自己就會產生作者預期之外的體會。</p>
      <p>小說創作是門文化、藝術、哲學與娛樂的綜合體。</p>
    `
  },
  {
    id: 'love-your-creation',
    title: '創作的本質動力',
    category: 'creative-process',
    content: `
      <p><strong>創作的本質是你必須熱愛你所創作的。</strong></p>
      <p>你會為了這樣的故事掏錢。並且反覆看自己的創作都會感到開心。</p>
      <p>這是你寫的故事你想要看到的故事。</p>
    `
  },
  {
    id: 'classical-design',
    title: '經典設計的人性基礎',
    category: 'story-structure',
    content: `
      <p>觀眾數量縮減的理由，在於大多數人相信以下幾種想法：</p>
      <ul>
        <li>• 人生帶給他們的是<strong>封閉式的經驗</strong>，而這些經驗來自於絕對且無法逆轉的改變</li>
        <li>• 他們最大的衝突來源是<strong>自己與外在的衝突</strong></li>
        <li>• 他們是自身經驗<strong>單一的主動主角</strong></li>
        <li>• 他們的存在，在連續的時間、因果互相連結的連貫真實中運轉，而在這個真實裡，事件因為<strong>可解釋、有意義的理由</strong>而發生</li>
      </ul>
      <p>自從我們的老祖宗凝視自己生起的火，思索「我存在」這個想法後，人類就如此看待世界，以及存在於世界當中的自身。</p>
      <p><strong>經典設計是人類心智的鏡子。</strong></p>
    `
  },
  {
    id: 'genre-mastery',
    title: '類型精通的重要性',
    category: 'genre-understanding',
    content: `
      <p>儘管學者對於定義與系統爭辯不休，<strong>讀者早已是類型專家</strong>。</p>
      <p>觀眾進入每部小說時，都配備了一套複雜的心理預期，這是他們從一生的閱讀經驗學到的。</p>
      <p>讀者對於類型的熟悉，讓作者必須面對這個重大挑戰：</p>
      <div class="bg-slate-700/30 rounded-xl p-4 my-4">
        <p>• <strong>既要滿足讀者預期</strong>，不讓讀者困惑與失望</p>
        <p>• <strong>同時還必須超越他們的期待</strong>，呈現新鮮、意想不到的片段，以免讓讀者覺得無聊</p>
      </div>
      <p>如果對類型的理解不如讀者，不可能同時達到這兩個目標。</p>
    `
  },
  {
    id: 'reader-positioning',
    title: '讀者定位的策略',
    category: 'genre-understanding',
    content: `
      <p>如果小說有適當的宣傳、名字與簡介，讀者再閱讀時是充滿預期的。<br>
      以專業行銷人員的術語來說，小說已經被<strong>「定位」</strong>了。</p>
      <div class="bg-slate-700/30 rounded-xl p-4 my-4">
        <p><strong>「定位讀者」的意思是：</strong></p>
        <p>我們不希望讀者來看小說時沒有心理準備或毫無預期，讓我們不得不耗費大量章節或說明，來提示他們該採用什麼態度來觀看這個故事。</p>
        <p>我們希望讀者在翻開故事時，已經作好準備，全神貫注於我們即將提供滿足的一切。</p>
      </div>
    `
  },
  {
    id: 'genre-choice-passion',
    title: '類型選擇與創作熱情',
    category: 'creative-process',
    content: `
      <p>你是否像海明威或狄更斯，直接從人生經驗中取材？或像莫里哀一樣書寫自己對社會與人性的想法？無論靈感來源為何，請留意：早在小說完成之前，你的自戀就會銷聲匿跡，對故事點子的熱愛也會委靡。</p>
      <p>若對自己或自己的點子感覺厭倦無聊，可能就無法跑完這場比賽。最後再問自己一個問題：<strong>我最喜歡的類型是什麼？然後寫寫你喜愛的類型。</strong></p>
      <p>你對點子或個人經驗的熱情或許會降低，但對小說的愛是永恆的。類型應是不斷反覆為你提供靈感的來源。每回重讀自己的劇本都應該感覺興奮，因為這是你想寫的故事類型，是你會願意在網站花錢觀看的類型。</p>
      <p>不要求只因知識分子朋友認為某個題材具社會重要性而寫；不要只因預想某個題材會在《小說比賽》受到讚賞而寫。誠實面對你對類型的選擇，因為在所有賦予寫作動力的理由當中，唯一能長時間提供我們養分的就是作品本身。</p>
    `
  },
  {
    id: 'conflict-types',
    title: '衝突的兩種類型',
    category: 'story-structure',
    content: `
      <div class="bg-slate-700/30 rounded-xl p-4 my-4">
        <p><strong>第一種</strong>就像以極速特效呈現的練習作品。<br>
        作者照著教科書依樣畫葫蘆創造出衝突，但由於對人生真正的掙扎毫無興趣或感覺，因此只能替刻意而為的亂象幻想出虛偽做作的理由。</p>
        <p><strong>第二種</strong>則是為回應衝突而寫的沉悶描繪。<br>
        這些作者過於天真，認為生活的確美好......只要沒有衝突。<br>
        因此，他們的作品以低調描述的方式來迴避衝突，希望我們能了解，只要我們試著加強溝通，多一點善意，對環境更尊重，人類就能重返樂園。</p>
      </div>
      <p>不過，如果我們確實從歷史學到了什麼樣的智慧，那想必就是：<br>
      <strong>即使最後恐怖的夢魔不再，無家可歸的人都找到遮風蔽雨之處，全世界都採用太陽能，我們每一個人依然要面對無數的煩惱。</strong></p>
    `
  },
  {
    id: 'story-progression',
    title: '故事的進展法則',
    category: 'story-structure',
    content: `
      <p><strong>觸發事件</strong>引領主角啟程追尋自覺或不自覺渴望的事物，以重新打造生活的平衡。<br>
      他開始追尋欲望時會採取<strong>規模最小的保守行動</strong>，希望引發來自現實環境的正面回應。</p>
      <p>不過，他的行動結果卻喚起了內在、個人或社會與環境等衝突層面的對立力量，阻礙了他的欲望，在期望與結果之間製造了<strong>落差</strong>。<br>
      當落差產生，讀者心裡明白，眼前面對的是一個<strong>無法回頭、只能繼續前進的臨界點</strong>。</p>
      <p>微不足道的付出無法發揮作用。角色不可能只採取一點點行動就想回復生活的平衡。接下來,所有類似角色第一次付諸實行的行動、所有質量輕微的行動，都不會在故事裡再度出現了。</p>
      <p>藉由發掘角色一次比一次更強大的能力，誘發他們一次比一次更堅韌的意志力，讓他們陷身一次比一次更高的風險，越過一個又一個依行動質量程度不同而設定的無法回頭的臨界點，作者讓故事不斷往前進展。故事不但不該退回質量變弱的行動，反而應循序漸進朝著最後的行動前進，而在觀眾心中，這個行動必須是沒有其他行動可以替代的。</p>
    `
  },
  {
    id: 'triggering-events',
    title: '觸發事件的設計',
    category: 'writing-techniques',
    content: `
      <p>最後一幕的高潮無疑是創作場景時難度最高的。它是故事敘述過程的靈魂，如果失敗，整個故事也跟著失敗。不過，寫作難度第二高的場景就是中心劇情的觸發事件，這個場景的改寫次數也是所有場景中最多的。</p>
      <p>因此，以下提出的一些問題，對於發想觸發事件應該有所幫助：</p>
      <div class="bg-slate-700/30 rounded-xl p-4 my-4">
        <p><strong>我的主角可能遇到的最糟的事是什麼?</strong></p>
        <p>如何才能讓它最後轉化為主角遇到的最好的事?</p>
        <p><strong>我的主角可能遇到的最好的事是什麼?</strong></p>
        <p>如何才能讓它最後轉化為主角遇到的最糟的事?</p>
      </div>
    `
  },
  {
    id: 'inner-transformation',
    title: '內心轉變與預示',
    category: 'creative-process',
    content: `
      <p>故事中內心的轉變不是透過大聲嚷嚷就能完成的。自白式的對白不具說服力。它必須通過某個終極事件的考驗，必須通過備感壓力的角色的選擇與行動的考驗，也就是必要場景(危機)和最後一幕的高潮的考驗。</p>
      <p>長年的閱讀經驗讓觀眾不自覺產生了預期心理，他們期待觸發事件激發的對立力量，會將人類經驗逼至極限，除非主角以某種方式在這些對立力量最強大時正面迎擊，故事的敘述不會輕易結束。</p>
      <p>將故事的觸發事件和故事的危機場景加以連結，這就是一種<strong>預示</strong>。也就是藉由較早發生的事件的安排，為後來的事件預作準備。事實上，不管是類型、場景設定、角色、氛圍，你作的每一個選擇都會成為預示。</p>
      <p>透過每一句對白或每一個行動的描述，你讓觀眾產生預期，期待某種特定的可能性，因此事件出現時，就能以某種方式滿足你所創造的期待。不過，預示的首要組成元素，是藉由觸發事件來讓觀眾對必要場景(危機)預先有所想像。</p>
    `
  },
  {
    id: 'life-ultimate-questions',
    title: '生命的終極問題',
    category: 'creative-process',
    content: `
      <p>生命和以下這些終極問題有關：</p>
      <div class="bg-slate-700/30 rounded-xl p-4 my-4">
        <p><strong>如何找到愛與自我價值?</strong></p>
        <p><strong>如何為混沌的內心帶來平靜?</strong></p>
        <p><strong>周遭處處可見的難以撼動的社會不公，以及光陰一去不復返等。</strong></p>
      </div>
      <p><strong>生命就是衝突。</strong></p>
      <p><strong>衝突是生命的本質。</strong></p>
      <p>作者必須決定在何時何地妥善安排這樣的掙扎。</p>
    `
  },
  {
    id: 'simple-complex-design',
    title: '相對簡單卻複雜難解的故事設計',
    category: 'story-structure',
    content: `
      <p>設計相對簡單卻複雜難解的故事。</p>
      <p>相對簡單並不是指過分簡化，而是依循以下原則，但依然能將故事說得精采、轉折高明:</p>
      <div class="bg-slate-700/30 rounded-xl p-4 my-4">
        <p><strong>不要讓角色和拍攝地點倍增。</strong></p>
        <p>與其在時間、空間和人之間來回奔忙，不如自我克制，把力氣用來發想具說服力的人物與世界，將心思專注於創造豐富且複雜難解的故事。</p>
      </div>
    `
  },
  {
    id: 'emotion-creation',
    title: '觸動觀眾情緒的技法',
    category: 'writing-techniques',
    content: `
      <p>觸動觀眾情緒的方式，不是讓角色眼中淚光閃閃，不是演員以華麗對白吟誦喜悅，不是對情欲擁抱的描寫，也不是訴諸憤怒的音樂，而是精準描繪足以引發情緒的必要經驗，從而帶領觀眾徹底體會那樣的經驗。</p>
      <p><strong>轉捩點不僅傳達體悟，也能創造情緒動態。</strong></p>
      <p>想理解如何創造觀眾的情緒體驗，首先必須了解，世上只有兩種基本情緒模式——快樂和痛苦。</p>
    `
  },
  {
    id: 'emotion-dynamics',
    title: '情緒的動態性質',
    category: 'writing-techniques',
    content: `
      <p>一旦狀況穩定，<strong>原有的情緒很快消失無蹤</strong>。</p>
      <div class="bg-slate-700/30 rounded-xl p-4 my-4 text-center">
        <p><strong class="text-xl">情緒是一種活躍但相對短暫的體驗，<br>它猛然發展極致，又很快燃燒殆盡。</strong></p>
      </div>
    `
  },
  {
    id: 'diminishing-returns',
    title: '報酬遞減法則',
    category: 'story-structure',
    content: `
      <p>故事必須創造出這種在正負面情緒之間的動態變化，以符合報酬遞減法則。</p>
      <p><strong>報酬遞減法則的意思是：我們對某事的體驗愈多，它的影響也會愈小。</strong></p>
      <p>換句話說，連續重複的情緒體驗，其效果不會相對增加。這個法則在生活或故事當中都適用。</p>
      <div class="bg-slate-700/30 rounded-xl p-4 my-4">
        <p>我們第一次體驗某種情緒或感覺時，受到的影響很大。如果想立刻重複這樣的體驗，它帶來的影響就會減半甚或不到一半。如果我們接著嘗試第三次，它的影響力不僅不會像原來那麼強，甚至會帶來反效果。</p>
        <p>想像一下，如果一個故事接連出現三個悲劇場景，效果會如何？</p>
        <p><strong>在第一個場景，我們會流淚。</strong></p>
        <p><strong>第二個場景，我們會吸鼻子。</strong></p>
        <p><strong>第三個場景，我們會笑……而且是大笑。</strong></p>
      </div>
    `
  },
  {
    id: 'emotion-vs-feeling',
    title: '情緒與感覺的區別',
    category: 'creative-process',
    content: `
      <p>情緒和感覺是不一樣的，不過這兩個概念經常混為一談。</p>
      <div class="bg-slate-700/30 rounded-xl p-4 my-4">
        <p><strong>情緒</strong>是一種短暫的體驗，很快發展到極致，又很快燃燒殆盡。</p>
        <p><strong>感覺</strong>卻是一種長期瀰漫的感受經歷，為我們生命中的每一天，每一個月或每一年增添色彩。</p>
      </div>
      <p>的確，具體的感覺往往對人格形成有所影響。</p>
    `
  },
  {
    id: 'moral-complexity',
    title: '善惡選擇的複雜性',
    category: 'creative-process',
    content: `
      <p>人類只根據自己相信或認可的善惡是非來採取行動，如果我們對人類天性沒有這樣的了解，那麼我們可說什麼都不了解。</p>
      <p><strong>以戲劇性而論，善與惡、是與非的選擇實在過於簡單且微不足道。</strong></p>
    `
  },
  {
    id: 'storyteller-role',
    title: '說故事人的深層探索',
    category: 'creative-process',
    content: `
      <p>說故事的人會引領我們跨越每個層面的現有樣貌，並且不是偶一為之，而是直達故事終點為止。</p>
      <p>說故事的人賦予我們生活拒絕提供的樂趣，那樣的樂趣，來自於坐在黑暗的故事儀式中，穿過生活的表層，觸及深藏於言行舉止之下的真情實感。</p>
    `
  },
  {
    id: 'desire-opposition',
    title: '場景中的欲望與對立力量',
    category: 'story-structure',
    content: `
      <p>深入觀察這個角色或力量的文本和潛文本，並問自己：<strong>他(它)想要的是什麼？</strong>欲望永遠是關鍵，因此，仔細描述這個欲望的目的。</p>
      <p>接著綜觀整個場景，問自己：<strong>阻擋這個欲望的對立力量是什麼？</strong>同樣的，這些力量可能來自某個層面，或由不同層面組合而成。</p>
      <p>確認對立力量的來源後，問自己：<strong>這些對立力量想要的是什麼？</strong>這同樣也能以其目的來描述：「為了不那麼做......」或是「為了用這個取代.......」。</p>
      <p>場景若寫得好，將雙方的欲望目的加以比較就會發現，它們是正面對立的衝突，而不是間接相關的。</p>
    `
  },
  {
    id: 'beat-analysis',
    title: '節拍分析方法',
    category: 'writing-techniques',
    content: `
      <p>節拍是主角行動/反應之間的行為更替。從兩個不同層面來仔細觀察第一個行動：從外在看起來，角色似乎準備要做什麼，更重要的是，看出他掩藏於表相之下的意圖。</p>
      <p>用進行式來描述這個潛文本的行動，如「正在哀求」。試著找出能描述動作又能點出角色感情的描述方式。</p>
      <div class="bg-slate-700/30 rounded-xl p-4 my-4">
        <p>例如，當我們說<strong>「正在懇求」</strong>，就傳達出角色的行動拘謹有節，</p>
        <p>至於<strong>「正在她腳下」</strong>則傳達孤注一擲的屈從。</p>
      </div>
    `
  }
]

// 分類篩選選項
const filters = [
  { key: 'all', name: '全部', count: sections.length },
  ...categories.map(cat => ({ 
    key: cat.key, 
    name: cat.name, 
    icon: cat.icon,
    count: sections.filter(section => section.category === cat.key).length 
  }))
]

// 計算屬性
const filteredSections = computed(() => {
  let filtered = sections

  // 按分類篩選
  if (activeFilter.value !== 'all') {
    filtered = filtered.filter(section => section.category === activeFilter.value)
  }

  // 按搜尋詞篩選
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim()
    filtered = filtered.filter(section => 
      section.title.toLowerCase().includes(query) ||
      section.content.toLowerCase().includes(query)
    )
  }

  return filtered
})

// 搜尋建議
const searchSuggestions = [
  '故事結構',
  '角色塑造',
  '衝突設計',
  '主題表達',
  '創作心法',
  '觸發事件',
  '情緒動態',
  '節拍分析',
  '類型理解',
  '寫作焦點'
]

// 計算屬性
const tocItems = computed(() => {
  return filteredSections.value.map(section => ({
    id: section.id,
    title: section.title,
    category: section.category,
    level: 1
  }))
})

// 側邊欄專用的目錄數據
const tocData = computed(() => {
  return filteredSections.value.map(section => ({
    id: section.id,
    title: section.title,
    subtitle: section.content.replace(/<[^>]*>/g, '').substring(0, 50) + '...',
    category: section.category, // 使用category key而不是name
    level: 1
  }))
})

// 側邊欄專用的分類數據
const tocCategories = computed(() => [
  { key: 'writing-techniques', name: '寫作技法', icon: 'heroicons:pencil-square' },
  { key: 'character-development', name: '角色塑造', icon: 'heroicons:users' },
  { key: 'story-structure', name: '故事結構', icon: 'heroicons:building-library' },
  { key: 'creative-process', name: '創作心法', icon: 'heroicons:light-bulb' },
  { key: 'genre-understanding', name: '類型理解', icon: 'heroicons:book-open' },
  { key: 'other', name: '其他', icon: 'heroicons:ellipsis-horizontal' }
])

// 側邊欄專用的分類數據
const categoryData = computed(() => {
  return [
    { key: 'all', name: '全部', count: sections.length },
    ...categories.map(cat => ({
      ...cat,
      count: sections.filter(section => section.category === cat.key).length
    }))
  ]
})

const activeCategory = computed(() => activeFilter.value)

// 工具函數
const getCategoryName = (categoryKey: string) => {
  const category = categories.find(c => c.key === categoryKey)
  return category ? category.name : '其他'
}

const getSectionVariant = (category: string) => {
  const variantMap: Record<string, 'default' | 'highlight' | 'subtle' | 'accent'> = {
    'writing-techniques': 'default',
    'character-development': 'highlight',
    'story-structure': 'accent',
    'creative-process': 'subtle',
    'genre-understanding': 'default'
  }
  return variantMap[category] || 'default'
}


// 事件處理
const handleSearchChange = (query: string) => {
  searchQuery.value = query
}

const handleFilterChange = (filterKey: string) => {
  activeFilter.value = filterKey
}

const clearSearch = () => {
  searchQuery.value = ''
}

const clearFilters = () => {
  activeFilter.value = 'all'
}

const resetAll = () => {
  searchQuery.value = ''
  activeFilter.value = 'all'
}

const randomBrowse = () => {
  if (sections.length > 0) {
    const randomIndex = Math.floor(Math.random() * sections.length)
    const randomSection = sections[randomIndex]
    scrollToSection(randomSection.id)
  }
}

const handleSectionClick = (sectionId: string) => {
  scrollToSection(sectionId)
}

// 側邊欄相關方法
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    activeSection.value = sectionId
    activeTocSection.value = sectionId
  }
}

const setActiveCategory = (categoryKey: string) => {
  activeFilter.value = categoryKey
}

const handleFavorite = (contentId: string, favorited: boolean) => {
  console.log(`${favorited ? '收藏' : '取消收藏'}: ${contentId}`)
}

const handleShare = (content: any) => {
  if (!process.client) return
  
  if (navigator.share) {
    navigator.share({
      title: content.title,
      text: content.title,
      url: window.location.href + '#' + content.id
    })
  } else {
    navigator.clipboard.writeText(window.location.href + '#' + content.id)
  }
}

const handleExpand = (contentId: string, expanded: boolean) => {
  console.log(`${expanded ? '展開' : '收合'}: ${contentId}`)
}



const updateScrollProgress = () => {
  if (!process.client) return
  
  const scrollTop = window.pageYOffset
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  scrollProgress.value = (scrollTop / docHeight) * 100
  readingProgress.value = scrollProgress.value
  
  showBackToTop.value = scrollTop > 500
}

const updateActiveTocSection = () => {
  if (!process.client) return
  
  const sections = document.querySelectorAll('[id]')
  let currentSection = ''
  
  sections.forEach(section => {
    const rect = section.getBoundingClientRect()
    if (rect.top <= 200 && rect.bottom >= 200) {
      currentSection = section.id
    }
  })
  
  activeTocSection.value = currentSection
  activeSection.value = currentSection
}

// 生命週期
onMounted(() => {
  if (process.client) {
    window.addEventListener('scroll', () => {
      updateScrollProgress()
      updateActiveTocSection()
    })
    
    // 初始設定
    updateScrollProgress()
    updateActiveTocSection()
  }
})

onUnmounted(() => {
  if (process.client) {
    window.removeEventListener('scroll', updateScrollProgress)
    window.removeEventListener('scroll', updateActiveTocSection)
  }
})
</script>

<style scoped>
/* 太空風格動畫 */
@keyframes starfield-drift {
  0% { transform: translateX(0) translateY(0); }
  25% { transform: translateX(-2px) translateY(-1px); }
  50% { transform: translateX(2px) translateY(1px); }
  75% { transform: translateX(-1px) translateY(2px); }
  100% { transform: translateX(0) translateY(0); }
}

@keyframes energy-pulse {
  0%, 100% { 
    opacity: 0.4;
    transform: scale(1);
  }
  50% { 
    opacity: 1;
    transform: scale(1.1);
  }
}

@keyframes hologram-flicker {
  0%, 100% { opacity: 1; }
  98% { opacity: 1; }
  99% { opacity: 0.8; }
}

@keyframes data-stream {
  0% { 
    transform: translateY(-10px);
    opacity: 0;
  }
  20% { 
    opacity: 1;
  }
  80% { 
    opacity: 1;
  }
  100% { 
    transform: translateY(10px);
    opacity: 0;
  }
}

.animate-starfield-drift {
  animation: starfield-drift 12s ease-in-out infinite;
}

.animate-energy-pulse {
  animation: energy-pulse 2s ease-in-out infinite;
}

.animate-hologram-flicker {
  animation: hologram-flicker 5s ease-in-out infinite;
}

.animate-data-stream {
  animation: data-stream 2s ease-in-out infinite;
}

/* 新增的太空風格動畫 */
@keyframes pulse-slow {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
}

@keyframes pulse-gentle {
  0%, 100% { 
    transform: scale(1);
    opacity: 0.8;
  }
  50% { 
    transform: scale(1.1);
    opacity: 1;
  }
}

@keyframes scan-line {
  0% { transform: translateX(-100%); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateX(100%); opacity: 0; }
}

.animate-pulse-slow {
  animation: pulse-slow 4s ease-in-out infinite;
}

.animate-pulse-gentle {
  animation: pulse-gentle 3s ease-in-out infinite;
}

.animate-scan-line {
  animation: scan-line 3s ease-in-out infinite;
}

/* 自定義動畫 */
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

@keyframes slide-in-up {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float-gentle {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  33% {
    transform: translateY(-8px) rotate(1deg);
  }
  66% {
    transform: translateY(-4px) rotate(-1deg);
  }
}

@keyframes pulse-gentle {
  0%, 100% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
}

@keyframes glow-soft {
  0%, 100% {
    box-shadow: 0 0 10px rgba(251, 191, 36, 0.3);
  }
  50% {
    box-shadow: 0 0 20px rgba(251, 191, 36, 0.5), 0 0 30px rgba(251, 191, 36, 0.3);
  }
}

@keyframes gradient-shift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out;
}

.animate-slide-in-up {
  animation: slide-in-up 0.6s ease-out forwards;
}

.animate-float-gentle {
  animation: float-gentle 6s ease-in-out infinite;
}

.animate-pulse-gentle {
  animation: pulse-gentle 3s ease-in-out infinite;
}

.animate-glow-soft {
  animation: glow-soft 2s ease-in-out infinite;
}

.animate-gradient-shift {
  background-size: 200% 200%;
  animation: gradient-shift 8s ease-in-out infinite;
}

/* 自定義滾動條 */
.scrollbar-thin::-webkit-scrollbar {
  width: 6px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: rgba(30, 41, 59, 0.3);
  border-radius: 10px;
}

.scrollbar-thumb-amber-500\/30::-webkit-scrollbar-thumb {
  background: rgba(245, 158, 11, 0.3);
  border-radius: 10px;
}

.scrollbar-thumb-amber-500\/30::-webkit-scrollbar-thumb:hover {
  background: rgba(245, 158, 11, 0.5);
}

/* Prose 樣式調整 */
.prose :deep(p) {
  margin-bottom: 1rem;
  line-height: 1.7;
}

.prose :deep(strong) {
  color: rgb(251 191 36);
  font-weight: 600;
}

.prose :deep(ul) {
  margin: 1rem 0;
  padding-left: 1.5rem;
}

.prose :deep(li) {
  margin-bottom: 0.5rem;
}

.prose :deep(.bg-slate-700\/30) {
  background-color: rgba(51, 65, 85, 0.3);
  padding: 1rem;
  border-radius: 0.75rem;
  border-left: 4px solid rgb(251 191 36);
  margin: 1rem 0;
}
</style>