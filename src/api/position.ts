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
        }
      }
    }
  `)
  return result.positions?.data || []
}
