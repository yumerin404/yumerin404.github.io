<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
    <!-- 進度條 -->
    <WritingProgressBar 
      :progress="scrollProgress"
      variant="gradient"
      :show-glow="true"
      :animated="true"
    />

    <!-- 背景裝飾效果 -->
    <WritingGradientBackground 
      variant="cosmic"
      opacity="light"
      :decoration-count="20"
      decoration-symbol="✧"
      :show-particles="true"
      :particle-count="15"
    />

    <!-- Header -->
    <Header />

    <!-- Main Content -->
    <main class="relative z-10 pt-20">
      <!-- Breadcrumb -->
      <section class="py-4 px-4">
        <div class="container mx-auto max-w-7xl">
          <nav class="flex items-center space-x-2 text-sm text-gray-400">
            <NuxtLink to="/" class="hover:text-cyan-400 transition-colors duration-300">首頁</NuxtLink>
            <Icon name="heroicons:chevron-right" class="w-4 h-4" />
            <NuxtLink to="/learning" class="hover:text-cyan-400 transition-colors duration-300">心境與學習筆記</NuxtLink>
            <Icon name="heroicons:chevron-right" class="w-4 h-4" />
            <span class="text-cyan-400">發文紀錄</span>
          </nav>
        </div>
      </section>

      <!-- Hero Section -->
      <section class="py-16 px-4 relative">
        <div class="container mx-auto max-w-5xl text-center">
          <div class="mb-12 animate-fade-in-up">
            <!-- 圖標容器 -->
            <div class="flex justify-center items-center mb-8">
              <div class="relative w-24 h-24 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-3xl flex items-center justify-center backdrop-blur-sm border border-cyan-500/30">
                <div class="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-blue-400/10 rounded-3xl animate-pulse-gentle"></div>
                <Icon name="heroicons:pencil-square" class="relative z-10 w-12 h-12 text-cyan-400" />
              </div>
            </div>
            
            <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span class="bg-gradient-to-r from-cyan-300 via-blue-300 via-cyan-300 to-blue-300 bg-clip-text text-transparent animate-gradient-shift">
                發文紀錄
              </span>
            </h1>
            
            <div class="w-32 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 mx-auto rounded-full mb-8 animate-glow-soft"></div>
            
            <p class="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              隨時隨地的想法記錄與心得分享，思維的軌跡與成長的足跡
            </p>
          </div>
        </div>
      </section>

      <!-- 統計資訊區域 -->
      <section class="py-8 px-4">
        <div class="container mx-auto max-w-5xl">
          <div class="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/20 shadow-xl">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div class="text-center">
                <div class="text-2xl font-bold text-cyan-400 mb-1">{{ posts.length }}</div>
                <div class="text-sm text-gray-400">總發文數</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-blue-400 mb-1">{{ totalWords }}</div>
                <div class="text-sm text-gray-400">總字數</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-purple-400 mb-1">{{ averageReadTime }}</div>
                <div class="text-sm text-gray-400">平均閱讀時間</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-indigo-400 mb-1">{{ daysSinceFirst }}</div>
                <div class="text-sm text-gray-400">創作天數</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 搜尋和篩選區域 -->
      <section class="py-8 px-4">
        <div class="container mx-auto max-w-5xl">
          <div class="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/20 shadow-xl">
            <!-- 搜尋框 -->
            <div class="mb-6">
              <div class="relative group">
                <input
                  v-model="searchQuery"
                  type="search"
                  placeholder="搜尋發文內容、標題或標籤..."
                  class="w-full rounded-xl border bg-slate-900/70 border-cyan-500/40 text-white px-4 py-3 pl-12 text-base hover:border-cyan-400/60 hover:bg-slate-900/80 focus:border-cyan-400 focus:ring-cyan-400/25 focus:bg-slate-900/85 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 placeholder:text-gray-500 transition-all duration-300 transform focus:scale-[1.02]"
                />
                <Icon name="heroicons:magnifying-glass" class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-cyan-400 transition-colors duration-300" />
                <button
                  v-if="searchQuery"
                  @click="searchQuery = ''"
                  class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-cyan-300 transition-all duration-300 p-1 rounded-full hover:bg-cyan-500/20 hover:scale-110 active:scale-95"
                >
                  <Icon name="heroicons:x-mark" class="w-4 h-4" />
                </button>
                
                <!-- Focus 發光效果 -->
                <div class="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400/25 to-blue-400/25 blur-md -z-10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 shadow-lg shadow-cyan-500/20"></div>
              </div>
            </div>
            
            <!-- 排序選項 -->
            <div class="flex flex-wrap items-center justify-between gap-4">
              <div class="flex items-center space-x-2">
                <span class="text-sm text-gray-400">排序方式：</span>
                <select 
                  v-model="sortBy"
                  class="bg-slate-800/60 border border-cyan-500/30 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                >
                  <option value="date-desc">最新發布</option>
                  <option value="date-asc">最早發布</option>
                  <option value="title">標題排序</option>
                  <option value="length">內容長度</option>
                </select>
              </div>
              
              <div class="text-sm text-gray-400">
                共找到 <span class="text-cyan-400 font-medium">{{ filteredPosts.length }}</span> 篇發文
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Content Section -->
      <section class="py-16 px-4">
        <div class="container mx-auto max-w-5xl">
          <!-- 載入狀態 -->
          <div v-if="loading" class="text-center py-16">
            <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-400 mx-auto mb-4"></div>
            <p class="text-gray-400">正在載入內容...</p>
          </div>
          
          <!-- 錯誤狀態 -->
          <div v-else-if="error" class="text-center py-16">
            <div class="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="heroicons:exclamation-triangle" class="w-12 h-12 text-red-400" />
            </div>
            <h3 class="text-xl font-medium text-red-400 mb-2">載入失敗</h3>
            <p class="text-gray-500 mb-6">{{ error }}</p>
            <button
              @click="loadMarkdownFiles"
              class="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 bg-red-500/20 border border-red-500/60 text-red-400 hover:bg-red-500/30 hover:border-red-400"
            >
              <Icon name="heroicons:arrow-path" class="w-4 h-4 mr-2" />
              重新載入
            </button>
          </div>
          
          <!-- 內容區域 -->
          <div v-else class="space-y-8">
            <!-- 發文卡片 -->
            <LearningPostCard
              v-for="(post, index) in filteredPosts"
              :key="post.id"
              :post="post"
              :variant="getPostVariant(post, index)"
              :animation-delay="index * 100"
              @favorite="handleFavorite"
              @share="handleShare"
              @expand="handleExpand"
            />
            
            <!-- 沒有結果提示 -->
            <div 
              v-if="filteredPosts.length === 0" 
              class="text-center py-16"
            >
              <div class="w-24 h-24 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="heroicons:document-magnifying-glass" class="w-12 h-12 text-gray-500" />
              </div>
              <h3 class="text-xl font-medium text-gray-400 mb-2">沒有找到相關發文</h3>
              <p class="text-gray-500 mb-6">請嘗試調整搜尋關鍵字</p>
              <button
                @click="resetSearch"
                class="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 bg-transparent border-2 border-cyan-500/60 text-cyan-400 hover:bg-cyan-500/15 hover:border-cyan-400 hover:scale-105 hover:text-cyan-200 hover:shadow-lg hover:shadow-cyan-500/25 focus:ring-cyan-500 focus:ring-4 active:scale-95 transform"
              >
                <Icon name="heroicons:arrow-uturn-left" class="w-4 h-4 mr-2" />
                清除搜尋
              </button>
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
            class="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-800/95 to-slate-900/90 backdrop-blur-xl border-l border-y border-cyan-500/40 rounded-l-2xl shadow-2xl transition-all duration-500 overflow-hidden"
            :class="triggerHover ? 'border-cyan-400/80 shadow-[0_0_30px_rgba(34,211,238,0.3)]' : ''"
          >
            
            <!-- 能量流動條 -->
            <div class="absolute left-1 top-1/2 -translate-y-1/2 w-1 h-16 bg-gradient-to-b from-cyan-400/60 via-blue-500/80 to-purple-500/60 rounded-full transition-all duration-500"
                 :class="triggerHover ? 'w-1.5 shadow-[0_0_20px_rgba(34,211,238,0.8)] animate-pulse' : ''">
              <!-- 能量脈衝點 -->
              <div class="absolute top-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan-300 rounded-full animate-ping"></div>
              <div class="absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-purple-300 rounded-full animate-ping" style="animation-delay: 0.7s;"></div>
              <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-blue-300 rounded-full animate-ping" style="animation-delay: 1.2s;"></div>
            </div>
            
            <!-- 側邊觸發圖示 -->
            <div class="absolute right-2 top-1/2 -translate-y-1/2 transition-all duration-500"
                 :class="triggerHover ? 'scale-110 text-cyan-300' : 'text-gray-400'">
              <Icon name="heroicons:bars-3" class="w-6 h-6" />
            </div>
            
            <!-- 全息提示標籤 -->
            <div 
              class="absolute left-20 top-1/2 -translate-y-1/2 transition-all duration-500 transform"
              :class="triggerHover ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'"
            >
              <div class="bg-slate-900/95 backdrop-blur-sm border border-cyan-500/50 rounded-xl px-4 py-2 shadow-2xl">
                <div class="text-sm text-cyan-300 font-medium">發文導航</div>
                <div class="text-xs text-gray-400 mt-1">點擊展開</div>
              </div>
              <!-- 全息箭頭 -->
              <div class="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-8 border-transparent border-r-cyan-500/50"></div>
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
          <div class="absolute -inset-2 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10 rounded-2xl blur-lg animate-pulse-slow"></div>
          
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
                  :loading="contentLoading"
                  theme="learning"
                  trigger-icon="heroicons:pencil-square"
                  trigger-title="發文導航"
                  system-title="POSTS_MATRIX"
                  search-placeholder="搜索發文內容..."
                  @item-click="scrollToSection"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 回到頂部按鈕 -->
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
useSEO({
  title: '發文紀錄 - 夢鈴領域',
  description: '思考軌跡與心境感悟的發文紀錄，分享觀點與反思的點點滴滴。',
  keywords: '發文紀錄, 思考軌跡, 心境感悟, 觀點分享, 深度反思',
  type: 'website'
})

