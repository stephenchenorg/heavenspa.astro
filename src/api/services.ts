import { gql, graphQLAPI } from '@/api/index'

export interface Service {
  id: string
  title: string
  price_max: number
  price_min: number
  time_max: number
  time_min: number
  cover: {
    desktop: string
    desktop_blur: string
    mobile: string
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

export interface ServicesResponse {
  services: {
    data: Service[]
    has_more_pages: boolean
    last_page: number
    per_page: number
    to: number
    total: number
    from: number
  }
}

export async function getServices(
  categoryId: number,
  page: number = 1,
  perPage: number = 10,
  search: string = ''
): Promise<ServicesResponse> {
  try {
    return await graphQLAPI<ServicesResponse>(gql`
      query GetServices($category_id: Int, $page: Int, $per_page: Int, $search: String) {
        services(category_id: $category_id, page: $page, per_page: $per_page, search: $search) {
          data {
            cover {
              desktop
              desktop_blur
              mobile
              mobile_blur
            }
            id
            title
            price_max
            price_min
            time_max
            time_min
          }
          has_more_pages
          last_page
          per_page
          to
          total
          from
        }
      }
    `, {
      variables: {
        category_id: categoryId,
        page,
        per_page: perPage,
        search: search || '',
      },
    })
  } catch (error) {
    console.error('Error fetching services:', error)
    // 返回空結果作為後備
    return {
      services: {
        data: [],
        has_more_pages: false,
        last_page: 1,
        per_page: perPage,
        to: 0,
        total: 0,
        from: 0,
      },
    }
  }
}
