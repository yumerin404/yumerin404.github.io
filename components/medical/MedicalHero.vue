<template>
  <section class="py-16 px-4">
    <div class="container mx-auto max-w-6xl text-center">
      <div class="mb-16 animate-fade-in-up">
        <!-- 醫療圖示 -->
        <div class="flex justify-center items-center mb-8">
          <div class="w-24 h-24 bg-gradient-to-br from-blue-600/20 to-green-600/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-blue-500/30">
            <Icon :name="icon" class="w-12 h-12 text-blue-400" />
          </div>
        </div>
        
        <h1 class="text-5xl md:text-6xl font-bold mb-6">
          <span class="bg-gradient-to-r from-blue-400 via-green-400 to-teal-400 bg-clip-text text-transparent">
            {{ title }}
          </span>
        </h1>
        
        <p class="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
          {{ subtitle }}
        </p>

        <!-- 免責聲明 -->
        <div class="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6 max-w-4xl mx-auto mb-12">
          <div class="flex items-start space-x-3">
            <Icon name="heroicons:exclamation-triangle" class="w-6 h-6 text-yellow-400 mt-1 flex-shrink-0" />
            <div class="text-left">
              <h3 class="text-yellow-400 font-semibold mb-2">{{ disclaimer.title }}</h3>
              <p class="text-gray-300 text-sm leading-relaxed">
                {{ disclaimer.content }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Disclaimer {
  title: string
  content: string
}

interface Props {
  title: string
  subtitle: string
  icon?: string
  disclaimer: Disclaimer
}

defineProps<Props>()
</script>

<style scoped>
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

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out;
}
</style>