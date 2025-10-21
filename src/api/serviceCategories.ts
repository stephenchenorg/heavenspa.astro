import { gql, graphQLAPI } from '@/api/index'

export interface ServiceCategory {
  id: string
  title: string
  sub_title: string
  description: string
  cover: {
    desktop: string
    desktop_blur: string
    mobile: string
    mobile_blur: string
  }
  background: {
    desktop: string
    desktop_blur: string
    mobile: string
    mobile_blur: string
  }
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