// 響應式數據
const searchQuery = ref('')
const sortBy = ref('date-desc')
const scrollProgress = ref(0)
const activeSection = ref('')
const showSidebar = ref(false)
const triggerHover = ref(false)
const contentLoading = ref(true)

// 使用內容管理系統
const { 
  posts: markdownPosts, 
  loading, 
  error, 
  loadMarkdownFiles, 
  searchPosts,
  getStatistics 
} = useMarkdownContent()

// 預設的發文數據（作為後備）
const defaultPosts = [
  {
    id: 'civil-war-necessity',
    title: '國家內戰的必然性',
    content: `國家是全體人民組成，政治是人民的共識。一個國家沒辦法形成大多數認同的共識，就是內戰。內戰的形式很多，包含了字面上的戰爭，如南北內戰、國共內戰。也包含了政變、造反、革命的內戰。同時也包含了上層權利控制的內戰與下層群眾支持的內戰。但不管怎麼說，一旦國家陷入了內戰一定是有兩個完全無法兼容的聲音，並且兩派的人是無法溝通的。**內戰是必要的，而且越是激烈的內戰最後得到勝利的一方越是穩固，內戰要是過於溫和無法有效清除另一方，那麼國家必然陷入無止境的內亂。** 至於你說內戰勝者是否就是正確的？這不一定，但反應的一定是這個時代。台灣現在就是內戰，兩派絕無法溝通的，上層的兩派爭奪權利，下層的群眾爭奪話語，最終必然一方勝出，上面統一權利，下面統一話語，國家將會朝著一個穩定的方向前進，不管是否符合個人意願。至於大家說的多元民主，如果你真心相信這種說法，那你大致上屬於一般群眾。這是一種凝聚支持的口號，共產有：無貧富差距，民主有：自由言論，社會主義有：人人平等，每個口號都很漂亮，反應的不是真實而是一種信念。**國家必定有貧富差距，國家必定有言論控制，國家必定有不平等，這是現實。** 最終還是取決於時代。`,
    excerpt: '國家是全體人民組成，政治是人民的共識。一個國家沒辦法形成大多數認同的共識，就是內戰。',
    date: '2024-01-15',
    readTime: 5,
    wordCount: 450,
    tags: ['政治', '社會觀察', '國家治理']
  },
  {
    id: 'writer-community-essence',
    title: '作家群體的本質',
    content: `大部分的人很難平時就思考深入人內心的問題。大家通常都得過且過，腦袋放空，思考毫無意義的事物。只有在生活中的困難與挑戰時，才會與內心溝通。而且，大部分的人聽到深入的話題都會本能的感覺好笑，並將對方當成笑話。這也很正常，就像開頭說道，大多數的人無法思考內心，無法去探討哲學，也不想去觸碰，思考也侷限生活事物。那麼，如果說這個人具有平時就深入思考的特質，那麼大概率這個人必定會是作家。**這邊的作家不是大眾認知中以寫作維生的人，而是更加廣泛的群體。** 長期的會發表長文，內容有深思有反思有觀點，可能是心得，可能是技術，也可能是小說。為何長期寫作？因為內心有話想說，有想要輸出的觀點，有想要反思的自己，自然而然會有寫作的習慣，這是一種自然而然的習慣。這些人平時就會思考各種事物，而往往不只是生活層面，已經達到了哲學的高度，這些人也會尋找與閱讀觀點，並吸收自己認同的部分，最後在輸出自己的想法。這些人不能改變甚麼，也沒打算說服他人，他們太過清楚大多數人是不可改變的。**這些人是文化與思想推動的力量，是一種無形的力量，他們會將各種想要推動的觀點藏在各種內容之中，無形的影響人們。** 而有些則變成全體共識。`,
    excerpt: '大部分的人很難平時就思考深入人內心的問題。大家通常都得過且過，腦袋放空，思考毫無意義的事物。',
    date: '2024-01-20',
    readTime: 4,
    wordCount: 380,
    tags: ['寫作', '思維方式', '社會觀察']
  },
  {
    id: 'writing-interesting-fact',
    title: '寫作的有趣真相',
    content: `寫作有一件事情很有趣，可能讀者不知道，但作者必須要清楚的事情。當你看到故事走到一個看起來幾乎沒辦法解決的死路，不管怎麼做好像都沒有解的時候，其實因為讀者是跟著故事走才會有這個問題。一般優秀的作者，其實是先寫了解答後，才開始回頭寫過程，因此問題的解答一直都很清楚，只是讀者不知道，被劇情帶著走。看似死路，但其實是只有一個解答，為了這個解答設計的整個過程，而這個過程在解答沒出現時，看起來就是無解。很有趣吧。`,
    date: '2024-01-25',
    readTime: 2,
    wordCount: 180,
    tags: ['寫作技巧', '創作過程']
  },
  {
    id: 'old-generation-tragedy',
    title: '窮山惡水出刁民的時代悲劇',
    content: `窮山惡水出刁民，那個年代餓過的老人，到了現在就是佔盡便宜，就算自己用不到，也是如此。有時候這些人是很可悲可憐的，之前我也看過有很多房地產的老太婆，推著推車在收紙箱。這些人一輩子也沒甚麼享受，思想也是侷限，是可悲的一代，將自己的一切奉獻給了未來，並內心有極端的不平衡，批判現在的人，將一切節儉當成唯一真理，能拿的就拿，能貪的貪。最終他們被時代給淘汰，只能在這現代社會中，努力堅持的維護自身的思想，並套用的所有人，一旦偏離就是批判攻擊，這就是老人。`,
    date: '2024-01-28',
    readTime: 3,
    wordCount: 220,
    tags: ['社會觀察', '世代差異', '心理分析']
  },
  {
    id: 'excellent-employee-boss',
    title: '優秀員工與老闆的權力博弈',
    content: `這位業績最好的員工應該感謝這位老闆。作為人才，不應該在這樣的公司工作，必須要走的更高，優秀的人不需要擔心沒有工作，真正需要擔心的是自己停下來了你考到 C 段班的第一名，被 C 段班踢出去，那麼也表示你應該要在走上去，不能回頭，而是要走上去。歷練也夠了，人脈也有了，眼界也開了，最後建立自己的事業，為自己工作。至於老闆的問題，太過優秀的人，其實老闆不一定會喜歡，整個公司的權利跟能量會從老闆身上轉移的這位員工身上。這對老闆來說是危機，是不安，是必須要清除的。相對也證明了，這個老闆的上限與公司的上限。一個足夠強大的企業，必須要有很多比老闆還厲害的人，讓他們更加自由個掌管某個領域，而老闆要有心胸接納並讓這些優秀的人敬佩。這樣的敬佩不一定是能力，而是老闆的眼光、策略、路線與智慧。當做到足夠大，老闆就不應該知道細節，知道細節沒意義，應該要討論哲學了。公司的哲學很重要，甚麼意思？意思是公司的文化，這個文化代表了公司的高度與上限，同時也是這位老闆的天花板，一旦進入這個領域，基本上就是一方雄霸，這個文化將會吸收對應的人才與核心理念相似的人。`,
    excerpt: '這位業績最好的員工應該感謝這位老闆。作為人才，不應該在這樣的公司工作，必須要走的更高。',
    date: '2024-02-01',
    readTime: 6,
    wordCount: 520,
    tags: ['職場觀察', '企業文化', '人才管理']
  },
  {
    id: 'human-belief-defense',
    title: '人性的信念防禦機制',
    content: `我認為一個人最麻煩的地方就是：為了維護自身信念，而強烈的感情宣洩。人自始自終都是以自己的價值觀、信念、想法與相信為核心。一旦有人突破了自己的價值觀或觸碰到了自己的就會本能的出現防禦與評判。例如說：同性戀，這個挑戰了很多人的價值觀與信念，男男或女女在一起，就算不妨到自己任何事情，有沒有利益上衝突，更不觀這些人甚麼事情，但就是因為與自己的價值觀衝突，演變成強烈的抗爭。在例如：一個老人就算有幾千億，但生活可能比乞丐還節儉，看到年輕人花點錢吃好一點，就要批判，這也是因為自己的價值觀與信念。當然，這些都能包裝成合理的理由，可以從別的方向來說，也可能是整體人民在這個時代體現出的價值觀與觀念。但我還是想說：在不侵犯與侵害他人自由與公眾的情況下，基本上做甚麼那是你們的事情。別老是情緒勒索、守護自己沒屁用的價值觀，來去侵犯他人自由，硬是要將周圍一切的運行都跟自己想的一樣，很噁。`,
    excerpt: '我認為一個人最麻煩的地方就是：為了維護自身信念，而強烈的感情宣洩。',
    date: '2024-02-05',
    readTime: 4,
    wordCount: 350,
    tags: ['人性分析', '價值觀', '自由思考']
  },
  {
    id: 'siblings-marriage-opinion',
    title: '關於親屬關係的思辨',
    content: `我想講一個我一直希望能變成一種合法的情況，那就是兄妹、姐弟的結婚與生子。你能拿出一百種不能的理由，但以現在科學來說也肯給出一百種解決的方案。甚麼基因病，甚麼風險，如果事前都能做檢查，能避開那些風險，而且雙方也願意承擔，那麼有甚麼不可。相反，如果依然持有反對的，應該也要一同反對那些夫妻從 DNA 檢驗出問題，必須要強制也將這些人分開。我們一視同仁，而不是結論一樣，但某些人就是比另一些人還更可以接受。`,
    date: '2024-02-08',
    readTime: 3,
    wordCount: 200,
    tags: ['社會議題', '倫理思辨', '科學與道德']
  },
  {
    id: 'careful-solitude-interpretation',
    title: '對「慎獨」的獨道解讀',
    content: `禮記•中庸：君子戒慎乎其所不睹，恐懼乎其所不聞。莫見乎隱，莫顯乎微，故君子慎其獨也。這邊的慎獨，網路上的解釋很多很多，基本上每個解釋都有其道理。我個人認為的慎表示？必須謹慎，小心且注意。但後面的獨這個字的解釋，網路上有著多種解釋，但如果能配合前後文的內容來解讀的話：不睹：表示沒有見過。不聞：表示沒聽過。乎隱：隱藏在其中的道理。乎微：道理中細微的差異。那麼解讀「故君子慎其獨也」就可以說：小心謹慎的保持自己獨道的見解，不要被人云亦云帶偏。我看到外面一堆解釋說甚麼：意思是說，就算在別人看不見、聽不見的地方、細微處，也都要慎重行事，表裡如一。這也提示著自己修行和為人處事該有的觀念和態度。修行用功，是要向自己交代，而不是做給旁人看的完全是錯誤的，中庸不是那種心靈雞湯，而是道理跟心學，不是要你甚麼表裡如一，如字面上：中庸，表示自己的獨立性與思想。外面一堆心靈雞湯就不知道怎麼回事。`,
    excerpt: '禮記•中庸：君子戒慎乎其所不睹，恐懼乎其所不聞。莫見乎隱，莫顯乎微，故君子慎其獨也。',
    date: '2024-02-12',
    readTime: 5,
    wordCount: 420,
    tags: ['古典文學', '哲學思辨', '獨立思考']
  },
  {
    id: 'security-paradox',
    title: '安全的弔詭本質',
    content: `安全這件事情其實很弔詭。很多時候自己以為的安全，其實只是資訊不夠充分導致的。簡單舉個例子，你認為自己使用的密碼很長很難不會被破解，但實際上駭客基本上攻克的不是你的密碼，而是網站，並且許多網站都是存明碼，你的密碼連猜都不用猜，駭客就知道了。這種自己覺得安全的根本，就是自己的眼界、思考與對方的強大有關。你看到夠多就能越理解安全邊界，這條邊界跟著你的知識與眼界走，看到越多邊界越清楚。你的思考決定了安全的強度，思考的越深入越多且越多樣，強度越高，就能做出相對強的安全程度。最後，敵人的強大，這個無法控制而且很多如黑天鵝，例如：下一秒出現超級量子電腦，雖有密碼當下全部都能在一秒內破解。這種敵人的強大難以預估，而且花招百出，有繞過的、有暴力的、有玩數學的，反正各種都有。你就算是專家，眼界跟思想都足夠深入且廣闊，依然可能死在敵人手上，這種我們只能說：命。但通常也必須是足夠份量的目標才會遇到這種鬼事就是了。安全真的是很難很難的一件事，只能不斷的強化，並銘記奶酪理論跟木桶理論。`,
    excerpt: '安全這件事情其實很弔詭。很多時候自己以為的安全，其實只是資訊不夠充分導致的。',
    date: '2024-02-15',
    readTime: 5,
    wordCount: 480,
    tags: ['資訊安全', '風險管理', '思維模式']
  },
  {
    id: 'wake-up-sleeping-people',
    title: '叫不醒裝睡的人',
    content: `有時候真的需要有人指點，不然自己還在那邊想。的確，當有人質問你：你怎麼證明你中立，兩邊的人看你也都覺得你極端，那該怎麼辦？你要怎麼證明自己？不用證明，因為你永遠叫不醒裝睡的人。`,
    date: '2024-02-18',
    readTime: 1,
    wordCount: 85,
    tags: ['人際關係', '溝通', '理性思考']
  },
  {
    id: 'ignorance-is-root-evil',
    title: '萬惡蠢為首',
    content: `萬惡蠢為首。`,
    date: '2024-02-20',
    readTime: 1,
    wordCount: 6,
    tags: ['警句', '智慧']
  },
  {
    id: 'rationality-vs-mobilization',
    title: '理性與動員能力的反比關係',
    content: `越理性，越聰明，越難操控與聚集。每個人都有每個人的想法，並且特別討厭去做一些毫無道理的活動。相反，越是愚笨越是瘋子，越好聚集越好動員。有一致的信仰與心目中的神。一個現代且高知識份子的國家，越是難統一意見而且偏向於保守，如：瑞士的公民。而一個越是以信仰與意識形態的國家，越能統一某種信念，並且全力以赴毫無保留的風險自己。共識本來就是難達成的，要是能達成某種共識，在高知識的社會中，一定是付出了很大的代價與妥協，最終得到的還是一個保守的答案。動員能力強的大概率都是低知識，第一個是有時間，第二個是憤慨跟自己其實沒甚麼關係的事情，只是想強加於他人某種意識，用來鞏固自己內心的信仰與精神。第三是善於包裝與神話敘事，並加上各種假的內容與神蹟。當年的中國就是如此。而台灣現在屬於那一種我不知道，我也不敢知道。`,
    excerpt: '越理性，越聰明，越難操控與聚集。每個人都有每個人的想法，並且特別討厭去做一些毫無道理的活動。',
    date: '2024-02-22',
    readTime: 4,
    wordCount: 360,
    tags: ['政治觀察', '社會心理', '群眾動員']
  },
  {
    id: 'recall-system-concerns',
    title: '對罷免制度的憂慮',
    content: `我還是覺得很怪，罷免在維基百科的解釋：被罷免人通常是因未積極實現政見，或有失職情形導致選民不滿。但目前很多被罷免的人，其實也沒做的不好，甚至有些做得很不錯。只因為國家執政黨想走向三權合一（行政、立法與司法）而起動罷免連署，我真的覺得不行。根據美國國父也好、孫中山先生也好，三權分立或五權憲法的體制都是希望權力能互相制衡。其中立法權對行政權的監督，司法權應獨立於行政與立法，以憲法解釋與案件的最高解釋機構，能同時制衡牴觸憲法的立法與憲政危機制止執政權的越權。但現在，我所居住的這個小小的島，小小的國，卻向著『集』權走，這邊注意用詞，不是極權，而是集權，將三權掌握在執政黨手中。很多人用著『愛國』的理由包裝這種行為，這種模式跟當年『納粹』又有什麼不同？而目前的第四權也被掌握在了執政黨手中，宣傳手法如同當年的納粹一致。以我個人的觀點來說，我是不希望走向這種國家集權模式，我其實更傾向於瑞士的模式，以類似於現代社會主義為國家體制。但說回來，取得如此大的權力，要麼想貪污之類的，不然就是想幹點大事。而真正令我感到恐懼的是後者。`,
    excerpt: '我還是覺得很怪，罷免在維基百科的解釋：被罷免人通常是因未積極實現政見，或有失職情形導致選民不滿。',
    date: '2024-02-25',
    readTime: 6,
    wordCount: 520,
    tags: ['政治制度', '三權分立', '民主憂慮']
  }
]

