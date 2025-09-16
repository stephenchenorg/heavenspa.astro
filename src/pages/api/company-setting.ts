import type { APIRoute } from 'astro'
import { getCompanySetting } from '@/api/companySetting'

export const GET: APIRoute = async ({ url }) => {
  try {
    const companySetting = await getCompanySetting()
    return new Response(JSON.stringify(companySetting), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Company Setting API Error:', error)

    return new Response(JSON.stringify({
      error: 'Failed to fetch company setting',
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}
