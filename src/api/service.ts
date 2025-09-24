import { gql, graphQLAPI } from '@/api/index'

export interface ServiceDetail {
  id: string
  title: string
  content_1: string
  content_2: string
  content_3: string
  content_4: string
  cover: string
  category: {
    title: string
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
    listing_price: number
    minutes: number
    title: string
    hall_count: number
    description: string
  }>
}

export interface ServiceDetailResponse {
  service: ServiceDetail
}

export async function getServiceDetail(id: number): Promise<ServiceDetailResponse> {
  try {
    const res = await graphQLAPI<ServiceDetailResponse>(gql`
      query MyQuery($id: Int!) {
        service(id: $id) {
          category {
            title
          }
          content_1
          content_2
          content_3
          content_4
          cover
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
            listing_price
            minutes
            title
            hall_count
            description
          }
        }
      }
    `, {
      variables: { id }
    })

    return res
  } catch (error) {
    console.error('Error fetching service detail:', error)
    // 返回空結果作為後備
    throw new Error(`Service with id ${id} not found`)
  }
}