/**
 * SEO Configuration
 * 集中管理所有頁面的 SEO 和 Open Graph 設定（支援多語系）
 */

// SeoConfig 用於配置文件，不包含 canonical（因為 canonical 是動態生成的）
// 只包含必要的 SEO 欄位
interface SeoConfig {
  title: string
  seo_title: string
  seo_description: string
  seo_keyword?: string
  og_title: string
  og_description: string
  og_image: string
  // 後台可選欄位
  seo_head?: string
  seo_body?: string
  seo_json_ld?: string
}

type Locale = 'zh_TW' | 'en'

// 預設 OG 圖片
export const DEFAULT_OG_IMAGE = '/images/about/about1.jpg'

// 網站基礎 URL
export const SITE_URL = 'https://dev-www.heavenspa.com.tw'

/**
 * 生成 canonical URL
 * @param path - 頁面路徑（例如：'/about', '/services/1/items/2'）
 * @param locale - 語系（'zh_TW' 或 'en'）
 * @returns 完整的 canonical URL
 */
export function getCanonicalUrl(path: string, locale: Locale = 'zh_TW'): string {
  // 移除路徑開頭的斜線（如果有的話）
  const cleanPath = path.startsWith('/') ? path.slice(1) : path

  // 如果是預設語系（zh_TW），不加語系前綴
  if (locale === 'zh_TW') {
    return `${SITE_URL}/${cleanPath}`
  }

  // 其他語系加上語系前綴
  return `${SITE_URL}/${locale}/${cleanPath}`
}

/**
 * SEO 設定（多語系）
 */
