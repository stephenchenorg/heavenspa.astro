import { sequence } from 'astro:middleware'
import { auth } from './auth'
import { guest } from './guest'
import { locale } from './locale'
import { originCheck } from './originCheck'

export const onRequest = sequence(
  originCheck,
  locale, // 在 guest 和 auth 之前處理語言
  guest,
  auth,
)
