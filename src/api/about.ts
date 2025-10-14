import { gql, graphQLAPI } from '@/api/index'

export interface AboutImage {
  desktop: string
  desktop_blur: string
  mobile: string
  mobile_blur: string
}

export interface About {
  content_1: string
  content_2: string
  content_3: string
  cover: AboutImage
  cta_link: string
  cta_title: string
  image: AboutImage
  title_1: string
  title_2: string
}

export interface AboutImageData {
  image: AboutImage
}

export interface AboutData {
  about: About
  aboutImages: {
    data: AboutImageData[]
  }
}

export async function getAboutData(): Promise<AboutData> {
  const res = await graphQLAPI<{ about: About; aboutImages: { data: AboutImageData[] } }>(gql`
    query MyQuery {
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
    }
  `)

  return {
    about: res.about,
    aboutImages: res.aboutImages,
  }
}