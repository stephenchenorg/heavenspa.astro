import { ref, watch, type Ref } from 'vue'
import { apiClient } from '@/utils/api-client'
import { useI18n } from './useI18n'

interface UseApiOptions {
  // 是否自動重試失敗的請求
  autoRetry?: boolean
  // 重試次數
  retryCount?: number
  // 重試延遲（毫秒）
  retryDelay?: number
}

export function useApi(options: UseApiOptions = {}) {
  const { currentLocale } = useI18n()
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  
  const {
    autoRetry = false,
    retryCount = 3,
    retryDelay = 1000
  } = options

  // 監聽語言變更，更新 API 客戶端
  watch(currentLocale, (newLocale) => {
    apiClient.updateLocale(newLocale)
  })

  // 帶錯誤處理的請求包裝器
  const withErrorHandling = async <T>(
    requestFn: () => Promise<T>,
    retries = 0
  ): Promise<T> => {
    try {
      isLoading.value = true
      error.value = null
      
      const result = await requestFn()
      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'API request failed'
      
      if (autoRetry && retries < retryCount) {
        console.warn(`API request failed, retrying... (${retries + 1}/${retryCount})`)
        await new Promise(resolve => setTimeout(resolve, retryDelay))
        return withErrorHandling(requestFn, retries + 1)
      }
      
      error.value = errorMessage
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // GraphQL 請求
  const graphql = async <T = any>(
    query: string,
    variables?: Record<string, any>,
    customHeaders?: Record<string, string>
  ): Promise<T> => {
    return withErrorHandling(() => 
      apiClient.graphql<T>(query, variables, customHeaders)
    )
  }

  // GET 請求
  const get = async <T = any>(
    endpoint: string,
    customHeaders?: Record<string, string>
  ): Promise<T> => {
    return withErrorHandling(() => 
      apiClient.get<T>(endpoint, customHeaders)
    )
  }

  // POST 請求
  const post = async <T = any>(
    endpoint: string,
    data?: any,
    customHeaders?: Record<string, string>
  ): Promise<T> => {
    return withErrorHandling(() => 
      apiClient.post<T>(endpoint, data, customHeaders)
    )
  }

  // PUT 請求
  const put = async <T = any>(
    endpoint: string,
    data?: any,
    customHeaders?: Record<string, string>
  ): Promise<T> => {
    return withErrorHandling(() => 
      apiClient.put<T>(endpoint, data, customHeaders)
    )
  }

  // DELETE 請求
  const del = async <T = any>(
    endpoint: string,
    customHeaders?: Record<string, string>
  ): Promise<T> => {
    return withErrorHandling(() => 
      apiClient.delete<T>(endpoint, customHeaders)
    )
  }

  // 清除錯誤
  const clearError = () => {
    error.value = null
  }

  return {
    // 狀態
    isLoading: isLoading as Ref<boolean>,
    error: error as Ref<string | null>,
    
    // 方法
    graphql,
    get,
    post,
    put,
    delete: del,
    clearError,
    
    // 原始 API 客戶端
    client: apiClient
  }
}