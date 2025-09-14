<template>
  <div class="grid md:grid-cols-2 grid-cols-1 gap-y-8 pb-8">
    <!-- 左側：公司資訊 -->
    <div class="animate-fadeInUp lg:pr-8 grid grid-cols-1 lg:max-w-md">
      <div class="mb-6">
        <div class="text-2xl md:text-3xl font-bold text-[var(--color-primary-600,#c4a428)] mb-1 tracking-wide">
          {{ companySetting?.name }}
        </div>
        <div class="text-base font-medium text-[var(--theme-text-secondary,#666666)] tracking-[2px] uppercase">
          HEAVEN SPA
        </div>
      </div>
      <p class="text-sm md:text-base leading-relaxed text-[var(--theme-text-secondary,#666666)] mb-8">
        {{ companySetting?.description }}
      </p>

      <!-- 聯絡資訊 -->
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
    </div>

    <!-- 右側：導航和社群 -->
    <div class="grid grid-cols-3">
      <!-- 服務項目 -->
      <div class="animate-fadeInUp animation-delay-200">
        <h4 class="text-lg font-semibold text-[var(--theme-text,#000000)] mb-6 uppercase tracking-wider">
          <span data-i18n="nav.services">{{ t('nav.services') }}</span>
        </h4>
        <ul class="space-y-3 grid grid-cols-1 md:gap-0">
          <li>
            <a href="/about"
               class="group flex items-center justify-start text-sm text-[var(--theme-text-secondary,#666666)] hover:text-[var(--color-primary-600,#c4a428)] transition-all duration-300 hover:translate-x-1">
              <span class="opacity-0 group-hover:opacity-100 mr-2 transition-all duration-300 transform -translate-x-3 group-hover:translate-x-0">→</span>
              <span data-i18n="nav.about">{{ t('nav.about') }}</span>
            </a>
          </li>
          <li>
            <a href="/services"
               class="group flex items-center justify-start text-sm text-[var(--theme-text-secondary,#666666)] hover:text-[var(--color-primary-600,#c4a428)] transition-all duration-300 hover:translate-x-1">
              <span class="opacity-0 group-hover:opacity-100 mr-2 transition-all duration-300 transform -translate-x-3 group-hover:translate-x-0">→</span>
              <span data-i18n="nav.services">{{ t('nav.services') }}</span>
            </a>
          </li>
          <li>
            <a href="/team"
               class="group flex items-center justify-start text-sm text-[var(--theme-text-secondary,#666666)] hover:text-[var(--color-primary-600,#c4a428)] transition-all duration-300 hover:translate-x-1">
              <span class="opacity-0 group-hover:opacity-100 mr-2 transition-all duration-300 transform -translate-x-3 group-hover:translate-x-0">→</span>
              <span data-i18n="nav.team">{{ t('nav.team') }}</span>
            </a>
          </li>
          <li>
            <a href="/news"
               class="group flex items-center justify-start text-sm text-[var(--theme-text-secondary,#666666)] hover:text-[var(--color-primary-600,#c4a428)] transition-all duration-300 hover:translate-x-1">
              <span class="opacity-0 group-hover:opacity-100 mr-2 transition-all duration-300 transform -translate-x-3 group-hover:translate-x-0">→</span>
              <span data-i18n="nav.news">{{ t('nav.news') }}</span>
            </a>
          </li>
          <li>
            <a href="/faq"
               class="group flex items-center justify-start text-sm text-[var(--theme-text-secondary,#666666)] hover:text-[var(--color-primary-600,#c4a428)] transition-all duration-300 hover:translate-x-1">
              <span class="opacity-0 group-hover:opacity-100 mr-2 transition-all duration-300 transform -translate-x-3 group-hover:translate-x-0">→</span>
              <span data-i18n="nav.faq">{{ t('nav.faq') }}</span>
            </a>
          </li>
          <li>
            <a href="/joinUs/careers"
               class="group flex items-center justify-start text-sm text-[var(--theme-text-secondary,#666666)] hover:text-[var(--color-primary-600,#c4a428)] transition-all duration-300 hover:translate-x-1">
              <span class="opacity-0 group-hover:opacity-100 mr-2 transition-all duration-300 transform -translate-x-3 group-hover:translate-x-0">→</span>
              <span data-i18n="nav.careers">{{ t('nav.careers') }}</span>
            </a>
          </li>
          <li>
            <a href="/business-partnership"
               class="group flex items-center justify-start text-sm text-[var(--theme-text-secondary,#666666)] hover:text-[var(--color-primary-600,#c4a428)] transition-all duration-300 hover:translate-x-1">
              <span class="opacity-0 group-hover:opacity-100 mr-2 transition-all duration-300 transform -translate-x-3 group-hover:translate-x-0">→</span>
              <span data-i18n="nav.business_partnership">{{ t('nav.business_partnership') }}</span>
            </a>
          </li>
        </ul>
      </div>

      <!-- 社群媒體 -->
      <div class="animate-fadeInUp animation-delay-400">
        <h4 class="text-lg font-semibold text-[var(--theme-text,#000000)] mb-6 uppercase tracking-wider">
          社群媒體
        </h4>
        <ul class="space-y-3 grid grid-cols-1 md:gap-0">
          <li v-if="companySetting?.fb_link">
            <a :href="companySetting.fb_link"
               class="flex items-center gap-2 text-sm text-[var(--theme-text-secondary,#666666)] hover:text-[var(--color-primary-600,#c4a428)] transition-all duration-300 hover:scale-105"
               target="_blank" rel="noopener noreferrer" title="Facebook">
              <div class="w-4 h-4 transition-transform duration-300 group-hover:scale-110">
                <Facebook size="16" />
              </div>
              <span class="font-normal tracking-wide">Facebook</span>
            </a>
          </li>
          <li v-if="companySetting?.ig_link">
            <a :href="companySetting.ig_link"
               class="flex items-center gap-2 text-sm text-[var(--theme-text-secondary,#666666)] hover:text-[var(--color-primary-600,#c4a428)] transition-all duration-300 hover:scale-105"
               target="_blank" rel="noopener noreferrer" title="Instagram">
              <div class="w-4 h-4 transition-transform duration-300 group-hover:scale-110">
                <Instagram size="16" />
              </div>
              <span class="font-normal tracking-wide">Instagram</span>
            </a>
          </li>
          <li v-if="companySetting?.line_link">
            <a :href="companySetting.line_link"
               class="flex items-center gap-2 text-sm text-[var(--theme-text-secondary,#666666)] hover:text-[var(--color-primary-600,#c4a428)] transition-all duration-300 hover:scale-105"
               target="_blank" rel="noopener noreferrer" title="Line">
              <div class="w-4 h-4 transition-transform duration-300 group-hover:scale-110">
                <Line size="16" />
              </div>
              <span class="font-normal tracking-wide">Line</span>
            </a>
          </li>
          <li v-if="companySetting?.twitter_link">
            <a :href="companySetting.twitter_link"
               class="flex items-center gap-2 text-sm text-[var(--theme-text-secondary,#666666)] hover:text-[var(--color-primary-600,#c4a428)] transition-all duration-300 hover:scale-105"
               target="_blank" rel="noopener noreferrer" title="X (Twitter)">
              <div class="w-4 h-4 transition-transform duration-300 group-hover:scale-110">
                <X size="16" />
              </div>
              <span class="font-normal tracking-wide">Twitter</span>
            </a>
          </li>
          <li v-if="companySetting?.tg_link">
            <a :href="companySetting.tg_link"
               class="flex items-center gap-2 text-sm text-[var(--theme-text-secondary,#666666)] hover:text-[var(--color-primary-600,#c4a428)] transition-all duration-300 hover:scale-105"
               target="_blank" rel="noopener noreferrer" title="Telegram">
              <div class="w-4 h-4 transition-transform duration-300 group-hover:scale-110">
                <Telegram size="16" />
              </div>
              <span class="font-normal tracking-wide">Telegram</span>
            </a>
          </li>
          <li v-if="companySetting?.threads_link">
            <a :href="companySetting.threads_link"
               class="flex items-center gap-2 text-sm text-[var(--theme-text-secondary,#666666)] hover:text-[var(--color-primary-600,#c4a428)] transition-all duration-300 hover:scale-105"
               target="_blank" rel="noopener noreferrer" title="Threads">
              <div class="w-4 h-4 transition-transform duration-300 group-hover:scale-110">
                <Threads size="16" />
              </div>
              <span class="font-normal tracking-wide">Threads</span>
            </a>
          </li>
        </ul>
      </div>

      <!-- 法律與政策 -->
      <div class="animate-fadeInUp animation-delay-600">
        <h4 class="text-lg font-semibold text-[var(--theme-text,#000000)] mb-6 uppercase tracking-wider"
            data-i18n="footer.legal-policies">
          {{ t('footer.legal-policies') }}
        </h4>
        <ul class="space-y-3 grid grid-cols-1 gap-2 md:gap-0">
          <li>
            <a href="/privacy"
               class="group flex items-center justify-start text-sm text-[var(--theme-text-secondary,#666666)] hover:text-[var(--color-primary-600,#c4a428)] transition-all duration-300 hover:translate-x-1">
              <span class="opacity-0 group-hover:opacity-100 mr-2 transition-all duration-300 transform -translate-x-3 group-hover:translate-x-0">→</span>
              <span data-i18n="footer.privacy-policy">{{ t('footer.privacy-policy') }}</span>
            </a>
          </li>
          <li>
            <a href="/terms"
               class="group flex items-center justify-start text-sm text-[var(--theme-text-secondary,#666666)] hover:text-[var(--color-primary-600,#c4a428)] transition-all duration-300 hover:translate-x-1">
              <span class="opacity-0 group-hover:opacity-100 mr-2 transition-all duration-300 transform -translate-x-3 group-hover:translate-x-0">→</span>
              <span data-i18n="footer.terms-of-service">{{ t('footer.terms-of-service') }}</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <!-- 底部版權資訊 -->
  <div class="border-t border-[var(--theme-border,#e5e5e5)] pt-8 text-center">
    <div class="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-8 text-sm text-[var(--theme-text-secondary,#666666)]">
      <p>&copy; Heaven Spa 2024.</p>
      <p>位於台北，台灣。</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CompanySettingData } from '@/types'
