import { gql, graphQLAPI } from '@/api/index'

let cache: any = null

export async function getCompanySetting() {
  if (cache) return cache

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
    }
  }
`)
  cache = res.companySetting
  return cache
}
