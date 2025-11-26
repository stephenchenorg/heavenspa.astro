import { gql, graphQLAPI } from '@/api/index'

export async function getCompanySetting() {
  const res = await graphQLAPI(gql`
  query GetCompanySetting {
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
      seo_title
      seo_description
      seo_keyword
      og_title
      og_description
      og_image
      seo_head
      seo_body
      seo_json_ld
    }
  }
`)
  return res.companySetting
}
