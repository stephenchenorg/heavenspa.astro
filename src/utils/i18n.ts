export type Locale = 'zh-tw' | 'en'

export const defaultLocale: Locale = 'zh-tw'
export const locales: Locale[] = ['zh-tw', 'en']

// 翻譯字典
export const translations = {
  'zh-tw': {
    // 導航選單
    nav: {
      home: '首頁',
      news: '最新消息',
      courses: '服務項目',
      team: '我們的團隊',
      products: '精油產品',
      guide: '顧客須知',
      faq: '常見問題',
      careers: '人才招募',
      contact: '聯繫我們',
    },

    // Hero Banner
    hero: {
      embrace: '嚴格把關',
      yourself: '享天堂讓您置身天堂',
      scroll: 'SCROLL TO EXPLORE',
    },

    // Team Section
    team: {
      title: 'Our Team.',
      description: '同樣的色彩可以喚起不同的情感，或對不同的個人和文化具有各種意義。',
    },

    // Course Section
    course: {
      title: 'COURSE',
      subtitle: '課程介紹',
      button: '課程介紹',
    },

    // Member Benefits
    benefits: {
      title: 'MEMBER BENEFITS',
      subtitle: '會員禮遇',
      exclusive: '專屬優惠',
      'view-more': '查看更多',
      items: {
        'birthday-gift': {
          title: '生日禮',
          description: '生日月份享有專屬優惠券與贈品，讓您的生日更加特別',
          buttonText: '生日專屬禮',
        },
        'points-reward': {
          title: '點數回饋',
          description: '每次消費累積點數，點數可折抵下次消費金額，越消費越優惠',
          buttonText: '點數兌換',
        },
        'vip-treatment': {
          title: 'VIP 待遇',
          description: '優先預約服務、專屬顧問諮詢、定期保養提醒服務',
          buttonText: 'VIP 專屬',
        },
        'seasonal-offers': {
          title: '季節優惠',
          description: '春夏秋冬各季節限定優惠活動，會員享有獨家折扣',
          buttonText: '季節限定',
        },
      },
    },

    // Buttons & Actions
    buttons: {
      'book-now': '立即預約',
      'learn-more': '了解更多',
      'view-more': '查看更多',
      'contact-us': '聯繫我們',
    },

    // Footer & Contact Info
    footer: {
      address: '地址',
      'business-hours': '營業時間',
      'contact-info': '聯繫資訊',
      phone: '電話',
      email: '電子信箱',
      'follow-us': '關注我們',
    },

    // 其他
    intro: 'intro',
    contact: 'CONTACT',
  },
  en: {
    // Navigation Menu
    nav: {
      home: 'Home',
      news: 'News',
      courses: 'Services',
      team: 'Our Team',
      products: 'Essential Oils',
      guide: 'Customer Guide',
      faq: 'FAQ',
      careers: 'Careers',
      contact: 'Contact Us',
    },

    // Hero Banner
    hero: {
      embrace: 'EMBRACE',
      yourself: 'YOURSELF',
      scroll: 'SCROLL TO EXPLORE',
    },

    // Team Section
    team: {
      title: 'Our Team.',
      description: 'The same color can evoke different emotions, or have various meanings to different individuals and cultures.',
    },

    // Course Section
    course: {
      title: 'COURSE',
      subtitle: 'Course Introduction',
      button: 'Learn More',
    },

    // Member Benefits
    benefits: {
      title: 'MEMBER BENEFITS',
      subtitle: 'Member Privileges',
      exclusive: 'Exclusive Offers',
      'view-more': 'VIEW MORE',
      items: {
        'birthday-gift': {
          title: 'Birthday Gift',
          description: 'Exclusive birthday vouchers and gifts to make your special day even more memorable',
          buttonText: 'Birthday Special',
        },
        'points-reward': {
          title: 'Points Reward',
          description: 'Earn points with every purchase and redeem them for discounts on future services',
          buttonText: 'Redeem Points',
        },
        'vip-treatment': {
          title: 'VIP Treatment',
          description: 'Priority booking, dedicated consultant services, and regular maintenance reminders',
          buttonText: 'VIP Exclusive',
        },
        'seasonal-offers': {
          title: 'Seasonal Offers',
          description: 'Exclusive seasonal promotions throughout the year with member-only discounts',
          buttonText: 'Seasonal Special',
        },
      },
    },

    // Buttons & Actions
    buttons: {
      'book-now': 'Book Now',
      'learn-more': 'Learn More',
      'view-more': 'View More',
      'contact-us': 'Contact Us',
    },

    // Footer & Contact Info
    footer: {
      address: 'Address',
      'business-hours': 'Business Hours',
      'contact-info': 'Contact Information',
      phone: 'Phone',
      email: 'Email',
      'follow-us': 'Follow Us',
    },

    // Others
    intro: 'intro',
    contact: 'CONTACT',
  },
} as const

