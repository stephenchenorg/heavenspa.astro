# Google Ads 轉換追蹤實作文檔

## 📋 目錄
- [概述](#概述)
- [轉換追蹤代碼對照表](#轉換追蹤代碼對照表)
- [檔案修改清單](#檔案修改清單)
- [功能說明](#功能說明)
- [測試建議](#測試建議)

---

## 概述

本次更新為網站加入了 Google Ads 轉換追蹤功能，涵蓋所有主要的用戶互動接觸點。實作方式分為：
1. **靜態追蹤**：固定埋入特定轉換代碼
2. **動態追蹤**：根據 URL 自動判斷並埋入對應的轉換代碼

---

## 轉換追蹤代碼對照表

| 轉換類型 | 轉換代碼 | 觸發條件 |
|---------|---------|---------|
| 📞 電話 | `AW-17352893346/oUD4COrLv7sbEKLHwNJA` | URL 以 `tel:` 開頭 |
| 💬 Line | `AW-17352893346/7qNICOTLv7sbEKLHwNJA` | URL 包含 `page.line.me` 或 `line.me` |
| 📱 WhatsApp | `AW-17352893346/S7CWCOfLv7sbEKLHwNJA` | URL 包含 `wa.me` 或 `whatsapp` |
| 📝 應徵表單 | `AW-17352893346/d_AyCO3Lv7sbEKLHwNJA` | 表單提交成功 |

---

## 檔案修改清單

### ✨ 新增檔案

#### 1. `src/utils/googleAdsTracking.ts`
**目的**：提供動態轉換追蹤判斷功能

**新增函式**：
- `getConversionCode(url)` - 根據 URL 判斷並返回轉換代碼
- `getConversionOnClick(url)` - 生成 onclick 屬性值
- `trackConversion(url)` - Vue 組件使用的追蹤函式

**判斷邏輯**：
```typescript
// Line 判斷
if (url.includes('page.line.me') || url.includes('line.me'))
  → 返回 Line 轉換代碼

// WhatsApp 判斷
if (url.includes('wa.me') || url.includes('whatsapp'))
  → 返回 WhatsApp 轉換代碼

// 電話判斷
if (url.startsWith('tel:'))
  → 返回電話轉換代碼
```

---

### 🔧 修改檔案

#### 2. `src/layouts/partials/Footer.astro`
**修改內容**：

1. **電話連結** (第 66-71 行)
   - 加入 `onclick` 事件
   - 轉換代碼：電話轉換

2. **Line 社群媒體** (第 167-183 行)
   - 將 `FooterLink` 組件改為原生 `<a>` 標籤
   - 加入 `onclick` 事件
   - 轉換代碼：Line 轉換

**注意**：原本不存在的 WhatsApp 社群媒體連結已移除（保持原有設計）

---

#### 3. `src/components/ButtonBooking.vue`
**修改內容**：

1. **模板** (第 8 行)
   - 在 `<a>` 標籤加入 `@click="handleBookingClick"` 事件

2. **腳本** (第 72-79 行)
   - 新增 `handleBookingClick()` 函式
   - 轉換代碼：Line 轉換

**影響範圍**：
- Header 立即預約按鈕（桌面版）
- Header 手機選單立即預約按鈕（手機版）

---

#### 4. `src/components/FloatingContactSidebar.vue`
**修改內容**：

1. **模板**
   - Line 按鈕 (第 13 行)：加入 `@click="trackLineConversion"`
   - WhatsApp 按鈕 (第 27 行)：加入 `@click="trackWhatsAppConversion"`
   - 電話按鈕 (第 39 行)：加入 `@click="trackPhoneConversion"`

2. **腳本** (第 76-99 行)
   - 新增三個追蹤函式：
     - `trackLineConversion()` - Line 轉換
     - `trackWhatsAppConversion()` - WhatsApp 轉換
     - `trackPhoneConversion()` - 電話轉換

**影響範圍**：浮動聯絡側邊欄的三個按鈕

---

#### 5. `src/components/HeroBanner.astro`
**修改內容**：

1. **導入** (第 4 行)
   ```typescript
   import { getConversionOnClick } from '@/utils/googleAdsTracking'
   ```

2. **動態 Banner CTA** (第 112-120 行)
   - 在 `<a>` 標籤加入 `onclick={getConversionOnClick(banner.cta_link)}`
   - 自動根據 `cta_link` URL 判斷並埋入對應轉換代碼

3. **預設 CTA** (第 147-154 行)
   - 在預設 Line 連結加入 `onclick` 事件
   - 轉換代碼：Line 轉換

**影響範圍**：首頁 Hero Banner 的所有 CTA 按鈕

---

#### 6. `src/routes/about.astro`
**修改內容**：

1. **導入** (第 10 行)
   ```typescript
   import { getConversionOnClick } from '@/utils/googleAdsTracking'
   ```

2. **CTA 按鈕** (第 228-234 行)
   - 在 Button 組件加入 `onclick={getConversionOnClick(about.cta_link)}`
   - 自動根據後台設定的 `cta_link` 判斷並埋入對應轉換代碼

**影響範圍**：品牌介紹頁底部的 CTA 按鈕

---

#### 7. `src/components/ui/Button.astro`
**修改內容**：

1. **`<a>` 標籤** (第 43 行)
   - 加入 `onclick={onclick}` 屬性支援
   - 使 Button 組件的連結也能使用 onclick 事件

**影響範圍**：所有使用 Button 組件的 `<a>` 標籤

---

#### 8. `src/components/joinUs/careersForm.vue`
**修改內容**：

1. **submitForm 函式** (第 256-261 行)
   - 在表單成功提交後觸發應徵表單轉換追蹤
   - 轉換代碼：應徵表單轉換 (`AW-17352893346/d_AyCO3Lv7sbEKLHwNJA`)

**觸發時機**：
- 使用者填寫完整履歷資料
- API 回傳成功狀態
- 顯示成功訊息前觸發轉換追蹤

**影響範圍**：加入我們頁面的應徵表單

---

## 功能說明

### 靜態追蹤位置

| 位置 | 組件/頁面 | 元素 | 轉換類型 |
|-----|----------|------|---------|
| 頁尾 | Footer.astro | 電話連結 | 📞 電話 |
| 頁尾 | Footer.astro | Line 社群媒體 | 💬 Line |
| 頁首 | ButtonBooking.vue | 立即預約按鈕 | 💬 Line |
| 側邊欄 | FloatingContactSidebar.vue | Line 按鈕 | 💬 Line |
| 側邊欄 | FloatingContactSidebar.vue | WhatsApp 按鈕 | 📱 WhatsApp |
| 側邊欄 | FloatingContactSidebar.vue | 電話按鈕 | 📞 電話 |
| 加入我們 | careersForm.vue | 應徵表單提交 | 📝 應徵表單 |

### 動態追蹤位置

| 位置 | 組件/頁面 | 元素 | 判斷方式 |
|-----|----------|------|---------|
| 首頁 | HeroBanner.astro | Banner CTA 按鈕 | 根據 `banner.cta_link` URL |
| 首頁 | HeroBanner.astro | 預設 CTA 按鈕 | 固定 Line 連結 |
| 品牌介紹頁 | about.astro | 底部 CTA 按鈕 | 根據 `about.cta_link` URL |

---

## 測試建議

### 手動測試清單

#### 1. Footer（頁尾）
- [ ] 點擊電話號碼，確認觸發電話轉換
- [ ] 點擊 Line 社群媒體圖示，確認觸發 Line 轉換

#### 2. Header（頁首）
- [ ] 桌面版：點擊「立即預約」按鈕，確認觸發 Line 轉換
- [ ] 手機版：開啟選單，點擊「立即預約」按鈕，確認觸發 Line 轉換

#### 3. FloatingContactSidebar（浮動側邊欄）
- [ ] 點擊 Line 按鈕，確認觸發 Line 轉換
- [ ] 點擊 WhatsApp 按鈕，確認觸發 WhatsApp 轉換
- [ ] 點擊電話按鈕，確認觸發電話轉換

#### 4. HeroBanner（首頁橫幅）
- [ ] 如果後台有設定 Banner，點擊 CTA 按鈕
  - 若 cta_link 是 Line 連結，確認觸發 Line 轉換
  - 若 cta_link 是 WhatsApp 連結，確認觸發 WhatsApp 轉換
  - 若 cta_link 是電話連結，確認觸發電話轉換
- [ ] 如果後台沒有設定 Banner，點擊預設 CTA 按鈕，確認觸發 Line 轉換

#### 5. About 頁面（品牌介紹）
- [ ] 滾動到頁面底部，點擊 CTA 按鈕
  - 根據後台設定的 `about.cta_link` 確認觸發對應轉換

#### 6. 加入我們頁面（應徵表單）
- [ ] 填寫完整的應徵表單資料
- [ ] 提交表單
- [ ] 確認表單提交成功後觸發應徵表單轉換追蹤
- [ ] 檢查 Console 確認轉換代碼為 `AW-17352893346/d_AyCO3Lv7sbEKLHwNJA`

### Google Ads 驗證

1. 開啟 Chrome DevTools (F12)
2. 切換到 Console 標籤
3. 執行以下指令來監聽 gtag 事件：
   ```javascript
   window.gtag = new Proxy(window.gtag, {
     apply(target, thisArg, args) {
       console.log('gtag called:', args);
       return target.apply(thisArg, args);
     }
   });
   ```
4. 點擊各個按鈕/連結
5. 確認 Console 顯示正確的轉換代碼

---

## 技術架構

### 動態追蹤流程

```
用戶點擊 CTA 按鈕
    ↓
檢查 URL (cta_link)
    ↓
調用 getConversionCode(url)
    ↓
判斷 URL 類型：
  - 包含 page.line.me → Line 轉換
  - 包含 wa.me → WhatsApp 轉換
  - 開頭為 tel: → 電話轉換
    ↓
返回對應轉換代碼
    ↓
生成 onclick 屬性
    ↓
觸發 gtag('event', 'conversion', {...})
```

### 靜態追蹤流程

```
用戶點擊按鈕/連結
    ↓
觸發預設的 onclick 事件
    ↓
直接調用 gtag() 並傳入固定的轉換代碼
```

---

## 維護說明

### 新增轉換類型

如需新增其他平台的轉換追蹤（例如：Messenger、Telegram），請修改 `src/utils/googleAdsTracking.ts`：

1. 在 `CONVERSION_CODES` 加入新的轉換代碼
2. 在 `getConversionCode()` 函式中加入 URL 判斷邏輯

範例：
```typescript
// 1. 加入轉換代碼
const CONVERSION_CODES = {
  // ... 現有代碼
  MESSENGER: 'AW-XXXXXXXXX/XXXXXXX', // Messenger 轉換
}

// 2. 加入判斷邏輯
export function getConversionCode(url: string | null | undefined): string | null {
  // ... 現有邏輯

  // 判斷 Messenger
  if (normalizedUrl.includes('m.me') || normalizedUrl.includes('messenger')) {
    return CONVERSION_CODES.MESSENGER
  }

  // ...
}
```

### 修改轉換代碼

如需更新轉換代碼，只需修改 `src/utils/googleAdsTracking.ts` 中的 `CONVERSION_CODES` 常數即可。

---

## 注意事項

1. **Google Analytics 設定**：確保網站已正確安裝 Google Ads 追蹤代碼 (gtag.js)
2. **測試環境**：建議在測試環境先行驗證，確認轉換事件正確觸發
3. **隱私權合規**：確保符合 GDPR 等隱私權法規要求
4. **追蹤驗證**：使用 Google Tag Assistant 或 Google Ads 轉換追蹤工具驗證

---

## 常見問題

### Q: 如何確認轉換追蹤是否正常運作？

A: 可以透過以下方式確認：
1. Chrome DevTools Console 查看 gtag 調用
2. Google Tag Assistant Chrome 擴充功能
3. Google Ads 後台的轉換追蹤報告（24-48小時後）

### Q: 為什麼有些地方用靜態追蹤，有些用動態追蹤？

A:
- **靜態追蹤**：適用於固定連結（如 Footer、Header 的固定按鈕）
- **動態追蹤**：適用於後台可配置的 CTA（如 Banner、品牌介紹頁的 CTA），提供更大的彈性

### Q: 如果後台設定的 cta_link 不是 Line、WhatsApp 或電話，會發生什麼？

A: 不會觸發任何轉換追蹤，按鈕仍然正常運作（只是沒有埋入追蹤代碼）

---

**文檔版本**: 1.0
**最後更新**: 2025-01-10
**維護者**: Development Team
