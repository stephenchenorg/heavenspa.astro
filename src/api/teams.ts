import type { TeamMember, TeamsResponse } from '@/types'
import { gql, graphQLAPI } from './index'

export async function getAllTeams(
  type: number,
  page: number = 1,
  perPage: number = 12
): Promise<TeamsResponse> {
  const filters: Record<string, boolean> = {}

  if (type === 20) {
    filters.is_works = true
  }
  if (type === 30) {
    filters.is_years = true
  }
  if (type === 40) {
    filters.is_hottest = true
  }

  const filterParams = Object.keys(filters).length > 0
    ? `, ${Object.entries(filters).map(([key, value]) => `${key}: ${value}`).join(', ')}`
    : ''

  try {
    return await graphQLAPI<TeamsResponse>(gql`
      query GetTeams($page: Int, $per_page: Int) {
        teams(sort_by: "asc", sort_column: "sort", page: $page, per_page: $per_page${filterParams}) {
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
  } catch (error) {
    console.error('Failed to fetch all teams:', error)
    return {
      teams: {
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

export async function getTeamMember(id: number): Promise<TeamMember | null> {
  try {
    const { team } = await graphQLAPI<{ team: TeamMember }>(gql`
      query MyQuery {
        team(id: ${id}) {
          title
          content
          age
          weight
          years
          height
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
          monday_end
          monday_start
          saturday_end
          saturday_start
          sunday_end
          sunday_start
          thursday_end
          thursday_start
          tuesday_end
          tuesday_start
          wednesday_end
          wednesday_start
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
    `)
    return team || null
  } catch (error) {
    console.error(`Failed to fetch team member with id ${id}:`, error)
    return null
  }
}
