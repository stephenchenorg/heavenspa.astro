import { gql, graphQLAPI } from '@/api/index'

// 使用 Map 來存儲不同語言的快取
let cache = new Map<string, any>()

export async function getCompanySetting(lang?: string) {
  const cacheKey = lang || 'default'

  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)
  }

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
    }
  }
`)
  cache.set(cacheKey, res.companySetting)
  return res.companySetting
}
