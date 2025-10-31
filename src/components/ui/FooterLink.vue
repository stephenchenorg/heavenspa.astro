<template>
  <li>
    <a
      :href
      class="footer-link group flex items-center justify-start text-sm text-[var(--theme-text-secondary,#666666)] hover:text-[var(--color-primary-600,#c4a428)] hover:translate-x-1"
    >
      <span class="arrow w-0 overflow-hidden opacity-0 group-hover:opacity-100 group-hover:w-auto group-hover:mr-2 transition-all duration-300">→</span>
      <span>{{ text }}</span>
    </a>
  </li>
</template>

<script setup lang="ts">
defineProps<{
  href: string
  text: string
}>()
</script>

<style scoped>
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

/* 針對手機版強化 :active 效果 */
@media (max-width: 768px) {
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
