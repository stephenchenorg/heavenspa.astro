<template>
  <div class="language-switcher">
    <button
      class="w-12 h-12 rounded-full border-none bg-transparent flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out relative overflow-hidden hover:scale-110 active:scale-95 language-toggle"
      :title="`Switch to ${getNextLanguageName()}`"
      @click="toggleLanguage"
    >
      <span class="text-sm font-medium tracking-wide language-text">
        {{ getCurrentLanguageCode() }}
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import type { Locale } from '@/utils/i18n'
import { onMounted, ref } from 'vue'
import {
  getCurrentLocale,
  getLocaleName,
  locales,
  setLocale,
  t,
} from '@/utils/i18n'

const currentLocale = ref<Locale>('zh-tw')

function toggleLanguage() {
  // Find current index and get next language
  const currentIndex = locales.indexOf(currentLocale.value)
  const nextIndex = (currentIndex + 1) % locales.length
  const nextLocale = locales[nextIndex]

  // Set the locale (saves to localStorage and cookie)
  setLocale(nextLocale)

  // 確保語系變更事件被觸發
  document.dispatchEvent(new CustomEvent('languageChanged', { 
    detail: { locale: nextLocale } 
  }))

  // 使用 URL 參數來確保 middleware 能立即識別新語系
  // 這樣 middleware 會以最高優先級處理 URL 參數中的語系設定
  const url = new URL(window.location.href)
  url.searchParams.set('lang', nextLocale)
  
  // 直接導航到帶有語系參數的 URL
  // 這確保 middleware 會立即使用正確的語系
  window.location.href = url.toString()
}

function getCurrentLanguageCode(): string {
  const codes = {
    'zh-tw': 'TW',
    en: 'EN',
  }
  return codes[currentLocale.value] || currentLocale.value.toUpperCase()
}

function getNextLanguageName(): string {
  const currentIndex = locales.indexOf(currentLocale.value)
  const nextIndex = (currentIndex + 1) % locales.length
  const nextLocale = locales[nextIndex]
  return getLocaleName(nextLocale)
}

function updatePageLanguage(locale: Locale) {
  // Find all elements with data-i18n attributes and update them
  const translatableElements = document.querySelectorAll('[data-i18n]')

  translatableElements.forEach(element => {
    const key = element.getAttribute('data-i18n')
    if (key) {
      const translatedText = t(key, locale)
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        (element as HTMLInputElement).placeholder = translatedText
      } else {
        element.textContent = translatedText
      }
    }
  })

  // Update HTML lang attribute
  document.documentElement.setAttribute('lang', locale)
}

onMounted(() => {
  // Get saved locale from localStorage/cookies
  currentLocale.value = getCurrentLocale()

  // Set initial HTML lang attribute
  document.documentElement.setAttribute('lang', currentLocale.value)

  // Listen for language change events from other components
  document.addEventListener('languageChanged', (e: any) => {
    currentLocale.value = e.detail.locale
  })
})
</script>

<style scoped>
.language-text {
  color: var(--theme-nav-text, #000000);
  transition: all 0.3s ease;
  user-select: none;
}

/* 響應式設計 */
@media (max-width: 768px) {
  .language-toggle {
    width: 44px;
    height: 44px;
  }

  .language-text {
    font-size: 0.75rem;
  }
}
</style>
