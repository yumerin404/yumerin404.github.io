# 夢鈴領域 - Yumerin's Domain

一個基於 Nuxt 3 的多元學習與創作平台，涵蓋 AI 技術、遊戲、投資、學習、醫學、小說、政治、程式設計、寫作等多個領域。

## 🌟 特色功能

- **響應式設計** - 支援桌面端與行動端
- **暗色主題** - 專業的深色介面設計
- **SEO 優化** - 完整的 SEO 設定與結構化資料
- **靜態生成** - 使用 Nuxt 3 SSG 模式，快速載入
- **無障礙設計** - 符合網頁無障礙標準

## 🛠️ 技術架構

- **框架**: Nuxt 3.17.7
- **UI 庫**: @nuxt/ui 3.2.0
- **樣式**: Tailwind CSS 4.1.11
- **圖示**: @nuxt/icon
- **部署**: GitHub Pages

## 📁 頁面結構

### 主要分類
- **首頁** (`/`) - 網站導覽與介紹
- **AI 技術** (`/ai`) - 人工智慧相關內容
- **Galgame** (`/galgame`) - 遊戲與娛樂
- **投資理財** (`/investment`) - 投資知識與分析
- **學習資源** (`/learning`) - 教育與學習內容
- **醫學知識** (`/medical`) - 健康與醫療資訊
- **小說創作** (`/novels`) - 文學創作
- **政治思考** (`/politics`) - 政治分析與討論
- **程式設計** (`/programming`) - 程式開發技術
- **寫作創作** (`/writing`) - 寫作技巧與作品

### 子頁面
- `/learning/posts` - 學習文章
- `/learning/quotes` - 名言佳句
- `/medical/supplements` - 營養補充品指南
- `/politics/thought` - 政治思想
- `/writing/insights` - 寫作洞察
- `/writing/story-anatomy` - 故事解剖

## 🚀 快速開始

### 環境要求
- Node.js 16+ 
- Yarn 或 npm

### 安裝與運行

```bash
# 克隆專案
git clone https://github.com/yumerin404/yumerin404.github.io.git

# 進入專案目錄
cd yumerin404.github.io

# 安裝依賴
yarn install

# 啟動開發伺服器
yarn dev

# 建置專案
yarn build

# 預覽建置結果
yarn preview
```

## 📦 部署

本專案使用 GitHub Pages 進行部署，採用靜態生成模式：

1. 推送程式碼至 GitHub
2. GitHub Actions 自動建置並部署
3. 可透過 `https://yumerin404.github.io` 訪問

### 部署注意事項
- 所有頁面需預渲染設定
- 更新 `sitemap.xml` 當新增頁面時
- 確保 `nuxt.config.ts` 中的路由規則正確

## 🎨 設計特色

- **現代化介面** - 使用最新的設計趨勢
- **專業醫療風格** - 醫學頁面採用專業配色
- **動畫效果** - 流暢的過場動畫
- **視覺層次** - 清晰的資訊架構

## 🔧 開發指南

### 新增頁面
1. 在 `pages/` 目錄建立 `.vue` 檔案
2. 更新 `public/sitemap.xml`
3. 在 `nuxt.config.ts` 中加入預渲染路由

### 元件結構
- `components/` - 可重用元件
- `composables/` - 組合式函數
- `content/` - Markdown 內容

### SEO 設定
- 使用 `useSEO` composable
- 結構化資料標記
- 社群媒體優化

## 📝 內容管理

### 醫療內容
- 基於科學證據的資訊
- 專業免責聲明
- 安全使用指導

### 學習資源
- 分類整理
- 搜尋功能
- 標籤系統

## 🤝 貢獻指南

1. Fork 此專案
2. 建立功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交變更 (`git commit -m 'Add amazing feature'`)
4. 推送分支 (`git push origin feature/amazing-feature`)
5. 開啟 Pull Request

## 📄 授權

此專案採用 MIT 授權 - 詳見 [LICENSE](LICENSE) 檔案

## 🔗 相關連結

- [Live Demo](https://yumerin404.github.io)
- [GitHub Repository](https://github.com/yumerin404/yumerin404.github.io)

## 📞 聯絡資訊

如有任何問題或建議，歡迎通過以下方式聯絡：

- GitHub Issues
- Email: [聯絡信箱]

---

⭐ 如果這個專案對你有幫助，請給個 Star！