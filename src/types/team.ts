// Team 相關的 API 回應類型定義

export interface TeamTag {
  id: number
  title: string
  slug: string
}

export interface TeamImage {
  desktop: string
  desktop_blur: string
  mobile: string
  mobile_blur: string
}

export interface TeamImageItem {
  created_at: string
  id: number
  image: TeamImage
  updated_at: string
  is_default: boolean
}

export interface TeamMember {
  id: number
  title: string
  job: string
  images: TeamImageItem[]
  image: TeamImage
}

export interface TeamsResponse {
  teams: {
    data: TeamMember[]
  }
}