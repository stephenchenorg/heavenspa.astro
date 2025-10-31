<template>
  <li>
    <a
      :href
      :class="[
        'footer-link group flex items-center justify-start text-sm',
        'text-[var(--theme-text-secondary,#666666)]',
        'hover:text-[var(--color-primary-600,#c4a428)]',
        'hover:translate-x-1',
        {
          'is-bouncing': isBouncing
        }
      ]"
      @click="handleClick"
    >
      <span class="arrow w-0 overflow-hidden opacity-0 group-hover:opacity-100 group-hover:w-auto group-hover:mr-2 transition-all duration-300">→</span>
      <span>{{ text }}</span>
    </a>
  </li>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  href: string
  text: string
}>()

const isBouncing = ref(false)

const handleClick = () => {
  // 只在手機版觸發彈跳動畫
  if (window.innerWidth <= 768) {
    isBouncing.value = true

    // 0.6秒後移除動畫 class（動畫播放完成）
    setTimeout(() => {
      isBouncing.value = false
    }, 600)
  }
}
</script>

<style scoped>
/* 手機版專屬效果 */
@media (max-width: 768px) {

  .footer-link {
    -webkit-tap-highlight-color: rgba(196, 164, 40, 0.3);
    -webkit-touch-callout: none;
    user-select: none;
    position: relative;
    transition: all 0.15s ease;
  }

  /* 手機版和桌面版 - 使用 :active 偽類 */
  .footer-link:active {
    background-color: rgba(196, 164, 40, 0.5) !important;
    color: #c4a428 !important;
    padding: 0.5rem 0.75rem !important;
    margin: -0.5rem -0.75rem !important;
    border-radius: 0.5rem !important;
    transform: translateX(0.5rem) scale(0.98) !important;
    box-shadow: 0 4px 12px rgba(196, 164, 40, 0.6) !important;
  }

  /* Active 時箭頭顯示 */
  .footer-link:active .arrow {
    width: auto !important;
    margin-right: 0.5rem !important;
    opacity: 1 !important;
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

  /* 手機版持續呼吸動畫 - 無限循環 */
  .footer-link {
    animation: breathe 3s ease-in-out infinite;
  }

  /* 手機版點擊後彈跳效果 - 不依賴 :active 狀態 */
  .footer-link.is-bouncing {
    animation: bounceTap 0.6s ease-in-out, flashBg 0.8s ease-out !important;
    color: #c4a428 !important;
    padding: 0.5rem 0.75rem;
    margin: -0.5rem -0.75rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 12px rgba(196, 164, 40, 0.4);
  }

  .footer-link.is-bouncing .arrow {
    width: auto !important;
    margin-right: 0.5rem !important;
    opacity: 1 !important;
  }

  /* 手機版強化 :active 即時反饋 */
  .footer-link:active {
    background-color: rgba(196, 164, 40, 0.6) !important;
  }
}

/* iOS Safari 特殊處理 */
@supports (-webkit-touch-callout: none) {
  .footer-link:active {
    background-color: rgba(196, 164, 40, 0.7) !important;
  }
}
</style>
