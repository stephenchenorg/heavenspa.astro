import { gql, graphQLAPI } from '@/api/index'

export interface ServiceDetail {
  id: string
  title: string
  content_1: string
  content_2: string
  content_3: string
  content_4: string
  service_category_id: string
  background: {
    desktop: string
    desktop_blur: string
    mobile: string
    mobile_blur: string
  }
  cover: {
    desktop: string
    desktop_blur: string
    mobile: string
    mobile_blur: string
  }
  category: {
    id: string
    title: string
    slug: string
  }
  images: Array<{
    image: {
      desktop: string
      desktop_blur: string
      mobile: string
      mobile_blur: string
    }
  }>
  specifications: Array<{
    selling_price: number
    minutes: number
    title: string
    hall_count: number
    description: string
  }>
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

export interface ServiceDetailResponse {
  service: ServiceDetail
}

export async function getServiceDetail(id: number): Promise<ServiceDetailResponse> {
  try {
    return await graphQLAPI<ServiceDetailResponse>(gql`
      query MyQuery($id: Int!) {
        service(id: $id) {
          category {
            id
            title
            slug
          }
          service_category_id
          background {
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
          content_1
          content_2
          content_3
          content_4
          id
          images {
            image {
              desktop
              desktop_blur
              mobile
              mobile_blur
            }
          }
          title
          specifications {
            selling_price
            minutes
            title
            hall_count
            description
          }
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
    `, {
      variables: { id },
    })
  } catch (error) {
    console.error('Error fetching service detail:', error)
    // 返回空結果作為後備
    throw new Error(`Service with id ${id} not found`)
  }
}
