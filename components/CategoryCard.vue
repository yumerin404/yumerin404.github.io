<template>
  <NuxtLink
    :to="to"
    class="group block card-primary p-6 h-full overflow-hidden"
  >
    <!-- 卡片背景效果 -->
    <div class="absolute inset-0 bg-gradient-to-br from-violet-500/0 via-purple-500/0 to-cyan-500/0 group-hover:from-violet-500/10 group-hover:via-purple-500/10 group-hover:to-cyan-500/10 transition-all duration-500"></div>
    
    <!-- Icon 區域 -->
    <div class="relative mb-6">
      <div class="group/icon relative inline-flex items-center justify-center w-16 h-16 bg-slate-800/60 rounded-xl border border-slate-700/50 group-hover:border-violet-500/50 transition-all duration-300">
        <!-- Icon 背景發光 -->
        <div class="absolute inset-0 bg-gradient-to-br from-violet-500/0 to-cyan-500/0 group-hover:from-violet-500/20 group-hover:to-cyan-500/20 rounded-xl transition-all duration-300"></div>
        
        <!-- Icon -->
        <Icon 
          :name="icon" 
          class="relative z-10 w-8 h-8 text-violet-400 group-hover:text-violet-300 group-hover:scale-110 transition-all duration-300" 
        />
        
        <!-- 脈衝效果 -->
        <div class="absolute inset-0 bg-violet-400/20 rounded-xl opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-300"></div>
      </div>
    </div>
    
    <!-- 內容 -->
    <div class="relative space-y-4">
      <!-- 標題 -->
      <h3 class="text-xl font-bold text-white group-hover:text-gradient transition-all duration-300">
        {{ title }}
      </h3>
      
      <!-- 描述 -->
      <p class="text-gray-400 group-hover:text-gray-300 leading-relaxed transition-colors duration-300">
        {{ description }}
      </p>
      
      <!-- CTA -->
      <div class="flex items-center text-violet-400 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
        <span class="text-sm font-medium mr-2">探索更多</span>
        <Icon name="heroicons:arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
      </div>
    </div>
    
    <!-- 懸停光效 -->
    <div class="absolute -inset-0.5 bg-gradient-to-r from-violet-500/0 via-purple-500/0 to-cyan-500/0 group-hover:from-violet-500/20 group-hover:via-purple-500/20 group-hover:to-cyan-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10"></div>
  </NuxtLink>
</template>

<script setup lang="ts">
interface Props {
  title: string
  description: string
  to: string
  icon: string
}

defineProps<Props>()
</script>