<template>
  <div ref="element" />
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

const props = defineProps({
  sourceDoc: {
    type: String,
    default: null,
  },
})

const element = ref<HTMLElement | null>(null)

// 圖片自適應樣式
const imageStyles = `
<style>
  /* 圖片自適應樣式 */
  img {
    max-width: 100% !important;
    height: auto !important;
    display: block;
    margin: 1rem auto;
  }

  /* 處理帶有固定寬高的圖片 */
  img[width],
  img[height] {
    width: auto !important;
    max-width: 100% !important;
    height: auto !important;
  }

  /* 處理內聯樣式的圖片 */
  img[style*="width"],
  img[style*="height"] {
    max-width: 100% !important;
    height: auto !important;
  }

  /* 圖片容器 */
  figure,
  .image-container {
    max-width: 100%;
    overflow: hidden;
  }

  /* 表格內的圖片 */
  table img {
    max-width: 100%;
    height: auto;
  }

  /* 響應式表格 */
  table {
    width: 100%;
    max-width: 100%;
    overflow-x: auto;
    display: block;
  }

  /* 響應式影片/iframe */
  iframe,
  video {
    max-width: 100% !important;
    height: auto !important;
  }
</style>
`

onMounted(() => {
  if (!element.value || !props.sourceDoc) return

  const shadowHost = computed(
    () =>
      element.value!.shadowRoot || element.value!.attachShadow({ mode: 'open' })
  )

  // 將樣式和內容一起注入 Shadow DOM
  shadowHost.value.innerHTML = imageStyles + props.sourceDoc
})
</script>
