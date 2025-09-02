<template>
  <div class="language-switcher">
    <button
      class="w-12 h-12 rounded-full border-none bg-transparent flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out relative overflow-hidden hover:scale-110 active:scale-95 language-toggle"
      @click="toggleLanguage"
      :title="`Switch to ${getNextLanguageName()}`"
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
} from '@/utils/i18n'

const currentLocale = ref<Locale>('zh-tw')

function toggleLanguage() {
  // Find current index and get next language
  const currentIndex = locales.indexOf(currentLocale.value)
  const nextIndex = (currentIndex + 1) % locales.length
  const nextLocale = locales[nextIndex]
  
  console.log('Switching from', currentLocale.value, 'to', nextLocale)
  
  // Update the reactive ref first
  currentLocale.value = nextLocale
  
  // Set the locale (saves to localStorage and cookie)
  setLocale(nextLocale)
  
  // Navigate to the correct URL based on Astro's i18n routing
  const currentUrl = window.location
  let newPath = currentUrl.pathname
  
  // Remove existing language prefix
  if (newPath.startsWith('/en')) {
    newPath = newPath.substring(3) || '/'
  }
  
  // Add new language prefix if needed
  if (nextLocale === 'en') {
    newPath = '/en' + (newPath === '/' ? '' : newPath)
  }
  
  // Navigate to the new URL
  const newUrl = currentUrl.origin + newPath + currentUrl.search + currentUrl.hash
  console.log('Navigating to:', newUrl)
  
  window.location.href = newUrl
}

function getCurrentLanguageCode(): string {
  const codes = {
    'zh-tw': 'TW',
    'en': 'EN'
  }
  return codes[currentLocale.value] || currentLocale.value.toUpperCase()
}

function getNextLanguageName(): string {
  const currentIndex = locales.indexOf(currentLocale.value)
  const nextIndex = (currentIndex + 1) % locales.length
  const nextLocale = locales[nextIndex]
  return getLocaleName(nextLocale)
}

onMounted(() => {
  // Detect locale from URL first (Astro's routing)
  const currentPath = window.location.pathname
  if (currentPath.startsWith('/en')) {
    currentLocale.value = 'en'
  } else {
    currentLocale.value = 'zh-tw'
  }
  
  console.log('Language switcher mounted, current locale:', currentLocale.value)
  console.log('Current path:', currentPath)
  
  // Sync to localStorage and cookies
  setLocale(currentLocale.value)
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
