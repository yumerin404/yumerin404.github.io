<template>
  <section class="py-16 px-4">
    <div class="container mx-auto max-w-6xl text-center">
      <div class="mb-16 animate-fade-in-up">
        <!-- 圖示 -->
        <div class="flex justify-center items-center mb-8">
          <div :class="[
            'w-24 h-24 rounded-2xl flex items-center justify-center backdrop-blur-sm border',
            `bg-gradient-to-br ${iconGradient}`,
            `border-${themeColor}/30`
          ]">
            <Icon :name="icon" :class="`w-12 h-12 text-${themeColor}`" />
          </div>
        </div>
        
        <h1 class="text-5xl md:text-6xl font-bold mb-6">
          <span :class="[
            'bg-clip-text text-transparent',
            titleGradient
          ]">
            {{ title }}
          </span>
        </h1>
        
        <p class="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
          {{ subtitle }}
        </p>

        <!-- 額外內容 -->
        <slot name="extra-content" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Props {
  title: string
  subtitle: string
  icon: string
  themeColor: string
  iconGradient: string
  titleGradient: string
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