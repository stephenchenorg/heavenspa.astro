import { gql, graphQLAPI } from '@/api/index'

export interface Tags {
  id: string
  title: string
}
export interface Article {
  id: number
  title: string
  author: string
  cover: {
    desktop: string
    desktop_blur: string
    mobile: string
    mobile_blur: string
  }
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
  images?: Array<{
    image: {
      desktop: string
      desktop_blur: string
      mobile: string
      mobile_blur: string
    }
  }>
  next?: {
    id: number
    title: string
    image: {
      desktop: string
      desktop_blur: string
      mobile: string
      mobile_blur: string
    }
  }
  prev?: {
    id: number
    title: string
    image: {
      desktop: string
      desktop_blur: string
      mobile: string
      mobile_blur: string
    }
  }
  // SEO fields
  seo_title?: string
  seo_description?: string
  seo_keyword?: string
  og_title?: string
  og_description?: string
  og_image?: string
  seo_head?: string
  seo_body?: string
  seo_json_ld?: string
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
          cover{
            desktop
            desktop_blur
            mobile
            mobile_blur
          }
          ended_at
          title
          author
          started_at
          created_at
          tags {
            data {
              id
              title
            }
          }
          images {
            image {
              desktop
              desktop_blur
              mobile
              mobile_blur
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
      images: article.images,
    }
  })
}
export async function getRelatedArticles(tagIds: number[]): Promise<Article[]> {
  const res = await graphQLAPI(gql`
    query GetRelatedArticles($unionTags: [Int!],) {
      articles(union_tags: $unionTags) {
        data {
          id
          content
          cover{
            desktop
            desktop_blur
            mobile
            mobile_blur
          }
          ended_at
          title
          author
          started_at
          created_at
          tags {
            data {
              id
              title
            }
          }
          images {
            image {
              desktop
              desktop_blur
              mobile
              mobile_blur
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
      images: article.images,
    }
  })
}

export async function getAdjacentArticles(currentId: number): Promise<{ previous: Article | null, next: Article | null }> {
  const res = await graphQLAPI(gql`
    query GetAdjacentArticles($currentId: Int!) {
      previousArticle: article(where: { id: { _lt: $currentId } }, orderBy: { id: desc }, first: 1) {
        id
        title
        started_at
        created_at
      }
      nextArticle: article(where: { id: { _gt: $currentId } }, orderBy: { id: asc }, first: 1) {
        id
        title
        started_at
        created_at
      }
    }
  `, {
    variables: { currentId },
  })

  const formatArticle = (article: any) => {
    if (!article) return null
    const createdDate = article.started_at || article.created_at
    const normalized = createdDate?.replace(' ', 'T') || createdDate
    const d = new Date(normalized)

    return {
      id: article.id,
      title: article.title,
      author: article.author,
      cover: article.cover,
      content: article.content,
      ended_at: article.ended_at,
      started_at: d.toISOString(),
      created_at: d.toISOString(),
      date: d.getDate().toString().padStart(2, '0'),
      year: d.getFullYear().toString(),
      month: (d.getMonth() + 1).toString().padStart(2, '0'),
    }
  }

  return {
    previous: formatArticle(res.previousArticle),
    next: formatArticle(res.nextArticle),
  }
}

export async function getArticle(id: string): Promise<Article | null> {
  try {
    const res = await graphQLAPI(gql`
      query GetArticle($id: Int!) {
          article(id: $id) {
            id
            title
            author
            content
            cover{
              desktop
              desktop_blur
              mobile
              mobile_blur
            }
            ended_at
            started_at
            created_at
            tags {
              data {
                id
                title
              }
            }
            images {
              image {
                desktop
                desktop_blur
                mobile
                mobile_blur
              }
            }
            next {
              id
              title
            }
            prev {
              id
              title
            }
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
    `, {
      variables: { id: Number.parseInt(id) },
    })

    // 檢查返回的文章是否存在
    if (!res.article) {
      console.error(`Article with id ${id} not found`)
      return null
    }

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
      images: res.article.images,
      next: res.article.next,
      prev: res.article.prev,
      seo_title: res.article.seo_title,
      seo_description: res.article.seo_description,
      seo_keyword: res.article.seo_keyword,
      og_title: res.article.og_title,
      og_description: res.article.og_description,
      og_image: res.article.og_image,
      seo_head: res.article.seo_head,
      seo_body: res.article.seo_body,
      seo_json_ld: res.article.seo_json_ld,
    }
  } catch (error) {
    console.error(`Error fetching article ${id}:`, error)
    return null
  }
}
