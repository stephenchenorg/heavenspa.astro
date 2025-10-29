import type { Article } from '@/api/articles'
import type { Banner } from '@/api/banners'
import type { ServiceCategoriesResponse, ServiceCategory } from '@/api/serviceCategories'
import type { PageData, TeamMember } from '@/types'
import { gql, graphQLAPI } from '@/api/index'

export interface HomepageData {
  banners: Banner[]
  teams: TeamMember[]
  serviceCategories: ServiceCategoriesResponse
  articles: Article[]
  page: PageData
}

interface HomepageResponse {
  banners: {
    data: Banner[]
  }
  teams: {
    data: TeamMember[]
  }
  serviceCategories: {
    data: ServiceCategory[]
  }
  page: PageData
  articles: {
    data: any[]
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

export async function getHomepageData(): Promise<HomepageData> {
  const response = await graphQLAPI<HomepageResponse>(gql`
    query GetHomepageData {
      banners(sort_by: "asc", sort_column: "sort") {
        data {
          cta_link
          cta_title
          id
          image {
            desktop
            desktop_blur
            mobile
            mobile_blur
          }
          title
          sub_title
        }
      }

      teams(sort_by: "asc", sort_column: "sort", is_hottest: true) {
        data {
          content
          id
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
          age
          height
          weight
          years
          monday_end
          monday_start
          tuesday_end
          tuesday_start
          wednesday_end
          wednesday_start
          thursday_start
          thursday_end
          sunday_start
          sunday_end
          saturday_end
          saturday_start
          friday_start
          friday_end
          og_description
          og_image
          og_title
          seo_body
          seo_description
          seo_head
          seo_json_ld
          seo_keyword
          seo_title
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
          og_description
          og_image
          og_title
          seo_body
          seo_description
          seo_head
          seo_json_ld
          seo_keyword
          seo_title
        }
      }

      articles {
        data {
          id
          content
          cover {
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
      page(key: "index") {
        id
        og_description
        og_image
        og_title
        seo_body
        seo_description
        seo_head
        seo_json_ld
        seo_keyword
        seo_title
      }
    }
  `)

  // Transform articles data with date formatting
  const formattedArticles = (response.articles?.data || []).map((article: any) => {
    const dateInfo = formatArticleDate(article.started_at || article.created_at)
    return {
      id: article.id,
      title: article.title,
      author: article.author,
      cover: article.cover,
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
    banners: response.banners?.data || [],
    teams: response.teams?.data || [],
    page: response.page || {},
    serviceCategories: {
      serviceCategories: {
        data: response.serviceCategories?.data || [],
      },
    },
    articles: formattedArticles,
  }
}
