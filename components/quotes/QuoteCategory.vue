<template>
  <div class="space-y-6">
    
    <!-- 分類標題 -->
    <div class="text-center mb-8">
      <h2 class="text-2xl md:text-3xl font-bold text-transparent bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300 bg-clip-text mb-4">
        智慧分類
      </h2>
      <div class="w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto rounded-full"></div>
    </div>

    <!-- 分類網格 -->
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      <div
        v-for="(category, index) in categories"
        :key="category.key"
        class="group relative cursor-pointer"
        :style="{ animationDelay: `${index * 100}ms` }"
        @click="selectCategory(category.key)"
      >
        
        <!-- 主要卡片容器 -->
        <div 
          class="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-xl p-4 border transition-all duration-500 transform group-hover:scale-105 group-hover:-translate-y-2 group-active:scale-95 animate-fade-in-up"
          :class="[
            isActive(category.key) 
              ? 'border-amber-400/60 shadow-lg shadow-amber-500/20 bg-gradient-to-br from-amber-950/30 to-slate-900/90' 
              : 'border-amber-500/20 hover:border-amber-400/40 hover:shadow-lg hover:shadow-amber-500/10'
          ]"
        >
          
          <!-- 背景裝飾 -->
          <div class="absolute inset-0 rounded-xl opacity-20">
            <div class="absolute top-2 right-2 w-8 h-8 bg-gradient-to-br from-amber-400/30 to-amber-600/30 rounded-full blur-lg"></div>
            <div class="absolute bottom-2 left-2 w-6 h-6 bg-gradient-to-br from-amber-300/20 to-amber-500/20 rounded-full blur-md"></div>
          </div>

          <!-- 古典邊框裝飾 -->
          <div 
            v-if="isActive(category.key)"
            class="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-amber-400/80 to-transparent"
          ></div>
          
          <!-- 圖標區域 -->
          <div class="relative z-10 flex flex-col items-center text-center space-y-3">
            
            <!-- 圖標容器 -->
            <div 
              class="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110"
              :class="[
                isActive(category.key)
                  ? 'bg-gradient-to-br from-amber-500/40 to-amber-700/40 border-2 border-amber-400/60'
                  : 'bg-gradient-to-br from-amber-500/20 to-amber-700/20 border-2 border-amber-500/30 group-hover:border-amber-400/50'
              ]"
            >
              <Icon 
                :name="category.icon" 
                class="w-6 h-6 transition-all duration-500"
                :class="[
                  isActive(category.key) 
                    ? 'text-amber-300' 
                    : 'text-amber-400 group-hover:text-amber-300'
                ]"
              />
            </div>
            
            <!-- 分類名稱 -->
            <div>
              <h3 
                class="font-semibold text-sm transition-all duration-300"
                :class="[
                  isActive(category.key) 
                    ? 'text-amber-300' 
                    : 'text-gray-300 group-hover:text-amber-200'
                ]"
              >
                {{ category.name }}
              </h3>
              
              <!-- 描述文字 -->
              <p 
                v-if="category.description"
                class="text-xs mt-1 opacity-80 transition-all duration-300"
                :class="[
                  isActive(category.key) 
                    ? 'text-amber-200/80' 
                    : 'text-gray-400 group-hover:text-amber-300/80'
                ]"
              >
                {{ category.description }}
              </p>
            </div>
            
            <!-- 計數標籤 -->
            <div 
              v-if="category.count !== undefined"
              class="px-2 py-1 rounded-full text-xs font-medium transition-all duration-300"
              :class="[
                isActive(category.key)
                  ? 'bg-amber-400/30 text-amber-100 border border-amber-400/50'
                  : 'bg-slate-600/50 text-gray-400 border border-slate-500/50 group-hover:bg-amber-500/20 group-hover:text-amber-200 group-hover:border-amber-500/40'
              ]"
            >
              {{ category.count }}
            </div>
          </div>

          <!-- 懸停發光效果 -->
          <div 
            class="absolute inset-0 bg-gradient-to-br from-amber-400/5 to-amber-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"
          ></div>
          
          <!-- 活躍狀態特殊效果 -->
          <div 
            v-if="isActive(category.key)"
            class="absolute -inset-1 bg-gradient-to-r from-amber-500/20 via-amber-400/20 to-amber-500/20 rounded-xl blur-sm animate-pulse-gentle -z-10"
          ></div>
        </div>

        <!-- 古典裝飾線條 -->
        <div 
          v-if="isActive(category.key)"
          class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-transparent via-amber-400/60 to-transparent animate-glow-soft"
        ></div>
      </div>
    </div>

    <!-- 特色分類展示區域 -->
    <div v-if="featuredCategories && featuredCategories.length" class="mt-12">
      <h3 class="text-xl font-semibold text-amber-300 mb-6 text-center">精選智慧分類</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(featured, index) in featuredCategories"
          :key="featured.key"
          class="group relative cursor-pointer"
          :style="{ animationDelay: `${(index + categories.length) * 100}ms` }"
          @click="selectCategory(featured.key)"
        >
          
          <!-- 特色卡片 -->
          <div class="relative bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-xl rounded-2xl p-6 border border-amber-500/30 hover:border-amber-400/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 group-active:scale-95 animate-fade-in-up">
            
            <!-- 特色背景裝飾 -->
            <div class="absolute inset-0 rounded-2xl opacity-10">
              <div class="absolute top-4 left-4 w-16 h-16 bg-gradient-to-br from-amber-400/40 to-amber-600/40 rounded-full blur-xl"></div>
              <div class="absolute bottom-4 right-4 w-12 h-12 bg-gradient-to-br from-amber-300/30 to-amber-500/30 rounded-full blur-lg"></div>
            </div>

            <div class="relative z-10">
              
              <!-- 特色圖標 -->
              <div class="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-500/30 to-amber-700/30 rounded-2xl border-2 border-amber-500/40 group-hover:border-amber-400/60 transition-all duration-500 mb-4 group-hover:scale-110">
                <Icon :name="featured.icon" class="w-8 h-8 text-amber-300" />
              </div>
              
              <!-- 特色內容 -->
              <div>
                <h4 class="font-bold text-lg text-amber-300 mb-2 group-hover:text-amber-200 transition-colors duration-300">
                  {{ featured.name }}
                </h4>
                <p class="text-gray-400 text-sm leading-relaxed mb-4 group-hover:text-gray-300 transition-colors duration-300">
                  {{ featured.description }}
                </p>
                
                <!-- 特色統計 -->
                <div class="flex items-center justify-between text-xs">
                  <span class="text-amber-400 font-medium">{{ featured.count }} 條名言</span>
                  <span class="text-gray-500">{{ featured.popularity }}% 熱門度</span>
                </div>
              </div>
            </div>

            <!-- 特色發光效果 -->
            <div class="absolute inset-0 bg-gradient-to-br from-amber-400/3 to-amber-600/3 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 全部分類按鈕 -->
    <div class="text-center mt-8">
      <button
        @click="selectCategory('all')"
        class="group inline-flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 active:scale-95"
        :class="[
          isActive('all')
            ? 'bg-gradient-to-r from-amber-500/30 to-amber-600/30 text-amber-200 border-2 border-amber-400/60 shadow-lg shadow-amber-500/20'
            : 'bg-gradient-to-r from-slate-700/50 to-slate-800/50 text-gray-300 border-2 border-slate-600/50 hover:border-amber-500/40 hover:text-amber-300'
        ]"
      >
        <Icon name="heroicons:squares-2x2" class="w-5 h-5 mr-2 transition-transform duration-300 group-hover:scale-110" />
        查看全部分類
        <Icon name="heroicons:arrow-right" class="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Category {
  key: string
  name: string
  icon: string
  description?: string
  count?: number
  popularity?: number
}

