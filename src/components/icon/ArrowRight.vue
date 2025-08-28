<template>
  <svg
    :width="size"
    :height="size"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 263.82 49.1"
    :class="className"
    v-bind="$attrs"
  >
    <g id="圖層_2" data-name="圖層 2">
      <g id="圖層_1-2" data-name="圖層 1">
        <g id="圖層_2-2" data-name="圖層 2">
          <g id="圖層_1-2-2" data-name="圖層 1-2">
            <g id="_0pqL0h.tif" data-name=" 0pqL0h.tif">
              <path 
                fill="currentColor" 
                d="M0,49.1q122.32-.09,244.64-.3c3.23,0,10.37,0,16.71.05a2.4,2.4,0,0,0,1-4.61c-8.58-3.66-25.27-10.49-28.66-11.85C206.4,20.18,194.2,14.39,168,3.12c-15.47-6.64-13.25-2.38-13.7,9.81-1,26.27-1,29.12-27.76,29.15Q63.27,42.17,0,42.31Z"
              />
            </g>
          </g>
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
  className = ''
} = defineProps<Props>()
</script>