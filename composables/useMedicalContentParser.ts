/**
 * 醫療內容解析器
 * 專門用於處理保健品和醫療相關內容的結構化解析
 */

export interface MedicalContentSection {
  type: 'manufacturer' | 'ingredients' | 'effects' | 'mechanism' | 'usage' | 'warnings' | 'clinical' | 'storage' | 'general'
  title: string
  content: string
  priority: number
  icon: string
  className: string
}

export interface ParsedMedicalContent {
  sections: MedicalContentSection[]
  quickFacts: {
    manufacturer?: string
    dosage?: string
    frequency?: string
    timing?: string
    contraindications?: string[]
  }
  metadata: {
    hasWarnings: boolean
    hasClinicalData: boolean
    complexityLevel: 'basic' | 'intermediate' | 'advanced'
  }
}

export interface SupplementQuickInfo {
  dosage: string
  timing: string
  benefits: string[]
  warnings: string[]
  manufacturer: string
  category: string
}

export const useMedicalContentParser = () => {
  
  /**
   * 解析醫療內容為結構化區塊
   */
  const parseMedicalContent = (content: string): ParsedMedicalContent => {
    const sections: MedicalContentSection[] = []
    const quickFacts: ParsedMedicalContent['quickFacts'] = {}
    
    // 分割內容為段落
    const paragraphs = content.split('\n\n').filter(p => p.trim())
    
    let currentSection: MedicalContentSection | null = null
    
    paragraphs.forEach(paragraph => {
      const trimmed = paragraph.trim()
      
      // 檢測製造商資訊
      const manufacturerMatch = trimmed.match(/\*\*製造商\*\*：(.+)/i)
      if (manufacturerMatch) {
        quickFacts.manufacturer = manufacturerMatch[1].trim()
        sections.push({
          type: 'manufacturer',
          title: '製造商',
          content: manufacturerMatch[1].trim(),
          priority: 10,
          icon: 'heroicons:building-storefront',
          className: 'bg-blue-500/10 border-blue-500/30'
        })
        return
      }
      
      // 檢測成分資訊
      const ingredientsMatch = trimmed.match(/\*\*成分.*?\*\*：([\s\S]*?)(?=\*\*|$)/i)
      if (ingredientsMatch) {
        sections.push({
          type: 'ingredients',
          title: '主要成分',
          content: ingredientsMatch[1].trim(),
          priority: 20,
          icon: 'heroicons:beaker',
          className: 'bg-teal-500/10 border-teal-500/30'
        })
        return
      }
      
      // 檢測主要功效
      const effectsMatch = trimmed.match(/\*\*主要功效\*\*：([\s\S]*?)(?=\*\*|$)/i)
      if (effectsMatch) {
        sections.push({
          type: 'effects',
          title: '主要功效',
          content: effectsMatch[1].trim(),
          priority: 30,
          icon: 'heroicons:heart',
          className: 'bg-emerald-500/10 border-emerald-500/30'
        })
        return
      }
      
      // 檢測機制與細節
      const mechanismMatch = trimmed.match(/\*\*機制與細節\*\*：([\s\S]*?)(?=\*\*|$)/i)
      if (mechanismMatch) {
        sections.push({
          type: 'mechanism',
          title: '作用機制',
          content: mechanismMatch[1].trim(),
          priority: 40,
          icon: 'heroicons:academic-cap',
          className: 'bg-cyan-500/10 border-cyan-500/30'
        })
        return
      }
      
      // 檢測使用方法
      const usageMatch = trimmed.match(/\*\*使用方法\*\*：([\s\S]*?)(?=\*\*|$)/i)
      if (usageMatch) {
        const usageContent = usageMatch[1].trim()
        sections.push({
          type: 'usage',
          title: '使用方法',
          content: usageContent,
          priority: 50,
          icon: 'heroicons:clock',
          className: 'bg-purple-500/10 border-purple-500/30'
        })
        
        // 提取劑量資訊
        const dosageMatch = usageContent.match(/每日\s*(\d+[–\-~]\d+|\d+)\s*[粒顆錠]/i)
        if (dosageMatch) {
          quickFacts.dosage = dosageMatch[0]
        }
        
        return
      }
      
      // 檢測注意事項
      const warningsMatch = trimmed.match(/\*\*注意事項\*\*：([\s\S]*?)(?=\*\*|$)/i)
      if (warningsMatch) {
        sections.push({
          type: 'warnings',
          title: '注意事項',
          content: warningsMatch[1].trim(),
          priority: 60,
          icon: 'heroicons:exclamation-triangle',
          className: 'bg-red-500/10 border-red-500/30'
        })
        return
      }
      
      // 檢測臨床證據
      const clinicalMatch = trimmed.match(/\*\*臨床證據\*\*：([\s\S]*?)(?=\*\*|$)/i)
      if (clinicalMatch) {
        sections.push({
          type: 'clinical',
          title: '臨床證據',
          content: clinicalMatch[1].trim(),
          priority: 70,
          icon: 'heroicons:chart-bar',
          className: 'bg-indigo-500/10 border-indigo-500/30'
        })
        return
      }
      
      // 檢測保存條件
      const storageMatch = trimmed.match(/\*\*保存條件\*\*：([\s\S]*?)(?=\*\*|$)/i)
      if (storageMatch) {
        sections.push({
          type: 'storage',
          title: '保存條件',
          content: storageMatch[1].trim(),
          priority: 80,
          icon: 'heroicons:archive-box',
          className: 'bg-gray-500/10 border-gray-500/30'
        })
        return
      }
      
      // 其他一般內容
      if (trimmed && !trimmed.startsWith('**')) {
        sections.push({
          type: 'general',
          title: '詳細說明',
          content: trimmed,
          priority: 90,
          icon: 'heroicons:document-text',
          className: 'bg-slate-500/10 border-slate-500/30'
        })
      }
    })
    
    // 按優先級排序
    sections.sort((a, b) => a.priority - b.priority)
    
    // 分析元數據
    const metadata: ParsedMedicalContent['metadata'] = {
      hasWarnings: sections.some(s => s.type === 'warnings'),
      hasClinicalData: sections.some(s => s.type === 'clinical'),
      complexityLevel: sections.length > 6 ? 'advanced' : sections.length > 3 ? 'intermediate' : 'basic'
    }
    
    return {
      sections,
      quickFacts,
      metadata
    }
  }
  
  /**
   * 提取保健品快速資訊
   */
  const extractQuickInfo = (supplement: any): SupplementQuickInfo => {
    const parsedContent = parseMedicalContent(supplement.content)
    
    // 提取益處
    const benefitsSection = parsedContent.sections.find(s => s.type === 'effects')
    const benefits = benefitsSection 
      ? extractListItems(benefitsSection.content).slice(0, 4)
      : supplement.benefits || []
    
    // 提取警告
    const warningsSection = parsedContent.sections.find(s => s.type === 'warnings')
    const warnings = warningsSection 
      ? extractListItems(warningsSection.content).slice(0, 3)
      : []
    
    // 提取使用方法
    const usageSection = parsedContent.sections.find(s => s.type === 'usage')
    const dosage = parsedContent.quickFacts.dosage || supplement.dosage || '請參考產品標籤'
    
    return {
      dosage,
      timing: supplement.usage || '依醫囑使用',
      benefits,
      warnings,
      manufacturer: parsedContent.quickFacts.manufacturer || supplement.manufacturer || '未指定',
      category: supplement.category || 'other'
    }
  }
  
  /**
   * 從文字中提取列表項目
   */
  const extractListItems = (text: string): string[] => {
    const items: string[] = []
    
    // 匹配數字列表
    const numberedItems = text.match(/^\d+\.\s*(.+)$/gm)
    if (numberedItems) {
      items.push(...numberedItems.map(item => item.replace(/^\d+\.\s*/, '')))
    }
    
    // 匹配破折號列表
    const bulletItems = text.match(/^[-•]\s*(.+)$/gm)
    if (bulletItems) {
      items.push(...bulletItems.map(item => item.replace(/^[-•]\s*/, '')))
    }
    
    // 如果沒有列表，分割句子
    if (items.length === 0) {
      items.push(...text.split(/[。；\n]/).filter(item => item.trim()).slice(0, 5))
    }
    
    return items.map(item => item.trim()).filter(item => item.length > 0)
  }
  
  /**
   * 渲染醫療內容為HTML
   */
  const renderMedicalHTML = (content: string): string => {
    const parsed = parseMedicalContent(content)
    
    let html = ''
    
    parsed.sections.forEach(section => {
      html += `
        <div class="medical-section ${section.className} rounded-lg p-4 mb-4 border">
          <h4 class="text-lg font-semibold mb-3 flex items-center">
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <use href="#${section.icon}"></use>
            </svg>
            ${section.title}
          </h4>
          <div class="section-content">
            ${formatContentSection(section.content, section.type)}
          </div>
        </div>
      `
    })
    
    return html
  }
  
  /**
   * 格式化特定類型的內容區塊
   */
  const formatContentSection = (content: string, type: string): string => {
    let formatted = content
    
    // 處理列表
    formatted = formatted.replace(/^[-•]\s*(.+)$/gm, '<li class="mb-1 flex items-start text-sm"><span class="text-current mr-2 mt-1">•</span>$1</li>')
    formatted = formatted.replace(/^\d+\.\s*(.+)$/gm, '<li class="mb-1 flex items-start text-sm"><span class="text-current mr-2 mt-1">•</span>$1</li>')
    
    // 包裝列表
    if (formatted.includes('<li')) {
      formatted = '<ul class="space-y-1">' + formatted + '</ul>'
    }
    
    // 處理粗體
    formatted = formatted.replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold">$1</strong>')
    
    // 處理特殊格式
    switch (type) {
      case 'warnings':
        formatted = '<div class="text-red-200 text-sm">' + formatted + '</div>'
        break
      case 'clinical':
        formatted = '<div class="text-indigo-200 text-sm">' + formatted + '</div>'
        break
      case 'ingredients':
        formatted = '<div class="text-teal-200 text-sm font-mono">' + formatted + '</div>'
        break
      default:
        formatted = '<div class="text-slate-200 text-sm">' + formatted + '</div>'
    }
    
    return formatted
  }
  
  /**
   * 生成內容摘要
   */
  const generateContentSummary = (content: string, maxLength: number = 150): string => {
    const parsed = parseMedicalContent(content)
    
    // 優先使用主要功效區塊
    const effectsSection = parsed.sections.find(s => s.type === 'effects')
    if (effectsSection) {
      const summary = effectsSection.content.replace(/\*\*.*?\*\*/g, '').trim()
      return summary.length > maxLength 
        ? summary.substring(0, maxLength) + '...' 
        : summary
    }
    
    // 否則使用一般內容
    const generalSection = parsed.sections.find(s => s.type === 'general')
    if (generalSection) {
      const summary = generalSection.content.replace(/\*\*.*?\*\*/g, '').trim()
      return summary.length > maxLength 
        ? summary.substring(0, maxLength) + '...' 
        : summary
    }
    
    return '詳細資訊請展開查看。'
  }
  
  return {
    parseMedicalContent,
    extractQuickInfo,
    extractListItems,
    renderMedicalHTML,
    formatContentSection,
    generateContentSummary
  }
}