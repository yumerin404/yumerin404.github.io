<template>
  <section class="relative py-20 px-4 overflow-hidden">
    
    <!-- 古典背景裝飾 -->
    <div class="absolute inset-0">
      <!-- 主要漸變背景 -->
      <div class="absolute inset-0 bg-gradient-to-br from-slate-950 via-amber-950/10 to-slate-900"></div>
      
      <!-- 古典裝飾圓圈 -->
      <div class="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-amber-400/20 to-amber-600/20 rounded-full blur-2xl animate-float-gentle"></div>
      <div class="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-amber-300/15 to-amber-500/15 rounded-full blur-3xl animate-float-gentle" style="animation-delay: 1s;"></div>
      <div class="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-br from-amber-500/10 to-amber-700/10 rounded-full blur-xl animate-pulse-gentle"></div>
      
      <!-- 古典幾何圖案 -->
      <div class="absolute top-16 right-16 opacity-10">
        <div class="w-20 h-20 border border-amber-400/30 rotate-45 animate-spin-slow"></div>
      </div>
      <div class="absolute bottom-16 left-16 opacity-10">
        <div class="w-16 h-16 border border-amber-300/30 rounded-full animate-pulse-gentle"></div>
      </div>
    </div>

    <!-- 主要內容 -->
    <div class="container mx-auto max-w-6xl relative z-10">
      <div class="text-center animate-fade-in-up">
        
        <!-- 古典圖標區域 -->
        <div class="flex justify-center items-center mb-12">
          <div class="relative group">
            <!-- 主圖標容器 -->
            <div class="relative w-32 h-32 bg-gradient-to-br from-amber-500/20 to-amber-700/20 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-amber-500/40 group-hover:border-amber-400/60 transition-all duration-500 transform group-hover:scale-110">
              
              <!-- 內部發光效果 -->
              <div class="absolute inset-2 bg-gradient-to-br from-amber-400/10 to-amber-600/10 rounded-full animate-pulse-gentle"></div>
              
              <!-- 主圖標 -->
              <Icon :name="heroIcon" class="relative z-10 w-16 h-16 text-amber-300 group-hover:text-amber-200 transition-all duration-500 transform group-hover:scale-110" />
              
              <!-- 外圈裝飾 -->
              <div class="absolute -inset-4 border border-amber-500/20 rounded-full group-hover:border-amber-400/40 transition-all duration-500"></div>
              <div class="absolute -inset-8 border border-amber-400/10 rounded-full group-hover:border-amber-300/20 transition-all duration-500"></div>
            </div>
            
            <!-- 環繞裝飾粒子 -->
            <div class="absolute top-0 left-1/2 w-2 h-2 bg-amber-400/60 rounded-full animate-ping" style="animation-delay: 0s;"></div>
            <div class="absolute top-1/2 right-0 w-1.5 h-1.5 bg-amber-300/60 rounded-full animate-ping" style="animation-delay: 0.5s;"></div>
            <div class="absolute bottom-0 left-1/2 w-2 h-2 bg-amber-500/60 rounded-full animate-ping" style="animation-delay: 1s;"></div>
            <div class="absolute top-1/2 left-0 w-1.5 h-1.5 bg-amber-400/60 rounded-full animate-ping" style="animation-delay: 1.5s;"></div>
          </div>
        </div>
        
        <!-- 主標題 -->
        <h1 class="text-5xl md:text-6xl lg:text-8xl font-bold mb-8 leading-tight">
          <span class="bg-gradient-to-r from-amber-200 via-amber-300 via-amber-400 to-amber-200 bg-clip-text text-transparent animate-gradient-shift">
            {{ title }}
          </span>
        </h1>
        
        <!-- 裝飾分隔線 -->
        <div class="flex items-center justify-center mb-8">
          <div class="w-16 h-0.5 bg-gradient-to-r from-transparent to-amber-400/50"></div>
          <div class="w-8 h-8 bg-gradient-to-br from-amber-400/30 to-amber-600/30 rounded-full mx-4 flex items-center justify-center">
            <div class="w-3 h-3 bg-amber-300/60 rounded-full animate-pulse-gentle"></div>
          </div>
          <div class="w-16 h-0.5 bg-gradient-to-l from-transparent to-amber-400/50"></div>
        </div>
        
        <!-- 副標題/描述 -->
        <p class="text-xl md:text-2xl lg:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12 animate-fade-in-up" style="animation-delay: 0.3s;">
          {{ subtitle }}
        </p>
        
        <!-- 統計信息區域 -->
        <div v-if="stats && stats.length" class="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12 animate-fade-in-up" style="animation-delay: 0.6s;">
          <div 
            v-for="(stat, index) in stats" 
            :key="stat.label"
            class="group relative"
            :style="{ animationDelay: `${0.8 + index * 0.1}s` }"
          >
            <div class="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl rounded-xl p-4 border border-amber-500/20 hover:border-amber-400/40 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 animate-fade-in-up">
              
              <!-- 統計數值 -->
              <div class="text-2xl md:text-3xl font-bold text-amber-300 mb-2 group-hover:text-amber-200 transition-colors duration-300">
                {{ stat.value }}
              </div>
              
              <!-- 統計標籤 -->
              <div class="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                {{ stat.label }}
              </div>
              
              <!-- 懸停發光效果 -->
              <div class="absolute inset-0 bg-gradient-to-br from-amber-400/5 to-amber-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"></div>
            </div>
          </div>
        </div>
        
        <!-- 行動按鈕區域 -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in-up" style="animation-delay: 0.9s;">
          
          <!-- 主要行動按鈕 -->
          <button
            @click="handlePrimaryAction"
            class="group relative inline-flex items-center px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-500 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-amber-500/80 to-amber-600/80 text-white border-2 border-amber-400/60 hover:border-amber-300 shadow-xl shadow-amber-500/20 hover:shadow-2xl hover:shadow-amber-500/30"
          >
            <Icon :name="primaryActionIcon" class="w-6 h-6 mr-3 transition-transform duration-300 group-hover:scale-110" />
            {{ primaryActionText }}
            <Icon name="heroicons:arrow-right" class="w-5 h-5 ml-3 transition-transform duration-300 group-hover:translate-x-1" />
            
            <!-- 按鈕內部發光 -->
            <div class="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-amber-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
          </button>
          
          <!-- 次要行動按鈕 -->
          <button
            v-if="secondaryActionText"
            @click="handleSecondaryAction"
            class="group inline-flex items-center px-6 py-3 rounded-xl font-medium text-amber-300 border-2 border-amber-500/60 hover:border-amber-400 hover:bg-amber-500/20 transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            <Icon :name="secondaryActionIcon" class="w-5 h-5 mr-2 transition-transform duration-300 group-hover:scale-110" />
            {{ secondaryActionText }}
          </button>
        </div>
        
        <!-- 今日名言展示 -->
        <div v-if="todayQuote" class="max-w-4xl mx-auto animate-fade-in-up" style="animation-delay: 1.2s;">
          <div class="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-2xl p-8 border border-amber-500/30 hover:border-amber-400/50 transition-all duration-500 group">
            
            <!-- 今日名言標題 -->
            <div class="flex items-center justify-center mb-6">
              <Icon name="heroicons:sparkles" class="w-6 h-6 text-amber-400 mr-2" />
              <h3 class="text-xl font-semibold text-amber-300">今日智慧</h3>
              <Icon name="heroicons:sparkles" class="w-6 h-6 text-amber-400 ml-2" />
            </div>
            
            <!-- 名言內容 -->
            <blockquote class="text-lg md:text-xl italic text-gray-200 text-center mb-6 leading-relaxed">
              "{{ todayQuote.content }}"
            </blockquote>
            
            <!-- 名言作者 -->
            <div class="text-center">
              <cite class="text-amber-300 font-medium not-italic">
                —— {{ todayQuote.author }}
              </cite>
              <p v-if="todayQuote.source" class="text-gray-400 text-sm mt-1">
                《{{ todayQuote.source }}》
              </p>
            </div>
            
            <!-- 懸停發光效果 -->
            <div class="absolute inset-0 bg-gradient-to-br from-amber-400/3 to-amber-600/3 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"></div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 底部裝飾波浪 -->
    <div class="absolute bottom-0 left-0 w-full h-24 overflow-hidden">
      <svg 
        class="absolute bottom-0 w-full h-full" 
        viewBox="0 0 1200 120" 
        preserveAspectRatio="none"
      >
        <path 
          d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
          class="fill-amber-500/10"
        ></path>
      </svg>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Stat {
  label: string
  value: string | number
}