// 合併 markdown 內容和預設內容
const posts = computed(() => {
  const combined = [...markdownPosts.value, ...defaultPosts]
  // 根據日期排序並去重（優先使用 markdown 內容）
  const unique = combined.reduce((acc, post) => {
    const existing = acc.find(p => p.id === post.id)
    if (!existing) {
      acc.push(post)
    }
    return acc
  }, [] as any[])
  
  return unique.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
})

// 計算屬性
const filteredPosts = computed(() => {
  let filtered = [...posts.value]

  // 搜尋篩選
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim()
    filtered = filtered.filter(post => 
      post.title.toLowerCase().includes(query) ||
      post.content.toLowerCase().includes(query) ||
      post.tags?.some(tag => tag.toLowerCase().includes(query))
    )
  }

  // 排序
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'date-desc':
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      case 'date-asc':
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      case 'title':
        return a.title.localeCompare(b.title, 'zh-TW')
      case 'length':
        return b.wordCount - a.wordCount
      default:
        return 0
    }
  })

  return filtered
})

const totalWords = computed(() => {
  return posts.value.reduce((sum, post) => sum + post.wordCount, 0).toLocaleString()
})

const averageReadTime = computed(() => {
  const total = posts.value.reduce((sum, post) => sum + post.readTime, 0)
  return posts.value.length > 0 ? Math.round(total / posts.value.length) + ' 分鐘' : '0 分鐘'
})

