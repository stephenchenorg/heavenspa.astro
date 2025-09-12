// Team 相關的 API 回應類型定義

export interface TeamTag {
  id: number
  title: string
  slug: string
}

export interface TeamCover {
  desktop: string
  desktop_blur: string
  mobile: string
  mobile_blur: string
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

export interface TeamCategory {
  title: string
}

export interface TeamMember {
  id: number
  title: string
  category: TeamCategory
  cover: TeamCover
  images: TeamImageItem[]
  image: TeamImage
  tags: { data: TeamTag[] }
}

export interface TeamsResponse {
  teams: {
    data: TeamMember[]
  }
}

export interface TagsResponse {
  tags: {
    from?: string
    to?: string
    data: TeamTag[]
  }
}