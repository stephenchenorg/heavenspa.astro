import type { APIContext, MiddlewareNext } from 'astro'
import { getLocaleFromRequest } from '@/utils/astro-i18n'

export async function i18n(context: APIContext, next: MiddlewareNext) {
  // 獲取當前請求的語言
  const locale = getLocaleFromRequest(context.request)
  // 呼叫下一個中間件
  const response = await next()
  // 設定 Content-Language 標頭
  response.headers.set('Content-Language', locale)
  // 也設定 HTML lang 屬性的資料
  context.locals.locale = locale
  return response
}