import { gql, graphQLAPI } from '@/api/index'

export interface BannerImage {
  desktop: string // 建議尺寸: 1920x1080px (16:9 比例，適合各頁面上方 Banner)
  desktop_blur: string
  mobile: string // 建議尺寸: 640x480px (4:3 比例，適合手機版各頁面上方 Banner)
  mobile_blur: string
}

export interface Banner {
  id: string
  title: string
  sub_title: string
  cta_title: string
  cta_link: string
  image: BannerImage
}

export async function getBanners(): Promise<Banner[]> {
  const res = await graphQLAPI(gql`
    query MyQuery {
      banners(sort_by: "asc", sort_column: "sort") {
        data {
          cta_link
          cta_title
          id
          image {
            desktop
            desktop_blur
            mobile
            mobile_blur
          }
          title
          sub_title
        }
      }
    }
  `)

  return res.banners?.data || []
}
