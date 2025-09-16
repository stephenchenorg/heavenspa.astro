import { gql, graphQLAPI } from '@/api/index'

export async function getFaqList(type = 10) {
  const res = await graphQLAPI(gql`
    query GetFaqList($type: Int!, $sortBy: String!, $sortColumn: String!) {
      faqs(sort_by: $sortBy, sort_column: $sortColumn, type: $type) {
        data {
          id
          content
          title
          status
        }
      }
    }
  `, {
    variables: {
      type,
      sortBy: 'asc',
      sortColumn: 'sort',
    },
  })

  return res.faqs?.data || []
}
