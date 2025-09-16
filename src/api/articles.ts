import { gql, graphQLAPI } from '@/api/index'

export interface Article {
  id: number
  title: string
  cover: string
  content: string
  ended_at: string
  started_at: string
  created_at: string
  date?: string
  year?: string
  month?: string
}

export interface ArticlesResponse {
  articles: {
    data: Article[]
    has_more_pages: boolean
    last_page: number
    per_page: number
    to: number
    total: number
    from: number
  }
}

export async function getArticles(): Promise<Article[]> {
  const res = await graphQLAPI(gql`
    query MyQuery {
      articles{
        data {
          id
          content
          cover
          ended_at
          title
          started_at
          created_at
        }
        has_more_pages
        last_page
        per_page
        to
        total
        from
      }
    }
  `)

  // 將 API 資料轉換為 Article 格式
  return (res.articles.data || []).map((article: Article, index: number) => {
    const createdDate = article.started_at || article.created_at
    const normalized = createdDate?.replace(' ', 'T') || createdDate
    const d = new Date(normalized)
    return {
      id: article.id || (index + 1), // 優先使用 API 的 id，否則使用 index + 1
      title: article.title,
      cover: article.cover,
      content: article.content,
      ended_at: article.ended_at,
      started_at: d.toISOString().slice(0, 10),
      created_at: d.toISOString().slice(0, 10),
      date: d.getDate().toString().padStart(2, '0'),
      year: d.getFullYear().toString(),
      month: (d.getMonth() + 1).toString().padStart(2, '0'),
    }
  })
}
export async function getArticle(id: string): Promise<Article> {
  const res = await graphQLAPI(gql`
    query GetArticle($id: Int!) {
        article(id: $id) {
          id
          title
          content
          cover
          ended_at
          started_at
          created_at
        }
      }
  `, {
    variables: { id: Number.parseInt(id) },
  })
  const createdDate = res.article.started_at || res.article.created_at
  const normalized = createdDate?.replace(' ', 'T') || createdDate
  const d = new Date(normalized)

  return {
    id: res.article.id,
    title: res.article.title,
    cover: res.article.cover,
    content: res.article.content,
    ended_at: res.article.ended_at,
    started_at: d.toISOString(),
    created_at: d.toISOString(),
    date: d.getDate().toString().padStart(2, '0'),
    year: d.getFullYear().toString(),
    month: (d.getMonth() + 1).toString().padStart(2, '0'),
  }
}
