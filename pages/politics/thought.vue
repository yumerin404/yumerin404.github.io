<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900/95 to-slate-950 text-white relative overflow-hidden">
    
    <!-- 古典雅典背景紋理 -->
    <div class="absolute inset-0 opacity-20">
      <!-- 大理石基底 -->
      <div class="absolute inset-0 bg-gradient-to-br from-amber-50/5 via-transparent to-slate-800/10"></div>
      <!-- 古典紋理 -->
      <div class="absolute inset-0" style="background-image: radial-gradient(circle at 25% 25%, rgba(212, 175, 55, 0.08) 0%, transparent 40%), radial-gradient(circle at 75% 75%, rgba(139, 154, 91, 0.06) 0%, transparent 40%), radial-gradient(circle at 50% 10%, rgba(248, 247, 244, 0.03) 0%, transparent 30%)"></div>
      <!-- 柱式裝飾 -->
      <div class="absolute left-8 top-20 w-1 h-40 bg-gradient-to-b from-amber-400/20 to-transparent rounded-full"></div>
      <div class="absolute right-12 top-32 w-1 h-32 bg-gradient-to-b from-amber-400/15 to-transparent rounded-full"></div>
      <div class="absolute left-1/4 bottom-20 w-0.5 h-24 bg-gradient-to-b from-amber-400/25 to-transparent rounded-full"></div>
    </div>

    <!-- 滾動進度條 - 古典金色 -->
    <div class="fixed top-0 left-0 right-0 h-1 bg-slate-800/50 z-50">
      <div 
        class="h-full bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 transition-all duration-300 shadow-lg shadow-amber-500/30"
        :style="{ width: scrollProgress + '%' }"
      ></div>
    </div>

    <!-- Header -->
    <Header />

    <!-- Main Content -->
    <main class="relative z-10 pt-20">
      
      <!-- Breadcrumb -->
      <section class="py-4 px-4">
        <div class="container mx-auto max-w-7xl">
          <nav class="flex items-center space-x-2 text-sm text-gray-400">
            <NuxtLink to="/" class="hover:text-amber-400 transition-colors duration-300 flex items-center group">
              <Icon name="heroicons:home" class="w-4 h-4 mr-1 group-hover:scale-110 transition-transform duration-300" />
              首頁
            </NuxtLink>
            <Icon name="heroicons:chevron-right" class="w-4 h-4" />
            <NuxtLink to="/politics" class="hover:text-amber-400 transition-colors duration-300 group">
              <span class="group-hover:tracking-wide transition-all duration-300">政治、思維、哲學</span>
            </NuxtLink>
            <Icon name="heroicons:chevron-right" class="w-4 h-4" />
            <span class="text-amber-400 font-medium">思維方式</span>
          </nav>
        </div>
      </section>

      <!-- Hero Section - 古典雅典風格 -->
      <section class="py-20 px-4 relative">
        <div class="container mx-auto max-w-6xl text-center">
          <div class="mb-16 animate-fade-in-up">
            
            <!-- 智慧女神殿堂圖標 -->
            <div class="flex justify-center items-center mb-10">
              <div class="relative w-32 h-32 group">
                <!-- 外層光環 -->
                <div class="absolute -inset-4 bg-gradient-to-br from-amber-400/20 via-yellow-400/10 to-amber-500/20 rounded-full blur-xl animate-pulse-gentle"></div>
                <!-- 主體容器 -->
                <div class="relative w-full h-full bg-gradient-to-br from-amber-500/20 to-amber-600/30 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-amber-500/40 shadow-2xl group-hover:scale-105 transition-transform duration-500">
                  <!-- 內層大理石效果 -->
                  <div class="absolute inset-2 bg-gradient-to-br from-amber-50/10 via-transparent to-amber-400/20 rounded-full"></div>
                  <!-- 古典符號 -->
                  <div class="relative z-10 flex items-center justify-center">
                    <Icon name="heroicons:academic-cap" class="w-16 h-16 text-amber-400 group-hover:text-amber-300 transition-colors duration-300" />
                    <!-- 智慧之光 -->
                    <div class="absolute -top-2 -right-2 w-6 h-6 text-amber-300 opacity-80 animate-pulse">
                      <svg viewBox="0 0 24 24" fill="currentColor" class="w-full h-full">
                        <path d="M12 2L11.5 8.5L7 9L11.5 13.5L12 20L12.5 13.5L17 9L12.5 8.5L12 2Z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 主標題 -->
            <h1 class="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 font-serif">
              <span class="bg-gradient-to-r from-amber-300 via-yellow-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent animate-gradient-shift">
                思維方式
              </span>
            </h1>
            
            <!-- 古典分隔線設計 -->
            <div class="flex justify-center items-center mb-8">
              <!-- 左側線條 -->
              <div class="flex items-center">
                <div class="w-20 h-px bg-gradient-to-r from-transparent to-amber-400"></div>
                <div class="w-2 h-2 bg-amber-400 rounded-full mx-2 animate-pulse"></div>
              </div>
              
              <!-- 中央古典裝飾 -->
              <div class="mx-6 relative">
                <div class="w-16 h-16 border-2 border-amber-400/60 rounded-full flex items-center justify-center relative">
                  <div class="w-8 h-8 border border-amber-400/40 rounded-full flex items-center justify-center">
                    <div class="w-3 h-3 bg-amber-400 rounded-full animate-pulse"></div>
                  </div>
                  <!-- 古典點綴 -->
                  <div class="absolute -top-1 -left-1 w-3 h-3 border border-amber-400/40 rounded-full"></div>
                  <div class="absolute -top-1 -right-1 w-3 h-3 border border-amber-400/40 rounded-full"></div>
                  <div class="absolute -bottom-1 -left-1 w-3 h-3 border border-amber-400/40 rounded-full"></div>
                  <div class="absolute -bottom-1 -right-1 w-3 h-3 border border-amber-400/40 rounded-full"></div>
                </div>
              </div>
              
              <!-- 右側線條 -->
              <div class="flex items-center">
                <div class="w-2 h-2 bg-amber-400 rounded-full mx-2 animate-pulse" style="animation-delay: 0.5s;"></div>
                <div class="w-20 h-px bg-gradient-to-l from-transparent to-amber-400"></div>
              </div>
            </div>
            
            <!-- 哲學引言 -->
            <div class="max-w-4xl mx-auto">
              <blockquote class="text-2xl md:text-3xl text-gray-300 leading-relaxed font-serif italic mb-6">
                「智慧始於承認自己的無知」
              </blockquote>
              <footer class="text-amber-400 font-medium text-lg">
                — 蘇格拉底 (Socrates)
              </footer>
              <p class="text-xl text-gray-400 mt-6 font-serif">
                在古典雅典的智慧殿堂中，探索理性思維的純粹本質
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- 搜尋區域 - 古典設計 -->
      <section class="py-12 px-4">
        <div class="container mx-auto max-w-5xl">
          <div class="relative group">
            <!-- 背景大理石效果 -->
            <div class="absolute inset-0 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-2xl border border-amber-500/20 shadow-xl"></div>
            <div class="absolute inset-0 bg-gradient-to-br from-amber-50/5 via-transparent to-slate-800/10 rounded-2xl opacity-50"></div>
            
            <div class="relative z-10 p-8">
              <div class="relative">
                <input
                  v-model="searchQuery"
                  type="search"
                  placeholder="在智慧殿堂中搜尋政治思想與理性思維..."
                  class="w-full rounded-xl border-2 bg-slate-900/70 border-amber-500/30 text-white px-6 py-4 pl-14 text-lg font-serif placeholder:text-gray-500 placeholder:italic transition-all duration-300 hover:border-amber-400/50 hover:bg-slate-900/80 focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20 focus:bg-slate-900/90 focus:outline-none focus:scale-[1.02] focus:shadow-lg focus:shadow-amber-500/20"
                  @focus="handleSearchFocus"
                  @blur="handleSearchBlur"
                  @input="handleSearchInput"
                />
                
                <!-- 搜尋圖標 -->
                <div class="absolute left-4 top-1/2 transform -translate-y-1/2 transition-all duration-300" :class="searchFocused ? 'text-amber-400 scale-110' : 'text-gray-400'">
                  <Icon name="heroicons:magnifying-glass" class="w-6 h-6" />
                </div>
                
                <!-- 古典裝飾圓環 -->
                <div class="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-30 transition-opacity duration-300" :class="searchFocused ? 'opacity-60' : ''">
                  <div class="w-8 h-8 border-2 border-amber-500/40 rounded-full flex items-center justify-center">
                    <div class="w-3 h-3 border border-amber-500/30 rounded-full"></div>
                  </div>
                </div>
                
                <!-- Focus 發光效果 -->
                <div class="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-400/20 to-yellow-400/20 blur-md -z-10 opacity-0 transition-opacity duration-300" :class="searchFocused ? 'opacity-100' : ''"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Content Section -->
      <section class="py-16 px-4">
        <div class="container mx-auto max-w-5xl">
          <!-- 主要內容區域 -->
          <div class="w-full">
              <div class="space-y-12">
                
                <!-- 政治人物危機處理能力分類 -->
                <article 
                  id="crisis-management" 
                  class="relative group"
                >
                  <!-- 背景大理石卡片 -->
                  <div class="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-2xl border border-amber-500/20 shadow-xl overflow-hidden transition-all duration-500 hover:border-amber-400/40 hover:shadow-2xl hover:shadow-amber-500/10 hover:scale-[1.01]">
                    
                    <!-- 頂部古典裝飾條 -->
                    <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <!-- 大理石紋理背景 -->
                    <div class="absolute inset-0 bg-gradient-to-br from-amber-50/5 via-transparent to-slate-800/10 opacity-50"></div>
                    
                    <div class="relative z-10 p-8 md:p-12">
                      
                      <!-- 標題區域 -->
                      <header class="text-center mb-10">
                        <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-amber-500/20 to-amber-600/30 mb-6 border-2 border-amber-500/40 group-hover:scale-110 transition-transform duration-300">
                          <Icon name="heroicons:crown" class="w-10 h-10 text-amber-400" />
                        </div>
                        
                        <h2 class="text-4xl font-bold mb-4 font-serif">
                          <span class="bg-gradient-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent">
                            政治人物危機處理能力分類
                          </span>
                        </h2>
                        
                        <p class="text-xl text-gray-300 font-serif italic">
                          若以對重大危機的處理能力為標誌，這個地球上的政治人物可分為四等
                        </p>
                      </header>

                      <!-- 分類內容 -->
                      <div class="space-y-8">
                        <div 
                          v-for="(level, index) in crisisLevels" 
                          :key="level.id"
                          class="relative group/item transition-all duration-300 hover:scale-[1.02]"
                        >
                          <div class="flex items-start space-x-6 p-6 rounded-xl bg-slate-800/40 border border-amber-500/10 hover:border-amber-500/30 hover:bg-slate-800/60 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10">
                            
                            <!-- 古典數字標記 -->
                            <div class="flex-shrink-0 relative">
                              <div class="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center text-slate-900 font-bold text-xl font-serif shadow-lg group-hover/item:scale-110 group-hover/item:shadow-amber-500/30 transition-all duration-300">
                                {{ index + 1 }}
                              </div>
                              <!-- 古典裝飾環 -->
                              <div class="absolute -inset-2 border-2 border-amber-500/20 rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            
                            <div class="flex-1">
                              <h3 class="text-2xl font-bold text-amber-300 mb-4 font-serif group-hover/item:text-amber-200 transition-colors duration-300">
                                {{ level.title }}
                              </h3>
                              <p class="text-lg leading-relaxed text-gray-300 font-serif group-hover/item:text-gray-200 transition-colors duration-300" v-html="level.description"></p>
                            </div>
                            
                            <!-- 古典點綴 -->
                            <div class="flex-shrink-0 w-10 h-10 opacity-20 group-hover/item:opacity-40 transition-opacity duration-300">
                              <div class="w-full h-full border-2 border-amber-500/30 rounded-full flex items-center justify-center">
                                <div class="w-4 h-4 border border-amber-500/40 rounded-full"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>

                <!-- 政治鬥爭策略 -->
                <article 
                  id="political-strategy" 
                  class="relative group"
                >
                  <!-- 背景大理石卡片 -->
                  <div class="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-2xl border border-amber-500/20 shadow-xl overflow-hidden transition-all duration-500 hover:border-amber-400/40 hover:shadow-2xl hover:shadow-amber-500/10 hover:scale-[1.01]">
                    
                    <!-- 頂部古典裝飾條 -->
                    <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <!-- 大理石紋理背景 -->
                    <div class="absolute inset-0 bg-gradient-to-br from-amber-50/5 via-transparent to-slate-800/10 opacity-50"></div>
                    
                    <div class="relative z-10 p-8 md:p-12">
                      
                      <!-- 標題區域 -->
                      <header class="text-center mb-10">
                        <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-amber-500/20 to-amber-600/30 mb-6 border-2 border-amber-500/40 group-hover:scale-110 transition-transform duration-300">
                          <Icon name="heroicons:puzzle-piece" class="w-10 h-10 text-amber-400" />
                        </div>
                        
                        <h2 class="text-4xl font-bold mb-4 font-serif">
                          <span class="bg-gradient-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent">
                            政治鬥爭的七步策略
                          </span>
                        </h2>
                        
                        <p class="text-xl text-gray-300 font-serif italic">
                          古典政治鬥爭中的系統性操作手法
                        </p>
                      </header>

                      <!-- 策略內容 -->
                      <div class="space-y-6">
                        <div 
                          v-for="(strategy, index) in politicalStrategies" 
                          :key="strategy.id"
                          class="relative group/item transition-all duration-300 hover:scale-[1.02]"
                        >
                          <div class="flex items-start space-x-6 p-6 rounded-xl bg-slate-800/40 border border-amber-500/10 hover:border-amber-500/30 hover:bg-slate-800/60 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10">
                            
                            <!-- 古典步驟標記 -->
                            <div class="flex-shrink-0 relative">
                              <div class="w-12 h-12 bg-gradient-to-br from-amber-500/30 to-amber-600/40 border-2 border-amber-500/50 rounded-full flex items-center justify-center text-amber-300 font-bold text-sm font-serif group-hover/item:scale-110 group-hover/item:border-amber-400/70 transition-all duration-300">
                                {{ index + 1 }}
                              </div>
                            </div>
                            
                            <div class="flex-1">
                              <h3 class="text-xl font-bold text-amber-300 mb-3 font-serif group-hover/item:text-amber-200 transition-colors duration-300">
                                {{ strategy.title }}
                              </h3>
                              <p class="text-lg leading-relaxed text-gray-300 font-serif group-hover/item:text-gray-200 transition-colors duration-300">
                                {{ strategy.description }}
                              </p>
                            </div>
                            
                            <!-- 進度指示器 -->
                            <div class="flex-shrink-0 flex flex-col space-y-1.5">
                              <div 
                                v-for="dot in 7" 
                                :key="dot"
                                class="w-2.5 h-2.5 rounded-full transition-all duration-300"
                                :class="dot <= index + 1 ? 'bg-amber-400 shadow-lg shadow-amber-500/50' : 'bg-amber-500/20 border border-amber-500/30'"
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>

              </div>
          </div>
        </div>
      </section>
    </main>

    <!-- 古典雅典智慧導航系統 -->
    <div 
      class="fixed top-16 right-0 h-[calc(100vh-4rem)] z-50 transition-all duration-700 ease-out"
      :class="[
        showSidebar ? 'w-96' : 'w-16',
        showSidebar ? 'translate-x-0' : 'translate-x-0'
      ]"
    >
      <!-- 智慧之門觸發器 - 古典雅典風格 -->
      <div 
        class="absolute left-0 top-1/2 -translate-y-1/2 h-32 cursor-pointer group transition-all duration-500"
        :class="showSidebar ? 'w-16 opacity-0 pointer-events-none' : 'w-16 opacity-100'"
        @click="showSidebar = true"
        @mouseenter="triggerHover = true"
        @mouseleave="triggerHover = false"
      >
        <!-- 古典之門觸發區域 -->
        <div class="relative w-full h-full">
          <!-- 主觸發面板 -->
          <div 
            class="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-amber-900/20 to-slate-900/90 backdrop-blur-xl border-l border-y border-amber-500/40 rounded-l-2xl shadow-2xl transition-all duration-500 overflow-hidden"
            :class="triggerHover ? 'border-amber-400/80 shadow-[0_0_30px_rgba(251,191,36,0.3)]' : ''"
          >
            
            <!-- 古典金紋流動條 -->
            <div class="absolute left-1 top-1/2 -translate-y-1/2 w-1 h-16 bg-gradient-to-b from-amber-400/60 via-yellow-500/80 to-amber-500/60 rounded-full transition-all duration-500"
                 :class="triggerHover ? 'w-1.5 shadow-[0_0_20px_rgba(251,191,36,0.8)] animate-pulse' : ''">
              <!-- 智慧光點 -->
              <div class="absolute top-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-amber-300 rounded-full animate-ping"></div>
              <div class="absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-yellow-300 rounded-full animate-ping" style="animation-delay: 0.7s;"></div>
              <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-amber-400 rounded-full animate-ping" style="animation-delay: 1.2s;"></div>
            </div>
            
            <!-- 側邊觸發圖示 -->
            <div class="absolute right-2 top-1/2 -translate-y-1/2 transition-all duration-500"
                 :class="triggerHover ? 'scale-110 text-amber-300' : 'text-gray-400'">
              <Icon name="heroicons:bars-3" class="w-6 h-6" />
            </div>
            
            <!-- 古典提示標籤 -->
            <div 
              class="absolute left-20 top-1/2 -translate-y-1/2 transition-all duration-500 transform"
              :class="triggerHover ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'"
            >
              <div class="bg-slate-900/95 backdrop-blur-sm border border-amber-500/50 rounded-xl px-4 py-2 shadow-2xl">
                <div class="text-sm text-amber-300 font-medium">智慧目錄</div>
                <div class="text-xs text-gray-400 mt-1">點擊展開</div>
              </div>
              <!-- 古典箭頭 -->
              <div class="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-8 border-transparent border-r-amber-500/50"></div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 主導航面板 - 古典雅典智慧殿堂風格 -->
      <div 
        class="ml-16 h-full relative transition-all duration-700 ease-out"
        :class="showSidebar ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'"
      >
        <!-- 關閉按鈕 -->
        <button
          @click="showSidebar = false"
          class="absolute -left-12 top-4 w-8 h-8 bg-slate-900/95 backdrop-blur-sm border border-amber-500/40 rounded-full flex items-center justify-center text-amber-400 hover:text-amber-300 hover:border-amber-400/60 transition-all duration-300 z-10 group"
        >
          <Icon name="heroicons:x-mark" class="w-4 h-4" />
          <div class="absolute inset-0 bg-amber-500/10 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse"></div>
        </button>
        
        <!-- 主面板容器 -->
        <div class="w-full h-full relative">
          <!-- 外層古典光暈 -->
          <div class="absolute -inset-2 bg-gradient-to-br from-amber-500/10 via-yellow-500/5 to-amber-500/10 rounded-2xl blur-lg animate-pulse-slow"></div>
          
          <!-- 主面板結構 -->
          <div class="relative w-full h-full bg-gradient-to-br from-slate-900/98 via-slate-800/95 to-slate-900/98 backdrop-blur-xl border border-amber-700/30 rounded-2xl shadow-2xl overflow-hidden">
            
            <!-- 主內容區域 -->
            <div class="flex-1 h-full relative">
              <!-- 目錄組件容器 -->
              <div class="absolute inset-0 p-4">
                <UniversalTableOfContents
                  :toc-items="tocData"
                  :active-section="activeSection"
                  :categories="tocCategories"
                  title="WISDOM_INDEX"
                  search-placeholder="搜索古典智慧..."
                  @section-click="scrollToSection"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 回到頂部按鈕 - 古典風格 -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 scale-90 translate-y-4"
      enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 scale-100 translate-y-0"
      leave-to-class="opacity-0 scale-90 translate-y-4"
    >
      <button
        v-if="scrollProgress > 10"
        @click="scrollToTop"
        class="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 text-slate-900 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-amber-500/30 z-50 flex items-center justify-center group border-2 border-amber-400/50 hover:border-amber-300 active:scale-95"
      >
        <Icon name="heroicons:arrow-up" class="w-6 h-6 group-hover:-translate-y-1 transition-transform duration-300" />
        <!-- 古典圓環裝飾 -->
        <div class="absolute inset-2 border-2 border-amber-400/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <!-- 點擊波紋效果 -->
        <div class="absolute inset-0 rounded-full bg-amber-400/20 opacity-0 group-active:opacity-100 group-active:animate-ping transition-opacity duration-150"></div>
      </button>
    </Transition>
  </div>
