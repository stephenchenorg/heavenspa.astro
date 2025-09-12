import { gql, graphQLAPI } from './index'
import type { TeamsResponse, TagsResponse, TeamMember, TeamTag } from '@/types'

// GraphQL 查詢定義
const QUERIES = {
  GET_ALL_TEAMS: gql`
    query GetAllTeams {
      teams(sort_by: "asc", sort_column: "sort") {
        data {
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
            updated_at
            is_default
          }
          image {
            desktop
            desktop_blur
            mobile
            mobile_blur
          }
          tags {
            data {
              id
              title
              slug
            }
          }
          title
          category {
            title
          }
        }
      }
    }
  `,

  GET_TEAMS_BY_TAG: gql`
    query GetTeamsByTag($slug_tags: [String]) {
      teams(sort_by: "asc", sort_column: "sort", slug_tags: $slug_tags) {
        data {
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
            updated_at
            is_default
          }
          image {
            desktop
            desktop_blur
            mobile
            mobile_blur
          }
          tags {
            data {
              id
              title
              slug
            }
          }
          title
          category {
            title
          }
        }
      }
    }
  `,

  GET_TEAM_TAGS: gql`
    query GetTeamTags {
      tags(type: "team") {
        from
        to
        data {
          id
          title
          slug
        }
      }
    }
  `,

  GET_WEEKLY_RECOMMENDED: gql`
    query GetWeeklyRecommended {
      teams(sort_by: "asc", sort_column: "sort", slug_tags: "weekly-recommended") {
        data {
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
            updated_at
            is_default
          }
          image {
            desktop
            desktop_blur
            mobile
            mobile_blur
          }
          tags {
            data {
              id
              title
              slug
            }
          }
          title
          category {
            title
          }
        }
      }
    }
  `
} as const

// API 服務類
export class TeamsAPI {
  /**
   * 獲取所有團隊成員
   */
  static async getAllTeams(): Promise<TeamMember[]> {
    try {
      const { teams } = await graphQLAPI<TeamsResponse>(QUERIES.GET_ALL_TEAMS)
      return teams.data || []
    } catch (error) {
      console.error('Failed to fetch all teams:', error)
      return []
    }
  }

  /**
   * 根據標籤獲取團隊成員（後端篩選）
   */
  static async getTeamsByTag(tagSlugs: string[]): Promise<TeamMember[]> {
    try {
      const { teams } = await graphQLAPI<TeamsResponse>(
        QUERIES.GET_TEAMS_BY_TAG,
        { variables: { slug_tags: tagSlugs } }
      )
      return teams.data || []
    } catch (error) {
      console.error('Failed to fetch teams by tag:', error)
      return []
    }
  }

  /**
   * 獲取所有團隊標籤
   */
  static async getTeamTags(): Promise<TeamTag[]> {
    try {
      console.log('Fetching team tags...')
      const result = await graphQLAPI<TagsResponse>(QUERIES.GET_TEAM_TAGS)
      console.log('Tags API result:', result)
      
      if (!result || !result.tags) {
        console.warn('No tags data in response:', result)
        return []
      }
      
      const tags = result.tags.data || []
      console.log('Extracted tags:', tags)
      return tags
    } catch (error) {
      console.error('Failed to fetch team tags:', error)
      return []
    }
  }

  /**
   * 獲取本週推薦團隊成員
   */
  static async getWeeklyRecommended(): Promise<TeamMember[]> {
    try {
      const { teams } = await graphQLAPI<TeamsResponse>(QUERIES.GET_WEEKLY_RECOMMENDED)
      return teams.data || []
    } catch (error) {
      console.error('Failed to fetch weekly recommended teams:', error)
      return []
    }
  }

  /**
   * 獲取團隊成員和標籤（並行查詢）
   * @param selectedTag - 可選的標籤篩選
   * @param useBackendFilter - 是否使用後端篩選（預設 true）
   */
  static async getTeamsWithTags(selectedTag?: string, useBackendFilter = true): Promise<{
    teams: TeamMember[]
    tags: TeamTag[]
  }> {
    try {
      console.log('getTeamsWithTags called with:', { selectedTag, useBackendFilter })
      
      const [teams, tags] = await Promise.all([
        selectedTag && useBackendFilter
          ? this.getTeamsByTag([selectedTag])
          : this.getAllTeams(),
        this.getTeamTags()
      ])

      console.log('API results:', { teamsCount: teams.length, tagsCount: tags.length })

      // 如果不使用後端篩選且有選擇標籤，在前端篩選
      const filteredTeams = (!useBackendFilter && selectedTag)
        ? teams.filter(member => 
            member.tags?.data?.some(tag => tag.slug === selectedTag)
          )
        : teams

      console.log('Final results:', { 
        filteredTeamsCount: filteredTeams.length, 
        tagsCount: tags.length,
        tagsList: tags.map(t => ({ title: t.title, slug: t.slug }))
      })

      return {
        teams: filteredTeams,
        tags
      }
    } catch (error) {
      console.error('Failed to fetch teams with tags:', error)
      return {
        teams: [],
        tags: []
      }
    }
  }
}

// 便利的導出函數（保持向後兼容）
export const {
  getAllTeams,
  getTeamsByTag,
  getTeamTags,
  getWeeklyRecommended,
  getTeamsWithTags
} = TeamsAPI