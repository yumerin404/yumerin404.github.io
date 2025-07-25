<template>
  <section class="py-20 px-4">
    <div class="container mx-auto max-w-6xl">
      <!-- 建設中提示 -->
      <div class="text-center">
        <div class="bg-gray-900/50 backdrop-blur-sm border border-cyan-400/30 rounded-2xl p-12 mb-12 relative overflow-hidden">
          <!-- 背景光效 -->
          <div class="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5"></div>
          
          <div class="relative z-10">
            <div class="mb-8">
              <Icon :name="icon" class="w-20 h-20 text-cyan-400 mx-auto mb-4 animate-pulse-neon" />
            </div>
            
            <h2 class="text-4xl font-bold mb-6 font-mono">
              <span class="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                {{ title }}
              </span>
            </h2>
            
            <p class="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              {{ description }}
            </p>

            <!-- 進度條 -->
            <div class="max-w-md mx-auto mb-8">
              <div class="bg-gray-800/50 rounded-full h-3 overflow-hidden border border-cyan-400/30">
                <div 
                  class="bg-gradient-to-r from-cyan-400 to-purple-400 h-full animate-progress-load rounded-full"
                  :style="{ width: progressPercent }"
                ></div>
              </div>
              <p class="text-cyan-400 text-sm font-mono mt-2">Loading: {{ progressText }}</p>
            </div>

            <!-- 預期內容預覽 -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div 
                v-for="(feature, index) in features" 
                :key="index"
                :class="[
                  'bg-gray-800/30 border rounded-xl p-6 backdrop-blur-sm transition-all duration-300',
                  feature.color + '/20 hover:' + feature.color + '/40'
                ]"
              >
                <Icon :name="feature.icon" :class="`w-10 h-10 ${feature.color} mb-4`" />
                <h3 class="text-lg font-semibold text-white mb-3 font-mono">{{ feature.title }}</h3>
                <p class="text-gray-400 text-sm">{{ feature.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 通知訂閱 -->
        <div v-if="showSubscription" class="bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-cyan-400/30 rounded-xl p-8">
          <h3 class="text-2xl font-bold text-white mb-4 font-mono">{{ subscriptionTitle }}</h3>
          <p class="text-gray-300 mb-6">{{ subscriptionDescription }}</p>
          <div class="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              v-model="email"
              type="email" 
              :placeholder="emailPlaceholder"
              class="flex-1 bg-gray-800/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-400/50 focus:outline-none transition-all duration-300"
            />
            <button 
              @click="handleSubscribe"
              class="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25"
            >
              {{ subscribeButtonText }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Feature {
  title: string
  description: string
  icon: string
  color: string
}

interface Props {
  title: string
  description: string
  icon?: string
  progressPercent?: string
  features: Feature[]
  showSubscription?: boolean
  subscriptionTitle?: string
  subscriptionDescription?: string
  emailPlaceholder?: string
  subscribeButtonText?: string
  progressTexts?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  icon: 'heroicons:wrench-screwdriver',
  progressPercent: '68%',
  showSubscription: true,
  subscriptionTitle: '保持聯繫',
  subscriptionDescription: '第一時間獲取更新與深度見解',
  emailPlaceholder: '輸入您的郵箱地址',
  subscribeButtonText: '訂閱更新',
  progressTexts: () => ['68%', '72%', '75%', '78%', '82%', '85%', '88%', '91%', '95%', '98%']
})

defineEmits<{
  subscribe: [email: string]
}>()

// 響應式資料
const email = ref('')
const progressText = ref(props.progressPercent)

// 方法
const handleSubscribe = () => {
  if (email.value) {
    // emit('subscribe', email.value)
    console.log('Subscribe:', email.value)
    email.value = ''
  }
}

// 進度更新
const updateProgress = () => {
  let progressIndex = 0
  
  setInterval(() => {
    progressText.value = props.progressTexts[progressIndex % props.progressTexts.length]
    progressIndex++
  }, 3000)
}

onMounted(() => {
  updateProgress()
})
</script>

<style scoped>
@keyframes pulse-neon {
  0%, 100% { 
    filter: drop-shadow(0 0 5px rgba(34, 211, 238, 0.5)) drop-shadow(0 0 10px rgba(34, 211, 238, 0.3));
  }
  50% { 
    filter: drop-shadow(0 0 10px rgba(34, 211, 238, 0.8)) drop-shadow(0 0 20px rgba(34, 211, 238, 0.5));
  }
}

@keyframes progress-load {
  0% { width: 0%; }
  100% { width: var(--progress-width, 68%); }
}

.animate-pulse-neon {
  animation: pulse-neon 2s ease-in-out infinite;
}

.animate-progress-load {
  animation: progress-load 3s ease-out infinite;
}
</style>