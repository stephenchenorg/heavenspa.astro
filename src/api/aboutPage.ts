import type { About, AboutImageData } from '@/api/about'
import type { ServiceCategoriesResponse, ServiceCategory } from '@/api/serviceCategories'
import { gql, graphQLAPI } from '@/api/index'

export interface AboutPageData {
  about: About
  aboutImages: {
    data: AboutImageData[]
  }
  serviceCategories: ServiceCategoriesResponse
}

interface AboutPageResponse {
  about: About
  aboutImages: {
    data: AboutImageData[]
  }
  serviceCategories: {
    data: ServiceCategory[]
  }
}

export async function getAboutPageData(): Promise<AboutPageData> {
  const response = await graphQLAPI<AboutPageResponse>(gql`
    query GetAboutPageData {
      about {
        content_1
        content_2
        content_3
        cover {
          desktop
          desktop_blur
          mobile
          mobile_blur
        }
        cta_link
        cta_title
        image {
          desktop
          desktop_blur
          mobile
          mobile_blur
        }
        title_1
        title_2
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

      aboutImages {
        data {
          image {
            desktop
            desktop_blur
            mobile
            mobile_blur
          }
        }
      }

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

  return {
    about: response.about,
    aboutImages: response.aboutImages,
    serviceCategories: {
      serviceCategories: {
        data: response.serviceCategories?.data || [],
      },
    },
  }
}
