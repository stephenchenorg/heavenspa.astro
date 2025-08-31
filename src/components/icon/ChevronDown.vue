<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 12 12"
    :class="className"
    v-bind="$attrs"
  >
    <path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="2" fill="none" />
  </svg>
</template>

<script setup lang="ts">
export interface Props {
  size?: string | number
  className?: string
}

const {
  size = '12',
  className = '',
} = defineProps<Props>()
</script>