</template>

<script setup lang="ts">
// SEO 設定
useHead({
  title: '思維方式 - 古典雅典智慧殿堂 - 夢鈴領域',
  meta: [
    { 
      name: 'description', 
      content: '探索古典雅典的智慧傳統，學習政治思維與危機處理的深層智慧，在哲學的殿堂中提升理性思考能力。融合蘇格拉底的哲學思辨與現代政治智慧。' 
    },
    { 
      name: 'keywords', 
      content: '思維方式, 政治智慧, 危機處理, 古典哲學, 雅典智慧, 理性思考, 政治策略, 蘇格拉底, 哲學思辨' 
    },
    {
      property: 'og:title',
      content: '思維方式 - 古典雅典智慧殿堂 - 夢鈴領域'
    },
    {
      property: 'og:description',
      content: '探索古典雅典的智慧傳統，學習政治思維與危機處理的深層智慧，在哲學的殿堂中提升理性思考能力。'
    },
    {
      property: 'og:type',
      content: 'article'
    }
  ]
})

// 響應式數據
const searchQuery = ref('')
const scrollProgress = ref(0)
const activeSection = ref('')
const searchFocused = ref(false)
const showSidebar = ref(false)
const triggerHover = ref(false)

// 政治人物危機處理能力分類數據
const crisisLevels = [
  {
    id: 'creator',
    title: '歷史的創造者',
    description: '最偉大、最有手腕的政治人物，往往是通過<strong class="text-amber-300">製造危機</strong>，<strong class="text-amber-300">掌控危機</strong>，然後<strong class="text-amber-300">利用危機</strong>，成就個人夢想與歷史霸業，他們是歷史的創造者。'
  },
  {
    id: 'promoter',
    title: '歷史的推進者',
    description: '偉大而有手腕的政治人物，往往是<strong class="text-amber-300">順勢而為</strong>，通過掌控和利用危機，達成個人夢想與歷史定位，他們是歷史的推進者。'
  },
  {
    id: 'captive',
    title: '危機的俘虜',
    description: '一些相對無能的政治人物，他們不願也掀不起什麼歷史波瀾，但是危機卻找上門來，他們在危機面前<strong class="text-amber-300">驚慌失措</strong>，被危機裹挾，成為危機的俘虜，失去對時局的把控能力，最終被歷史淹沒。'
  },
  {
    id: 'sinner',
    title: '歷史的罪人',
    description: '最無能、最愚蠢的一類，就是對自己<strong class="text-amber-300">超級自信</strong>，自以為找到了某條絕對正確的可以拯救國家和人民的道路，他們掀起歷史狂浪，製造危機，不惜以國家和民族利益為代價試圖成就夢想霸業，但實際上卻<strong class="text-amber-300">德不配位、志大才疏、眼高手低</strong>，根本不具備掌握時局與危機的能力，結果被自己掀起的危機吞沒，成為國家和歷史的罪人，人們的恥笑對象。'
  }
]

