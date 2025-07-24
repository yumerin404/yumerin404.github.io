<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-950 via-gray-950 to-slate-950">
    <Header />
    <main class="pt-20">
      <NuxtPage />
    </main>
  </div>
</template>

<style>
/* 確保全局動畫生效 */
html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}
</style>