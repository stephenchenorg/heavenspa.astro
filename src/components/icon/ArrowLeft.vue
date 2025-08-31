<template>
  <svg
    :width="size"
    :height="size"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 263.77 49.1"
    :class="className"
    v-bind="$attrs"
  >
    <g id="圖層_2" data-name="圖層 2">
      <g id="圖層_1-2" data-name="圖層 1">
        <g id="_0pqL0h.tif" data-name="0pqL0h.tif">
          <path
            fill="currentColor"
            d="M263.77,49.1Q141.45,49,19.13,48.8c-3.23,0-10.37,0-16.71.05a2.4,2.4,0,0,1-1-4.61C10,40.58,26.69,33.75,30.08,32.39c27.29-12.21,39.49-18,65.69-29.27,15.47-6.64,13.25-2.38,13.7,9.81,1,26.27,1,29.12,27.76,29.15q63.27.08,126.54.23Z"
          />
        </g>
      </g>
    </g>
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
