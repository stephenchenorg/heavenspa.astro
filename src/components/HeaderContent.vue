<template>
  <div class="flex items-center">
    <a
      href="/"
      class="flex items-center space-x-2 transition-all duration-300 group"
      @click="handleLogoClick"
    >
      <img
        v-if="companySetting?.logo"
        :src="companySetting.logo"
        :alt="companySetting.name || 'Logo'"
        class="h-10 w-auto sm:h-12 transition-transform duration-300 group-hover:scale-105"
      />
      <span v-else class="text-xl font-bold">{{ companySetting?.name }}</span>
    </a>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getCurrentLocale } from '@/utils/i18n'
import type { CompanySettingData } from '@/types'

const companySetting = ref<CompanySettingData | null>(null)

// 獲取公司設定
async function fetchCompanySetting() {
  try {
    const locale = getCurrentLocale()
    const response = await fetch(`/api/company-setting?lang=${locale}`)
    if (response.ok) {
      companySetting.value = await response.json()
    }
  } catch (error) {
    console.error('Failed to fetch company setting:', error)
  }
}

// 處理 Logo 點擊
function handleLogoClick() {
  // 可以添加額外的邏輯，比如頁面轉換動畫
}

// 監聽語言變更事件
function handleLocaleChange() {
  fetchCompanySetting()
}

onMounted(() => {
  fetchCompanySetting()

  // 監聽自定義語言變更事件
  window.addEventListener('localechange', handleLocaleChange)
})
</script>