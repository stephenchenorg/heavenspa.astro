import type { Article } from '@/api/articles'
import type { Partnership } from '@/api/partnerships'
import type { ServiceCategory } from '@/api/serviceCategories'
import type { TeamMember } from '@/types'
import { gql, graphQLAPI } from '@/api/index'

export interface SitemapData {
  articles: Article[]
  partnerships: Partnership[]
  serviceCategories: ServiceCategory[]
  teamMembers: TeamMember[]
}

interface SitemapResponse {
  articles: {
    data: any[]
  }
  partnerships: {
    data: Partnership[]
  }
  serviceCategories: {
    data: ServiceCategory[]
  }
  teams: {
    data: TeamMember[]
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

export async function getSitemapData(): Promise<SitemapData> {
  const response = await graphQLAPI<SitemapResponse>(gql`
    query GetSitemapData {
      articles {
        data {
          id
          slug
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
      }

      partnerships {
        data {
          id
          slug
          title
          sub_title
          content
          cover {
            desktop
            desktop_blur
            mobile
            mobile_blur
          }
          started_at
          ended_at
          created_at
          tags {
            data {
              id
              title
            }
          }
        }
      }

      serviceCategories {
        data {
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
          description
          sub_title
          title
          id
          slug
        }
      }

      teams(sort_by: "asc", sort_column: "sort", is_hottest: false) {
        data {
          content
          id
          slug
          images {
            created_at
            id
            image {
              desktop
              desktop_blur
              mobile
              mobile_blur
            }
          }
          job
          title
        }
      }
    }
  `)

  // Transform articles data with date formatting
  const formattedArticles = (response.articles?.data || []).map((article: any) => {
    const dateInfo = formatArticleDate(article.started_at || article.created_at)
    return {
      id: article.id,
      slug: article.slug,
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
    articles: formattedArticles,
    partnerships: response.partnerships?.data || [],
    serviceCategories: response.serviceCategories?.data || [],
    teamMembers: response.teams?.data || [],
  }
}