interface Props {
  categories: Category[]
  activeCategory: string
  featuredCategories?: Category[]
}

interface Emits {
  (e: 'category-select', categoryKey: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// 方法
const selectCategory = (categoryKey: string) => {
  emit('category-select', categoryKey)
}

const isActive = (categoryKey: string) => {
  return props.activeCategory === categoryKey
}
</script>

<style scoped>
/* 自定義動畫 */
@keyframes fade-in-up {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse-gentle {
  0%, 100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
}

@keyframes glow-soft {
  0%, 100% {
    box-shadow: 0 0 5px rgba(251, 191, 36, 0.3);
  }
  50% {
    box-shadow: 0 0 15px rgba(251, 191, 36, 0.5), 0 0 25px rgba(251, 191, 36, 0.3);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s ease-out forwards;
  opacity: 0;
}

.animate-pulse-gentle {
  animation: pulse-gentle 2s ease-in-out infinite;
}

.animate-glow-soft {
  animation: glow-soft 2s ease-in-out infinite;
}

/* 特殊懸停效果 */
.group:hover .w-12.h-12 {
  box-shadow: 0 0 20px rgba(251, 191, 36, 0.3);
}

/* 響應式調整 */
@media (max-width: 640px) {
  .grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 480px) {
  .grid-cols-2 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}

/* 古典風格文字陰影 */
.text-amber-300 {
  text-shadow: 0 0 10px rgba(251, 191, 36, 0.3);
}

/* 特色卡片特殊效果 */
.group:hover .w-16.h-16 {
  box-shadow: 0 0 25px rgba(251, 191, 36, 0.4);
  transform: scale(1.1) rotate(5deg);
}
</style>