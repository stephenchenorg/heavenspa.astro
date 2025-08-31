<template>
  <svg
    :width="size"
    :height="size"
    aria-label="X"
    role="img"
    viewBox="0 0 24 24"
    fill="#000000"
    :class="className"
    v-bind="$attrs"
  >
    <path d="m18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
</template>

<script setup lang="ts">
export interface Props {
  size?: string | number
  className?: string
}

const {
  size = '40',
  className = '',
} = defineProps<Props>()
</script>
