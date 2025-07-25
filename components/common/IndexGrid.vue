<template>
  <section class="py-16 px-4">
    <div class="container mx-auto max-w-7xl">
      <div :class="[
        'grid gap-8',
        `grid-cols-1 md:grid-cols-${categories.length}`
      ]">
        <div 
          v-for="category in categories"
          :key="category.id"
          :class="[
            'group bg-gray-800/30 backdrop-blur-sm border rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl',
            `border-${category.color}/20`,
            `hover:border-${category.color}/40`,
            `hover:shadow-${category.color}/10`
          ]"
        >
          <div class="p-8">
            <!-- 圖示區域 -->
            <div class="flex justify-center mb-6">
              <div :class="[
                'w-20 h-20 rounded-2xl flex items-center justify-center border group-hover:scale-110 transition-transform duration-300',
                `bg-gradient-to-br from-${category.color}/20 to-${category.color}/30`,
                `border-${category.color}/30`
              ]">
                <Icon :name="category.icon" :class="`w-10 h-10 text-${category.color}`" />
              </div>
            </div>

            <h2 class="text-2xl font-bold text-white text-center mb-4">{{ category.name }}</h2>
            
            <p class="text-gray-300 text-center mb-8 leading-relaxed">
              {{ category.description }}
            </p>

            <!-- 內容列表 -->
            <div class="space-y-3 mb-8">
              <div 
                v-for="item in category.items" 
                :key="item"
                class="flex items-center text-sm text-gray-400"
              >
                <Icon name="heroicons:check-circle" class="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                <span>{{ item }}</span>
              </div>
            </div>

            <!-- 進入按鈕 -->
            <div class="text-center">
              <button 
                @click="$emit('navigate', category.id)"
                :class="[
                  'w-full text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center',
                  `bg-gradient-to-r from-${category.color} to-${category.color}`,
                  `hover:shadow-${category.color}/25`
                ]"
              >
                <Icon name="heroicons:arrow-right" class="w-5 h-5 mr-2" />
                {{ category.buttonText }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
export interface IndexCategory {
  id: string
  name: string
  description: string
  icon: string
  color: string
  items: string[]
  buttonText: string
}

interface Props {
  categories: IndexCategory[]
}

defineProps<Props>()

defineEmits<{
  navigate: [categoryId: string]
}>()
</script>