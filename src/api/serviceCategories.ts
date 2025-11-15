import { gql, graphQLAPI } from '@/api/index'

export interface ServiceCategory {
  id: string
  slug: string
  title: string
  sub_title: string
  description: string
  slide: {
    desktop: string // 上滑蓋板 建議尺寸: 1920 x 1080px | 16:9
    desktop_blur: string
    mobile: string // 上滑蓋板 建議尺寸: 800 x 1120px | 5:7
    mobile_blur: string
  }
  cover: {
    desktop: string // 建議尺寸: 1920x960px (2:1 比例，適合首頁服務項目)
    desktop_blur: string
    mobile: string // 建議尺寸: 640x640px (1:1 比例，適合手機版首頁服務項目)
    mobile_blur: string
  }
  background: {
    desktop: string // 建議尺寸: 1920x1080px (16:9 比例，適合「上滑蓋板」與「服務項目 Banner」)
    desktop_blur: string
    mobile: string // 建議尺寸: 640x480px (4:3 比例，適合手機版「上滑蓋板」與「服務項目 Banner」)
    mobile_blur: string
  }
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

export interface ServiceCategoriesResponse {
  serviceCategories: {
    data: ServiceCategory[]
  }
}

export async function getServiceCategories(): Promise<ServiceCategoriesResponse> {
  return await graphQLAPI<ServiceCategoriesResponse>(gql`
    query MyQuery {
      serviceCategories {
        data {
          slide {
            desktop
            desktop_blur
            mobile
            mobile_blur
          }
          cover {
            desktop
            desktop_blur
            mobile
            mobile_blur
          }
          background {
            desktop
            desktop_blur
            mobile
            mobile_blur
          }
          description
          sub_title
          title
          id
          slug
          og_description
          og_image
          og_title
          seo_body
          seo_description
          seo_head
          seo_json_ld
          seo_keyword
          seo_title
        }
      }
    }
  `)
}
