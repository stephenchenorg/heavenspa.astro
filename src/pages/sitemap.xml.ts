import type { APIRoute } from 'astro'
import type { Article } from '@/api/articles'
import type { Partnership } from '@/api/partnerships'
import type { TeamMember } from '@/types'
import { getSitemapData } from '@/api/sitemapData'

// 網站基礎 URL
const SITE_URL = 'https://dev-www.heavenspa.com.tw'

// 靜態頁面列表
const staticPages = [
  { url: '/', priority: '1.0', changefreq: 'daily' },
  { url: '/about', priority: '0.9', changefreq: 'weekly' },
  { url: '/services', priority: '0.9', changefreq: 'weekly' },
  { url: '/team', priority: '0.8', changefreq: 'weekly' },
  { url: '/news', priority: '0.8', changefreq: 'daily' },
  { url: '/business-partnership', priority: '0.7', changefreq: 'weekly' },
  { url: '/faq', priority: '0.7', changefreq: 'monthly' },
  { url: '/joinUs', priority: '0.6', changefreq: 'monthly' },
  { url: '/privacy', priority: '0.5', changefreq: 'yearly' },
  { url: '/terms', priority: '0.5', changefreq: 'yearly' },
  { url: '/sitemap', priority: '0.4', changefreq: 'monthly' },
]

// 語言版本
const locales = ['zh-TW', 'en']

// 生成 XML sitemap
function generateSitemap(urls: Array<{ url: string, lastmod?: string, priority: string, changefreq: string }>) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.map(({ url, lastmod, priority, changefreq }) => `  <url>
    <loc>${SITE_URL}${url}</loc>
    ${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    ${locales.map(locale => {
      const localePath = locale === 'zh-TW' ? url : `/${locale}${url}`
      return `<xhtml:link rel="alternate" hreflang="${locale}" href="${SITE_URL}${localePath}"/>`
    }).join('\n    ')}
  </url>`).join('\n')}
</urlset>`
}

export const GET: APIRoute = async () => {
  try {
    const urls: Array<{ url: string, lastmod?: string, priority: string, changefreq: string }> = []

    // 添加靜態頁面（中文和英文版本）
    for (const locale of locales) {
      const prefix = locale === 'zh-TW' ? '' : `/${locale}`
      staticPages.forEach(page => {
        urls.push({
          url: `${prefix}${page.url}`,
          lastmod: new Date().toISOString().split('T')[0],
          priority: page.priority,
          changefreq: page.changefreq,
        })
      })
    }

    // 獲取動態內容（批次查詢）
    try {
      const { articles, partnerships, serviceCategories, teamMembers } = await getSitemapData()

      // 新聞文章
      if (articles && articles.length > 0) {
        articles.forEach((article: Article) => {
          for (const locale of locales) {
            const prefix = locale === 'zh-TW' ? '' : `/${locale}`
            urls.push({
              url: `${prefix}/news/${article.id}`,
              lastmod: new Date().toISOString().split('T')[0],
              priority: '0.7',
              changefreq: 'weekly',
            })
          }
        })
      }

      // 異業合作
      if (partnerships && partnerships.length > 0) {
        partnerships.forEach((partnership: Partnership) => {
          for (const locale of locales) {
            const prefix = locale === 'zh-TW' ? '' : `/${locale}`
            urls.push({
              url: `${prefix}/business-partnership/${partnership.id}`,
              lastmod: new Date().toISOString().split('T')[0],
              priority: '0.6',
              changefreq: 'weekly',
            })
          }
        })
      }

      // 服務分類和項目
      if (serviceCategories && serviceCategories.length > 0) {
        for (const category of serviceCategories) {
          for (const locale of locales) {
            const prefix = locale === 'zh-TW' ? '' : `/${locale}`

            // 服務分類頁面
            urls.push({
              url: `${prefix}/services/${category.id}/items`,
              lastmod: new Date().toISOString().split('T')[0],
              priority: '0.8',
              changefreq: 'weekly',
            })
          }
        }
      }

      // 團隊成員
      if (teamMembers && teamMembers.length > 0) {
        teamMembers.forEach((member: TeamMember) => {
          for (const locale of locales) {
            const prefix = locale === 'zh-TW' ? '' : `/${locale}`
            urls.push({
              url: `${prefix}/team/${member.id}`,
              lastmod: new Date().toISOString().split('T')[0],
              priority: '0.6',
              changefreq: 'weekly',
            })
          }
        })
      }
    } catch (error) {
      console.error('Error fetching sitemap data:', error)
    }

    const sitemap = generateSitemap(urls)

    return new Response(sitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    })
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return new Response('Error generating sitemap', {
      status: 500,
      headers: {
        'Content-Type': 'text/plain',
      },
    })
  }
}
