export interface CompanySettingData {
  address_1: string
  address_2: string
  description: string
  email_1: string
  email_2: string
  fb_link: string
  ig_link: string
  lang: string
  line_link: string
  whatsapp_link: string
  twitter_link: string
  threads_link: string
  logo: string // 建議尺寸: 電腦版 240x80px (3:1)，手機版 120x40px (3:1)
  name: string
  phone_1: string
  phone_2: string
  tg_link: string
  vat: string
  payment_method: string
  business_hours: string
}

export interface CompanySetting {
  companySetting: CompanySettingData
}
