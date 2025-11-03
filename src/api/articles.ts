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
  background: {
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
  tags?: Tags[]
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

function formatArticleDate(dateStr: string) {
  const normalized = dateStr?.replace(' ', 'T') || dateStr
  const d = new Date(normalized)
  return {
    iso: d.toISOString(),
    date: d.toISOString().slice(0, 10),
    day: d.getDate().toString().padStart(2, '0'),
    year: d.getFullYear().toString(),
    month: (d.getMonth() + 1).toString().padStart(2, '0'),
  }
}

export async function getArticles(page: number = 1, perPage: number = 12): Promise<ArticlesResponse> {
  try {
    const res = await graphQLAPI(gql`
      query GetArticles($page: Int, $per_page: Int) {
        articles(page: $page, per_page: $per_page) {
          data {
            id
            content
            cover {
              desktop
              desktop_blur
              mobile
              mobile_blur
            }
            background {
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
              id
              title
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
        page,
        per_page: perPage,
      },
    })

    const formattedArticles = (res.articles?.data || []).map((article: Article) => {
      const dateInfo = formatArticleDate(article.started_at)
      return {
        id: article.id,
        title: article.title,
        author: article.author,
        cover: article.cover,
        background: article.background,
        content: article.content,
        ended_at: article.ended_at,
        started_at: dateInfo.date,
        created_at: dateInfo.date,
        date: dateInfo.day,
        year: dateInfo.year,
        month: dateInfo.month,
        tags: article.tags,
        images: article.images,
      }
    })

    return {
      articles: {
        data: formattedArticles,
        has_more_pages: res.articles?.has_more_pages || false,
        last_page: res.articles?.last_page || 1,
        per_page: res.articles?.per_page || perPage,
        to: res.articles?.to || 0,
        total: res.articles?.total || 0,
        from: res.articles?.from || 0,
      },
    }
  } catch (error) {
    console.error('Failed to fetch articles:', error)
    return {
      articles: {
        data: [],
        has_more_pages: false,
        last_page: 1,
        per_page: perPage,
        to: 0,
        total: 0,
        from: 0,
      },
    }
  }
}
export async function getRelatedArticles(tagIds: number[]): Promise<Article[]> {
  const res = await graphQLAPI(gql`
    query GetRelatedArticles($unionTags: [Int!]) {
      articles(union_tags: $unionTags) {
        data {
          id
          content
          cover {
            desktop
            desktop_blur
            mobile
            mobile_blur
          }
          background {
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
            id
            title
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

  return (res.articles.data || []).map((article: Article) => {
    const dateInfo = formatArticleDate(article.started_at)
    return {
      id: article.id,
      title: article.title,
      author: article.author,
      cover: article.cover,
      background: article.background,
      content: article.content,
      ended_at: article.ended_at,
      started_at: dateInfo.date,
      created_at: dateInfo.date,
      date: dateInfo.day,
      year: dateInfo.year,
      month: dateInfo.month,
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

  const formatArticle = (article: any): Article | null => {
    if (!article) return null
    const dateInfo = formatArticleDate(article.started_at)

    return {
      id: article.id,
      title: article.title,
      author: article.author,
      cover: article.cover,
      background: article.background,
      content: article.content,
      ended_at: article.ended_at,
      started_at: dateInfo.iso,
      created_at: dateInfo.iso,
      date: dateInfo.day,
      year: dateInfo.year,
      month: dateInfo.month,
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
          cover {
            desktop
            desktop_blur
            mobile
            mobile_blur
          }
          background {
            desktop
            desktop_blur
            mobile
            mobile_blur
          }
          ended_at
          started_at
          created_at
          tags {
            id
            title
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

    if (!res.article) {
      return null
    }

    const dateInfo = formatArticleDate(res.article.started_at)

    return {
      id: res.article.id,
      title: res.article.title,
      author: res.article.author,
      cover: res.article.cover,
      background: res.article.background,
      content: res.article.content,
      ended_at: res.article.ended_at,
      started_at: dateInfo.iso,
      created_at: dateInfo.iso,
      date: dateInfo.day,
      year: dateInfo.year,
      month: dateInfo.month,
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
    if (import.meta.env.DEV) {
      console.error(`Error fetching article ${id}:`, error)
    }
    return null
  }
}

export interface ArticlePageData {
  article: Article | null
  relatedArticles: Article[]
}

export async function getArticlePageData(id: string): Promise<ArticlePageData> {
  try {
    // First fetch the article to get tag IDs
    const article = await getArticle(id)

    if (!article) {
      return {
        article: null,
        relatedArticles: [],
      }
    }

    // Then fetch related articles based on tag IDs
    const tagIds = article.tags?.map(tag => Number(tag.id)) || []
    const relatedArticles = tagIds.length > 0 ? await getRelatedArticles(tagIds) : []

    return {
      article,
      relatedArticles,
    }
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error(`Error fetching article page data for ${id}:`, error)
    }
    return {
      article: null,
      relatedArticles: [],
    }
  }
}
