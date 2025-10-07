import type { TeamMember, TeamsResponse } from '@/types'
import { gql, graphQLAPI } from './index'

export async function getAllTeams(type: number): Promise<TeamMember[]> {
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
    const { teams } = await graphQLAPI<TeamsResponse>(gql`
      query MyQuery {
        teams(sort_by: "asc", sort_column: "sort"${filterParams}) {
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
      }
    `)
    return teams.data || []
  } catch (error) {
    console.error('Failed to fetch all teams:', error)
    return []
  }
}

export async function getTeamMember(id: number, lang?: string): Promise<TeamMember | null> {
  try {
    const { team } = await graphQLAPI<{ team: TeamMember }>(gql`
      query MyQuery {
        team(id: ${id}) {
          content
          age
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
          og_description
          og_image
          og_title
          saturday_end
          saturday_start
          seo_body
          seo_description
          seo_head
          seo_json_ld
          seo_keyword
          seo_title
          sunday_end
          sunday_start
          thursday_end
          thursday_start
          title
          tuesday_end
          tuesday_start
          wednesday_end
          wednesday_start
          weight
          years
          height
          friday_start
          friday_end
        }
      }
    `, { locale: lang })
    return team || null
  } catch (error) {
    console.error(`Failed to fetch team member with id ${id}:`, error)
    return null
  }
}
