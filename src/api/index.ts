import type { Locale } from '@/utils/i18n'
import { createGraphQLAPI } from '@stephenchenorg/astro/api'
import { defaultLocale } from '@/utils/i18n'

// GraphQL API 客戶端
const baseGraphQLAPI = createGraphQLAPI({
  endpoint: `${import.meta.env.API_BASE_URL.replace(/\/$/, '')}/graphql`,
})

// 儲存 SSR 期間的 Astro.locals 引用
let currentLocals: any = null

// 設定當前請求的 locals（由 middleware 或頁面呼叫）
export function setRequestLocals(locals: any) {
  if (typeof window === 'undefined') {
    currentLocals = locals
  }
}

// 獲取當前請求的語言
function getCurrentLocale(): Locale {
  // SSR 環境：從 Astro.locals 獲取（由 middleware 設定）
  if (typeof window === 'undefined') {
    if (currentLocals?.locale) {
      return currentLocals.locale as Locale
    }
    return defaultLocale
  }

  // 瀏覽器環境：從 cookies/localStorage 獲取
  const cookies = document.cookie.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=')
    acc[key] = decodeURIComponent(value || '')
    return acc
  }, {} as Record<string, string>)

  const storedInCookie = cookies.locale as Locale
  if (storedInCookie && (storedInCookie === 'zh-tw' || storedInCookie === 'en')) {
    return storedInCookie
  }

  const storedInLS = localStorage.getItem('locale') as Locale
  if (storedInLS && (storedInLS === 'zh-tw' || storedInLS === 'en')) {
    return storedInLS
  }

  const languages = window.navigator.languages || [window.navigator.language]
  for (const lang of languages) {
    const normalizedLang = lang.toLowerCase()
    if (normalizedLang.includes('en')) return 'en'
    if (normalizedLang.includes('zh')) return 'zh-tw'
  }

  return defaultLocale
}

// 支援語言 headers 的 GraphQL API
export function graphQLAPI<
  TData extends Record<string, any>,
  TVariables extends Record<string, any> = Record<string, any>
>(
  query: any,
  options?: { variables?: TVariables, locale?: string }
): Promise<TData> {
  // 優先使用傳入的 locale，否則自動檢測語言
  const frontendLocale = (options?.locale as Locale) || getCurrentLocale()

  // 轉換為後端格式：前端 'en' → 後端 'en'，前端 'zh-tw' → 後端 'zh_TW'
  const backendLocale = frontendLocale === 'en' ? 'en' : frontendLocale === 'zh-tw' ? 'zh_TW' : 'en'

  return baseGraphQLAPI<TData, TVariables>(query, {
    variables: options?.variables,
    fetchOptions: {
      headers: {
        'Content-Language': backendLocale,
        'Accept-Language': backendLocale,
      },
    },
  })
}

export { gql, GraphQLValidationError } from '@stephenchenorg/astro/api'
