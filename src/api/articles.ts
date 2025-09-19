import { gql, graphQLAPI } from '@/api/index'

export interface Tags {
  id: string
  title: string
  slug: string
  key: string
}
export interface Article {
  id: number
  title: string
  author: string
  cover: string
  content: string
  ended_at: string
  started_at: string
  created_at: string
  date?: string
  year?: string
  month?: string
  tags?: {
    data: Tags[]
  }
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
          author
          started_at
          created_at
          tags {
            data {
              id
              title
              slug
              key
            }
          }
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
      author: article.author,
      cover: article.cover,
      content: article.content,
      ended_at: article.ended_at,
      started_at: d.toISOString().slice(0, 10),
      created_at: d.toISOString().slice(0, 10),
      date: d.getDate().toString().padStart(2, '0'),
      year: d.getFullYear().toString(),
      month: (d.getMonth() + 1).toString().padStart(2, '0'),
      tags: article.tags,
    }
  })
}
export async function getRelatedArticles(tagIds: number[]): Promise<Article[]> {
  const res = await graphQLAPI(gql`
    query GetRelatedArticles($intersectTags: [Int!], $unionTags: [Int!],) {
      articles(intersect_tags: $intersectTags, union_tags: $unionTags) {
        data {
          id
          content
          cover
          ended_at
          title
          author
          started_at
          created_at
          tags {
            data {
              id
              title
              slug
              key
            }
          }
        }
        has_more_pages
        last_page
        per_page
        to
        total
        from
      }
    }
  `, {
    variables: {
      intersectTags: tagIds,
      unionTags: tagIds,
    },
  })

  // 將 API 資料轉換為 Article 格式
  return (res.articles.data || []).map((article: Article, index: number) => {
    const createdDate = article.started_at || article.created_at
    const normalized = createdDate?.replace(' ', 'T') || createdDate
    const d = new Date(normalized)
    return {
      id: article.id || (index + 1),
      title: article.title,
      author: article.author,
      cover: article.cover,
      content: article.content,
      ended_at: article.ended_at,
      started_at: d.toISOString().slice(0, 10),
      created_at: d.toISOString().slice(0, 10),
      date: d.getDate().toString().padStart(2, '0'),
      year: d.getFullYear().toString(),
      month: (d.getMonth() + 1).toString().padStart(2, '0'),
      tags: article.tags,
    }
  })
}

export async function getArticle(id: string): Promise<Article> {
  const res = await graphQLAPI(gql`
    query GetArticle($id: Int!) {
        article(id: $id) {
          id
          title
          author
          content
          cover
          ended_at
          started_at
          created_at
          tags {
            data {
              id
              title
              slug
              key
            }
          }
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
    author: res.article.author,
    cover: res.article.cover,
    content: res.article.content,
    ended_at: res.article.ended_at,
    started_at: d.toISOString(),
    created_at: d.toISOString(),
    date: d.getDate().toString().padStart(2, '0'),
    year: d.getFullYear().toString(),
    month: (d.getMonth() + 1).toString().padStart(2, '0'),
    tags: res.article.tags,
  }
}
