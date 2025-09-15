import { createGraphQLAPI } from '@stephenchenorg/astro/api'
import { getLocale } from 'i18n:astro'

const baseGraphQLAPI = createGraphQLAPI({
  endpoint: `${import.meta.env.API_BASE_URL.replace(/\/$/, '')}/graphql`,
})

export function graphQLAPI<
  TData extends Record<string, any>,
  TVariables extends Record<string, any> = Record<string, any>
>(
  query: any,
  options?: { variables?: TVariables, locale?: string }
): Promise<TData> {
  return baseGraphQLAPI<TData, TVariables>(query, {
    variables: options?.variables,
    fetchOptions: {
      headers: {
        'Content-Language': getLocale().replace('-', '_'),
      },
    },
  })
}

export { gql, GraphQLValidationError } from '@stephenchenorg/astro/api'
