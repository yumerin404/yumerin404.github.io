<template>
  <nav class="fixed w-full z-50 backdrop-blur-xl bg-deep-space/90 border-b border-twilight-blue/50 shadow-lg">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        <!-- Logo Section -->
        <div class="flex items-center">
          <NuxtLink to="/" class="flex items-center group">
            <div class="relative">
              <div class="absolute inset-0 bg-gradient-to-br from-dream-purple to-cosmic-pink rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
              <div class="relative w-12 h-12 bg-gradient-to-br from-dream-purple to-cosmic-pink rounded-2xl flex items-center justify-center shadow-lg">
                <img src="/images/avatar.png" alt="夢鈴幻想" class="w-8 h-8 rounded-xl object-cover">
              </div>
            </div>
            <div class="hidden sm:block ml-4">
              <h1 class="text-2xl font-bold bg-gradient-to-r from-dream-purple via-cosmic-pink to-emerald-green bg-clip-text text-transparent">
                夢鈴幻想
              </h1>
              <p class="text-xs text-space-gray font-medium tracking-wider">
                YUMERIN FANTASY
              </p>
            </div>
          </NuxtLink>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden lg:flex items-center space-x-2">
          <NuxtLink to="/" class="nav-link group relative" :class="{ active: $route.path === '/' }">
            <Icon name="heroicons:home" class="w-4 h-4 mr-2" />
            <span class="relative z-10">首頁</span>
          </NuxtLink>
          <NuxtLink to="/novels" class="nav-link group relative" :class="{ active: $route.path === '/novels' }">
            <Icon name="heroicons:book-open" class="w-4 h-4 mr-2" />
            <span class="relative z-10">輕小說</span>
          </NuxtLink>
          <NuxtLink to="/tools" class="nav-link group relative" :class="{ active: $route.path === '/tools' }">
            <Icon name="heroicons:wrench-screwdriver" class="w-4 h-4 mr-2" />
            <span class="relative z-10">程式工具</span>
          </NuxtLink>
          <NuxtLink to="/ai" class="nav-link group relative" :class="{ active: $route.path === '/ai' }">
            <Icon name="heroicons:cpu-chip" class="w-4 h-4 mr-2" />
            <span class="relative z-10">AI 心得</span>
          </NuxtLink>
          <NuxtLink to="/blog" class="nav-link group relative" :class="{ active: $route.path === '/blog' }">
            <Icon name="heroicons:pencil-square" class="w-4 h-4 mr-2" />
            <span class="relative z-10">心境筆記</span>
          </NuxtLink>
        </div>

        <!-- Right Side Actions -->
        <div class="flex items-center space-x-4">
          <!-- Mobile Menu Button -->
          <button 
            @click="toggleMobileMenu"
            class="lg:hidden p-3 rounded-xl bg-twilight-blue/50 hover:bg-twilight-blue/80 text-starlight-gray hover:text-snow-white transition-all duration-300"
          >
            <Icon 
              :name="mobileMenuOpen ? 'heroicons:x-mark' : 'heroicons:bars-3'" 
              class="w-5 h-5 transition-transform duration-300"
              :class="{ 'rotate-90': mobileMenuOpen }"
            />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-show="mobileMenuOpen" class="lg:hidden absolute top-full left-0 right-0 bg-deep-space/95 backdrop-blur-xl border-t border-twilight-blue/50 shadow-2xl">
      <div class="max-w-7xl mx-auto px-4 py-6">
        <div class="space-y-2">
          <NuxtLink to="/" @click="closeMobileMenu" 
                    class="mobile-nav-link"
                    :class="{ 'active': $route.path === '/' }">
            <Icon name="heroicons:home" class="w-5 h-5" />
            <span>首頁</span>
          </NuxtLink>
          <NuxtLink to="/novels" @click="closeMobileMenu" 
                    class="mobile-nav-link"
                    :class="{ 'active': $route.path === '/novels' }">
            <Icon name="heroicons:book-open" class="w-5 h-5" />
            <span>輕小說</span>
          </NuxtLink>
          <NuxtLink to="/tools" @click="closeMobileMenu" 
                    class="mobile-nav-link"
                    :class="{ 'active': $route.path === '/tools' }">
            <Icon name="heroicons:wrench-screwdriver" class="w-5 h-5" />
            <span>程式工具</span>
          </NuxtLink>
          <NuxtLink to="/ai" @click="closeMobileMenu" 
                    class="mobile-nav-link"
                    :class="{ 'active': $route.path === '/ai' }">
            <Icon name="heroicons:cpu-chip" class="w-5 h-5" />
            <span>AI 心得</span>
          </NuxtLink>
          <NuxtLink to="/blog" @click="closeMobileMenu" 
                    class="mobile-nav-link"
                    :class="{ 'active': $route.path === '/blog' }">
            <Icon name="heroicons:pencil-square" class="w-5 h-5" />
            <span>心境筆記</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
const mobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}
</script>

<style scoped>
.nav-link {
  @apply relative flex items-center px-4 py-3 rounded-xl text-starlight-gray hover:text-snow-white transition-all duration-300 font-medium hover:scale-105 active:scale-95 overflow-hidden group;
}

.nav-link::before {
  content: '';
  @apply absolute inset-0 bg-gradient-to-r from-dream-purple/20 to-cosmic-pink/20 rounded-xl opacity-0 transition-opacity duration-300;
}

.nav-link:hover::before {
  @apply opacity-100;
}

.nav-link.active {
  @apply text-snow-white bg-gradient-to-r from-dream-purple/30 to-cosmic-pink/30 shadow-lg shadow-dream-purple/20;
}

.nav-link.active::after {
  content: '';
  @apply absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-dream-purple to-cosmic-pink rounded-full;
}

.mobile-nav-link {
  @apply flex items-center space-x-4 p-4 rounded-xl bg-twilight-blue/30 hover:bg-twilight-blue/50 text-starlight-gray hover:text-snow-white transition-all duration-300 hover:scale-105 active:scale-95;
}

.mobile-nav-link.active {
  @apply text-snow-white bg-gradient-to-r from-dream-purple/30 to-cosmic-pink/30 shadow-lg shadow-dream-purple/20;
}
</style>