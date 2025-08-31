<template>
  <svg
    :width="size"
    :height="size"
    fill="currentColor"
    viewBox="0 0 24 24"
    :class="className"
    v-bind="$attrs"
  >
    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V20a1 1 0 01-1 1h-2C7.82 21 2 15.18 2 8V3z" />
  </svg>
</template>

<script setup lang="ts">
export interface Props {
  size?: string | number
  className?: string
}

const {
  size = '20',
  className = '',
} = defineProps<Props>()
</script>
