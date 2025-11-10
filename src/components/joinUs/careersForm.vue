<template>
  <div>
    <!-- 成功訊息 -->
    <div v-if="showSuccess" class="mb-4 p-4 rounded-lg bg-green-100 border border-green-400 text-green-700" style="z-index: 1000; position: relative;">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <p class="text-sm font-medium">{{ translatedText.successMessage }}</p>
        </div>
      </div>
    </div>
    <!-- 錯誤訊息 -->
    <div v-if="showError" class="mb-4 p-4 rounded-lg bg-red-100 border border-red-400 text-red-700">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <p class="text-sm font-medium">{{ translatedText.errorMessage }}</p>
        </div>
      </div>
    </div>
    <form class="space-y-4 sm:space-y-6" :style="{ color: 'var(--theme-text)' }" @submit.prevent="submitForm">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block font-medium mb-2 text-base sm:text-lg" :style="{ color: 'var(--theme-text)' }">
            <span class="text-red-500">*</span> {{ translatedText.name }}
          </label>
          <input
            v-model="form.name"
            type="text"
            required
            class="w-full p-2 sm:p-3 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
            :style="inputStyle"
          >
        </div>
        <div>
          <label class="block font-medium mb-2 text-base sm:text-lg" :style="{ color: 'var(--theme-text)' }">
            <span class="text-red-500">*</span> {{ translatedText.phone }}
          </label>
          <input
            v-model="form.phone"
            type="tel"
            required
            class="w-full p-2 sm:p-3 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
            :style="inputStyle"
          >
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block font-medium mb-2 text-base sm:text-lg" :style="{ color: 'var(--theme-text)' }">
            <span class="text-red-500">*</span> {{ translatedText.height }}
          </label>
          <input
            v-model="form.height"
            type="number"
            required
            min="100"
            max="250"
            class="w-full p-2 sm:p-3 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
            :style="inputStyle"
          >
        </div>
        <div>
          <label class="block font-medium mb-2 text-base sm:text-lg" :style="{ color: 'var(--theme-text)' }">
            <span class="text-red-500">*</span> {{ translatedText.weight }}
          </label>
          <input
            v-model="form.weight"
            type="number"
            required
            min="30"
            max="200"
            class="w-full p-2 sm:p-3 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
            :style="inputStyle"
          >
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block font-medium mb-2 text-base sm:text-lg" :style="{ color: 'var(--theme-text)' }">
            <span class="text-red-500">*</span> {{ translatedText.birthday }}
          </label>
          <input
            v-model="form.birthday"
            type="date"
            required
            class="w-full p-2 sm:p-3 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
            :style="inputStyle"
          >
        </div>
        <div>
          <label class="block font-medium mb-2 text-base sm:text-lg" :style="{ color: 'var(--theme-text)' }">
            <span class="text-red-500">*</span> {{ translatedText.social }}
          </label>
          <input
            v-model="form.social"
            type="text"
            required
            class="w-full p-2 sm:p-3 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
            :style="inputStyle"
          >
        </div>
      </div>

      <div>
        <label class="block font-medium mb-2 text-base sm:text-lg" :style="{ color: 'var(--theme-text)' }">
          <span class="text-red-500">*</span> {{ translatedText.email }}
        </label>
        <input
          v-model="form.email"
          type="email"
          required
          class="w-full p-2 sm:p-3 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
          :style="inputStyle"
        >
      </div>

      <div>
        <label class="block font-medium mb-2 text-base sm:text-lg" :style="{ color: 'var(--theme-text)' }">
          <span class="text-red-500">*</span> {{ translatedText.address }}
        </label>
        <input
          v-model="form.address"
          type="text"
          required
          class="w-full p-2 sm:p-3 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
          :style="inputStyle"
        >
      </div>

      <button
        type="submit"
        :disabled="isSubmitting"
        class="w-full py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg text-sm sm:text-base"
        :style="buttonStyle"
      >
        <span v-if="!isSubmitting">{{ translatedText.submit }}</span>
        <span v-else>{{ translatedText.submitting }}</span>
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { getCurrentLocale, initTranslations, t } from '@/utils/i18n'

