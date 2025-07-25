<template>
  <section class="pt-16 pb-4 px-4">
    <div class="container mx-auto max-w-6xl text-center">
      <!-- 黑客風格標題 -->
      <div class="mb-8 animate-fade-in-up">
        <div class="flex justify-center items-center mb-4">
          <div class="w-16 h-16 bg-gradient-to-br from-[#58a6ff] to-[#a5a5ff] rounded-lg flex items-center justify-center animate-pulse-glow">
            <Icon name="heroicons:code-bracket" class="w-8 h-8 text-[#0d1117]" />
          </div>
        </div>
        <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold mb-4">
          <span class="bg-gradient-to-r from-[#58a6ff] via-[#a5a5ff] to-[#7ce38a] bg-clip-text text-transparent">
            {{ title }}
          </span>
        </h1>
        <div class="flex justify-center items-center space-x-2 font-mono text-[#ffa657] text-lg mb-6">
          <span class="animate-blink">></span>
          <span class="text-[#f0f6fc]">{{ subtitle }}</span>
          <span class="animate-cursor">_</span>
        </div>
      </div>

      <!-- 技術標籤 -->
      <div class="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in-up delay-200">
        <span
          v-for="tag in tags"
          :key="tag.text"
          class="px-4 py-2 rounded-lg text-sm font-mono border"
          :class="[
            `bg-${tag.color}/10`,
            `border-${tag.color}/30`,
            `text-${tag.color}`
          ]"
        >{{ tag.text }}</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Tag {
  text: string
  color: string
}

interface Props {
  title: string
  subtitle: string
  tags: Tag[]
}

defineProps<Props>()
</script>

<style scoped>
@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 0 10px rgba(88, 166, 255, 0.3);
  }
  50% {
    box-shadow: 0 0 20px rgba(88, 166, 255, 0.6), 0 0 30px rgba(88, 166, 255, 0.3);
  }
}

@keyframes blink {
  0%, 50% {
    opacity: 1;
  }
  51%, 100% {
    opacity: 0;
  }
}

@keyframes cursor {
  0%, 50% {
    opacity: 1;
  }
  51%, 100% {
    opacity: 0;
  }
}

.animate-pulse-glow {
  animation: pulse-glow 2s ease-in-out infinite;
}

.animate-blink {
  animation: blink 1s ease-in-out infinite;
}

.animate-cursor {
  animation: cursor 1.2s ease-in-out infinite;
}
</style>