const daysSinceFirst = computed(() => {
  if (posts.value.length === 0) return '0 天'
  
  const firstPost = posts.value.reduce((earliest, post) => {
    return new Date(post.date) < new Date(earliest.date) ? post : earliest
  })
  const diffTime = new Date().getTime() - new Date(firstPost.date).getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays + ' 天'
})

// 側邊欄專用的目錄數據
const tocData = computed(() => {
  return filteredPosts.value.map(post => ({
    id: post.id,
    title: post.title,
    subtitle: post.excerpt || post.content.substring(0, 80) + '...',
    category: determineCategoryByTags(post.tags),
    level: 1,
    readTime: post.readTime,
    wordCount: post.wordCount
  }))
})

// 側邊欄專用的分類數據
const tocCategories = computed(() => [
  { key: 'political', name: '政治觀察', icon: 'heroicons:building-library' },
  { key: 'social', name: '社會思考', icon: 'heroicons:users' },
  { key: 'writing', name: '寫作心得', icon: 'heroicons:pencil-square' },
  { key: 'philosophy', name: '哲學思辨', icon: 'heroicons:light-bulb' },
  { key: 'psychology', name: '心理分析', icon: 'heroicons:academic-cap' },
  { key: 'other', name: '其他', icon: 'heroicons:ellipsis-horizontal' }
])

