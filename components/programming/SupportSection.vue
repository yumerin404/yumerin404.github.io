<template>
  <section class="py-16 px-4">
    <div class="container mx-auto max-w-4xl">
      <div class="bg-[#161b22]/80 backdrop-blur-sm border border-[#58a6ff]/20 rounded-xl p-12 text-center animate-fade-in-up">
        <div class="mb-8">
          <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#58a6ff] to-[#a5a5ff] rounded-full mb-6">
            <Icon name="heroicons:heart" class="w-10 h-10 text-[#0d1117]" />
          </div>
          <h2 class="text-3xl font-bold mb-4 text-[#f0f6fc]">
            <span class="text-[#ffa657] font-mono">></span> {{ title }}
          </h2>
          <p class="text-xl text-[#8b949e] mb-8">
            {{ subtitle }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div 
            v-for="link in supportLinks" 
            :key="link.name"
            class="bg-[#0d1117]/60 rounded-lg p-6 border"
            :class="`border-${link.color}/10`"
          >
            <h3 class="text-lg font-semibold text-[#f0f6fc] mb-3 flex items-center justify-center">
              <Icon :name="link.icon" :class="`w-5 h-5 mr-2 text-${link.color}`" />
              {{ link.name }}
            </h3>
            <p class="text-sm text-[#8b949e] mb-4">
              {{ link.description }}
            </p>
            <a
              :href="link.url"
              target="_blank"
              class="px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 inline-flex items-center"
              :class="[
                link.isPrimary 
                  ? `bg-gradient-to-r from-${link.color} to-[#a5a5ff] text-[#0d1117] hover:shadow-lg hover:shadow-${link.color}/25`
                  : `border border-${link.color} text-${link.color} hover:bg-${link.color}/10`
              ]"
            >
              <Icon :name="link.icon" class="w-4 h-4 mr-2" />
              {{ link.buttonText }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface SupportLink {
  name: string
  description: string
  url: string
  icon: string
  color: string
  buttonText: string
  isPrimary?: boolean
}

interface Props {
  title: string
  subtitle: string
  supportLinks: SupportLink[]
}

defineProps<Props>()
</script>

<style scoped>
/* 響應式優化 */
@media (max-width: 768px) {
  .animate-fade-in-up {
    animation: none;
  }
}
</style>