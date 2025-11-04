export interface Company {
  id: number
  name: string
  description?: string
  address?: string
  phone?: string
  email?: string
  website?: string
  business_hours?: string
  facebook?: string
  instagram?: string
  youtube?: string
  linkedin?: string
  logo: string // 建議尺寸: 120x40px (3:1)
  // 額外的屬性
  address_1?: string
  phone_1?: string
  email_1?: string
  payment_method?: string
  fb_link?: string
  ig_link?: string
  line_link?: string
  twitter_link?: string
  tg_link?: string
  threads_link?: string
}

export interface CompanySetting {
  companySetting: Company
}

export type CompanySettingData = Company

// Type updated for better compatibility
