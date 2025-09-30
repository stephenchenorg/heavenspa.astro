import { gql, graphQLAPI } from '@/api/index'

export interface Tags {
  id: string
  title: string
  slug: string
  key: string
}
export interface Partnership {
  id: number
  title: string
  author: string
  cover: string
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
          cover
          ended_at
          title
          author
          started_at
          created_at
          tags {
            data {
              id
              title
              slug
              key
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
      content: partnership.content,
      ended_at: partnership.ended_at,
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
          cover
          ended_at
          title
          author
          started_at
          created_at
          tags {
            data {
              id
              title
              slug
              key
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
      content: partnership.content,
      ended_at: partnership.ended_at,
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
        cover
        started_at
        created_at
      }
      nextPartnership: partnership(where: { id: { _gt: $currentId } }, orderBy: { id: asc }, first: 1) {
        id
        title
        cover
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
      content: partnership.content,
      ended_at: partnership.ended_at,
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
          cover
          ended_at
          started_at
          created_at
          tags {
            data {
              id
              title
              slug
              key
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
            image {
              desktop
              desktop_blur
              mobile
              mobile_blur
            }
          }
          prev {
            id
            title
            image {
              desktop
              desktop_blur
              mobile
              mobile_blur
            }
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
  }
}