// 工具函數
const determineCategoryByTags = (tags: string[]) => {
  if (!tags || tags.length === 0) return 'other'
  
  const politicalTags = ['政治', '國家治理', '政治觀察', '政治制度', '三權分立', '民主憂慮', '群眾動員']
  const socialTags = ['社會觀察', '世代差異', '職場觀察', '企業文化', '人才管理', '社會議題', '倫理思辨', '社會心理']
  const writingTags = ['寫作', '寫作技巧', '創作過程', '思維方式']
  const philosophyTags = ['哲學思辨', '獨立思考', '古典文學', '價值觀', '自由思考', '理性思考', '智慧']
  const psychologyTags = ['心理分析', '人性分析', '人際關係', '溝通']
  
  for (const tag of tags) {
    if (politicalTags.some(pt => tag.includes(pt))) return 'political'
    if (socialTags.some(st => tag.includes(st))) return 'social'
    if (writingTags.some(wt => tag.includes(wt))) return 'writing'
    if (philosophyTags.some(pt => tag.includes(pt))) return 'philosophy'
    if (psychologyTags.some(pt => tag.includes(pt))) return 'psychology'
  }
  
  return 'other'
}
const getPostVariant = (post: any, index: number) => {
  if (index === 0) return 'featured'
  if (post.wordCount > 400) return 'default'
  return 'compact'
}

