import node from '@astrojs/node'
import sitemap from '@astrojs/sitemap'
import vue from '@astrojs/vue'
import i18n from '@astrolicious/i18n'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'
import icons from 'unplugin-icons/vite'

// const site = 'https://dev-www.heavenspa.com.tw'
const site = 'https://www.heavenspa.com.tw'

export default defineConfig({
  site,
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  server: {
    host: '0.0.0.0',
    port: 4325, // 新專案用不同 port
  },
  integrations: [
    vue(),
    sitemap({
      filter: (page: string) =>
        page !== `${site}/400` &&
        page !== `${site}/403` &&
        page !== `${site}/422` &&
        page !== `${site}/429` &&
        !page.startsWith(`${site}/api`) &&
        !page.startsWith(`${site}/auth`) &&
        !page.startsWith(`${site}/user/`) &&
        !page.startsWith(`${site}/cart`) &&
        !page.startsWith(`${site}/checkout`),
    }),
    i18n({
      defaultLocale: 'zh-TW',
      locales: ['zh-TW', 'en'],
    }),
  ],
  vite: {
    plugins: [
      tailwindcss(),
      icons({
        compiler: 'vue3',
      }),
    ],
  },
  security: {
    checkOrigin: false,
  },
})
