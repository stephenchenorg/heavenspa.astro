/**
 * GraphQL API Timing Test Script
 *
 * Tests critical path GraphQL APIs and measures their response times
 *
 * Usage: yarn tsx src/scripts/test-graphql-timing.ts
 */

import { performance } from 'node:perf_hooks'
import { AwesomeGraphQLClient } from 'awesome-graphql-client'

// Environment setup
const API_BASE_URL = process.env.API_BASE_URL || 'https://dev-admin.heavenspa.com.tw'
const GRAPHQL_ENDPOINT = `${API_BASE_URL.replace(/\/$/, '')}/graphql`

// Create GraphQL client
const client = new AwesomeGraphQLClient({
  endpoint: GRAPHQL_ENDPOINT,
})

// GraphQL queries (simplified versions for timing test)
const QUERIES = {
  homepage: `
    query GetHomepageData {
      banners(sort_by: "asc", sort_column: "sort") {
        data {
          id
          title
          cta_link
        }
      }
      teams(sort_by: "asc", sort_column: "sort", is_hottest: true) {
        data {
          id
          title
        }
      }
      serviceCategories {
        data {
          id
          title
        }
      }
      articles {
        data {
          id
          title
        }
      }
    }
  `,
  services: `
    query GetServices {
      services {
        data {
          id
          title
          price_max
          price_min
        }
      }
    }
  `,
  serviceCategories: `
    query GetServiceCategories {
      serviceCategories {
        data {
          id
          title
        }
      }
    }
  `,
  articles: `
    query GetArticles {
      articles {
        data {
          id
          title
        }
      }
    }
  `,
  companySetting: `
    query GetCompanySetting {
      companySetting {
        name
        phone_1
        email_1
      }
    }
  `,
}

interface TimingResult {
  name: string
  time: number
  success: boolean
  error?: string
}

async function measureAPICall(
  name: string,
  query: string
): Promise<TimingResult> {
  const startTime = performance.now()

  try {
    await client.request(query)
    const endTime = performance.now()
    const duration = endTime - startTime

    return {
      name,
      time: duration,
      success: true,
    }
  } catch (error) {
    const endTime = performance.now()
    const duration = endTime - startTime

    return {
      name,
      time: duration,
      success: false,
      error: error instanceof Error ? error.message : String(error),
    }
  }
}

async function runTests() {
  console.log('\n🚀 Testing GraphQL API Response Times')
  console.log('='.repeat(50))
  console.log(`Endpoint: ${GRAPHQL_ENDPOINT}\n`)

  // Define critical path API tests
  const tests = [
    {
      name: 'Homepage Data',
      query: QUERIES.homepage,
    },
    {
      name: 'Services List',
      query: QUERIES.services,
    },
    {
      name: 'Service Categories',
      query: QUERIES.serviceCategories,
    },
    {
      name: 'Articles List',
      query: QUERIES.articles,
    },
    {
      name: 'Company Settings',
      query: QUERIES.companySetting,
    },
  ]

  // Run all tests
  const results: TimingResult[] = []

  for (const test of tests) {
    process.stdout.write(`Testing ${test.name}... `)
    const result = await measureAPICall(test.name, test.query)
    results.push(result)

    if (result.success) {
      console.log(`✓ ${result.time.toFixed(2)}ms`)
    } else {
      console.log(`✗ Failed (${result.time.toFixed(2)}ms)`)
      if (result.error) {
        console.log(`  Error: ${result.error}`)
      }
    }
  }

  // Display summary
  console.log(`\n${'='.repeat(50)}`)
  console.log('📊 Summary:')
  console.log('='.repeat(50))

  const successfulResults = results.filter(r => r.success)

  if (successfulResults.length === 0) {
    console.log('❌ All tests failed')
    return
  }

  const sortedResults = [...successfulResults].sort((a, b) => a.time - b.time)
  const fastest = sortedResults[0]
  const slowest = sortedResults[sortedResults.length - 1]
  const average = successfulResults.reduce((sum, r) => sum + r.time, 0) / successfulResults.length

  console.log(`\n⚡ Fastest: ${fastest.name} (${fastest.time.toFixed(2)}ms)`)
  console.log(`🐌 Slowest: ${slowest.name} (${slowest.time.toFixed(2)}ms)`)
  console.log(`📈 Average: ${average.toFixed(2)}ms`)
  console.log(`✓ Success Rate: ${successfulResults.length}/${results.length} (${(successfulResults.length / results.length * 100).toFixed(0)}%)`)

  // Display all results sorted by time
  console.log('\n📋 All Results (sorted by time):')
  sortedResults.forEach((result, index) => {
    console.log(`  ${index + 1}. ${result.name}: ${result.time.toFixed(2)}ms`)
  })

  const failedResults = results.filter(r => !r.success)
  if (failedResults.length > 0) {
    console.log('\n❌ Failed Tests:')
    failedResults.forEach(result => {
      console.log(`  - ${result.name}: ${result.error}`)
    })
  }

  console.log('\n')
}

// Run the tests
runTests().catch(error => {
  console.error('\n❌ Test execution failed:', error)
  process.exit(1)
})
