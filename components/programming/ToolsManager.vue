<template>
  <section class="pb-16 pt-4 px-4">
    <div class="container mx-auto max-w-7xl">
      <!-- 工具標題 -->
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-[#f0f6fc] animate-fade-in-up mb-6">
          <span class="text-[#ffa657] font-mono">></span> {{ title }}
        </h2>
        
        <!-- 篩選器 (可選) -->
        <div v-if="showFilters" class="flex flex-wrap justify-center gap-3 mb-8">
          <button
            v-for="category in categories"
            :key="category"
            @click="setActiveFilter(category)"
            class="px-4 py-2 rounded-lg text-sm font-mono border transition-all duration-300"
            :class="[
              activeFilter === category
                ? 'bg-[#58a6ff]/20 border-[#58a6ff] text-[#58a6ff]'
                : 'bg-[#161b22]/40 border-[#8b949e]/30 text-[#8b949e] hover:border-[#58a6ff]/50 hover:text-[#f0f6fc]'
            ]"
          >
            {{ category }}
          </button>
          <button
            @click="clearFilter"
            class="px-4 py-2 rounded-lg text-sm font-mono border transition-all duration-300"
            :class="[
              activeFilter === null
                ? 'bg-[#7ce38a]/20 border-[#7ce38a] text-[#7ce38a]'
                : 'bg-[#161b22]/40 border-[#8b949e]/30 text-[#8b949e] hover:border-[#7ce38a]/50 hover:text-[#f0f6fc]'
            ]"
          >
            全部
          </button>
        </div>
      </div>

      <!-- 工具網格 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ProgrammingToolCard
          v-for="(tool, index) in filteredTools"
          :key="tool.title"
          v-bind="tool"
          :delay="(index + 1) * 100"
        />
      </div>

      <!-- 空狀態 -->
      <div v-if="filteredTools.length === 0" class="text-center py-16">
        <div class="w-24 h-24 bg-[#161b22]/80 rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon name="heroicons:magnifying-glass" class="w-12 h-12 text-[#8b949e]" />
        </div>
        <h3 class="text-xl font-semibold text-[#f0f6fc] mb-2">未找到工具</h3>
        <p class="text-[#8b949e]">嘗試調整篩選條件或查看其他類別</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Tool } from '~/composables/useProgrammingTools'

interface Props {
  tools: Tool[]
  title?: string
  showFilters?: boolean
  initialFilter?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: '工具集合',
  showFilters: true,
  initialFilter: undefined
})

const activeFilter = ref<string | null>(props.initialFilter || null)

// 計算屬性
const categories = computed(() => {
  return [...new Set(props.tools.map(tool => tool.category))]
})

const filteredTools = computed(() => {
  if (!activeFilter.value) {
    return props.tools
  }
  return props.tools.filter(tool => tool.category === activeFilter.value)
})

// 方法
const setActiveFilter = (category: string) => {
  activeFilter.value = category
}

const clearFilter = () => {
  activeFilter.value = null
}

// 暴露方法給父組件
defineExpose({
  setActiveFilter,
  clearFilter,
  activeFilter: readonly(activeFilter)
})
</script>

<style scoped>
/* 響應式優化 */
@media (max-width: 768px) {
  .animate-fade-in-up {
    animation: none;
  }
}
</style>