import { getLocale } from 'i18n:astro'

// 語系資料類型定義
interface NestedTranslation {
  [key: string]: string | NestedTranslation
}

// 動態載入語系資料
async function loadTranslations(locale: string): Promise<NestedTranslation> {
  try {
    if (locale === 'zh-TW') {
      return await import('@/locales/zh-TW/index.json').then(m => m.default)
    } else if (locale === 'en') {
      return await import('@/locales/en/index.json').then(m => m.default)
    }

    // 預設回傳中文
    return await import('@/locales/zh-TW/index.json').then(m => m.default)
  } catch (error) {
    console.error('Failed to load translations:', error)
    return {}
  }
}

// 遞迴取得嵌套物件的值
function getNestedValue(obj: NestedTranslation, path: string[]): string | NestedTranslation | undefined {
  if (path.length === 0) return obj

  const [first, ...rest] = path
  const value = obj[first]

  if (value === undefined) return undefined
  if (typeof value === 'string' && rest.length === 0) return value
  if (typeof value === 'object' && rest.length > 0) {
    return getNestedValue(value, rest)
  }

  return value
}

// 創建嵌套的翻譯函數
export async function createNestedT() {
  const locale = getLocale()
  const translations = await loadTranslations(locale)

  // 回傳一個物件，可以用鏈式方法或函數呼叫方式使用
  function createProxy(currentObj: NestedTranslation, currentPath: string[] = []): any {
    return new Proxy(() => {}, {
      get(target, prop: string) {
        const newPath = [...currentPath, prop]
        const value = getNestedValue(translations, newPath)

        if (typeof value === 'string') {
          return value
        } else if (typeof value === 'object') {
          return createProxy(value, newPath)
        }

        return undefined
      },

      apply(target, thisArg, args: [string?]) {
        if (args.length > 0 && typeof args[0] === 'string') {
          // 支持 t('nav.home') 的用法
          const path = args[0].split('.')
          const value = getNestedValue(translations, path)
          return typeof value === 'string' ? value : args[0]
        }

        // 如果沒有參數，回傳當前路徑的值
        const value = getNestedValue(translations, currentPath)
        return typeof value === 'string' ? value : ''
      },
    })
  }

  return createProxy(translations)
}

// 簡化版本，直接支持路徑查詢
export async function nt(key: string): Promise<string> {
  const locale = getLocale()
  const translations = await loadTranslations(locale)
  const path = key.split('.')
  const value = getNestedValue(translations, path)
  return typeof value === 'string' ? value : key
}

// 預載入翻譯資料的版本（適合在元件中使用）
export class NestedTranslator {
  private translations: NestedTranslation = {}

  constructor(translations: NestedTranslation) {
    this.translations = translations
  }

  // 鏈式語法：nt.nav.home
  get nav() { return this.createProxy(this.translations.nav as NestedTranslation, ['nav']) }
  get hero() { return this.createProxy(this.translations.hero as NestedTranslation, ['hero']) }
  get team() { return this.createProxy(this.translations.team as NestedTranslation, ['team']) }
  get schedule() { return this.createProxy(this.translations.schedule as NestedTranslation, ['schedule']) }
  get course() { return this.createProxy(this.translations.course as NestedTranslation, ['course']) }
  get courses() { return this.createProxy(this.translations.courses as NestedTranslation, ['courses']) }
  get news() { return this.createProxy(this.translations.news as NestedTranslation, ['news']) }
  get benefits() { return this.createProxy(this.translations.benefits as NestedTranslation, ['benefits']) }
  get buttons() { return this.createProxy(this.translations.buttons as NestedTranslation, ['buttons']) }
  get footer() { return this.createProxy(this.translations.footer as NestedTranslation, ['footer']) }
  get intro() { return this.createProxy(this.translations.intro as NestedTranslation, ['intro']) }
  get careers() { return this.createProxy(this.translations.careers as NestedTranslation, ['careers']) }
  get faq() { return this.createProxy(this.translations.faq as NestedTranslation, ['faq']) }

  // 函數語法：nt('nav.home')
  t(key: string): string {
    const path = key.split('.')
    const value = getNestedValue(this.translations, path)
    return typeof value === 'string' ? value : key
  }

  private createProxy(obj: NestedTranslation, path: string[]): any {
    return new Proxy(() => {}, {
      get(target, prop: string) {
        const value = obj[prop]
        if (typeof value === 'string') {
          return value
        } else if (typeof value === 'object') {
          return this.createProxy(value, [...path, prop])
        }
        return undefined
      },

      apply(target, thisArg, args) {
        // 當作為函數呼叫時，回傳物件本身的字串值或空字串
        if (typeof obj === 'string') return obj
        return ''
      },
    })
  }
}

// 創建翻譯器實例
export async function createTranslator(): Promise<NestedTranslator> {
  const locale = getLocale()
  const translations = await loadTranslations(locale)
  return new NestedTranslator(translations)
}
