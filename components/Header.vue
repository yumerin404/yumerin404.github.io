<template>
  <header class="fixed top-0 w-full z-50 backdrop-blur-xl bg-slate-900/90 border-b border-slate-700/50">
    <div class="container mx-auto px-4 py-4">
      <nav class="flex items-center justify-between h-16">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center space-x-3 group">
          <div class="relative w-12 h-12">
            <img 
              src="/images/avatar.png" 
              alt="夢鈴領域" 
              class="w-full h-full object-cover rounded-full shadow-lg group-hover:shadow-violet-500/20 transition-shadow duration-300"
            />
          </div>
          <span class="text-2xl font-bold bg-gradient-to-r from-white via-violet-200 to-cyan-200 bg-clip-text text-transparent">
            夢鈴領域
          </span>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-1">
          <NuxtLink
            v-for="(item, index) in navItems"
            :key="item.path"
            :to="item.path"
            class="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-slate-800/60 transition-all duration-200"
          >
            {{ item.name }}
          </NuxtLink>
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="toggleMobileMenu"
          class="md:hidden p-2 rounded-lg bg-slate-800/60 text-gray-300 hover:text-white hover:bg-slate-700/60 transition-all duration-200"
        >
          <Icon name="heroicons:bars-3" class="w-6 h-6" />
        </button>
      </nav>

      <!-- Mobile Navigation -->
      <div
        v-if="isMobileMenuOpen"
        class="md:hidden mt-4 space-y-2 pb-4 border-t border-slate-700/50 pt-4"
      >
        <NuxtLink
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          @click="closeMobileMenu"
          class="block px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-slate-800/60 transition-all duration-200"
        >
          {{ item.name }}
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const isMobileMenuOpen = ref(false)

const navItems = [
  { name: '首頁', path: '/' },
  { name: '輕小說', path: '/novels' },
  { name: 'Galgame', path: '/galgame' },
  { name: '程式工具與技術', path: '/programming' },
  { name: 'AI 技巧與心得', path: '/ai' },
  { name: '醫學、藥物、保健品知識', path: '/medical' },
  { name: '經濟與投資想法', path: '/investment' },
  { name: '政治與思想', path: '/politics' },
  { name: '心境與學習筆記', path: '/learning' }
]

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

// Close mobile menu when clicking outside
onMounted(() => {
  document.addEventListener('click', (e) => {
    if (!e.target?.closest('header')) {
      isMobileMenuOpen.value = false
    }
  })
})
</script>

<style scoped>
/* 簡潔的現代化樣式 */
header {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}
</style>