// 政治鬥爭策略數據
const politicalStrategies = [
  {
    id: 'preparation',
    title: '預備造勢',
    description: '向具發言權的人暗示你們已經準備好選邊站。'
  },
  {
    id: 'criticism',
    title: '公開批評',
    description: '開始造勢，公開批評那位有問題的人，促使周圍的人也跟進表態，進而開始收集對方的罪證。'
  },
  {
    id: 'pressure',
    title: '施壓倒戈',
    description: '以對方承認錯誤為契機，進一步施壓整個派系，讓他們不得不面對事實，實現成功倒戈。'
  },
  {
    id: 'delay',
    title: '緩兵之計',
    description: '不應一開始就針對核心人物，要表現出沒有趕盡殺絕的意圖，這是一種緩兵之計。'
  },
  {
    id: 'transfer',
    title: '調動職務',
    description: '當派系成員都反叛後，突然調動核心人物的職務。由於其無力反抗，讓大家看到其失勢，徹底削弱其影響力和根基。'
  },
  {
    id: 'impeachment',
    title: '全面彈劾',
    description: '隨後，各部會與地方官員開始對核心人物進行彈劾，指控其「罪大惡極，必須受到懲罰」。'
  },
  {
    id: 'graceful-end',
    title: '仁厚收場',
    description: '最後，核心人物的官位和職權逐步被剝奪，最終被下放，但表面上要顯示出「仁厚」，避免過於激烈。'
  }
]

