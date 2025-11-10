/**
 * Google Ads 轉換追蹤工具
 * 根據 URL 動態判斷應該使用哪個轉換追蹤代碼
 */

// Google Ads 轉換追蹤代碼配置
const CONVERSION_CODES = {
  PHONE: 'AW-17352893346/oUD4COrLv7sbEKLHwNJA',      // 電話轉換
  LINE: 'AW-17352893346/7qNICOTLv7sbEKLHwNJA',       // Line 轉換
  WHATSAPP: 'AW-17352893346/S7CWCOfLv7sbEKLHwNJA',   // WhatsApp 轉換
  FORM: 'AW-17352893346/d_AyCO3Lv7sbEKLHwNJA',       // 應徵表單轉換
}

/**
 * 根據 URL 判斷應該使用的轉換追蹤代碼
 * @param url - 要判斷的 URL
 * @returns 對應的轉換追蹤代碼，如果沒有匹配則返回 null
 */
export function getConversionCode(url: string | null | undefined): string | null {
  if (!url) return null

  const normalizedUrl = url.toLowerCase().trim()

  // 判斷 Line
  if (normalizedUrl.includes('page.line.me') || normalizedUrl.includes('line.me')) {
    return CONVERSION_CODES.LINE
  }

  // 判斷 WhatsApp
  if (normalizedUrl.includes('wa.me') || normalizedUrl.includes('whatsapp')) {
    return CONVERSION_CODES.WHATSAPP
  }

  // 判斷電話
  if (normalizedUrl.startsWith('tel:')) {
    return CONVERSION_CODES.PHONE
  }

  // 沒有匹配的轉換類型
  return null
}

/**
 * 生成 onclick 屬性的值
 * @param url - 要判斷的 URL
 * @returns onclick 屬性值，如果沒有匹配則返回 undefined
 */
export function getConversionOnClick(url: string | null | undefined): string | undefined {
  const code = getConversionCode(url)

  if (!code) return undefined

  return `if(window.gtag){gtag('event','conversion',{'send_to':'${code}'});}`
}

/**
 * 觸發 Google Ads 轉換追蹤（用於 Vue 組件）
 * @param url - 要判斷的 URL
 */
export function trackConversion(url: string | null | undefined): void {
  const code = getConversionCode(url)

  if (!code) return

  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'conversion', {
      'send_to': code
    })
  }
}
