<template>
  <div
    class="group bg-[#161b22]/80 backdrop-blur-sm border rounded-xl overflow-hidden transition-all duration-300"
    :class="[
      `border-${themeColor}/20`,
      `hover:border-${themeColor}/50`,
      `animate-fade-in-up delay-${delay}`
    ]"
  >
    <div class="p-8">
      <!-- Header -->
      <div class="flex items-center mb-6">
        <div
          class="w-16 h-16 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300"
          :class="`bg-gradient-to-br ${gradientColors}`"
        >
          <Icon :name="icon" class="w-8 h-8 text-[#0d1117]" />
        </div>
        <div>
          <h3 class="text-2xl font-bold text-[#f0f6fc] mb-1">{{ title }}</h3>
          <p class="font-mono text-sm" :class="`text-${themeColor}`">{{ category }}</p>
        </div>
      </div>

      <!-- Description -->
      <p class="text-[#8b949e] mb-6 leading-relaxed">
        {{ description }}
      </p>

      <!-- Features -->
      <div class="rounded-r-lg p-4 mb-6 bg-[#0d1117]/60 border-l-4" :class="`border-${themeColor}`">
        <h4 class="text-[#f0f6fc] font-semibold mb-3 flex items-center">
          <Icon :name="featureIcon" :class="`w-4 h-4 mr-2 text-${themeColor}`" />
          {{ featureTitle }}
        </h4>
        <ul class="space-y-2 text-sm text-[#8b949e]">
          <li 
            v-for="feature in features" 
            :key="feature" 
            class="flex items-center"
          >
            <span class="text-[#7ce38a] mr-2">✓</span>{{ feature }}
          </li>
        </ul>
      </div>

      <!-- Actions -->
      <div class="flex flex-col sm:flex-row gap-3">
        <a
          :href="codeUrl"
          target="_blank"
          class="flex-1 px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center group"
          :class="[
            `bg-gradient-to-r ${gradientColors}`,
            `text-[#0d1117]`,
            `hover:shadow-lg hover:shadow-${themeColor}/25`
          ]"
        >
          <Icon 
            name="heroicons:code-bracket"
            class="w-5 h-5 mr-2 group-hover:scale-110 transition-transform"
          />
          查看代碼
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  category: string
  description: string
  features: string[]
  icon: string
  featureIcon: string
  featureTitle: string
  codeUrl: string
  themeColor: string
  gradientColors: string
  delay?: number
}

const props = withDefaults(defineProps<Props>(), {
  delay: 100
})
</script>

<style scoped>
/* 響應式優化 */
@media (max-width: 768px) {
  .animate-fade-in-up {
    animation: none;
  }
}
</style>