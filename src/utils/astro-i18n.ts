import type { APIContext } from 'astro'
import type { Locale } from './i18n'
import { defaultLocale, t } from './i18n'

// 從 Astro 請求中獲取語言
export function getLocaleFromRequest(request: Request): Locale {
  // 1. 從 cookies 獲取語言 (最高優先級 - 用戶手動選擇)
  const cookieHeader = request.headers.get('cookie')
  if (cookieHeader) {
    const cookies = Object.fromEntries(
      cookieHeader.split(';').map(cookie => {
        const [key, value] = cookie.trim().split('=')
        return [key, decodeURIComponent(value || '')]
      })
    )

    const storedLocale = cookies.locale as Locale
    if (storedLocale && (storedLocale === 'zh-tw' || storedLocale === 'en')) {
      return storedLocale
    }
  }

  // 2. 從 Accept-Language 標頭獲取瀏覽器預設語言 (第二優先級)
  const acceptLanguage = request.headers.get('accept-language')
  if (acceptLanguage) {
    const languages = acceptLanguage.split(',').map(lang =>
      lang.split(';')[0].trim().toLowerCase()
    )

    for (const lang of languages) {
      // 檢測中文（包含各種中文變體）
      if (lang.includes('zh')) {
        return 'zh-tw'
      }
      // 檢測英文
      if (lang.includes('en')) {
        return 'en'
      }
    }
  }

  // 3. 預設語言
  return defaultLocale
}

// Astro 組件中使用的翻譯函數
export function createAstroT(context: APIContext) {
  const locale = getLocaleFromRequest(context.request)

  return function astroT(key: string): string {
    return t(key, locale)
  }
}

// 獲取當前頁面的其他語言版本 URL
export function getAlternateUrls(context: APIContext) {
  const url = new URL(context.request.url)
  const currentLocale = getLocaleFromRequest(context.request)

  // 移除當前語言前綴
  let pathname = url.pathname
  if (pathname.startsWith(`/${currentLocale}`)) {
    pathname = pathname.substring(`/${currentLocale}`.length) || '/'
  }

  return {
    'zh-tw': currentLocale === 'zh-tw' ? url.href : `${url.origin}${pathname}`,
    en: currentLocale === 'en' ? url.href : `${url.origin}/en${pathname === '/' ? '' : pathname}`,
  }
}
