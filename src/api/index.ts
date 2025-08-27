import { createGraphQLAPI } from '@stephenchenorg/astro/api'

// GraphQL API 客戶端
const baseGraphQLAPI = createGraphQLAPI({
  endpoint: `${import.meta.env.API_BASE_URL.replace(/\/$/, '')}/graphql`,
})

// 取得當前語言
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

  // SSR 預設
  return 'zh_TW'
}

// 支援語言 headers 的 GraphQL API
export function graphQLAPI<
  TData extends Record<string, any>,
  TVariables extends Record<string, any> = Record<string, any>
>(
  query: any,
  options?: { variables?: TVariables }
): Promise<TData> {
  const locale = getCurrentLocale()

  return baseGraphQLAPI<TData, TVariables>(query, {
    variables: options?.variables,
    fetchOptions: {
      headers: {
        'Content-Language': locale,
        'Accept-Language': locale,
      },
    },
  })
}

export { gql, GraphQLValidationError } from '@stephenchenorg/astro/api'