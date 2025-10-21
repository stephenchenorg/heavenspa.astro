/**
 * SEO Type Definitions
 * 擴展 PageMeta 來支援 canonical URL
 */

import type { PageMeta as BasePageMeta } from '@stephenchenorg/astro/page'

/**
 * 擴展的 PageMeta，加上 canonical 支援
 */
export interface PageMeta extends BasePageMeta {
  canonical?: string
}
