# Yumerin 網站開發指南

## 專案概述
這是一個基於 Nuxt 3 的多元學習與創作平台，包含 AI、Galgame、投資、學習、醫學、小說、政治、程式設計、寫作等多個領域。

## 技術架構
- **框架**: Nuxt 3.17.7
- **UI 庫**: @nuxt/ui 3.2.0
- **樣式**: Tailwind CSS 4.1.11
- **圖示**: @nuxt/icon
- **部署**: GitHub Pages (靜態網站)

## 頁面結構
網站包含以下頁面：
- `/` - 首頁
- `/ai` - AI 技術
- `/galgame` - Galgame 遊戲
- `/investment` - 投資理財
- `/learning` - 學習資源
- `/learning/posts` - 學習文章
- `/learning/quotes` - 名言佳句
- `/medical` - 醫學知識
- `/novels` - 小說創作
- `/politics` - 政治思考
- `/politics/thought` - 政治思想
- `/programming` - 程式設計
- `/writing` - 寫作創作
- `/writing/insights` - 寫作洞察
- `/writing/story-anatomy` - 故事解剖

## 檔案結構
```
├── pages/           # 頁面檔案 (Nuxt 自動路由)
├── components/      # Vue 元件
├── composables/     # 可組合函式
├── assets/          # 資源檔案
├── public/          # 靜態檔案
├── nuxt.config.ts   # Nuxt 設定檔
└── package.json     # 專案依賴
```

## 開發與部署流程

### 本地開發
```bash
# 安裝依賴
yarn install

# 啟動開發伺服器
yarn dev

# 建置專案
yarn build

# 預覽建置結果
yarn preview
```

### 部署到 GitHub Pages
由於部署至 GitHub Pages 為靜態網站，需注意：

1. **sitemap.xml 為靜態檔案**: 位於 `public/sitemap.xml`，新增頁面時需手動更新
2. **所有頁面須預渲染**: 在 `nuxt.config.ts` 的 `nitro.prerender.routes` 設定
3. **路由規則**: 在 `routeRules` 中設定頁面為 `prerender: true`

## 重要規則

### 自動提交與建置
**每次修改都必須符合以下要求：**

1. **自動提交**: 完成修改後必須自動執行 git commit
2. **GitHub Pages 建置通過**: 確保所有修改都能成功建置並部署到 GitHub Pages
3. **測試驗證**: 修改前必須確認不會破壞現有功能

### 修改後的檢查清單
- [ ] 執行 `yarn build` 確認建置成功
- [ ] 檢查 console 無錯誤訊息
- [ ] 確認新增頁面已加入 sitemap.xml
- [ ] 確認新增頁面已加入 nuxt.config.ts 的預渲染設定
- [ ] 執行 git commit 提交修改

## 常見問題

### 1. Module externalization 錯誤
移除 vite 設定中的 manual chunks 設定，讓 Nuxt 自動處理模組打包。

### 2. 新增頁面流程
1. 在 `pages/` 目錄建立新的 .vue 檔案
2. 在 `public/sitemap.xml` 加入新頁面 URL
3. 在 `nuxt.config.ts` 的 `nitro.prerender.routes` 和 `routeRules` 加入新路由

### 3. 靜態資源
所有靜態資源放在 `public/` 目錄，可直接透過根路徑存取。

## SEO 設定

### 基礎 SEO
- 所有 meta 資訊在 `nuxt.config.ts` 中設定
- 使用 `useSEO` composable 管理頁面 SEO
- 靜態 sitemap.xml (手動維護)
- 增強版 robots.txt (包含圖片允許、爬蟲指令)
- Canonical URL 設定和 301 重新導向

### 結構化資料 (Schema.org)
- 網站組織資料 (`useOrganization`)
- 麵包屑導航 (`useBreadcrumb`) 
- 技術文章標記 (TechArticle)
- 網站導航元素 (SiteNavigationElement)
- 創作者資訊 (Person)
- 搜尋功能 (SearchAction)

### 多語言與地區化
- hreflang 標籤設定 (zh-TW, zh, x-default)
- 中文繁體內容優化
- 地區化 meta 標籤

### 爬蟲優化
- 進階 robots meta 標籤
- Googlebot/Bingbot 專用指令
- 圖片索引優化 (max-image-preview:large)
- 片段長度最大化 (max-snippet:-1)

### 性能 SEO
- 靜態生成 (SSG) 所有頁面
- 圖片壓縮與最佳化
- Code splitting 和 chunk 優化
- Core Web Vitals 友善設定

## 注意事項
- 使用 ESM 模組格式
- TypeScript 支援
- 響應式設計 (移動端優先)
- 深色主題支援
- 無障礙設計考量