import type { ServiceCategoriesResponse, ServiceCategory } from '@/api/serviceCategories'
import type { Service, ServicesResponse } from '@/api/services'
import { gql, graphQLAPI } from '@/api/index'

export interface ServicesCategoryPageData {
  serviceCategories: ServiceCategoriesResponse
  services: ServicesResponse
}

interface ServicesCategoryPageResponse {
  serviceCategories: {
    data: ServiceCategory[]
  }
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

export async function getServicesCategoryPageData(
  categoryId: number,
  page: number = 1,
  perPage: number = 10,
  search: string = ''
): Promise<ServicesCategoryPageData> {
  const response = await graphQLAPI<ServicesCategoryPageResponse>(gql`
    query GetServicesCategoryPageData($category_id: Int, $page: Int, $per_page: Int, $search: String) {
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

  return {
    serviceCategories: {
      serviceCategories: {
        data: response.serviceCategories?.data || [],
      },
    },
    services: {
      services: response.services,
    },
  }
}
