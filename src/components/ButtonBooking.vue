<template>
  <a
    href="https://page.line.me/284pgmle?openQrModal=true"
    target="_blank"
    rel="noopener noreferrer"
    :class="buttonClasses"
    :style="themeStyles"
  >
    <span data-i18n="buttons.book-now">立即預約</span>
  </a>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { createNestedT } from '@/utils/i18n'

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
})

const t = await createNestedT()

// Vue component for booking button with single size prop and theme awareness
interface Props {
  size?: 'sm' | 'md' | 'lg'
}

// Responsive size configurations - one size prop controls all breakpoints
const sizeConfigs = {
  sm: {
    base: 'px-3 py-2 w-[100px] h-[32px] text-xs',
    md: 'md:px-4 md:py-2 md:w-[120px] md:h-[36px] md:text-sm',
    lg: 'lg:px-5 lg:py-2.5 lg:w-[140px] lg:h-[40px] lg:text-sm',
  },
  md: {
    base: 'px-4 py-2.5 w-[120px] h-[40px] text-sm',
    md: 'md:px-6 md:py-3 md:w-[160px] md:h-[44px] md:text-base',
    lg: 'lg:px-8 lg:py-4 lg:w-[209px] lg:h-[56px] lg:text-base',
  },
  lg: {
    base: 'px-5 py-3 w-[140px] h-[44px] text-sm',
    md: 'md:px-8 md:py-4 md:w-[200px] md:h-[52px] md:text-base',
    lg: 'lg:px-10 lg:py-5 lg:w-[240px] lg:h-[64px] lg:text-lg',
  },
}

// Generate responsive classes
const buttonClasses = computed(() => {
  const config = sizeConfigs[props.size]
  return [
    'inline-flex items-center justify-center',
    'border-none rounded-[50px] font-medium tracking-wide cursor-pointer',
    'transition-all duration-300 ease-in-out no-underline text-center',
    'shadow-[2px_2px_5px_rgba(0,0,0,0.2)] backdrop-blur-[10px] opacity-80',
    'hover:-translate-y-0.5 hover:shadow-[2px_2px_5px_rgba(0,0,0,0.6)]',
    'active:translate-y-0',
    config.base,
    config.md,
    config.lg,
  ].join(' ')
})

// Theme-aware styles
const themeStyles = computed(() => ({
  backgroundColor: 'var(--color-primary-500)',
  color: 'var(--theme-bg)',
  // Ensure proper contrast in both light and dark themes
  filter: 'brightness(1)',
}))
</script>
