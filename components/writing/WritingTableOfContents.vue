<template>
  <!-- 純粹太空風格目錄導航 -->
  <div class="relative w-full h-full">
    
    <!-- 主容器 - 太空數據終端風格 -->
    <div class="absolute inset-0 bg-gradient-to-br from-slate-950/95 via-slate-900/98 to-slate-950/95 backdrop-blur-xl border border-slate-700/60 rounded-2xl shadow-2xl overflow-hidden">

      <!-- 目錄導航區域 -->
      <div class="flex-1 h-full relative">
        <div class="absolute inset-0 p-6">
          
          <!-- 目錄標題 -->
          <div class="mb-6">
            <div class="flex items-center space-x-2 text-sm text-slate-400 font-mono">
              <div class="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_6px_rgba(34,211,238,0.6)]"></div>
              <span class="tracking-wide">TABLE_OF_CONTENTS</span>
              <div class="flex-1 h-px bg-gradient-to-r from-cyan-500/40 to-transparent"></div>
            </div>
          </div>
          
          <!-- 目錄列表容器 -->
          <div class="relative h-full overflow-hidden">
            <!-- 頂部漸變遮罩 -->
            <div class="absolute top-0 left-0 right-0 h-2 bg-gradient-to-b from-slate-950 to-transparent z-10 pointer-events-none"></div>
            <!-- 底部漸變遮罩 -->
            <div class="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-slate-950 to-transparent z-10 pointer-events-none"></div>
            
            <!-- 目錄項目列表 -->
            <div ref="tocContainer" class="space-y-1 overflow-y-auto scrollbar-terminal pr-2 h-full" @scroll="updateScrollIndicator">
              <a
                v-for="(item, index) in tocItems"
                :key="item.id || index"
                :href="`#${item.id}`"
                @click.prevent="handleItemClick(item.id)"
                class="group block relative transition-all duration-300 ease-out"
                :class="[
                  'p-3 rounded-lg border overflow-hidden',
                  activeSection === item.id
                    ? 'bg-gradient-to-r from-cyan-500/20 via-blue-500/15 to-cyan-500/20 text-cyan-200 border-cyan-400/50 shadow-lg shadow-cyan-500/20'
                    : 'text-slate-300 hover:text-cyan-200 bg-slate-800/30 hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-blue-500/10 border-slate-700/40 hover:border-cyan-500/40'
                ]"
              >
                <!-- 全息終端線條 -->
                <div v-if="activeSection === item.id" class="absolute inset-0 opacity-30">
                  <div 
                    v-for="line in 3" :key="line"
                    class="absolute w-full h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent animate-data-stream"
                    :style="{ 
                      top: `${line * 30}%`,
                      animationDelay: `${line * 0.5}s`,
                      animationDuration: `${2 + Math.random()}s`
                    }"
                  ></div>
                </div>
                
                <div class="relative z-10">
                  <div class="flex items-center space-x-3">
                    <!-- 終端指示器 -->
                    <div class="flex-shrink-0 relative">
                      <div 
                        class="w-3 h-3 rounded border transition-all duration-300 relative overflow-hidden"
                        :class="activeSection === item.id 
                          ? 'bg-gradient-to-br from-cyan-400 to-blue-500 border-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.6)]' 
                          : 'bg-slate-700/60 border-slate-500 group-hover:border-cyan-400 group-hover:bg-cyan-500/20 group-hover:shadow-[0_0_8px_rgba(34,211,238,0.4)]'"
                      >
                        <!-- 活躍狀態的終端掃描 -->
                        <div 
                          v-if="activeSection === item.id"
                          class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-terminal-scan"
                        ></div>
                      </div>
                      
                      <!-- 外圈脈衝 -->
                      <div 
                        v-if="activeSection === item.id"
                        class="absolute inset-0 w-3 h-3 border border-cyan-300/40 rounded animate-ping"
                      ></div>
                    </div>
                    
                    <!-- 目錄內容 -->
                    <div class="flex-1 min-w-0">
                      <div class="font-medium text-base leading-relaxed font-mono">
                        <span class="block truncate tracking-wide">{{ item.title }}</span>
                      </div>
                      
                    </div>
                    
                    <!-- 終端箭頭 -->
                    <div class="flex-shrink-0">
                      <div 
                        class="w-5 h-5 transition-all duration-300 font-mono text-sm flex items-center justify-center"
                        :class="activeSection === item.id 
                          ? 'text-cyan-300 transform translate-x-1 scale-110' 
                          : 'text-slate-500 group-hover:text-cyan-400 group-hover:transform group-hover:translate-x-0.5'"
                      >
                        ▶
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- 活躍項目終端邊條 -->
                <div 
                  v-if="activeSection === item.id"
                  class="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-12 bg-gradient-to-b from-cyan-400 via-blue-400 to-cyan-400 rounded-r-full shadow-[0_0_12px_rgba(34,211,238,0.8)] animate-glow-pulse"
                ></div>
              </a>
            </div>
            
            <!-- 滾動位置終端指示器 -->
            <div class="absolute right-0 top-2 bottom-2 w-0.5 bg-slate-800/60 rounded-full overflow-hidden">
              <div 
                ref="scrollIndicator"
                class="w-full bg-gradient-to-b from-cyan-400 to-blue-400 rounded-full transition-all duration-200 shadow-[0_0_4px_rgba(34,211,238,0.6)]"
                :style="{ height: scrollPercentage + '%', transform: `translateY(${scrollPosition}px)` }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- 底部終端狀態 -->
      <div class="absolute bottom-0 left-0 right-0 bg-slate-900/60 p-4 border-t border-slate-700/50">
        <div class="flex items-center justify-between text-xs font-mono text-slate-400">
          <div class="flex items-center space-x-2">
            <div class="w-1.5 h-1.5 bg-cyan-400/60 rounded-full animate-pulse"></div>
            <span class="tracking-wide">READY</span>
          </div>
          <div class="flex items-center space-x-2">
            <span>{{ tocItems.length }} ENTRIES</span>
            <div class="w-1 h-1 bg-slate-500 rounded-full"></div>
            <span class="tracking-widest">{{ Math.round(scrollPercentage) }}%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface TocItem {
  id: string
  title: string
  subtitle?: string
  category?: string
  description?: string
  level?: number
  readTime?: number
  wordCount?: number
}

