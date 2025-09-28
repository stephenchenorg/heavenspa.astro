import { gql, graphQLAPI } from '@/api/index'

export interface BannerImage {
  desktop: string
  desktop_blur: string
  mobile: string
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
