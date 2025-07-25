import type { IndexCategory } from '~/components/common/IndexGrid.vue'

export const useInvestmentContent = () => {
  const categories: IndexCategory[] = [
    {
      id: 'macro',
      name: '宏觀經濟',
      description: '全球經濟趨勢分析，掌握投資大環境的變化與機會。',
      icon: 'heroicons:globe-alt',
      color: 'emerald-500',
      items: [
        '全球經濟指標解讀',
        '貨幣政策影響分析',
        '地緣政治風險評估',
        '經濟週期判斷'
      ],
      buttonText: '探索宏觀經濟'
    },
    {
      id: 'ideas',
      name: '投資想法',
      description: '個人投資心得與策略分享，理性分析投資機會與風險。',
      icon: 'heroicons:light-bulb',
      color: 'blue-500',
      items: [
        '投資策略制定',
        '風險管理技巧',
        '資產配置建議',
        '市場機會分析'
      ],
      buttonText: '查看投資想法'
    }
  ]

  return { categories: readonly(ref(categories)) }
}

export const usePoliticsContent = () => {
  const categories: IndexCategory[] = [
    {
      id: 'politics',
      name: '政治觀察',
      description: '國際政治動態與政策分析，理解政治對社會的深遠影響。',
      icon: 'heroicons:building-library',
      color: 'purple-500',
      items: [
        '國際政治動態',
        '政策影響分析',
        '民主制度探討',
        '政治理論應用'
      ],
      buttonText: '了解政治觀察'
    },
    {
      id: 'thought',
      name: '思維方式',
      description: '批判性思維與邏輯分析，培養獨立思考的能力。',
      icon: 'heroicons:cpu-chip',
      color: 'indigo-500',
      items: [
        '批判性思維訓練',
        '邏輯推理方法',
        '認知偏誤識別',
        '理性決策框架'
      ],
      buttonText: '提升思維方式'
    },
    {
      id: 'philosophy',
      name: '哲學思辨',
      description: '深度哲學思考與人生智慧，探索存在的本質與意義。',
      icon: 'heroicons:academic-cap',
      color: 'amber-500',
      items: [
        '存在主義探討',
        '倫理學思辨',
        '認識論基礎',
        '人生哲學反思'
      ],
      buttonText: '進入哲學思辨'
    }
  ]

  return { categories: readonly(ref(categories)) }
}

export const useLearningContent = () => {
  const categories: IndexCategory[] = [
    {
      id: 'quotes',
      name: '名言佳句',
      description: '收錄啟發人心的智慧話語，在字句中尋找生活的指引。',
      icon: 'heroicons:chat-bubble-left-right',
      color: 'pink-500',
      items: [
        '人生智慧格言',
        '學習勵志語錄',
        '哲學思辨名言',
        '生活感悟分享'
      ],
      buttonText: '品味名言佳句'
    },
    {
      id: 'posts',
      name: '發文紀錄',
      description: '記錄思考軌跡與心境感悟，分享觀點與反思的點點滴滴。',
      icon: 'heroicons:pencil-square',
      color: 'cyan-500',
      items: [
        '思考過程分享',
        '觀點表達記錄',
        '心境感悟追蹤',
        '深度反思筆記'
      ],
      buttonText: '瀏覽發文紀錄'
    }
  ]

  return { categories: readonly(ref(categories)) }
}