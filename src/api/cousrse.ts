import { gql, graphQLAPI } from '@/api/index'

export interface Image {
  desktop: string
  desktop_blur: string
  mobile: string
  mobile_blur: string
}

export interface Course {
  id: number
  title: string
  subtitle: string
  description: string
  created_at: string
  cover: Image
}

export async function getCourse(): Promise<Course[]> {
  const res = await graphQLAPI(gql`
    query MyQuery {
      courses {
        data {
          id
          title
          subtitle
          description
          created_at
          cover {
            desktop
            desktop_blur
            mobile
            mobile_blur
          }
        }
      }
    }
  `)

  return res.course?.data || []
}