// 側邊欄目錄數據
const tocData = computed(() => [
  {
    id: 'crisis-management',
    title: '危機處理能力分類',
    subtitle: '政治人物的四個層次',
    category: 'philosophy',
    level: 1
  },
  {
    id: 'political-strategy',
    title: '政治鬥爭策略',
    subtitle: '古典七步戰略思維',
    category: 'strategy',
    level: 1
  }
])

// 側邊欄分類數據
const tocCategories = computed(() => [
  { key: 'philosophy', name: '哲學思辨', icon: 'heroicons:academic-cap' },
  { key: 'strategy', name: '戰略智慧', icon: 'heroicons:puzzle-piece' },
  { key: 'wisdom', name: '古典智慧', icon: 'heroicons:light-bulb' },
  { key: 'other', name: '其他', icon: 'heroicons:ellipsis-horizontal' }
])

// 事件處理函數
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    activeSection.value = sectionId
  }
}

const handleSearchFocus = () => {
  searchFocused.value = true
}

const handleSearchBlur = () => {
  searchFocused.value = false
}

const handleSearchInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  // 這裡可以添加搜尋邏輯
  console.log('搜尋:', target.value)
}

const updateScrollProgress = () => {
  if (!process.client) return
  
  const scrollTop = window.pageYOffset
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  scrollProgress.value = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
}

