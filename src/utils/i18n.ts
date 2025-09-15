import { getLocale } from 'i18n:astro'

// 語系資料類型定義
interface NestedTranslation {
  [key: string]: string | NestedTranslation
}

<<<<<<< HEAD
// 翻譯字典
export const translations = {
  'zh-tw': {
    // 導航選單
    nav: {
      home: '首頁',
      about: '品牌介紹',
      news: '最新消息',
      services: '服務項目',
      courses: '服務項目',
      team: '服務團隊',
      products: '精油產品',
      guide: '顧客須知',
      faq: '常見問題',
      careers: '加入我們',
      recruitment: '人才招募',
      training: '技術培訓',
      booking: '立即預約',
      contact: '聯繫我們',
      business_partnership: '異業合作',
    },

    // Hero Banner
    hero: {
      embrace: '嚴格把關',
      yourself: '享天堂讓您置身天堂',
      scroll: 'SCROLL TO EXPLORE ',
    },

    // Team Section
    team: {
      title: 'Our Team.',
      description: '同樣的色彩可以喚起不同的情感，或對不同的個人和文化具有各種意義。',
      'more-members': '查看所有團隊成員',
      pageTitle: '服務團隊 - Heaven Spa',
      sectionTitle: '服務團隊',
      sectionSubtitle: 'OUR TEAM',
      noData: '暫無資料',
      noDataDescription: '目前沒有團隊成員資訊',
      schedule: '工作班表',
      personalInfo: '個人資訊',
      height: '身高',
      weight: '體重',
      experience: '年資',
      age: '年齡',
      years: '年',
      yearsOld: '歲',
      bmi: 'BMI 指數',
      introduction: '自我介紹',
      noIntroduction: '這位成員目前沒有詳細介紹。',
      thumbnail: '縮圖',
      viewDetails: '前往查看',
    },

    // Schedule Section
    schedule: {
      monday: '星期一',
      tuesday: '星期二',
      wednesday: '星期三',
      thursday: '星期四',
      friday: '星期五',
      saturday: '星期六',
      sunday: '星期日',
      rest: '休息',
    },

    // Course Section
    course: {
      title: 'COURSE',
      subtitle: '服務介紹',
      button: '服務介紹',
    },

    // Courses Section
    courses: {
      'service-intro': '服務介紹',
    },

    // News Section
    news: {
      'more-news': '更多最新消息..',
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
      'rights-reserved': '版權所有',
      'legal-policies': '法律與政策',
      'privacy-policy': '隱私權政策',
      'terms-of-service': '服務條款',
    },

    // Intro Section
    intro: {
      headline: '致力成為世界一流的製造服務整合者與持續成長的永續經營企業',
      description: '聚陽擁有嚴謹管理思維、豐富產業及行銷經驗、彈性產區佈局、創新設計研發、全球資訊整合，市場趨勢分析等多項能力，使聚陽成為台灣成衣界領航者，亦是美、日、歐、台各大服飾品牌與零售業者主要合作夥伴，在全球成衣產業價值鏈中取得關鍵地位。',
    },

    // Careers Page
    careers: {
      title: '人才招募',
      subtitle: 'Contact Us',
      headline: '不要猶豫與我們聯繫。',
      description: '誠徵指油壓Spa夥伴 (無經驗可，有經驗佳)',
      requirements: {
        freedom: '如果你熱愛自由、享受生活',
        dreams: '如果你對生活有理想與抱負',
        hardwork: '如果你不怕吃苦',
        quality: '如果你講究生活',
        detail: '如果你作事細心',
        responsibility: '如果你認真負責',
      },
      conclusion: '――你就是我們要的人選之人',
      contact: {
        title: '聯絡我們',
        description: '歡迎您加入我們的團隊！如有任何疑問，請隨時與我們聯繫。',
        sayHello: 'Say Hello',
        location: 'Location',
        resume: '個人簡歷',
      },
      mapTitle: '我們的位置',
      form: {
        name: '中文姓名',
        namePlaceholder: '請輸入中文姓名',
        phone: '行動電話',
        phonePlaceholder: '0912-345-678',
        email: '電子信箱',
        emailPlaceholder: 'example@email.com',
        height: '身高 (cm)',
        heightPlaceholder: '160',
        weight: '體重 (kg)',
        weightPlaceholder: '50',
        social: '聯絡方式',
        socialPlaceholder: '請輸入 Facebook 或 Instagram 帳號',
        birthday: '出生日期',
        address: '居住地址',
        addressPlaceholder: '請輸入完整地址',
        submit: '提交申請',
        submitting: '處理中...',
        successMessage: '申請已成功提交！我們會盡快與您聯繫。',
        errorMessage: '提交失敗，請稍後再試。',
      },
    },

    // FAQ Section
    faq: {
      title: '常見問題',
      subtitle: 'FAQ',
      categories: {
        reservation: '預約問題',
        spa: 'Spa問題',
        hair_removal: '除毛服務',
        recruitment: '人才招募',
      },
      empty: {
        title: '暫無內容',
        description: '目前此分類下沒有常見問題資料，請稍後再試或選擇其他分類。',
      },
    },

    // 其他
    contact: 'CONTACT',
  },
  en: {
    // Navigation Menu
    nav: {
      home: 'Home',
      about: 'About Us',
      news: 'News',
      services: 'Services',
      courses: 'Services',
      team: 'Our Team',
      products: 'Essential Oils',
      guide: 'Customer Guide',
      faq: 'FAQ',
      careers: 'Join Us',
      recruitment: 'Recruitment',
      training: 'Technical Training',
      booking: 'Book Now',
      contact: 'Contact Us',
      business_partnership: 'Business Partnership',
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
      'more-members': 'More...',
      pageTitle: 'Service Team - Heaven Spa',
      sectionTitle: 'Service Team',
      sectionSubtitle: 'OUR TEAM',
      noData: 'No Data',
      noDataDescription: 'Currently no team member information available',
      schedule: 'Work Schedule',
      personalInfo: 'Personal Information',
      height: 'Height',
      weight: 'Weight',
      experience: 'Experience',
      age: 'Age',
      years: 'years',
      yearsOld: 'years old',
      bmi: 'BMI Index',
      introduction: 'Self Introduction',
      noIntroduction: 'This member currently has no detailed introduction.',
      thumbnail: 'Thumbnail',
      viewDetails: 'View Details',
    },

    // Schedule Section
    schedule: {
      monday: 'Monday',
      tuesday: 'Tuesday',
      wednesday: 'Wednesday',
      thursday: 'Thursday',
      friday: 'Friday',
      saturday: 'Saturday',
      sunday: 'Sunday',
      rest: 'Rest',
    },

    // Course Section
    course: {
      title: 'COURSE',
      subtitle: 'Course Introduction',
      button: 'Learn More',
    },

    // Courses Section
    courses: {
      'service-intro': 'Service Introduction',
    },

    // News Section
    news: {
      'more-news': 'More...',
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
      'rights-reserved': 'All Rights Reserved',
      'legal-policies': 'Legal & Policies',
      'privacy-policy': 'Privacy Policy',
      'terms-of-service': 'Terms of Service',
    },

    // Intro Section
    intro: {
      headline: 'Committed to becoming a world-class manufacturing service integrator and a sustainable business enterprise with continuous growth',
      description: 'With rigorous management thinking, rich industry and marketing experience, flexible regional layout, innovative design and development, global information integration, market trend analysis and other capabilities, we have become the leader in Taiwan\'s garment industry and the main partner of major fashion brands and retailers in the United States, Japan, Europe and Taiwan, occupying a key position in the global garment industry value chain.',
    },

    // Careers Page
    careers: {
      title: 'Recruitment',
      subtitle: 'Contact Us',
      headline: "Don't hesitate to contact us.",
      description: 'Recruiting oil pressure spa partners (no experience required, experience preferred)',
      requirements: {
        freedom: 'If you love freedom and enjoy life',
        dreams: 'If you have ideals and aspirations for life',
        hardwork: 'If you are not afraid of hardship',
        quality: 'If you value quality of life',
        detail: 'If you are meticulous in your work',
        responsibility: 'If you are serious and responsible',
      },
      conclusion: '――You are the person we are looking for',
      contact: {
        title: 'Contact Us',
        description: 'Welcome to join our team! If you have any questions, please feel free to contact us at any time.',
        sayHello: 'Say Hello',
        location: 'Location',
        resume: 'Resume',
      },
      mapTitle: 'Our Location',
      form: {
        name: 'Chinese Name',
        namePlaceholder: 'Please enter your Chinese name',
        phone: 'Mobile Phone',
        phonePlaceholder: '0912-345-678',
        email: 'Email',
        emailPlaceholder: 'example@email.com',
        height: 'Height (cm)',
        heightPlaceholder: '160',
        weight: 'Weight (kg)',
        weightPlaceholder: '50',
        social: 'Contact Method',
        socialPlaceholder: 'Please enter your Facebook or Instagram account',
        birthday: 'Date of Birth',
        address: 'Residential Address',
        addressPlaceholder: 'Please enter complete address',
        submit: 'Submit Application',
        submitting: 'Processing...',
        successMessage: 'Application submitted successfully! We will contact you soon.',
        errorMessage: 'Submission failed, please try again later.',
      },
    },

    // FAQ Section
    faq: {
      title: 'Frequently Asked Questions',
      subtitle: 'FAQ',
      categories: {
        reservation: 'Reservation',
        spa: 'Spa Services',
        hair_removal: 'Hair Removal',
        recruitment: 'Recruitment',
      },
      empty: {
        title: 'No Content Available',
        description: 'There are currently no FAQ items in this category. Please try again later or select another category.',
      },
    },

    // Others
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
=======
// 動態載入語系資料
async function loadTranslations(locale: string): Promise<NestedTranslation> {
  try {
    if (locale === 'zh-TW') {
      return await import('@/locales/zh-TW/index.json').then(m => m.default)
    } else if (locale === 'en') {
      return await import('@/locales/en/index.json').then(m => m.default)
>>>>>>> 4b24745840b0d08e49c055c897cc4c46c9f4dd90
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

<<<<<<< HEAD
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

  // 強制重新檢查 cookie 是否設定成功（用於調試）
  console.log('Language set to:', locale)
  console.log('Cookie set:', document.cookie.includes(`locale=${locale}`))

  // 觸發自定義事件通知語言變更
  window.dispatchEvent(new CustomEvent('localechange', { detail: locale }))
=======
// 簡化版本，直接支持路徑查詢
export async function nt(key: string): Promise<string> {
  const locale = getLocale()
  const translations = await loadTranslations(locale)
  const path = key.split('.')
  const value = getNestedValue(translations, path)
  return typeof value === 'string' ? value : key
>>>>>>> 4b24745840b0d08e49c055c897cc4c46c9f4dd90
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