export const SEO_CONFIG: Record<Locale, Record<string, SeoConfig>> = {
  // 中文版本
  zh_TW: {
    // 首頁
    home: {
      title: '極致放鬆體驗',
      seo_title: '享天堂 - 極致放鬆體驗 | 專業 SPA 養生會館',
      seo_description: '享天堂 提供專業的 SPA 服務、美容護理、養生療程，讓您享受極致放鬆體驗。專業團隊、頂級設備、舒適環境，為您打造完美的身心靈放鬆時光。',
      seo_keyword: '享天堂, SPA, 養生會館, 美容護理, 按摩, 放鬆, 身心靈, 紓壓',
      og_title: '享天堂 - 極致放鬆體驗',
      og_description: '享天堂 提供專業的 SPA 服務，讓您享受極致放鬆體驗。',
      og_image: DEFAULT_OG_IMAGE,
    },

    // 關於我們
    about: {
      title: '關於我們',
      seo_title: '關於我們 - 享天堂 | 品牌故事與服務理念',
      seo_description: '了解 享天堂 的品牌故事、服務理念和專業團隊。我們致力於提供最優質的 SPA 服務，讓每位顧客享受極致放鬆體驗。',
      seo_keyword: '享天堂, 關於我們, 品牌故事, 服務理念, SPA會館, 專業團隊',
      og_title: '關於我們 - 享天堂',
      og_description: '了解 享天堂 的品牌故事、服務理念和專業團隊。',
      og_image: DEFAULT_OG_IMAGE,
    },

    // 服務項目
    services: {
      title: '服務項目',
      seo_title: '服務項目 - 享天堂 | SPA 療程與美容護理',
      seo_description: '探索 享天堂 的專業服務項目，包括各式 SPA 療程、美容護理、身體保養、臉部護理等，提供客製化的專業服務，滿足您的需求。',
      seo_keyword: '享天堂, 服務項目, SPA療程, 美容護理, 身體保養, 臉部護理, 按摩服務',
      og_title: '服務項目 - 享天堂',
      og_description: '探索 享天堂 的專業服務項目，包括各式 SPA 療程、美容護理等。',
      og_image: DEFAULT_OG_IMAGE,
    },

    // 團隊介紹
    team: {
      title: '團隊介紹',
      seo_title: '團隊介紹 - 享天堂 | 專業美容團隊',
      seo_description: '認識 享天堂 的專業團隊，擁有豐富經驗的美容師、芳療師為您提供最優質的服務。每位團隊成員都經過專業訓練與認證。',
      seo_keyword: '享天堂, 團隊介紹, 專業美容師, 芳療師, 專業團隊, 美容專家',
      og_title: '團隊介紹 - 享天堂',
      og_description: '認識 享天堂 的專業團隊，擁有豐富經驗的美容師為您服務。',
      og_image: DEFAULT_OG_IMAGE,
    },

    // 最新消息
    news: {
      title: '最新消息',
      seo_title: '最新消息 - 享天堂 | 促銷活動與健康資訊',
      seo_description: '了解 享天堂 的最新消息、促銷活動和健康資訊，掌握最新動態，享受專屬優惠。',
      seo_keyword: '享天堂, 最新消息, 促銷活動, 健康資訊, SPA優惠',
      og_title: '最新消息 - 享天堂',
      og_description: '了解 享天堂 的最新消息、促銷活動和健康資訊，掌握最新動態，享受專屬優惠。',
      og_image: DEFAULT_OG_IMAGE,
    },

    // 異業合作
    businessPartnership: {
      title: '異業合作',
      seo_title: '異業合作 - 享天堂 | 商業合作夥伴',
      seo_description: '了解 享天堂 的異業合作夥伴關係,探索我們與各行業的合作機會,共創雙贏未來。歡迎洽談合作方案。',
      seo_keyword: '享天堂, 異業合作, 商業合作, 合作夥伴, SPA合作, 美容合作, 養生合作',
      og_title: '異業合作 - 享天堂',
      og_description: '了解 享天堂 的異業合作夥伴關係,探索我們與各行業的合作機會,共創雙贏未來。',
      og_image: DEFAULT_OG_IMAGE,
    },

    // 常見問題
    faq: {
      title: '常見問題',
      seo_title: '常見問題 - 享天堂 | 常見問題解答',
      seo_description: '查看 享天堂 的常見問題解答，包含預約流程、SPA服務、除毛服務等詳細資訊，解答您的疑問。',
      seo_keyword: '享天堂, 常見問題, FAQ, 預約流程, SPA服務, 除毛服務',
      og_title: '常見問題 - 享天堂',
      og_description: '查看 享天堂 的常見問題解答，了解我們的服務、預約流程、政策等相關資訊。',
      og_image: DEFAULT_OG_IMAGE,
    },

    // 加入我們
    joinUs: {
      title: '加入我們',
      seo_title: '加入我們 - 享天堂 | 職缺招募',
      seo_description: '加入 享天堂 團隊，與我們一起創造美好的職涯發展。提供完善的培訓制度與發展空間，歡迎有熱忱的您加入。',
      seo_keyword: '享天堂, 加入我們, 職缺, 招募, SPA招募, 美容師招募, 職涯發展',
      og_title: '加入我們 - 享天堂',
      og_description: '加入 享天堂 團隊，與我們一起創造美好的職涯發展。',
      og_image: DEFAULT_OG_IMAGE,
    },

    // 隱私政策
    privacy: {
      title: '隱私政策',
      seo_title: '隱私政策 - 享天堂 | 個人資料保護',
      seo_description: '享天堂 隱私政策說明，了解我們如何收集、使用、保護您的個人資料，以及您的隱私權益。',
      seo_keyword: '享天堂, 隱私政策, 個人資料保護, 隱私權, 資料安全',
      og_title: '隱私政策 - 享天堂',
      og_description: '享天堂 隱私政策說明，了解我們如何保護您的個人資料與隱私權益。',
      og_image: DEFAULT_OG_IMAGE,
    },

    // 服務條款
    terms: {
      title: '服務條款',
      seo_title: '服務條款 - 享天堂 | 使用條款',
      seo_description: '享天堂 服務條款說明，了解使用我們服務的相關規範、權利義務與注意事項。',
      seo_keyword: '享天堂, 服務條款, 使用條款, 服務規範, 權利義務',
      og_title: '服務條款 - 享天堂',
      og_description: '享天堂 服務條款說明，了解使用我們服務的相關規範與條款。',
      og_image: DEFAULT_OG_IMAGE,
    },
  },

  // 英文版本
  en: {
    // Home
    home: {
      title: 'Ultimate Relaxation Experience',
      seo_title: 'Heaven Spa - Ultimate Relaxation Experience | Professional SPA & Wellness',
      seo_description: 'Heaven Spa offers professional SPA services, beauty treatments, and wellness programs for your ultimate relaxation. Expert team, premium facilities, and comfortable environment for your perfect mind-body relaxation.',
      seo_keyword: 'Heaven Spa, SPA, wellness center, beauty treatment, massage, relaxation, mind-body, stress relief',
      og_title: 'Heaven Spa - Ultimate Relaxation Experience',
      og_description: 'Heaven Spa provides professional SPA services for your ultimate relaxation experience.',
      og_image: DEFAULT_OG_IMAGE,
    },

    // About Us
    about: {
      title: 'About Us',
      seo_title: 'About Us - Heaven Spa | Brand Story & Service Philosophy',
      seo_description: 'Learn about Heaven Spa\'s brand story, service philosophy, and professional team. We are dedicated to providing the highest quality SPA services for every customer\'s ultimate relaxation experience.',
      seo_keyword: 'Heaven Spa, about us, brand story, service philosophy, SPA center, professional team',
      og_title: 'About Us - Heaven Spa',
      og_description: 'Learn about Heaven Spa\'s brand story, service philosophy, and professional team.',
      og_image: DEFAULT_OG_IMAGE,
    },

    // Services
    services: {
      title: 'Services',
      seo_title: 'Services - Heaven Spa | SPA Treatments & Beauty Care',
      seo_description: 'Explore Heaven Spa\'s professional services including SPA treatments, beauty care, body treatments, facial care, and more. Customized professional services to meet your needs.',
      seo_keyword: 'Heaven Spa, services, SPA treatments, beauty care, body treatments, facial care, massage services',
      og_title: 'Services - Heaven Spa',
      og_description: 'Explore Heaven Spa\'s professional services, including various SPA treatments and beauty care.',
      og_image: DEFAULT_OG_IMAGE,
    },

    // Team
    team: {
      title: 'Our Team',
      seo_title: 'Our Team - Heaven Spa | Professional Beauty Team',
      seo_description: 'Meet Heaven Spa\'s professional team with experienced beauticians and aromatherapists providing the highest quality service. Every team member is professionally trained and certified.',
      seo_keyword: 'Heaven Spa, our team, professional beauticians, aromatherapists, professional team, beauty experts',
      og_title: 'Our Team - Heaven Spa',
      og_description: 'Meet Heaven Spa\'s professional team with experienced beauticians serving you.',
      og_image: DEFAULT_OG_IMAGE,
    },

    // News
    news: {
      title: 'News',
      seo_title: 'News - Heaven Spa | Promotions & Wellness Information',
      seo_description: 'Stay updated with Heaven Spa\'s latest news, promotions, and wellness information. Get the latest updates and enjoy exclusive offers.',
      seo_keyword: 'Heaven Spa, news, promotions, wellness information, SPA offers',
      og_title: 'News - Heaven Spa',
      og_description: 'Stay updated with Heaven Spa\'s latest news, promotions, and wellness information.',
      og_image: DEFAULT_OG_IMAGE,
    },

    // Business Partnership
    businessPartnership: {
      title: 'Business Partnership',
      seo_title: 'Business Partnership - Heaven Spa | Commercial Partners',
      seo_description: 'Learn about Heaven Spa\'s business partnerships and explore collaboration opportunities across industries for mutual success. Contact us for partnership proposals.',
      seo_keyword: 'Heaven Spa, business partnership, commercial cooperation, partners, SPA partnership, beauty collaboration, wellness cooperation',
      og_title: 'Business Partnership - Heaven Spa',
      og_description: 'Learn about Heaven Spa\'s business partnerships and explore collaboration opportunities across industries.',
      og_image: DEFAULT_OG_IMAGE,
    },

    // FAQ
    faq: {
      title: 'FAQ',
      seo_title: 'FAQ - Heaven Spa | Frequently Asked Questions',
      seo_description: 'View Heaven Spa\'s frequently asked questions including booking process, SPA services, hair removal services, and more detailed information.',
      seo_keyword: 'Heaven Spa, FAQ, frequently asked questions, booking process, SPA services, hair removal services',
      og_title: 'FAQ - Heaven Spa',
      og_description: 'View Heaven Spa\'s frequently asked questions about our services, booking process, and policies.',
      og_image: DEFAULT_OG_IMAGE,
    },

    // Join Us
    joinUs: {
      title: 'Join Us',
      seo_title: 'Join Us - Heaven Spa | Career Opportunities',
      seo_description: 'Join the Heaven Spa team and create a wonderful career development with us. We provide comprehensive training and development opportunities. Welcome passionate individuals to join us.',
      seo_keyword: 'Heaven Spa, join us, careers, recruitment, SPA recruitment, beautician recruitment, career development',
      og_title: 'Join Us - Heaven Spa',
      og_description: 'Join the Heaven Spa team and create a wonderful career development with us.',
      og_image: DEFAULT_OG_IMAGE,
    },

    // Privacy Policy
    privacy: {
      title: 'Privacy Policy',
      seo_title: 'Privacy Policy - Heaven Spa | Personal Data Protection',
      seo_description: 'Heaven Spa\'s privacy policy explains how we collect, use, and protect your personal data, as well as your privacy rights.',
      seo_keyword: 'Heaven Spa, privacy policy, personal data protection, privacy rights, data security',
      og_title: 'Privacy Policy - Heaven Spa',
      og_description: 'Heaven Spa\'s privacy policy explains how we protect your personal data and privacy rights.',
      og_image: DEFAULT_OG_IMAGE,
    },

    // Terms of Service
    terms: {
      title: 'Terms of Service',
      seo_title: 'Terms of Service - Heaven Spa | Terms of Use',
      seo_description: 'Heaven Spa\'s terms of service explain the relevant regulations, rights, obligations, and important notes for using our services.',
      seo_keyword: 'Heaven Spa, terms of service, terms of use, service regulations, rights and obligations',
      og_title: 'Terms of Service - Heaven Spa',
      og_description: 'Heaven Spa\'s terms of service explain the relevant regulations and terms for using our services.',
      og_image: DEFAULT_OG_IMAGE,
    },
  },
}

/**
 * 取得指定頁面的 SEO 設定（支援多語系）
 */
export function getSeoConfig(page: string, locale: Locale = 'zh_TW'): SeoConfig {
  return SEO_CONFIG[locale][page] || SEO_CONFIG[locale].home
}
