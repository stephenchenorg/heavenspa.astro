import { defineMiddleware } from 'astro:middleware'
import type { Locale } from '@/utils/i18n'
import { defaultLocale } from '@/utils/i18n'

export const locale = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url)
  const langParam = url.searchParams.get('lang')

  // 從各種來源獲取語言
  let locale: Locale = defaultLocale

  // 1. URL 參數有最高優先級
  if (langParam && (langParam === 'zh-tw' || langParam === 'en')) {
    locale = langParam as Locale
    context.cookies.set('locale', locale, { 
      path: '/', 
      httpOnly: false, // 允許客戶端 JavaScript 讀取
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365 // 1年
    })
    console.log('Locale middleware - 從 URL 參數設定語言:', locale)
  } else {
    // 2. 從 cookies 獲取
    const cookieLocale = context.cookies.get('locale')?.value as Locale
    if (cookieLocale && (cookieLocale === 'zh-tw' || cookieLocale === 'en')) {
      locale = cookieLocale
      console.log('Locale middleware - 從 cookie 獲取語言:', locale)
    } else {
      // 3. 從 Accept-Language 標頭獲取
      const acceptLanguage = context.request.headers.get('accept-language')
      if (acceptLanguage) {
        const languages = acceptLanguage.split(',').map(lang =>
          lang.split(';')[0].trim().toLowerCase()
        )

        for (const lang of languages) {
          if (lang.includes('zh')) {
            locale = 'zh-tw'
            break
          }
          if (lang.includes('en')) {
            locale = 'en'
            break
          }
        }
      }
      console.log('Locale middleware - 從瀏覽器語言設定:', locale)
    }
  }

  // 設定到 context.locals 供其他地方使用
  context.locals.locale = locale

  console.log('Locale middleware - 最終語言設定:', locale)

  const response = await next()

  // 如果 URL 中有 lang 參數，在回應中清理它（可選的優化）
  if (langParam && response.headers.get('content-type')?.includes('text/html')) {
    // 可以在這裡添加 client-side script 來清理 URL，但這是可選的
  }

  return response
})