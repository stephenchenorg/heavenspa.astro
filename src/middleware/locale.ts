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
    context.cookies.set('locale', locale, { path: '/' })
  } else {
    // 2. 從 cookies 獲取
    const cookieLocale = context.cookies.get('locale')?.value as Locale
    if (cookieLocale && (cookieLocale === 'zh-tw' || cookieLocale === 'en')) {
      locale = cookieLocale
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
    }
  }

  // 設定到 context.locals 供其他地方使用
  context.locals.locale = locale

  console.log('Locale middleware - 設定語言:', locale)

  return next()
})