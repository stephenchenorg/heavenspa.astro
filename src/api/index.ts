import type { Locale } from '@/utils/i18n'
import { createGraphQLAPI } from '@stephenchenorg/astro/api'
import { defaultLocale } from '@/utils/i18n'

// GraphQL API 客戶端
const baseGraphQLAPI = createGraphQLAPI({
  endpoint: `${import.meta.env.API_BASE_URL.replace(/\/$/, '')}/graphql`,
})

// 修改策略：不依賴模組級變數，而是直接將語系傳遞給 API 函式
// 這樣可以避免跨請求污染的問題

// 提供一個無操作的 setRequestLocals 函式以保持向後相容性
export function setRequestLocals(locals: any) {
  // 不再使用模組級變數儲存狀態
  console.warn('API: setRequestLocals (deprecated) - 建議直接傳遞 locale 參數')
}

// 獲取當前請求的語言
function getCurrentLocale(): Locale {
  // SSR 環境：由於跨請求污染問題，我們回退到使用預設語系
  // API 呼叫者應該明確傳遞 locale 參數
  if (typeof window === 'undefined') {
    console.warn('API: SSR 環境，建議明確傳遞 locale 參數，使用預設值:', defaultLocale)
    return defaultLocale
  }

  // 瀏覽器環境：必須與 middleware 邏輯完全一致
  let locale: Locale = defaultLocale

  // 1. URL 參數有最高優先級（與 middleware 一致）
  const urlParams = new URLSearchParams(window.location.search)
  const langParam = urlParams.get('lang')
  if (langParam && (langParam === 'zh-tw' || langParam === 'en')) {
    locale = langParam as Locale
    console.warn('API: 使用 URL 參數語系:', locale)
    return locale
  }

  // 2. 從 cookies 獲取（與 middleware 一致）
  const match = document.cookie.match(/(?:^|;\s*)locale=([^;]+)/)
  if (match && (match[1] === 'zh-tw' || match[1] === 'en')) {
    locale = match[1] as Locale
    console.warn('API: 使用 cookie 語系:', locale)
    return locale
  }

  // 3. 從瀏覽器語言檢測（與 middleware 一致）
  const acceptLanguage = navigator.language || navigator.languages?.[0]
  if (acceptLanguage) {
    const lang = acceptLanguage.toLowerCase()
    if (lang.includes('zh')) {
      locale = 'zh-tw'
    } else if (lang.includes('en')) {
      locale = 'en'
    }
    console.warn('API: 使用瀏覽器語言設定:', locale)
    return locale
  }

  console.warn('API: 使用預設語系:', locale)
  return locale
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
  let frontendLocale: Locale

  if (options?.locale) {
    // 明確傳遞的語系有最高優先級
    frontendLocale = options.locale as Locale
    console.warn('API: 使用明確傳遞的語系:', frontendLocale)
  } else {
    // 否則使用自動檢測
    frontendLocale = getCurrentLocale()
  }

  // 轉換為後端格式：前端 'en' → 後端 'en'，前端 'zh-tw' → 後端 'zh_TW'
  const backendLocale = frontendLocale === 'en' ? 'en' : frontendLocale === 'zh-tw' ? 'zh_TW' : 'en'

  console.warn('API Language - Frontend:', frontendLocale, 'Backend:', backendLocale)
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
