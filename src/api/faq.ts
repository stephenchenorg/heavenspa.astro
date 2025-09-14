import { gql, graphQLAPI } from '@/api/index'

// 使用 Map 來存儲不同語言的快取
let faqCache = new Map<string, any>()
let categoryCache = new Map<string, any>()

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
      sortBy: "asc",
      sortColumn: "sort"
    }
  })

  const categories = res.faqCategories?.data || []
  categoryCache.set(cacheKey, categories)
  return categories
}

export async function getFaqList(categoryId = 1, lang?: string) {
  const cacheKey = `${categoryId}-${lang || 'default'}`

  if (faqCache.has(cacheKey)) {
    return faqCache.get(cacheKey)
  }

  const res = await graphQLAPI(gql`
    query GetFaqList($categoryId: Int!, $sortBy: String!, $sortColumn: String!) {
      faqs(sort_by: $sortBy, sort_column: $sortColumn, category_id: $categoryId) {
        data {
          id
          content
          title
        }
      }
    }
  `, {
    variables: {
      categoryId,
      sortBy: "asc",
      sortColumn: "sort"
    }
  })

  const faqList = res.faqs?.data || []
  faqCache.set(cacheKey, faqList)
  return faqList
}
