export interface PageData {
  id?: string
  title?: string
  key?: string
  fields?: Array<{
    content: string
    image?: {
      desktop?: string
      desktop_blur?: string
      mobile?: string
      mobile_blur?: string
    }
  }>
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
