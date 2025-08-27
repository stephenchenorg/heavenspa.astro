import { getCurrentLocale, type Locale } from './i18n'

// API 基礎設定
const API_BASE_URL = import.meta.env.API_BASE_URL?.replace(/\/$/, '') || ''

// 預設 headers
interface ApiHeaders {
  'Content-Type': string
  'Accept': string
  'Content-Language': string
  [key: string]: string
}

// 獲取預設 headers
function getDefaultHeaders(): ApiHeaders {
  const currentLocale = getCurrentLocale()
  
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Content-Language': currentLocale,
  }
}

// GraphQL 請求函數
export async function graphQLRequest<T = any>(
  query: string,
  variables?: Record<string, any>,
  customHeaders?: Record<string, string>
): Promise<T> {
  const headers = {
    ...getDefaultHeaders(),
    ...customHeaders,
  }

  const response = await fetch(`${API_BASE_URL}/graphql`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  if (!response.ok) {
    throw new Error(`GraphQL request failed: ${response.status} ${response.statusText}`)
  }

  const result = await response.json()
  
  if (result.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(result.errors)}`)
  }

  return result.data
}

// REST API 請求函數
export async function apiRequest<T = any>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const headers = {
    ...getDefaultHeaders(),
    ...(options?.headers || {}),
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

// API 客戶端類別
export class ApiClient {
  private defaultHeaders: () => ApiHeaders

  constructor(_baseURL: string = API_BASE_URL) {
    this.defaultHeaders = getDefaultHeaders
  }

  // 獲取當前的預設 headers
  getHeaders(customHeaders?: Record<string, string>): ApiHeaders {
    return {
      ...this.defaultHeaders(),
      ...customHeaders,
    }
  }

  // GraphQL 請求
  async graphql<T = any>(
    query: string,
    variables?: Record<string, any>,
    customHeaders?: Record<string, string>
  ): Promise<T> {
    return graphQLRequest<T>(query, variables, customHeaders)
  }

  // GET 請求
  async get<T = any>(
    endpoint: string,
    customHeaders?: Record<string, string>
  ): Promise<T> {
    return apiRequest<T>(endpoint, {
      method: 'GET',
      headers: customHeaders,
    })
  }

  // POST 請求
  async post<T = any>(
    endpoint: string,
    data?: any,
    customHeaders?: Record<string, string>
  ): Promise<T> {
    return apiRequest<T>(endpoint, {
      method: 'POST',
      headers: customHeaders,
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  // PUT 請求
  async put<T = any>(
    endpoint: string,
    data?: any,
    customHeaders?: Record<string, string>
  ): Promise<T> {
    return apiRequest<T>(endpoint, {
      method: 'PUT',
      headers: customHeaders,
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  // DELETE 請求
  async delete<T = any>(
    endpoint: string,
    customHeaders?: Record<string, string>
  ): Promise<T> {
    return apiRequest<T>(endpoint, {
      method: 'DELETE',
      headers: customHeaders,
    })
  }

  // 更新語言設定（強制重新整理 headers）
  updateLocale(_locale: Locale): void {
    // 更新當前語系後，下次請求會自動使用新的語系
  }
}

// 建立全域 API 客戶端實例
export const apiClient = new ApiClient()

// 語言變更監聽器（在瀏覽器環境中）
if (typeof window !== 'undefined') {
  window.addEventListener('localechange', (event) => {
    const customEvent = event as CustomEvent
    const newLocale = customEvent.detail as Locale
    apiClient.updateLocale(newLocale)
  })
}

// 導出便利函數
export { graphQLRequest as graphql, apiRequest as api }

// 向後兼容：導出原有的 gql 函數
export function gql(strings: TemplateStringsArray, ...values: any[]): string {
  return strings.reduce((result, string, i) => {
    return result + string + (values[i] || '')
  }, '')
}