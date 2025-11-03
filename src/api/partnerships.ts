import { gql, graphQLAPI } from '@/api/index'

export interface Tags {
  id: string
  title: string
}
export interface Partnership {
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
    cover: {
      desktop: string
      desktop_blur: string
      mobile: string
      mobile_blur: string
    }
  }
  prev?: {
    id: number
    title: string
    cover: {
      desktop: string
      desktop_blur: string
      mobile: string
      mobile_blur: string
    }
  }
  og_description?: string
  og_image?: string
  og_title?: string
  seo_body?: string
  seo_description?: string
  seo_head?: string
  seo_json_ld?: string
  seo_keyword?: string
  seo_title?: string
}

export interface PartnershipsResponse {
  partnerships: {
    data: Partnership[]
    has_more_pages: boolean
    last_page: number
    per_page: number
    to: number
    total: number
    from: number
  }
}

export async function getPartnerships(): Promise<Partnership[]> {
  const res = await graphQLAPI(gql`
    query MyQuery {
      partnerships{
        data {
          id
          content
          cover{
            desktop
            desktop_blur
            mobile
            mobile_blur
          }
          background{
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
  `)

  // 將 API 資料轉換為 Partnership 格式
  return (res.partnerships.data || []).map((partnership: Partnership, index: number) => {
    const createdDate = partnership.started_at || partnership.created_at
    const normalized = createdDate?.replace(' ', 'T') || createdDate
    const d = new Date(normalized)
    return {
      id: partnership.id || (index + 1), // 優先使用 API 的 id，否則使用 index + 1
      title: partnership.title,
      author: partnership.author,
      cover: partnership.cover,
      background: partnership.background,
      content: partnership.content,
      ended_at: partnership.ended_at,
      og_description: partnership.og_description,
      og_image: partnership.og_image,
      og_title: partnership.og_title,
      seo_body: partnership.seo_body,
      seo_description: partnership.seo_description,
      seo_head: partnership.seo_head,
      seo_json_ld: partnership.seo_json_ld,
      seo_keyword: partnership.seo_keyword,
      seo_title: partnership.seo_title,
      started_at: d.toISOString().slice(0, 10),
      created_at: d.toISOString().slice(0, 10),
      date: d.getDate().toString().padStart(2, '0'),
      year: d.getFullYear().toString(),
      month: (d.getMonth() + 1).toString().padStart(2, '0'),
      tags: partnership.tags,
      images: partnership.images,
    }
  })
}
export async function getRelatedPartnerships(tagIds: number[]): Promise<Partnership[]> {
  const res = await graphQLAPI(gql`
    query GetRelatedPartnerships($unionTags: [Int!],) {
      partnerships(union_tags: $unionTags) {
        data {
          id
          content
          cover{
            desktop
            desktop_blur
            mobile
            mobile_blur
          }
          background{
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

  // 將 API 資料轉換為 Partnership 格式
  return (res.partnerships.data || []).map((partnership: Partnership, index: number) => {
    const createdDate = partnership.started_at || partnership.created_at
    const normalized = createdDate?.replace(' ', 'T') || createdDate
    const d = new Date(normalized)
    return {
      id: partnership.id || (index + 1),
      title: partnership.title,
      author: partnership.author,
      cover: partnership.cover,
      background: partnership.background,
      content: partnership.content,
      ended_at: partnership.ended_at,
      og_description: partnership.og_description,
      og_image: partnership.og_image,
      og_title: partnership.og_title,
      seo_body: partnership.seo_body,
      seo_description: partnership.seo_description,
      seo_head: partnership.seo_head,
      seo_json_ld: partnership.seo_json_ld,
      seo_keyword: partnership.seo_keyword,
      seo_title: partnership.seo_title,
      started_at: d.toISOString().slice(0, 10),
      created_at: d.toISOString().slice(0, 10),
      date: d.getDate().toString().padStart(2, '0'),
      year: d.getFullYear().toString(),
      month: (d.getMonth() + 1).toString().padStart(2, '0'),
      tags: partnership.tags,
      images: partnership.images,
    }
  })
}

export async function getAdjacentPartnerships(currentId: number): Promise<{ previous: Partnership | null, next: Partnership | null }> {
  const res = await graphQLAPI(gql`
    query GetAdjacentPartnerships($currentId: Int!) {
      previousPartnership: partnership(where: { id: { _lt: $currentId } }, orderBy: { id: desc }, first: 1) {
        id
        title
        started_at
        created_at
      }
      nextPartnership: partnership(where: { id: { _gt: $currentId } }, orderBy: { id: asc }, first: 1) {
        id
        title
        started_at
        created_at
      }
    }
  `, {
    variables: { currentId },
  })

  const formatPartnership = (partnership: any) => {
    if (!partnership) return null
    const createdDate = partnership.started_at || partnership.created_at
    const normalized = createdDate?.replace(' ', 'T') || createdDate
    const d = new Date(normalized)

    return {
      id: partnership.id,
      title: partnership.title,
      author: partnership.author,
      cover: partnership.cover,
      background: partnership.background,
      content: partnership.content,
      ended_at: partnership.ended_at,
      og_description: partnership.og_description,
      og_image: partnership.og_image,
      og_title: partnership.og_title,
      seo_body: partnership.seo_body,
      seo_description: partnership.seo_description,
      seo_head: partnership.seo_head,
      seo_json_ld: partnership.seo_json_ld,
      seo_keyword: partnership.seo_keyword,
      seo_title: partnership.seo_title,
      started_at: d.toISOString(),
      created_at: d.toISOString(),
      date: d.getDate().toString().padStart(2, '0'),
      year: d.getFullYear().toString(),
      month: (d.getMonth() + 1).toString().padStart(2, '0'),
    }
  }

  return {
    previous: formatPartnership(res.previousPartnership),
    next: formatPartnership(res.nextPartnership),
  }
}

export async function getPartnership(id: string): Promise<Partnership> {
  const res = await graphQLAPI(gql`
    query GetPartnership($id: Int!) {
        partnership(id: $id) {
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
          background{
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
          og_description
          og_image
          og_title
          seo_body
          seo_description
          seo_head
          seo_json_ld
          seo_keyword
          seo_title
          next {
            id
            title
          }
          prev {
            id
            title
          }
        }
      }
  `, {
    variables: { id: Number.parseInt(id) },
  })
  const createdDate = res.partnership.started_at || res.partnership.created_at
  const normalized = createdDate?.replace(' ', 'T') || createdDate
  const d = new Date(normalized)

  return {
    id: res.partnership.id,
    title: res.partnership.title,
    author: res.partnership.author,
    cover: res.partnership.cover,
    background: res.partnership.background,
    content: res.partnership.content,
    ended_at: res.partnership.ended_at,
    started_at: d.toISOString(),
    created_at: d.toISOString(),
    date: d.getDate().toString().padStart(2, '0'),
    year: d.getFullYear().toString(),
    month: (d.getMonth() + 1).toString().padStart(2, '0'),
    tags: res.partnership.tags,
    images: res.partnership.images,
    next: res.partnership.next,
    prev: res.partnership.prev,
    og_description: res.partnership.og_description,
    og_image: res.partnership.og_image,
    og_title: res.partnership.og_title,
    seo_body: res.partnership.seo_body,
    seo_description: res.partnership.seo_description,
    seo_head: res.partnership.seo_head,
    seo_json_ld: res.partnership.seo_json_ld,
    seo_keyword: res.partnership.seo_keyword,
    seo_title: res.partnership.seo_title,
  }
}

export interface PartnershipPageData {
  partnership: Partnership | null
  relatedPartnerships: Partnership[]
}

export async function getPartnershipPageData(id: string): Promise<PartnershipPageData> {
  try {
    // First fetch the partnership to get tag IDs
    const partnership = await getPartnership(id)

    if (!partnership) {
      return {
        partnership: null,
        relatedPartnerships: [],
      }
    }

    // Then fetch related partnerships based on tag IDs
    const tagIds = partnership.tags?.map(tag => Number(tag.id)) || []
    const relatedPartnerships = tagIds.length > 0 ? await getRelatedPartnerships(tagIds) : []

    return {
      partnership,
      relatedPartnerships,
    }
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error(`Error fetching partnership page data for ${id}:`, error)
    }
    return {
      partnership: null,
      relatedPartnerships: [],
    }
  }
}