// 事件處理
const handleFavorite = (postId: string, favorited: boolean) => {
  console.log(`${favorited ? '收藏' : '取消收藏'}: ${postId}`)
}

const handleShare = (post: any) => {
  if (!process.client) return
  
  if (navigator.share) {
    navigator.share({
      title: post.title,
      text: post.excerpt || post.title,
      url: window.location.href + '#' + post.id
    })
  } else {
    navigator.clipboard.writeText(window.location.href + '#' + post.id)
  }
}

const handleExpand = (postId: string, expanded: boolean) => {
  console.log(`${expanded ? '展開' : '收合'}: ${postId}`)
}

const resetSearch = () => {
  searchQuery.value = ''
  sortBy.value = 'date-desc'
}

// 側邊欄相關方法
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    activeSection.value = sectionId
  }
}

const updateActiveSection = () => {
  if (!process.client) return
  
  const posts = document.querySelectorAll('[id]')
  let currentSection = ''
  
  posts.forEach(post => {
    const rect = post.getBoundingClientRect()
    if (rect.top <= 200 && rect.bottom >= 200) {
      currentSection = post.id
    }
  })
  
  activeSection.value = currentSection
}

const updateScrollProgress = () => {
  if (!process.client) return
  
  const scrollTop = window.pageYOffset
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  scrollProgress.value = (scrollTop / docHeight) * 100
}

// 生命週期
onMounted(async () => {
  try {
    // 載入 markdown 檔案
    await loadMarkdownFiles()
    // 模擬載入延遲
    await new Promise(resolve => setTimeout(resolve, 500))
  } finally {
    contentLoading.value = false
  }
  
  if (process.client) {
    const handleScroll = () => {
      updateScrollProgress()
      updateActiveSection()
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    updateScrollProgress()
    updateActiveSection()
  }
})

onUnmounted(() => {
  if (process.client) {
    window.removeEventListener('scroll', updateScrollProgress)
  }
})
</script>

<style scoped>
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
    box-shadow: 0 0 10px rgba(34, 211, 238, 0.3);
  }
  50% {
    box-shadow: 0 0 20px rgba(34, 211, 238, 0.5), 0 0 30px rgba(34, 211, 238, 0.3);
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

/* 搜尋輸入框特殊效果 */
.search-input :deep(.group:focus-within) {
  transform: scale(1.02);
}
</style>