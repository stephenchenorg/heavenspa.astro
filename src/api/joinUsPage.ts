import { gql, graphQLAPI } from '@/api/index'

export interface Position {
  cover: {
    desktop: string
    desktop_blur: string
    mobile: string
    mobile_blur: string
  }
  title: string
  requirements: string
  description: string
}

export interface Faq {
  id: string
  content: string
  title: string
  status: string
}

export interface CompanySetting {
  address_1: string
  address_2: string
  description: string
  email_1: string
  email_2: string
  fb_link: string
  ig_link: string
  lang: string
  line_link: string
  whatsapp_link: string
  twitter_link: string
  threads_link: string
  logo: string
  name: string
  phone_1: string
  phone_2: string
  tg_link: string
  vat: string
  payment_method: string
  business_hours: string
}

export interface JoinUsPageData {
  positions: Position[]
  companySetting: CompanySetting
  faqs: Faq[]
}

interface JoinUsPageResponse {
  positions: {
    data: Position[]
  }
  companySetting: CompanySetting
  faqs: {
    data: Faq[]
  }
}

export async function getJoinUsPageData(): Promise<JoinUsPageData> {
  const response = await graphQLAPI<JoinUsPageResponse>(gql`
    query GetJoinUsPageData($faqType: Int!, $sortBy: String!, $sortColumn: String!) {
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

      companySetting {
        address_1
        address_2
        description
        email_1
        email_2
        fb_link
        ig_link
        lang
        line_link
        whatsapp_link
        twitter_link
        threads_link
        logo
        name
        phone_1
        phone_2
        tg_link
        vat
        payment_method
        business_hours
      }

      faqs(sort_by: $sortBy, sort_column: $sortColumn, type: $faqType) {
        data {
          id
          content
          title
          status
        }
      }
    }
  `, {
    variables: {
      faqType: 40,
      sortBy: 'asc',
      sortColumn: 'sort',
    },
  })

  return {
    positions: response.positions?.data || [],
    companySetting: response.companySetting,
    faqs: response.faqs?.data || [],
  }
}