import { onMounted, onUnmounted, ref } from 'vue'
import Facebook from '@/components/icon/Facebook.vue'
import Instagram from '@/components/icon/Instagram.vue'
import Line from '@/components/icon/Line.vue'
import Telegram from '@/components/icon/Telegram.vue'
import Threads from '@/components/icon/Threads.vue'
import X from '@/components/icon/X.vue'
import { getCurrentLocale, t } from '@/utils/i18n'

const companySetting = ref<CompanySettingData | null>(null)

// 獲取公司設定
async function fetchCompanySetting() {
  try {
    const locale = getCurrentLocale()
    console.log('Fetching company setting for locale:', locale)

    const response = await fetch(`/api/company-setting?lang=${locale}`)
    if (response.ok) {
      const data = await response.json()
      companySetting.value = data
      console.log('Company setting updated:', data)
    } else {
      console.error('Failed to fetch company setting:', response.status)
    }
  } catch (error) {
    console.error('Failed to fetch company setting:', error)
  }
}

// 監聽語言變更事件
function handleLocaleChange(event: CustomEvent) {
  console.log('Language changed to:', event.detail)
  fetchCompanySetting()
}

onMounted(() => {
  fetchCompanySetting()

  // 監聽自定義語言變更事件
  window.addEventListener('localechange', handleLocaleChange as EventListener)
})

onUnmounted(() => {
  window.removeEventListener('localechange', handleLocaleChange as EventListener)
})
</script>

<style>
/* 動畫效果 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeInUp {
  animation: fadeInUp 0.6s ease forwards;
}

.animation-delay-200 {
  animation-delay: 0.2s;
}

.animation-delay-400 {
  animation-delay: 0.4s;
}

.animation-delay-600 {
  animation-delay: 0.6s;
}
</style>