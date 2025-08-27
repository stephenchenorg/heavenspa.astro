export default {
  name: '享天堂',
  description: '新的 Astro 描述',

  apiBaseUrl: import.meta.env.API_BASE_URL.replace(/\/$/, ''),
  ga4TrackingId: import.meta.env.GA4_TRACKING_ID,
}
