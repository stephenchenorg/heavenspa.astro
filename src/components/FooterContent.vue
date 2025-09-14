<template>
  <div class="gap-4 grid md:grid-cols-1 grid-cols-2">
    <div class="flex items-center justify-start gap-3 text-sm">
      <span class="text-base opacity-80">📞</span>
      <a :href="`tel:${companySetting?.phone_1}`"
         class="text-[var(--theme-text,#000000)] hover:text-[var(--color-primary-600,#c4a428)] transition-colors duration-300">
        {{ companySetting?.phone_1 }}
      </a>
    </div>
    <div class="flex items-center justify-start gap-3 text-sm">
      <span class="text-base opacity-80">📍</span>
      <a :href="`https://maps.google.com/?q=${encodeURIComponent(companySetting?.address_1 || '')}`"
         target="_blank" rel="noopener noreferrer"
         class="text-[var(--theme-text,#000000)] hover:text-[var(--color-primary-600,#c4a428)] transition-colors duration-300">
        {{ companySetting?.address_1 }}
      </a>
    </div>
    <div class="flex items-center justify-start gap-3 text-sm">
      <span class="text-base opacity-80">✉️</span>
      <a :href="`mailto:${companySetting?.email_1}`"
         class="text-[var(--theme-text,#000000)] hover:text-[var(--color-primary-600,#c4a428)] transition-colors duration-300">
        {{ companySetting?.email_1 }}
      </a>
    </div>
    <div class="flex items-center justify-start gap-3 text-sm">
      <span class="text-base opacity-80">🕒</span>
      <span class="text-[var(--theme-text,#000000)]">
        {{ companySetting?.business_hours || '' }}
      </span>
    </div>
    <div class="flex items-center justify-start gap-3 text-sm">
      <span class="text-base opacity-80">＄</span>
      <span class="text-[var(--theme-text,#000000)]">
        {{ companySetting?.payment_method }}
      </span>
    </div>
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