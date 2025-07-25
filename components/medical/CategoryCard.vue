<template>
  <div :class="[
    'group bg-gray-800/30 backdrop-blur-sm border rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl',
    `border-${category.color}-500/20`,
    `hover:border-${category.color}-500/40`,
    `hover:shadow-${category.color}-500/10`
  ]">
    <div class="p-8">
      <!-- 圖示區域 -->
      <div class="flex justify-center mb-6">
        <div :class="[
          'w-20 h-20 bg-gradient-to-br rounded-2xl flex items-center justify-center border group-hover:scale-110 transition-transform duration-300',
          `from-${category.color}-500/20`,
          `to-${category.color}-600/20`,
          `border-${category.color}-500/30`
        ]">
          <Icon :name="category.icon" :class="`w-10 h-10 text-${category.color}-400`" />
        </div>
      </div>

      <h2 class="text-2xl font-bold text-white text-center mb-4">{{ category.name }}</h2>
      
      <p class="text-gray-300 text-center mb-8 leading-relaxed">
        {{ category.description }}
      </p>

      <!-- 內容預覽 -->
      <div class="space-y-3 mb-8">
        <div 
          v-for="feature in category.features" 
          :key="feature"
          class="flex items-center text-sm text-gray-400"
        >
          <Icon name="heroicons:check-circle" class="w-4 h-4 text-green-400 mr-2" />
          <span>{{ feature }}</span>
        </div>
      </div>

      <!-- 進入按鈕 -->
      <div class="text-center">
        <button 
          @click="$emit('navigate', category.id)"
          :class="[
            'w-full text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center',
            `bg-gradient-to-r from-${category.color}-500 to-${category.color}-600`,
            `hover:from-${category.color}-400 hover:to-${category.color}-500`,
            `hover:shadow-${category.color}-500/25`
          ]"
        >
          <Icon name="heroicons:arrow-right" class="w-5 h-5 mr-2" />
          {{ category.buttonText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MedicalCategory } from '~/composables/useMedicalContent'

interface Props {
  category: MedicalCategory
}

defineProps<Props>()

defineEmits<{
  navigate: [categoryId: string]
}>()
</script>