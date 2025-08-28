<template>
  <div class="language-switcher">
    <button
      class="language-toggle"
      :class="{ active: isOpen }"
      @click="toggleDropdown"
    >
      <svg
        class="earth-icon"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
        <path d="M2 12h20"/>
      </svg>
      <svg
        class="chevron"
        :class="{ rotated: isOpen }"
        width="12"
        height="12"
        viewBox="0 0 12 12"
      >
        <path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="2" fill="none" />
      </svg>
    </button>

    <div class="language-dropdown" :class="{ show: isOpen }">
      <button
        v-for="locale in locales"
        :key="locale"
        class="language-option"
        :class="{ active: locale === currentLocale }"
        @click="changeLocale(locale)"
      >
        {{ getLocaleName(locale) }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Locale } from '@/utils/i18n'
import { onMounted, onUnmounted, ref } from 'vue'
import {
  getCurrentLocale,
  getLocaleName,

  locales,
  setLocale,
} from '@/utils/i18n'

const currentLocale = ref<Locale>('zh-tw')
const isOpen = ref(false)

function toggleDropdown() {
  isOpen.value = !isOpen.value
}

function changeLocale(locale: Locale) {
  currentLocale.value = locale
  setLocale(locale)
  isOpen.value = false

  // 重新載入頁面以應用新語言
  window.location.reload()
}

function handleClickOutside(event: Event) {
  const target = event.target as Element
  if (!target.closest('.language-switcher')) {
    isOpen.value = false
  }
}

function handleEscape(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    isOpen.value = false
  }
}

onMounted(() => {
  currentLocale.value = getCurrentLocale()
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleEscape)
})
</script>

<style scoped>
.language-switcher {
  position: relative;
  display: inline-block;
}

.language-toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 8px 12px;
  border: 1px solid transparent;
  border-radius: 25px;
  background: transparent;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.1rem;
  font-weight: 500;
  min-width: 60px;
  justify-content: center;
  letter-spacing: 0.5px;
  position: relative;
}

.language-toggle::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -2px;
  left: 0;
  background: white;
  transition: width 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.language-toggle:hover::after,
.language-toggle.active::after {
  width: 100%;
}

.language-toggle:hover {
  opacity: 1;
}

.language-toggle.active {
  opacity: 1;
}

.earth-icon {
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.chevron {
  transition: transform 0.3s ease;
  flex-shrink: 0;
}

.chevron.rotated {
  transform: rotate(180deg);
}

.language-dropdown {
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(196, 149, 108, 0.2);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  z-index: 1000;
  overflow: hidden;
}

.language-dropdown.show {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.language-option {
  display: block;
  width: 100%;
  padding: 0.75rem 1rem;
  border: none;
  background: none;
  text-align: left;
  cursor: pointer;
  color: #333;
  font-size: 0.85rem;
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
}

.language-option:hover {
  background: rgba(196, 149, 108, 0.1);
  border-left-color: #D7AE54;
  padding-left: 1.25rem;
}

.language-option.active {
  background: rgba(196, 149, 108, 0.25);
  border-left-color: #D7AE54;
  color: #D7AE54;
  font-weight: 600;
}

.main-nav.scrolled .language-toggle {
  background: rgba(196, 149, 108, 0.1);
  border: 1px solid rgba(196, 149, 108, 0.3);
  color: #D7AE54;
  min-width: 60px;
}

/* 手機版選單中的語系選擇器樣式 */
.mobile-language .language-toggle {
  background: rgba(196, 149, 108, 0.1);
  border: 1px solid rgba(196, 149, 108, 0.3);
  color: #D7AE54;
  min-width: 60px;
}

.mobile-language .language-toggle::after {
  background: #D7AE54;
}

.mobile-language .language-toggle:hover {
  background: rgba(196, 149, 108, 0.2);
  border-color: rgba(196, 149, 108, 0.5);
}

/* 響應式設計 */
@media (max-width: 768px) {
  .language-toggle {
    min-width: auto;
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }

  .earth-icon {
    width: 16px;
    height: 16px;
  }

  .chevron {
    width: 10px;
    height: 10px;
  }

  /* 手機版選單內的語系選擇器 */
  .mobile-language .language-toggle {
    min-width: 50px;
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
  }

  .mobile-language .earth-icon {
    width: 18px;
    height: 18px;
  }
}
</style>
