import type { ServiceCategoriesResponse, ServiceCategory } from '@/api/serviceCategories'
import { gql, graphQLAPI } from '@/api/index'

export interface About {
  content_1: string
  content_2: string
  content_3: string
  cover: {
    desktop: string
    desktop_blur: string
    mobile: string
    mobile_blur: string
  }
  cta_link: string
  cta_title: string
  image: {
    desktop: string
    desktop_blur: string
    mobile: string
    mobile_blur: string
  }
  title_1: string
  title_2: string
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

export interface AboutImageData {
  image: {
    desktop: string
    desktop_blur: string
    mobile: string
    mobile_blur: string
  }
}

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
