<template>
  <div class="fixed inset-0 pointer-events-none z-0">
    <!-- 霓虹網格 -->
    <div class="absolute inset-0 opacity-10">
      <div 
        v-for="i in gridLines.horizontal" 
        :key="`grid-h-${i}`"
        class="absolute w-full border-t border-cyan-400"
        :style="{ top: `${i * gridSpacing}%` }"
      ></div>
      <div 
        v-for="i in gridLines.vertical" 
        :key="`grid-v-${i}`"
        class="absolute h-full border-l border-cyan-400"
        :style="{ left: `${i * gridSpacing}%` }"
      ></div>
    </div>
    
    <!-- 霓虹粒子 -->
    <div 
      v-for="i in particleCount" 
      :key="`neon-${i}`"
      class="absolute w-1 h-1 rounded-full animate-neon-float"
      :class="getNeonParticleClass(i)"
      :style="getNeonParticleStyle(i)"
    ></div>
    
    <!-- 數據流效果 -->
    <div 
      v-for="i in dataFlowCount" 
      :key="`data-flow-${i}`"
      class="absolute font-mono text-xs opacity-20 animate-data-flow"
      :style="getDataFlowStyle(i)"
    >
      {{ getDataFlowText() }}
    </div>

    <!-- 掃描線 -->
    <div v-if="showScanLine" class="absolute inset-0">
      <div class="w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan-line opacity-30"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  gridSpacing?: number
  particleCount?: number
  dataFlowCount?: number
  showScanLine?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  gridSpacing: 5,
  particleCount: 50,
  dataFlowCount: 10,
  showScanLine: true
})

// 計算網格線數量
const gridLines = computed(() => ({
  horizontal: Math.floor(100 / props.gridSpacing),
  vertical: Math.floor(100 / props.gridSpacing)
}))

// 霓虹粒子樣式
const getNeonParticleClass = (index: number) => {
  const colors = ['bg-cyan-400', 'bg-purple-400', 'bg-pink-400', 'bg-blue-400']
  return colors[index % colors.length]
}

const getNeonParticleStyle = (index: number) => {
  return {
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 10}s`,
    animationDuration: `${3 + Math.random() * 7}s`
  }
}

// 數據流樣式
const getDataFlowStyle = (index: number) => {
  return {
    left: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 5}s`,
    animationDuration: `${8 + Math.random() * 12}s`
  }
}

const getDataFlowText = () => {
  const chars = '01'
  return Array.from({length: 20}, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}
</script>

<style scoped>
@keyframes neon-float {
  0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
  50% { transform: translateY(-20px) translateX(10px); opacity: 1; }
}

@keyframes data-flow {
  0% { transform: translateY(-100vh); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(100vh); opacity: 0; }
}

@keyframes scan-line {
  0% { transform: translateY(-100vh); }
  100% { transform: translateY(100vh); }
}

.animate-neon-float {
  animation: neon-float ease-in-out infinite;
}

.animate-data-flow {
  animation: data-flow linear infinite;
}

.animate-scan-line {
  animation: scan-line 3s linear infinite;
}
</style>