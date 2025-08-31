<template>
  <svg
    :width="size"
    :height="size"
    fill="currentColor"
    viewBox="0 0 24 24"
    :class="className"
    v-bind="$attrs"
  >
    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
    <path d="m18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
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