// 響應式翻譯函數
const currentLocale = ref(getCurrentLocale())
const translatedText = ref({
  successMessage: '',
  errorMessage: '',
  name: '',
  phone: '',
  email: '',
  height: '',
  weight: '',
  social: '',
  birthday: '',
  address: '',
  submit: '',
  submitting: '',
})

// 初始化翻譯
function initializeTranslations() {
  initTranslations()
  updateTranslations()
}

// 更新翻譯文字
function updateTranslations() {
  const locale = getCurrentLocale()

  translatedText.value = {
    successMessage: t('careers.form.successMessage'),
    errorMessage: t('careers.form.errorMessage'),
    name: t('careers.form.name'),
    phone: t('careers.form.phone'),
    email: t('careers.form.email'),
    height: t('careers.form.height'),
    weight: t('careers.form.weight'),
    social: t('careers.form.social'),
    birthday: t('careers.form.birthday'),
    address: t('careers.form.address'),
    submit: t('careers.form.submit'),
    submitting: t('careers.form.submitting'),
  }
}

// 表單資料
const form = reactive({
  name: '',
  phone: '',
  email: '',
  height: '',
  weight: '',
  social: '',
  birthday: '',
  address: '',
})

// 狀態管理
const isSubmitting = ref(false)
const showSuccess = ref(false)
const showError = ref(false)
const currentTheme = ref('light')

// 樣式計算
const inputStyle = computed(() => ({
  background: 'var(--theme-bg)',
  color: 'var(--theme-text)',
  border: currentTheme.value === 'dark' ? '1px solid #444444' : '1px solid #e5e7eb',
}))

const buttonStyle = computed(() => ({
  background: 'var(--color-primary-500)',
  color: 'var(--theme-bg)',
}))

// 提交表單
async function submitForm() {
  isSubmitting.value = true
  showSuccess.value = false
  showError.value = false

  try {
    const response = await fetch('/api/join-us-careers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.errors?.[0]?.message || translatedText.value.errorMessage)
    }

    // 成功
    showSuccess.value = true
    resetForm()

    // 觸發 Google Ads 應徵表單轉換追蹤
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        'send_to': 'AW-17352893346/d_AyCO3Lv7sbEKLHwNJA'
      })
    }

    // 5秒後隱藏成功訊息
    setTimeout(() => {
      showSuccess.value = false
    }, 5000)
  } catch (error) {
    console.error('Submit error:', error)
    showError.value = true

    // 5秒後隱藏錯誤訊息
    setTimeout(() => {
      showError.value = false
    }, 5000)
  } finally {
    isSubmitting.value = false
  }
}

// 重置表單
function resetForm() {
  Object.keys(form).forEach(key => {
    form[key as keyof typeof form] = ''
  })
}

// 更新主題
function updateTheme() {
  currentTheme.value = document.body.classList.contains('dark-theme') ? 'dark' : 'light'
}

// 監聽語言變化
function handleLanguageChange() {
  const newLocale = getCurrentLocale()
  if (newLocale !== currentLocale.value) {
    currentLocale.value = newLocale
    updateTranslations()
  }
}

// 監聽主題變化
onMounted(() => {
  // 初始化翻譯
  initializeTranslations()

  updateTheme()

  // 監聽主題變化事件
  document.addEventListener('themeChanged', updateTheme)

  // 監聽語言變化事件（自定義事件）
  window.addEventListener('localechange', () => {
    initTranslations()
    updateTranslations()
  })

  // 監聽路由變化（用於 Astro i18n 路由）
  const observer = new MutationObserver(() => {
    handleLanguageChange()
  })

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['lang'],
  })

  // 也監聽 popstate 事件（瀏覽器前進後退）
  window.addEventListener('popstate', handleLanguageChange)

  // 組件卸載時清理事件監聽器
  return () => {
    document.removeEventListener('themeChanged', updateTheme)
    window.removeEventListener('localechange', updateTranslations)
    window.removeEventListener('popstate', handleLanguageChange)
    observer.disconnect()
  }
})
</script>

<style scoped>
/* 確保焦點狀態在兩種主題下都正常 */
input:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--color-primary-500);
}

/* hover 效果在不同主題下 */
input:hover {
  border-color: var(--color-primary-400) !important;
}

button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
