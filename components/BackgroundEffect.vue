<template>
  <div class="fixed inset-0 pointer-events-none overflow-hidden">
    <!-- 簡潔的背景漸層 -->
    <div class="absolute inset-0 bg-gradient-to-br from-slate-950 via-gray-950 to-slate-950"></div>
    
    <!-- 動態光點效果 -->
    <div class="absolute inset-0">
      <div 
        v-for="i in 12" 
        :key="`light-${i}`"
        class="absolute w-1 h-1 bg-violet-400/30 rounded-full animate-pulse"
        :style="getLightStyle(i)"
      ></div>
    </div>
    
    <!-- 漸層光暈 -->
    <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl animate-pulse"></div>
    <div class="absolute bottom-1/3 right-1/4 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
  </div>
</template>

<script setup lang="ts">
const getLightStyle = (index: number) => {
  return {
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 3}s`,
    animationDuration: `${2 + Math.random() * 2}s`
  }
}
</script>