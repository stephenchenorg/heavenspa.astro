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
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>
              <span class="font-normal tracking-wide">Facebook</span>
            </a>
          </li>
          <li v-if="companySetting?.ig_link">
            <a :href="companySetting.ig_link"
               class="flex items-center gap-2 text-sm text-[var(--theme-text-secondary,#666666)] hover:text-[var(--color-primary-600,#c4a428)] transition-all duration-300 hover:scale-105"
               target="_blank" rel="noopener noreferrer" title="Instagram">
              <div class="w-4 h-4 transition-transform duration-300 group-hover:scale-110">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
              <span class="font-normal tracking-wide">Instagram</span>
            </a>
          </li>
          <li v-if="companySetting?.line_link">
            <a :href="companySetting.line_link"
               class="flex items-center gap-2 text-sm text-[var(--theme-text-secondary,#666666)] hover:text-[var(--color-primary-600,#c4a428)] transition-all duration-300 hover:scale-105"
               target="_blank" rel="noopener noreferrer" title="Line">
              <div class="w-4 h-4 transition-transform duration-300 group-hover:scale-110">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.017 24C18.624 24 24 18.624 24 12.017S18.624.033 12.017.033 0 5.409 0 12.017 5.376 24 12.017 24zM12 3.273c4.8 0 8.727 3.927 8.727 8.727S16.8 20.727 12 20.727 3.273 16.8 3.273 12 7.2 3.273 12 3.273zm-4.8 6.545H5.455v4.364h1.745zm2.182 0H7.636v4.364h1.746zm2.182 0H9.818v4.364h1.746zm2.181 0h1.746v4.364h-1.746z"/>
                </svg>
              </div>
              <span class="font-normal tracking-wide">Line</span>
            </a>
          </li>
          <li v-if="companySetting?.twitter_link">
            <a :href="companySetting.twitter_link"
               class="flex items-center gap-2 text-sm text-[var(--theme-text-secondary,#666666)] hover:text-[var(--color-primary-600,#c4a428)] transition-all duration-300 hover:scale-105"
               target="_blank" rel="noopener noreferrer" title="Twitter">
              <div class="w-4 h-4 transition-transform duration-300 group-hover:scale-110">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </div>
              <span class="font-normal tracking-wide">Twitter</span>
            </a>
          </li>
          <li v-if="companySetting?.tg_link">
            <a :href="companySetting.tg_link"
               class="flex items-center gap-2 text-sm text-[var(--theme-text-secondary,#666666)] hover:text-[var(--color-primary-600,#c4a428)] transition-all duration-300 hover:scale-105"
               target="_blank" rel="noopener noreferrer" title="Telegram">
              <div class="w-4 h-4 transition-transform duration-300 group-hover:scale-110">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"/>
                </svg>
              </div>
              <span class="font-normal tracking-wide">Telegram</span>
            </a>
          </li>
          <li v-if="companySetting?.threads_link">
            <a :href="companySetting.threads_link"
               class="flex items-center gap-2 text-sm text-[var(--theme-text-secondary,#666666)] hover:text-[var(--color-primary-600,#c4a428)] transition-all duration-300 hover:scale-105"
               target="_blank" rel="noopener noreferrer" title="Threads">
              <div class="w-4 h-4 transition-transform duration-300 group-hover:scale-110">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-.584-2.043-1.496-3.467-2.71-4.228-1.21-.761-2.887-1.112-4.991-1.092v.001c-3.036.023-5.266 1.063-6.626 3.09-1.315 1.997-1.982 4.453-1.982 7.3-.017 2.857.673 5.312 2.048 7.287 1.41 2.03 3.666 3.07 6.708 3.09v.001c1.59.006 2.97-.224 4.098-.679 1.128-.455 2.046-1.146 2.727-2.052.68-.906 1.099-1.984 1.24-3.202.13-1.12.075-2.317-.161-3.552-.236-1.234-.653-2.4-1.240-3.467-.587-1.068-1.332-1.997-2.211-2.76-.88-.763-1.89-1.347-3-1.735-.554-.194-1.124-.33-1.704-.405-.58-.075-1.167-.091-1.754-.047-.587.043-1.171.135-1.746.273-.575.139-1.14.327-1.688.563l-.859-1.734c.636-.271 1.295-.49 1.973-.657.677-.167 1.369-.284 2.069-.35.7-.066 1.408-.083 2.115-.049.707.033 1.412.125 2.106.274 1.389.298 2.67 1.01 3.805 2.115 1.135 1.104 2.046 2.516 2.708 4.196.662 1.68.961 3.57.889 5.616-.071 2.046-.679 4.019-1.805 5.867-1.126 1.848-2.784 3.314-4.927 4.353-2.143 1.04-4.682 1.566-7.555 1.566z"/>
                </svg>
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
import { ref, onMounted, onUnmounted } from 'vue'
import { getCurrentLocale, t } from '@/utils/i18n'
import type { CompanySettingData } from '@/types'

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