import type { TeamMember, TeamsResponse } from '@/types'
import { gql, graphQLAPI } from './index'

export async function getAllTeams(): Promise<TeamMember[]> {
  try {
    const { teams } = await graphQLAPI<TeamsResponse>(gql`
      query MyQuery {
        teams(sort_by: "asc", sort_column: "sort") {
          data {
            content
            id
            images {
              image {
                desktop
                desktop_blur
                mobile
                mobile_blur
              }
              id
            }
            job
            title
            image {
              desktop
              desktop_blur
              mobile
              mobile_blur
            }
            cover
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
