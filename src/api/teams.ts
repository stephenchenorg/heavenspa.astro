import type { TeamMember, TeamsResponse } from '@/types'
import { gql, graphQLAPI } from './index'

export async function getAllTeams(): Promise<TeamMember[]> {
  try {
    const { teams } = await graphQLAPI<TeamsResponse>(gql`
      query GetAllTeams {
        teams(sort_by: "asc", sort_column: "sort") {
          data {
            id
            job
            images {
              created_at
              id
              image {
                desktop
                desktop_blur
                mobile
                mobile_blur
              }
              updated_at
              is_default
            }
            image {
              desktop
              desktop_blur
              mobile
              mobile_blur
            }
            title
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
