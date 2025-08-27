import { ref, onMounted, type Ref } from 'vue'
import { 
  type Locale, 
  getCurrentLocale, 
  setLocale as setI18nLocale,
  t as translate
} from '@/utils/i18n'

export function useI18n() {
  const currentLocale: Ref<Locale> = ref('zh-tw')
  
  // 翻譯函數
  const t = (key: string): string => {
    return translate(key, currentLocale.value)
  }
  
  // 設置語言
  const setLocale = (locale: Locale) => {
    currentLocale.value = locale
    setI18nLocale(locale)
  }
  
  // 初始化語言設定
  const initLocale = () => {
    const stored = getCurrentLocale()
    currentLocale.value = stored
  }
  
  onMounted(() => {
    initLocale()
    
    // 監聽語言變更事件
    const handleLocaleChange = (event: CustomEvent) => {
      currentLocale.value = event.detail
    }
    
    window.addEventListener('localechange', handleLocaleChange as EventListener)
    
    // 清理事件監聽器
    return () => {
      window.removeEventListener('localechange', handleLocaleChange as EventListener)
    }
  })
  
  return {
    currentLocale,
    t,
    setLocale,
    initLocale
  }
}