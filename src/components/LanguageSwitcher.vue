<template>
  <div class="relative inline-block">
    <button
      class="language-toggle"
      :class="{ active: isOpen }"
      @click="toggleDropdown"
    >
      <Globe 
        size="20"
        className="earth-icon"
      />
      <ChevronDown 
        size="12"
        className="chevron"
        :class="{ rotated: isOpen }"
      />
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
import { Globe, ChevronDown } from '@/components/icon'

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
.language-toggle::after {
  content: '';
  position: absolute;
  width: 0;
  height: 0.125rem;
  bottom: -0.125rem;
  left: 0;
  background: white;
  transition: all 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.language-toggle:hover::after,
.language-toggle.active::after {
  width: 100%;
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

.language-dropdown.show {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
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
  min-width: 120px;
}

/* 手機版選單中的語系選擇器樣式 */
.mobile-language .language-toggle {
  background: rgba(196, 149, 108, 0.1);
  border: 1px solid rgba(196, 149, 108, 0.3);
  color: #D7AE54;
  min-width: 120px;
}

.mobile-language .language-toggle::after {
  background: #d7ae54;
}

.mobile-language .language-toggle:hover {
  background: rgba(196, 149, 108, 0.2);
  border-color: rgba(196, 149, 108, 0.5);
}

/* 響應式設計 */
@media (max-width: 768px) {
  .language-toggle {
    min-width: auto;
    padding: 0.375rem 0.75rem;
    font-size: 0.875rem;
  }

  .earth-icon {
    width: 1rem;
    height: 1rem;
  }

  .chevron {
    width: 0.625rem;
    height: 0.625rem;
  }

  /* 手機版選單內的語系選擇器 */
  .mobile-language .language-toggle {
    min-width: 50px;
    padding: 0.625rem 1rem;
    font-size: 0.875rem;
  }

  .mobile-language .earth-icon {
    width: 18px;
    height: 18px;
  }
}
</style>
