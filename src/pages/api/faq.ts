import type { APIRoute } from 'astro'
import { getFaqList } from '@/api/faq'

export const GET: APIRoute = async ({ url }) => {
  try {
    const searchParams = url.searchParams
    const categoryId = searchParams.get('category_id')

    if (!categoryId) {
      return new Response(JSON.stringify({ error: 'Category ID is required' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }

    const categoryIdNum = Number.parseInt(categoryId)
    if (Number.isNaN(categoryIdNum)) {
      return new Response(JSON.stringify({ error: 'Invalid category ID' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }

    // 獲取 FAQ 資料
    const faqData = await getFaqList(categoryIdNum)

    return new Response(JSON.stringify(faqData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300', // 快取 5 分鐘
      },
    })
  } catch (error) {
    console.error('Error fetching FAQ data:', error)

    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}
