import { gql, graphQLAPI } from '@/api/index'

export interface PositionImage {
  desktop: string
  desktop_blur: string
  mobile: string
  mobile_blur: string
}

export interface Position {
  title: string
  description: string
  requirements: string
  cover: PositionImage
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

export interface PositionData {
  positions: {
    data: Position[]
  }
}

export async function getPositionData(): Promise<Position[]> {
  const result = await graphQLAPI<PositionData>(gql`
    query MyQuery {
      positions {
        data {
          cover {
            desktop
            desktop_blur
            mobile
            mobile_blur
          }
          title
          requirements
          description
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
  return result.positions?.data || []
}
