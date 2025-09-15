<template>
  <div class="simple-dropdown language-switcher" :class="{ active: isDropdownOpen }">
    <button
      type="button"
      class="dropdown-btn cursor-pointer flex items-center bg-transparent border-none p-0 text-lg font-medium tracking-wide"
      style="color: var(--theme-nav-text, #000000);"
      :title="`Current language: ${getCurrentLanguageName()}`"
      @click="toggleDropdown"
    >
      <Globe :size="18" class="mr-2" />
      <span class="text-lg font-medium tracking-wide">{{ getCurrentLanguageName() }}</span>
      <svg class="dropdown-icon w-4 h-4 ml-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </button>

    <div class="dropdown-content">
      <a
        v-for="locale in locales"
        :key="locale"
        href="#"
        class="dropdown-link"
        :class="{ 'current-menu-item': locale === currentLocale }"
        @click="switchToLanguage(locale)"
      >
        {{ getLocaleName(locale) }}
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Locale } from '@/utils/i18n'
import { onMounted, ref } from 'vue'
import Globe from '@/components/icon/Globe.vue'
import {
  getCurrentLocale,
  getLocaleName,
  locales,
  setLocale,
  t,
} from '@/utils/i18n'

const currentLocale = ref<Locale>('zh-tw')

const isDropdownOpen = ref(false)

function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value
}

function switchToLanguage(locale: Locale) {
  // Close dropdown
  isDropdownOpen.value = false

  // Don't switch if already current language
  if (locale === currentLocale.value) return

  // Set the locale (saves to localStorage and cookie)
  setLocale(locale)

  // 確保語系變更事件被觸發
  document.dispatchEvent(new CustomEvent('languageChanged', {
    detail: { locale },
  }))

  // 使用 URL 參數來確保 middleware 能立即識別新語系
  // 這樣 middleware 會以最高優先級處理 URL 參數中的語系設定
  const url = new URL(window.location.href)
  url.searchParams.set('lang', locale)

  // 直接導航到帶有語系參數的 URL
  // 這確保 middleware 會立即使用正確的語系
  window.location.href = url.toString()
}

function getCurrentLanguageName(): string {
  return getLocaleName(currentLocale.value)
}

function closeDropdown() {
  isDropdownOpen.value = false
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

  // Close dropdown when clicking outside
  document.addEventListener('click', e => {
    const target = e.target as HTMLElement
    if (!target.closest('.language-switcher')) {
      closeDropdown()
    }
  })

  // Close dropdown on escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeDropdown()
    }
  })
})
</script>

<style scoped>
.language-switcher {
  position: relative;
  z-index: 1000;
}

.language-switcher .dropdown-btn {
  color: var(--theme-nav-text, #000000);
  transition: all 0.3s ease;
  user-select: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.language-switcher .dropdown-btn:focus {
  outline: none;
}

.language-switcher .dropdown-btn:hover {
  color: var(--theme-nav-hover, #D7AE54);
}

.current-menu-item {
  background-color: rgba(215, 174, 84, 0.1) !important;
  color: #D7AE54 !important;
  font-weight: 600;
}

.current-menu-item:hover {
  background-color: rgba(215, 174, 84, 0.2) !important;
}

/* 響應式設計 */
@media (max-width: 768px) {
  .language-switcher .dropdown-btn {
    font-size: 0.875rem;
  }

  .language-switcher .dropdown-content {
    min-width: 150px;
  }
}

/* 深色主題樣式 */
:global(.dark) .current-menu-item,
:global(.dark-theme) .current-menu-item,
:global([data-theme="dark"]) .current-menu-item {
  background-color: rgba(215, 174, 84, 0.2) !important;
  color: #D7AE54 !important;
}

:global(.dark) .current-menu-item:hover,
:global(.dark-theme) .current-menu-item:hover,
:global([data-theme="dark"]) .current-menu-item:hover {
  background-color: rgba(215, 174, 84, 0.3) !important;
}
</style>