const updateActiveSection = () => {
  if (!process.client) return
  
  const sections = document.querySelectorAll('[id]')
  let currentSection = ''
  
  sections.forEach(section => {
    const rect = section.getBoundingClientRect()
    if (rect.top <= 200 && rect.bottom >= 200) {
      currentSection = section.id
    }
  })
  
  activeSection.value = currentSection
}

// 生命週期
onMounted(() => {
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
/* 古典雅典風格動畫 */
@keyframes fade-in-up {
  0% {
    opacity: 0;
    transform: translateY(40px);
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

@keyframes pulse-slow {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
}

@keyframes gradient-shift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes marble-flow {
  0% { 
    background-position: 0% 50%;
  }
  50% { 
    background-position: 100% 50%;
  }
  100% { 
    background-position: 0% 50%;
  }
}

/* 動畫類別 */
.animate-fade-in-up {
  animation: fade-in-up 1s ease-out;
}

.animate-pulse-gentle {
  animation: pulse-gentle 3s ease-in-out infinite;
}

.animate-pulse-slow {
  animation: pulse-slow 4s ease-in-out infinite;
}

.animate-gradient-shift {
  background-size: 200% 200%;
  animation: gradient-shift 8s ease-in-out infinite;
}

.animate-marble-flow {
  background-size: 200% 200%;
  animation: marble-flow 10s ease-in-out infinite;
}

/* 古典字體優化 */
.font-serif {
  font-family: 'Playfair Display', 'Noto Serif TC', 'Times New Roman', serif;
  letter-spacing: 0.025em;
}

/* 自定義滾動條 - 古典金色 */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(30, 41, 59, 0.4);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: rgba(212, 175, 55, 0.5);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(212, 175, 55, 0.7);
}

/* Firefox 滾動條樣式 */
* {
  scrollbar-width: thin;
  scrollbar-color: rgba(212, 175, 55, 0.5) rgba(30, 41, 59, 0.4);
}

/* 選擇文字的顏色 */
::selection {
  background-color: rgba(212, 175, 55, 0.3);
  color: rgb(255, 255, 255);
}

/* Focus 狀態優化 */
button:focus-visible,
input:focus-visible {
  outline: 2px solid rgb(212, 175, 55);
  outline-offset: 2px;
}
</style>