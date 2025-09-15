import { gql, graphQLAPI } from '@/api/index'

// 使用 Map 來存儲不同語言的快取
const faqCache = new Map<string, any>()
const categoryCache = new Map<string, any>()

export async function getFaqCategories(lang?: string) {
  const cacheKey = lang || 'default'

  if (categoryCache.has(cacheKey)) {
    return categoryCache.get(cacheKey)
  }

  const res = await graphQLAPI(gql`
    query GetFaqCategories($sortBy: String!, $sortColumn: String!) {
      faqCategories(sort_by: $sortBy, sort_column: $sortColumn) {
        data {
          id
          title
        }
      }
    }
  `, {
    variables: {
      sortBy: 'asc',
      sortColumn: 'sort',
    },
    locale: lang,
  })

  const categories = res.faqCategories?.data || []
  categoryCache.set(cacheKey, categories)
  return categories
}

export async function getFaqList(type = 10, lang?: string) {
  const cacheKey = `${type}-${lang || 'default'}`

  if (faqCache.has(cacheKey)) {
    return faqCache.get(cacheKey)
  }

  const res = await graphQLAPI(gql`
    query GetFaqList($type: Int!, $sortBy: String!, $sortColumn: String!) {
      faqs(sort_by: $sortBy, sort_column: $sortColumn, type: $type) {
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
      type,
      sortBy: 'asc',
      sortColumn: 'sort',
    },
    locale: lang,
  })

  const faqList = res.faqs?.data || []
  faqCache.set(cacheKey, faqList)
  return faqList
}