interface Quote {
  content: string
  author: string
  source?: string
}

interface Props {
  title?: string
  subtitle?: string
  heroIcon?: string
  primaryActionText?: string
  primaryActionIcon?: string
  secondaryActionText?: string
  secondaryActionIcon?: string
  stats?: Stat[]
  todayQuote?: Quote
}

interface Emits {
  (e: 'primary-action'): void
  (e: 'secondary-action'): void
}

const props = withDefaults(defineProps<Props>(), {
  title: '古典智慧殿堂',
  subtitle: '集聖賢之言，承千年智慧，啟迪心靈，照亮前路',
  heroIcon: 'heroicons:book-open',
  primaryActionText: '探索智慧',
  primaryActionIcon: 'heroicons:magnifying-glass',
  secondaryActionText: '隨機名言',
  secondaryActionIcon: 'heroicons:arrow-path'
})

const emit = defineEmits<Emits>()

// 方法
const handlePrimaryAction = () => {
  emit('primary-action')
}

const handleSecondaryAction = () => {
  emit('secondary-action')
}
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

@keyframes float-gentle {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  33% {
    transform: translateY(-10px) rotate(2deg);
  }
  66% {
    transform: translateY(-5px) rotate(-2deg);
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

@keyframes gradient-shift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes spin-slow {
  0% {
    transform: rotate(45deg);
  }
  100% {
    transform: rotate(405deg);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out forwards;
  opacity: 0;
}

.animate-float-gentle {
  animation: float-gentle 8s ease-in-out infinite;
}

.animate-pulse-gentle {
  animation: pulse-gentle 3s ease-in-out infinite;
}

.animate-gradient-shift {
  background-size: 200% 200%;
  animation: gradient-shift 8s ease-in-out infinite;
}

.animate-spin-slow {
  animation: spin-slow 20s linear infinite;
}

/* 特殊文字效果 */
.text-amber-300 {
  text-shadow: 0 0 10px rgba(251, 191, 36, 0.3);
}

/* 引用文字特殊樣式 */
blockquote {
  position: relative;
}

blockquote::before {
  content: '"';
  position: absolute;
  left: -30px;
  top: -10px;
  font-size: 4rem;
  color: rgba(251, 191, 36, 0.2);
  font-family: serif;
  line-height: 1;
}

blockquote::after {
  content: '"';
  position: absolute;
  right: -30px;
  bottom: -40px;
  font-size: 4rem;
  color: rgba(251, 191, 36, 0.2);
  font-family: serif;
  line-height: 1;
}

/* 響應式調整 */
@media (max-width: 768px) {
  blockquote::before,
  blockquote::after {
    display: none;
  }
}

/* 按鈕特殊效果 */
.group:hover .bg-gradient-to-r {
  background-image: linear-gradient(to right, rgba(245, 158, 11, 0.9), rgba(217, 119, 6, 0.9));
}

/* SVG 波浪動畫 */
svg path {
  animation: wave 10s ease-in-out infinite;
}

@keyframes wave {
  0%, 100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-25px);
  }
}
</style>