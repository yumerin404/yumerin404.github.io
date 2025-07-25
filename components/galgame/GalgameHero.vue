<template>
  <section class="py-16 px-4">
    <div class="container mx-auto max-w-6xl text-center">
      <div class="mb-12 animate-fade-in-up">
        <div class="flex justify-center items-center mb-6">
          <div class="w-20 h-20 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-pink-500/30">
            <Icon name="heroicons:heart" class="w-10 h-10 text-pink-400" />
          </div>
        </div>
        
        <h1 class="text-5xl md:text-6xl font-bold mb-6">
          <span class="bg-gradient-to-r from-pink-400 via-purple-400 to-violet-400 bg-clip-text text-transparent">
            {{ title }}
          </span>
        </h1>
        
        <p class="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
          {{ subtitle }}
        </p>

        <!-- 篩選標籤 -->
        <div class="flex flex-wrap justify-center gap-3 mb-12">
          <button 
            v-for="category in categories" 
            :key="category.id"
            @click="$emit('categoryChange', category.id)"
            :class="[
              'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 border',
              selectedCategory === category.id 
                ? 'bg-pink-500/20 border-pink-500/50 text-pink-300' 
                : 'border-gray-600/50 text-gray-400 hover:border-pink-500/30 hover:text-pink-300'
            ]"
          >
            {{ category.name }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { GameCategory } from '~/composables/useGalgames'

interface Props {
  title: string
  subtitle: string
  categories: GameCategory[]
  selectedCategory: string
}

defineProps<Props>()

defineEmits<{
  categoryChange: [categoryId: string]
}>()
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