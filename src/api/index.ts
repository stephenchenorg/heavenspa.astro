import { createGraphQLAPI, gql, GraphQLValidationError } from '@stephenchenorg/astro/api'

/**
 * 原始 GraphQL API，不加語言 header
 */
export const originalGraphQLAPI = createGraphQLAPI({
  endpoint: `${import.meta.env.API_BASE_URL.replace(/\/$/, '')}/graphql`,
})

/**
 * 目前 server locale（SSR 使用）
 */
let currentServerLocale: string = 'zh_TW'

/**
 * 設定 server locale
 * @param frontendLocale - 前端格式 (ex: 'zh-tw', 'en')
 */
export function setServerLocale(frontendLocale: string) {
  const localeMap: Record<string, string> = {
    'zh-tw': 'zh_TW',
    'en': 'en',
  }
  currentServerLocale = localeMap[frontendLocale] || 'zh_TW'
}

/**
 * 取得當前語言（前端 localStorage / cookie → 後端格式）
 */
function getCurrentLocale(): string {
  if (typeof window !== 'undefined') {
    const localeFromLS = localStorage.getItem('locale')
    const localeFromCookie = document.cookie
      .split(';')
      .find(c => c.trim().startsWith('locale='))?.split('=')[1]

    const frontendLocale = localeFromLS || localeFromCookie || 'zh-tw'

    // 前端 zh-tw → 後端 zh_TW
    return frontendLocale === 'en' ? 'en' : 'zh_TW'
  }

  // SSR 時使用 server 設定
  return currentServerLocale
}

/**
 * 包裝過的 GraphQL API，每次自動帶語言 header
 */
export function graphQLAPI<
  TData extends Record<string, any>,
  TVariables extends Record<string, any> = Record<string, any>
>(
  query: any,
  options?: { variables?: TVariables }
): Promise<TData> {
  const locale = getCurrentLocale()

  return originalGraphQLAPI<TData, TVariables>(query, {
    variables: options?.variables,
    fetchOptions: {
      headers: {
        'Content-Language': locale,
        'Accept-Language': locale,
      },
    },
  })
}

export { gql, GraphQLValidationError }