interface Props {
  tocItems: TocItem[]
  activeSection: string
}

// Props
const props = withDefaults(defineProps<Props>(), {
  tocItems: () => [],
  activeSection: ''
})

// Emits
const emit = defineEmits<{
  'section-click': [sectionId: string]
}>()

// 滾動相關響應式數據
const tocContainer = ref<HTMLElement>()
const scrollIndicator = ref<HTMLElement>()
const scrollPercentage = ref(0)
const scrollPosition = ref(0)

// 處理項目點擊
const handleItemClick = (sectionId: string) => {
  emit('section-click', sectionId)
}

// 更新滾動指示器
const updateScrollIndicator = () => {
  if (!tocContainer.value) return
  
  const container = tocContainer.value
  const scrollTop = container.scrollTop
  const scrollHeight = container.scrollHeight - container.clientHeight
  
  if (scrollHeight > 0) {
    const percentage = (scrollTop / scrollHeight) * 100
    scrollPercentage.value = Math.min(100, Math.max(0, percentage))
    
    // 計算指示器位置
    const indicatorTrackHeight = container.clientHeight - 16
    scrollPosition.value = (scrollTop / scrollHeight) * (indicatorTrackHeight - 20)
  }
}

// 生命週期
onMounted(() => {
  if (tocContainer.value) {
    updateScrollIndicator()
  }
})

// Debug: 輸出tocItems到console
watch(() => props.tocItems, (newItems) => {
  console.log('TOC Items:', newItems)
}, { immediate: true, deep: true })
</script>

<style scoped>
/* 終端風格滾動條 */
.scrollbar-terminal {
  scrollbar-width: thin;
  scrollbar-color: rgba(34, 211, 238, 0.4) rgba(30, 41, 59, 0.2);
}

.scrollbar-terminal::-webkit-scrollbar {
  width: 4px;
}

.scrollbar-terminal::-webkit-scrollbar-track {
  background: rgba(30, 41, 59, 0.2);
  border-radius: 2px;
}

.scrollbar-terminal::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, rgba(34, 211, 238, 0.4), rgba(59, 130, 246, 0.4));
  border-radius: 2px;
  box-shadow: 0 0 4px rgba(34, 211, 238, 0.3);
}

.scrollbar-terminal::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, rgba(34, 211, 238, 0.6), rgba(59, 130, 246, 0.6));
  box-shadow: 0 0 6px rgba(34, 211, 238, 0.5);
}

/* 太空終端動畫 */
@keyframes terminal-scan {
  0% { transform: translateX(-100%) skewX(-20deg); }
  100% { transform: translateX(100%) skewX(-20deg); }
}

@keyframes data-stream {
  0%, 70%, 100% {
    opacity: 0;
    transform: translateX(-100%);
  }
  10%, 60% {
    opacity: 0.6;
    transform: translateX(100%);
  }
}

@keyframes glow-pulse {
  0%, 100% {
    box-shadow: 0 0 12px rgba(34, 211, 238, 0.8);
  }
  50% {
    box-shadow: 0 0 20px rgba(34, 211, 238, 1), 0 0 30px rgba(34, 211, 238, 0.6);
  }
}

/* 應用動畫類 */
.animate-terminal-scan {
  animation: terminal-scan 1.5s ease-in-out infinite;
}

.animate-data-stream {
  animation: data-stream 3s ease-in-out infinite;
}

.animate-glow-pulse {
  animation: glow-pulse 2s ease-in-out infinite;
}
</style>