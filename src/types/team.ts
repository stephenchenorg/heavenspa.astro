// Team 相關的 API 回應類型定義

export interface TeamTag {
  id: number
  title: string
  slug: string
}

export interface TeamImage {
  desktop: string // 建議尺寸: 1920x1920px (1:1 比例，適合本週推薦與服務團隊)
  desktop_blur: string
  mobile: string // 建議尺寸: 640x640px (1:1 比例，適合手機版本週推薦與服務團隊)
  mobile_blur: string
}

export interface TeamImageItem {
  id: number
  created_at: string
  image: TeamImage
}

export interface TeamMember {
  id: number
  title: string
  job: string
  content?: string
  images: TeamImageItem[]
  // 基本資訊欄位
  age?: number
  height?: number
  weight?: number
  years?: number
  // 營業時間欄位
  monday_start?: string
  monday_end?: string
  tuesday_start?: string
  tuesday_end?: string
  wednesday_start?: string
  wednesday_end?: string
  thursday_start?: string
  thursday_end?: string
  friday_start?: string
  friday_end?: string
  saturday_start?: string
  saturday_end?: string
  sunday_start?: string
  sunday_end?: string
  // SEO 相關欄位
  og_description?: string
  og_image?: string
  og_title?: string
  seo_body?: string
  seo_description?: string
  seo_head?: string
  seo_json_ld?: string
  seo_keyword?: string
  seo_title?: string
}

export interface TeamsResponse {
  teams: {
    data: TeamMember[]
    has_more_pages: boolean
    last_page: number
    per_page: number
    to: number
    total: number
    from: number
  }
}
