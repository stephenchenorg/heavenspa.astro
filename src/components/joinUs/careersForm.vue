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
          <p class="text-sm font-medium">{{ t('careers.form.successMessage') }}</p>
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
          <p class="text-sm font-medium">{{ t('careers.form.errorMessage') }}</p>
        </div>
      </div>
    </div>
    <form class="space-y-4 sm:space-y-6" :style="{ color: 'var(--theme-text)' }" @submit.prevent="submitForm">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block font-medium mb-2 text-base sm:text-lg" :style="{ color: 'var(--theme-text)' }">
            {{ t('careers.form.name') }}
          </label>
          <input
            v-model="form.name"
            type="text"
            :placeholder="t('careers.form.namePlaceholder')"
            required
            class="w-full p-2 sm:p-3 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
            :style="inputStyle"
          >
        </div>
        <div>
          <label class="block font-medium mb-2 text-base sm:text-lg" :style="{ color: 'var(--theme-text)' }">
            {{ t('careers.form.phone') }}
          </label>
          <input
            v-model="form.phone"
            type="tel"
            :placeholder="t('careers.form.phonePlaceholder')"
            required
            class="w-full p-2 sm:p-3 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
            :style="inputStyle"
          >
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block font-medium mb-2 text-base sm:text-lg" :style="{ color: 'var(--theme-text)' }">
            {{ t('careers.form.height') }}
          </label>
          <input
            v-model="form.height"
            type="number"
            :placeholder="t('careers.form.heightPlaceholder')"
            required
            min="100"
            max="250"
            class="w-full p-2 sm:p-3 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
            :style="inputStyle"
          >
        </div>
        <div>
          <label class="block font-medium mb-2 text-base sm:text-lg" :style="{ color: 'var(--theme-text)' }">
            {{ t('careers.form.weight') }}
          </label>
          <input
            v-model="form.weight"
            type="number"
            :placeholder="t('careers.form.weightPlaceholder')"
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
            {{ t('careers.form.birthday') }}
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
            {{ t('careers.form.social') }}
          </label>
          <input
            v-model="form.social"
            type="text"
            :placeholder="t('careers.form.socialPlaceholder')"
            required
            class="w-full p-2 sm:p-3 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
            :style="inputStyle"
          >
        </div>
      </div>

      <div>
        <label class="block font-medium mb-2 text-base sm:text-lg" :style="{ color: 'var(--theme-text)' }">
          {{ t('careers.form.email') }}
        </label>
        <input
          v-model="form.email"
          type="email"
          :placeholder="t('careers.form.emailPlaceholder')"
          required
          class="w-full p-2 sm:p-3 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
          :style="inputStyle"
        >
      </div>

      <div>
        <label class="block font-medium mb-2 text-base sm:text-lg" :style="{ color: 'var(--theme-text)' }">
          {{ t('careers.form.address') }}
        </label>
        <input
          v-model="form.address"
          type="text"
          :placeholder="t('careers.form.addressPlaceholder')"
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
        <span v-if="!isSubmitting">{{ t('careers.form.submit') }}</span>
        <span v-else>{{ t('careers.form.submitting') }}</span>
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { initTranslations, t } from '@/utils/i18n'

// 初始化翻譯
await initTranslations()

// 表單資料
const form = reactive({
  name: '卡卡卡',
  phone: '0987654321',
  email: 'admin@admin.com',
  height: '168',
  weight: '58',
  social: 'line',
  birthday: '1998-01-01',
  address: '台北市大安區復興南路一段390號6樓',
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
      throw new Error(result.errors?.[0]?.message || '提交失敗，請稍後再試。')
    }

    // 成功
    console.log('Form submitted successfully!')
    showSuccess.value = true
    console.log('showSuccess set to:', showSuccess.value)
    resetForm()

    // 5秒後隱藏成功訊息
    setTimeout(() => {
      showSuccess.value = false
    }, 5000)
  } catch (error) {
    console.error('提交錯誤:', error)
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

// 監聽主題變化
onMounted(() => {
  updateTheme()

  // 監聽主題變化事件
  document.addEventListener('themeChanged', updateTheme)

  // 組件卸載時清理事件監聽器
  return () => {
    document.removeEventListener('themeChanged', updateTheme)
  }
})
</script>

<style scoped>
/* Placeholder 顏色在不同主題下的樣式 */
input::placeholder {
  color: var(--placeholder-color, #666666);
  opacity: 0.7;
}

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
