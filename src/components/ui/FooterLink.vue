<template>
  <li>
    <a
      :href
      :target="target"
      :rel="rel"
      :title="title"
      :class="[
        'footer-link group flex items-center justify-start text-sm',
        'text-[var(--theme-text-secondary,#666666)]',
        'hover:text-[var(--color-primary-600,#c4a428)]',
        'hover:translate-x-1',
        {
          'is-bouncing': isBouncing,
          'gap-2': hasIcon,
          'has-icon': hasIcon
        }
      ]"
      @click="handleClick"
    >
      <span v-if="!hasIcon" class="arrow w-0 overflow-hidden opacity-0 group-hover:opacity-100 group-hover:w-auto group-hover:mr-2 transition-all duration-300">→</span>
      <div v-if="hasIcon" class="w-4 h-4 transition-transform duration-300">
        <slot name="icon" />
      </div>
      <span :class="hasIcon ? 'font-normal tracking-wide' : ''">{{ text }}</span>
    </a>
  </li>
</template>

<script setup lang="ts">
import { ref, useSlots } from 'vue'

const props = defineProps<{
  href: string
  text: string
  target?: string
  rel?: string
  title?: string
}>()

const slots = useSlots()
const hasIcon = ref(!!slots.icon)

const isBouncing = ref(false)

function handleClick() {
  // 觸發彈跳動畫
  isBouncing.value = true

  // 0.6秒後移除動畫 class（動畫播放完成）
  setTimeout(() => {
    isBouncing.value = false
  }, 600)
}
</script>

<style scoped>
/* 基礎樣式 */
.footer-link {
  -webkit-tap-highlight-color: rgba(196, 164, 40, 0.3);
  -webkit-touch-callout: none;
  user-select: none;
  position: relative;
  transition: all 0.15s ease;
}

/* 呼吸動畫 - 淡入淡出 + 文字變色 */
@keyframes breathe {
  0%, 100% {
    opacity: 0.7;
    color: var(--theme-text-secondary, #666666);
  }
  50% {
    opacity: 1;
    color: #c4a428;
  }
}

/* 點擊彈跳動畫 - 更明顯的彈跳 */
@keyframes bounceTap {
  0%, 100% {
    transform: translateY(0);
  }
  25% {
    transform: translateY(-0.5rem);
  }
  50% {
    transform: translateY(-0.25rem);
  }
  75% {
    transform: translateY(-0.1rem);
  }
}

/* 背景閃爍動畫 */
@keyframes flashBg {
  0% {
    background-color: rgba(196, 164, 40, 0);
  }
  20% {
    background-color: rgba(196, 164, 40, 0.6);
  }
  100% {
    background-color: rgba(196, 164, 40, 0);
  }
}

/* ===== 觸控裝置專屬效果 - 使用 CSS Media Query 偵測 ===== */
/* 偵測條件: 主要輸入裝置不支援 hover 且是粗略指標（手指） */
@media (hover: none) and (pointer: coarse) {
  /* 觸控裝置持續呼吸動畫 - 無限循環 */
  .footer-link {
    animation: breathe 3s ease-in-out infinite;
  }

  /* 觸控裝置 :active 效果 */
  .footer-link:active {
    background-color: rgba(196, 164, 40, 0.5) !important;
    color: #c4a428 !important;
    padding: 0.5rem 0.75rem !important;
    margin: -0.5rem -0.75rem !important;
    border-radius: 0.5rem !important;
    transform: translateX(0.5rem) scale(0.98) !important;
    box-shadow: 0 4px 12px rgba(196, 164, 40, 0.6) !important;
  }

  /* 觸控裝置 Active 時箭頭顯示 - 只有沒有 icon 時才顯示 */
  .footer-link:not(.has-icon):active .arrow {
    width: auto !important;
    margin-right: 0.5rem !important;
    opacity: 1 !important;
  }

  /* 觸控裝置點擊後彈跳效果 - 不依賴 :active 狀態 */
  .footer-link.is-bouncing {
    animation: bounceTap 0.6s ease-in-out, flashBg 0.8s ease-out !important;
    color: #c4a428 !important;
    padding: 0.5rem 0.75rem;
    margin: -0.5rem -0.75rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 12px rgba(196, 164, 40, 0.4);
  }

  .footer-link.is-bouncing:not(.has-icon) .arrow {
    width: auto !important;
    margin-right: 0.5rem !important;
    opacity: 1 !important;
  }
}
</style>
