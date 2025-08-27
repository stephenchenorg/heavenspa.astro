import { sequence } from 'astro:middleware'
import { auth } from './auth'
import { guest } from './guest'
import { i18n } from './i18n'
import { originCheck } from './originCheck'

export const onRequest = sequence(
  originCheck,
  i18n,
  guest,
  auth,
)
