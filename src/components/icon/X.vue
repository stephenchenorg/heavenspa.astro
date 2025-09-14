<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="currentColor"
    class="x-icon"
    :class="className"
  >
    <path d="m18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
</template>

<script setup lang="ts">
interface Props {
  size?: string | number;
  className?: string;
}

withDefaults(defineProps<Props>(), {
  size: 18,
  className: ''
});
</script>

<style scoped>
.x-icon {
  color: var(--theme-text, #000000);
  transition: all 0.3s ease;
}

.x-icon:hover {
  color: var(--color-primary-600, #c4a428);
  transform: scale(1.1);
}
</style>
