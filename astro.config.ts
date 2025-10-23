import node from '@astrojs/node'
import vue from '@astrojs/vue'
import i18n from '@astrolicious/i18n'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'
import icons from 'unplugin-icons/vite'

export default defineConfig({
  site: 'https://dev-www.heavenspa.com.tw',
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  server: {
    host: '0.0.0.0',
    port: 4323, // 新專案用不同 port
  },
  integrations: [
    vue(),
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
    assetsInclude: ['**/*', '!**/unused/**'],
    server: {
      fs: {
        deny: ['**/public/unused/**'],
      },
    },
  },
  security: {
    checkOrigin: false,
  },
})
