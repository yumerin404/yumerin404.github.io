<template>
  <div class="fixed inset-0 overflow-hidden pointer-events-none z-0">
    <!-- Matrix 雨效果 -->
    <div class="absolute inset-0">
      <div
        v-for="i in matrixCount"
        :key="`matrix-char-${i}`"
        class="absolute text-[#58a6ff]/30 font-mono text-xs animate-matrix-fall"
        :style="getMatrixCharStyle(i)"
      >{{ getRandomMatrixChar() }}</div>
    </div>

    <!-- 程式碼粒子背景 -->
    <div class="absolute inset-0">
      <div
        v-for="i in particleCount"
        :key="`code-particle-${i}`"
        class="absolute text-[#7ce38a]/20 font-mono text-sm animate-code-float"
        :style="getCodeParticleStyle(i)"
      >{{ getRandomCodeSymbol() }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  matrixCount?: number
  particleCount?: number
}

const props = withDefaults(defineProps<Props>(), {
  matrixCount: 30,
  particleCount: 20
})

// Matrix 字符池
const matrixChars = [
  '0', '1', 'function', 'var', 'const', 'let', 'return', 
  '{', '}', ';', '(', ')', '[', ']', '&&', '||', '==', '!=', 
  '++', '--', '//', '/*', '*/', '#', '$', '>', '<', '='
]

const codeSymbols = [
  '</', '/>', '{}', '[]', '()', '=>', '&&', '||', '===', 
  '!==', '++', '--', '/*', '*/', '//', '#', 'if', 'else', 
  'for', 'while'
]

// Methods
const getRandomMatrixChar = () => {
  return matrixChars[Math.floor(Math.random() * matrixChars.length)]
}

const getRandomCodeSymbol = () => {
  return codeSymbols[Math.floor(Math.random() * codeSymbols.length)]
}

const getMatrixCharStyle = (index: number) => {
  return {
    left: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 10}s`,
    animationDuration: `${15 + Math.random() * 10}s`
  }
}

const getCodeParticleStyle = (index: number) => {
  return {
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 8}s`,
    animationDuration: `${6 + Math.random() * 4}s`
  }
}
</script>

<style scoped>
@keyframes matrix-fall {
  0% {
    transform: translateY(-100vh);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(100vh);
    opacity: 0;
  }
}

@keyframes code-float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
    opacity: 0.3;
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
    opacity: 0.1;
  }
}

.animate-matrix-fall {
  animation: matrix-fall linear infinite;
}

.animate-code-float {
  animation: code-float ease-in-out infinite;
}
</style>