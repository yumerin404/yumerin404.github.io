<template>
  <section class="py-20 px-4">
    <div class="container mx-auto max-w-6xl text-center">
      <div class="mb-16 animate-cyber-glitch">
        <!-- 中央 AI 圖示 -->
        <div class="relative inline-block mb-8">
          <!-- 外圍軌道環 -->
          <div class="absolute inset-0 rounded-full border-2 border-cyan-400/30 animate-spin-slow w-32 h-32"></div>
          <div class="absolute inset-2 rounded-full border border-purple-400/20 animate-spin-reverse w-28 h-28"></div>
          
          <!-- 中央核心 -->
          <div class="relative z-10 w-32 h-32 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-cyan-400/50">
            <Icon :name="centerIcon" class="w-16 h-16 text-cyan-400 animate-pulse-neon" />
          </div>
          
          <!-- 軌道上的 AI 符號 -->
          <div 
            v-for="(symbol, index) in orbitSymbols" 
            :key="`orbit-${index}`"
            class="absolute w-8 h-8 bg-gray-900/80 rounded-lg flex items-center justify-center text-cyan-400 text-xs font-mono border border-cyan-400/50 animate-orbit-cyber"
            :style="getOrbitStyle(index, orbitSymbols.length)"
          >
            {{ symbol }}
          </div>

          <!-- 霓虹光暈 -->
          <div class="absolute inset-0 rounded-full bg-cyan-400/10 animate-ping-slow"></div>
        </div>

        <h1 class="text-6xl md:text-7xl font-bold mb-8 font-mono">
          <span class="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-neon-text">
            {{ title }}
          </span>
        </h1>
        
        <div class="flex flex-col items-center space-y-4 mb-8">
          <p class="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            {{ subtitle }}
          </p>
          
          <!-- 打字機效果文字 -->
          <div class="font-mono text-cyan-400 text-lg">
            <span class="animate-blink">></span>
            <span class="ml-2">{{ typedText }}</span>
            <span class="animate-cursor-blink">|</span>
          </div>
        </div>

        <!-- 技術標籤雲 -->
        <div class="flex flex-wrap justify-center gap-3 mb-12">
          <span 
            v-for="tech in technologies" 
            :key="tech.name"
            :class="[
              'px-4 py-2 rounded-lg text-sm font-mono border transition-all duration-300 hover:scale-105 cursor-pointer',
              tech.color
            ]"
          >
            {{ tech.name }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Technology {
  name: string
  color: string
}

interface Props {
  title: string
  subtitle: string
  centerIcon?: string
  orbitSymbols?: string[]
  technologies: Technology[]
  typewriterTexts?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  centerIcon: 'heroicons:cpu-chip',
  orbitSymbols: () => ['AI', 'ML', 'DL', 'NLP', 'CV', 'NN'],
  typewriterTexts: () => [
    'Initializing AI systems...',
    'Loading neural networks...',
    'Processing deep learning models...',
    'Analyzing data patterns...',
    'Optimizing algorithms...',
    'Training in progress...'
  ]
})

// 響應式資料
const typedText = ref('')

// 軌道樣式
const getOrbitStyle = (index: number, total: number) => {
  const angle = (index * 360) / total
  const radius = 90
  const x = Math.cos((angle * Math.PI) / 180) * radius
  const y = Math.sin((angle * Math.PI) / 180) * radius
  
  return {
    left: `calc(50% + ${x}px)`,
    top: `calc(50% + ${y}px)`,
    transform: 'translate(-50%, -50%)',
    animationDelay: `${index * 0.3}s`
  }
}

// 打字機效果
let typewriterIndex = 0
let currentTextIndex = 0

const startTypewriter = () => {
  const currentText = props.typewriterTexts[currentTextIndex]
  
  const typeInterval = setInterval(() => {
    if (typewriterIndex <= currentText.length) {
      typedText.value = currentText.slice(0, typewriterIndex)
      typewriterIndex++
    } else {
      clearInterval(typeInterval)
      setTimeout(() => {
        // 清除文字
        const clearInterval = setInterval(() => {
          if (typewriterIndex > 0) {
            typewriterIndex--
            typedText.value = currentText.slice(0, typewriterIndex)
          } else {
            clearInterval(clearInterval)
            currentTextIndex = (currentTextIndex + 1) % props.typewriterTexts.length
            setTimeout(startTypewriter, 500)
          }
        }, 50)
      }, 2000)
    }
  }, 100)
}

onMounted(() => {
  startTypewriter()
})
</script>

<style scoped>
@keyframes spin-slow {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes spin-reverse {
  0% { transform: rotate(360deg); }
  100% { transform: rotate(0deg); }
}

@keyframes orbit-cyber {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}

@keyframes pulse-neon {
  0%, 100% { 
    filter: drop-shadow(0 0 5px rgba(34, 211, 238, 0.5)) drop-shadow(0 0 10px rgba(34, 211, 238, 0.3));
  }
  50% { 
    filter: drop-shadow(0 0 10px rgba(34, 211, 238, 0.8)) drop-shadow(0 0 20px rgba(34, 211, 238, 0.5));
  }
}

@keyframes ping-slow {
  0% { transform: scale(1); opacity: 1; }
  75%, 100% { transform: scale(2); opacity: 0; }
}

@keyframes neon-text {
  0%, 100% { text-shadow: 0 0 5px rgba(34, 211, 238, 0.5), 0 0 10px rgba(34, 211, 238, 0.3); }
  50% { text-shadow: 0 0 10px rgba(34, 211, 238, 0.8), 0 0 20px rgba(34, 211, 238, 0.5), 0 0 30px rgba(34, 211, 238, 0.3); }
}

@keyframes cyber-glitch {
  0%, 90%, 100% { transform: translateX(0); }
  20% { transform: translateX(-2px); }
  40% { transform: translateX(2px); }
  60% { transform: translateX(-1px); }
  80% { transform: translateX(1px); }
}

@keyframes cursor-blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.animate-spin-slow {
  animation: spin-slow 15s linear infinite;
}

.animate-spin-reverse {
  animation: spin-reverse 20s linear infinite;
}

.animate-orbit-cyber {
  animation: orbit-cyber 25s linear infinite;
}

.animate-pulse-neon {
  animation: pulse-neon 2s ease-in-out infinite;
}

.animate-ping-slow {
  animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}

.animate-neon-text {
  animation: neon-text 3s ease-in-out infinite;
}

.animate-cyber-glitch {
  animation: cyber-glitch 2s ease-in-out infinite;
}

.animate-cursor-blink {
  animation: cursor-blink 1s ease-in-out infinite;
}

.animate-blink {
  animation: blink 1s ease-in-out infinite;
}
</style>