// 翻譯函數
export function t(key: string, locale: Locale = defaultLocale): string {
  const translation = translations[locale]
  const keys = key.split('.')
  let result: any = translation

  for (const k of keys) {
    result = result?.[k]
  }

  return result || key
}

// 檢測瀏覽器語言
export function detectBrowserLocale(): Locale {
  if (typeof window === 'undefined') return defaultLocale

  // 獲取用戶的語言偏好列表
  const languages = window.navigator.languages || [window.navigator.language]

  for (const lang of languages) {
    const normalizedLang = lang.toLowerCase()

    // 檢測各種中文變體
    if (
      normalizedLang.includes('zh-tw') || // 繁體中文 (台灣)
      normalizedLang.includes('zh-hk') || // 繁體中文 (香港)
      normalizedLang.includes('zh-mo') || // 繁體中文 (澳門)
      normalizedLang.includes('zh-hant') || // 繁體中文
      normalizedLang === 'zh-tw' ||
      normalizedLang === 'zh-hk' ||
      normalizedLang === 'zh-mo'
    ) {
      return 'zh-tw'
    }

    // 簡體中文也映射到繁體中文（根據你的需求調整）
    if (
      normalizedLang.includes('zh-cn') || // 簡體中文 (中國)
      normalizedLang.includes('zh-sg') || // 簡體中文 (新加坡)
      normalizedLang.includes('zh-hans') || // 簡體中文
      normalizedLang === 'zh-cn' ||
      normalizedLang === 'zh-sg' ||
      normalizedLang === 'zh' // 通用中文
    ) {
      return 'zh-tw' // 或者你可以改為 'zh-cn' 如果你支援簡體
    }

    // 檢測英文
    if (normalizedLang.includes('en')) {
      return 'en'
    }
  }

  return defaultLocale
}

// 獲取當前語言
export function getCurrentLocale(): Locale {
  if (typeof window === 'undefined') return defaultLocale

  // 1. 檢查 cookies (最高優先級 - 用戶手動選擇)
  const cookies = document.cookie.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=')
    acc[key] = decodeURIComponent(value || '')
    return acc
  }, {} as Record<string, string>)

  const storedInCookie = cookies.locale as Locale
  if (storedInCookie && locales.includes(storedInCookie)) {
    return storedInCookie
  }

  // 2. 檢查 localStorage (向後兼容，但優先級較低)
  const storedInLS = localStorage.getItem('locale') as Locale
  if (storedInLS && locales.includes(storedInLS)) {
    // 如果 localStorage 有值但 cookie 沒有，將值同步到 cookie
    setLocale(storedInLS)
    return storedInLS
  }

  // 3. 檢測瀏覽器預設語言 (第二優先級)
  return detectBrowserLocale()
}

// 設置語言
export function setLocale(locale: Locale): void {
  if (typeof window === 'undefined') return

  // 設定 localStorage
  localStorage.setItem('locale', locale)

  // 設定 cookie (讓服務器端也能讀取)
  const expires = new Date()
  expires.setTime(expires.getTime() + (365 * 24 * 60 * 60 * 1000)) // 1年
  const cookieString = `locale=${locale}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`
  document.cookie = cookieString

  // 觸發自定義事件通知語言變更
  window.dispatchEvent(new CustomEvent('localechange', { detail: locale }))
}

// 獲取語言顯示名稱
export function getLocaleName(locale: Locale): string {
  const names = {
    'zh-tw': '繁體中文',
    en: 'English',
  }
  return names[locale]
}
