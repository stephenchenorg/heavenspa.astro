export type Locale = 'zh-tw' | 'en'

export const defaultLocale: Locale = 'zh-tw'
export const locales: Locale[] = ['zh-tw', 'en']

// 檢測瀏覽器語言
export function detectBrowserLocale(): Locale {
  if (typeof window === 'undefined') return defaultLocale

  // 獲取用戶的語言偏好列表
  const languages = window.navigator.languages || [window.navigator.language]

  for (const lang of languages) {
    const normalizedLang = lang.toLowerCase()

    // 檢測各種中文變體
    if (
      normalizedLang.includes('zh-tw') || // 繁體中文 (台灣)
      normalizedLang.includes('zh-hk') || // 繁體中文 (香港)
      normalizedLang.includes('zh-mo') || // 繁體中文 (澳門)
      normalizedLang.includes('zh-hant') || // 繁體中文
      normalizedLang === 'zh-tw' ||
      normalizedLang === 'zh-hk' ||
      normalizedLang === 'zh-mo'
    ) {
      return 'zh-tw'
    }

    // 簡體中文也映射到繁體中文（根據你的需求調整）
    if (
      normalizedLang.includes('zh-cn') || // 簡體中文 (中國)
      normalizedLang.includes('zh-sg') || // 簡體中文 (新加坡)
      normalizedLang.includes('zh-hans') || // 簡體中文
      normalizedLang === 'zh-cn' ||
      normalizedLang === 'zh-sg' ||
      normalizedLang === 'zh' // 通用中文
    ) {
      return 'zh-tw' // 或者你可以改為 'zh-cn' 如果你支援簡體
    }

    // 檢測英文
    if (normalizedLang.includes('en')) {
      return 'en'
    }
  }

  return defaultLocale
}

// 獲取當前語言
export function getCurrentLocale(): Locale {
  if (typeof window === 'undefined') return defaultLocale

  // 1. 檢查 cookies (最高優先級 - 用戶手動選擇)
  const cookies = document.cookie.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=')
    acc[key] = decodeURIComponent(value || '')
    return acc
  }, {} as Record<string, string>)

  const storedInCookie = cookies.locale as Locale
  if (storedInCookie && locales.includes(storedInCookie)) {
    return storedInCookie
  }

  // 2. 檢查 localStorage (向後兼容，但優先級較低)
  const storedInLS = localStorage.getItem('locale') as Locale
  if (storedInLS && locales.includes(storedInLS)) {
    // 如果 localStorage 有值但 cookie 沒有，將值同步到 cookie
    setLocale(storedInLS)
    return storedInLS
  }

  // 3. 檢測瀏覽器預設語言 (第二優先級)
  return detectBrowserLocale()
}

// 設置語言
export function setLocale(locale: Locale): void {
  if (typeof window === 'undefined') return

  // 設定 localStorage
  localStorage.setItem('locale', locale)

  // 設定 cookie (讓服務器端也能讀取)
  const expires = new Date()
  expires.setTime(expires.getTime() + (365 * 24 * 60 * 60 * 1000)) // 1年
  const cookieString = `locale=${locale}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`
  document.cookie = cookieString

  // 強制重新檢查 cookie 是否設定成功（用於調試）
  console.warn('Language set to:', locale)
  console.warn('Cookie set:', document.cookie.includes(`locale=${locale}`))

  // 觸發自定義事件通知語言變更
  window.dispatchEvent(new CustomEvent('localechange', { detail: locale }))
}

// 獲取語言顯示名稱
export function getLocaleName(locale: Locale): string {
  const names = {
    'zh-tw': '繁體中文',
    en: 'English',
  }
  return names[locale]
}
