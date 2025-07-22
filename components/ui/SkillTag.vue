<template>
  <div class="group relative overflow-hidden">
    <div 
      class="px-4 py-2 rounded-xl bg-midnight-blue/40 backdrop-blur-xl border border-twilight-blue/30 hover:border-twilight-blue/50 transition-all duration-300 hover:scale-105 cursor-pointer"
    >
      <div class="flex items-center space-x-2 relative z-10">
        <Icon :name="skill.icon" class="w-4 h-4 text-starlight-gray group-hover:text-snow-white transition-colors duration-300" />
        <span class="text-sm font-medium text-starlight-gray group-hover:text-snow-white transition-colors duration-300">
          {{ skill.name }}
        </span>
      </div>
      
      <!-- 背景漸層效果 -->
      <div 
        class="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-xl"
        :class="skill.color"
      ></div>
      
      <!-- 邊框光效 -->
      <div 
        class="absolute inset-0 rounded-xl border border-transparent bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        :class="skill.color"
        style="background-clip: border-box; -webkit-background-clip: border-box;"
      ></div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  skill: {
    type: Object,
    required: true
  }
})
</script>