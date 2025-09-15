import type { APIRoute } from 'astro'
import { getCompanySetting } from '@/api/companySetting'

export const GET: APIRoute = async ({ url, locals }) => {
  try {
    const searchParams = new URL(url).searchParams
    // 優先使用 URL 參數中的 lang，否則使用 middleware 設定的語系
    const lang = searchParams.get('lang') || (locals as any).locale || undefined

    const companySetting = await getCompanySetting(lang)

    return new Response(JSON.stringify(companySetting), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Company Setting API Error:', error)

    return new Response(JSON.stringify({
      error: 'Failed to fetch company setting'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}