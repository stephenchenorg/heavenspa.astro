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

</style>
