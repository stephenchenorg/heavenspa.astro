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

export interface CompanySetting {
  companySetting: CompanySettingData
}
