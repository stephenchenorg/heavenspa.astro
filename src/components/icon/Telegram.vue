<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="currentColor"
    class="telegram-icon"
    :class="className"
    v-bind="$attrs"
  >
    <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"/>
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
.telegram-icon {
  color: var(--theme-text, #000000);
  transition: all 0.3s ease;
}

.telegram-icon:hover {
  color: var(--color-primary-600, #c4a428);
  transform: scale(1.1);
}
</style>
