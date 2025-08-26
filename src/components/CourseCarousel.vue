<template>
  <section class="course-section">
    <div class="course-content-wrapper">
      <div class="course-header">
        <h1 class="course-main-title">COURSE</h1>
        <h2 class="course-sub-title">課程介紹</h2>
      </div>

      <div 
        class="course-carousel-main"
        ref="carouselContainer"
        @mousedown="handleDragStart"
        @mousemove="handleDragMove"
        @mouseup="handleDragEnd"
        @mouseleave="handleDragEnd"
        @touchstart="handleDragStart"
        @touchmove="handleDragMove"
        @touchend="handleDragEnd"
      >
        <div
          v-for="(course, index) in courses"
          :key="course.id"
          class="course-carousel-item"
          :class="{ active: index === currentIndex }"
          :data-index="index"
          :style="isDragging ? { transform: `translateX(${currentTranslate}px)` } : {}"
        >
          <!-- 圖片在上 -->
          <div class="w-full">
            <div class="course-carousel">
              <img :src="course.image" :alt="course.subtitle" />
            </div>
          </div>

          <!-- 卡片在下，並壓在圖片上 -->
          <div class="course-info-section">
            <div class="course-info-content">
              <h3 class="course-title">{{ course.title }}</h3>
              <h4 class="course-subtitle">{{ course.subtitle }}</h4>
              <div class="course-btn-container">
                <a :href="course.link" class="course-btn">
                  課程介紹 <span class="btn-arrow">→</span>
                </a>
              </div>
            </div>
            <!-- 導航按鈕 -->
            <div class="course-navigation-inline">
              <button class="nav-btn prev-btn" @click="prevSlide" :disabled="currentIndex === 0">
                <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 263.77 49.1"><g id="圖層_2" data-name="圖層 2"><g id="圖層_1-2" data-name="圖層 1"><g id="_0pqL0h.tif" data-name="0pqL0h.tif"><path fill="currentColor" d="M263.77,49.1Q141.45,49,19.13,48.8c-3.23,0-10.37,0-16.71.05a2.4,2.4,0,0,1-1-4.61C10,40.58,26.69,33.75,30.08,32.39c27.29-12.21,39.49-18,65.69-29.27,15.47-6.64,13.25-2.38,13.7,9.81,1,26.27,1,29.12,27.76,29.15q63.27.08,126.54.23Z"></path></g></g></g></svg>
              </button>
              <button class="nav-btn next-btn" @click="nextSlide" :disabled="currentIndex === courses.length - 1">
                <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 263.82 49.1"><g id="圖層_2" data-name="圖層 2"><g id="圖層_1-2" data-name="圖層 1"><g id="圖層_2-2" data-name="圖層 2"><g id="圖層_1-2-2" data-name="圖層 1-2"><g id="_0pqL0h.tif" data-name=" 0pqL0h.tif"><path fill="currentColor" d="M0,49.1q122.32-.09,244.64-.3c3.23,0,10.37,0,16.71.05a2.4,2.4,0,0,0,1-4.61c-8.58-3.66-25.27-10.49-28.66-11.85C206.4,20.18,194.2,14.39,168,3.12c-15.47-6.64-13.25-2.38-13.7,9.81-1,26.27-1,29.12-27.76,29.15Q63.27,42.17,0,42.31Z"></path></g></g></g></g></g></svg>
              </button>
            </div>
          </div>
        </div>
      </div> <!-- 閉合 course-carousel-main -->
    </div> <!-- 閉合 course-content-wrapper -->
  </section>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

interface Course {
  id: string
  title: string
  subtitle: string
  image: string
  link: string
}

const currentIndex = ref(0)
const isDragging = ref(false)
const startX = ref(0)
const currentTranslate = ref(0)
const initialTranslate = ref(0)
const carouselContainer = ref<HTMLElement>()

const courses: Course[] = [
  {
    id: 'combo1',
    title: 'combo1',
    subtitle: '頭頸肩芳療紓壓洗頭',
    image: 'https://hamahairspa.com/wp-content/uploads/2024/06/%E5%A4%A7treating-facial-skin-by-massage-cosmetological-clinic.jpeg',
    link: '/courses/relax',
  },
  {
    id: 'combo2',
    title: 'combo2',
    subtitle: '身心靈放鬆之旅',
    image: 'https://hamahairspa.com/wp-content/uploads/2024/06/%E5%A4%A7female-model-having-massage-spa.jpeg',
    link: '/courses/massage',
  },
  {
    id: 'combo3',
    title: 'combo3',
    subtitle: '精緻養護放鬆之旅',
    image: 'https://hamahairspa.com/wp-content/uploads/2024/06/%E5%A4%A7honey-pouring-woman-s-naked-back-spa-salon.jpeg',
    link: '/courses/beauty',
  },
  {
    id: 'combo4',
    title: 'combo4',
    subtitle: '極緻養護放鬆之旅',
    image: 'https://hamahairspa.com/wp-content/uploads/2024/06/%E5%A4%A7woman-spa-center.jpeg',
    link: '/courses/relax',
  },
  {
    id: 'combo5',
    title: 'combo5',
    subtitle: '活絡放鬆spa',
    image: 'https://hamahairspa.com/wp-content/uploads/2024/07/%E5%A4%A7close-up-hand-massage-concept.jpeg',
    link: '/courses/relax',
  },
  {
    id: 'other6',
    title: 'other6',
    subtitle: '加點項目',
    image: 'https://hamahairspa.com/wp-content/uploads/2024/07/close-up-man-massaging-client.jpeg',
    link: '/courses/relax',
  },
]

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % courses.length
}

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + courses.length) % courses.length
}

// 拖拽功能
const handleDragStart = (e: MouseEvent | TouchEvent) => {
  isDragging.value = true
  startX.value = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX
  initialTranslate.value = currentTranslate.value
  
  if (carouselContainer.value) {
    carouselContainer.value.style.transition = 'none'
  }
}

const handleDragMove = (e: MouseEvent | TouchEvent) => {
  if (!isDragging.value) return
  
  e.preventDefault()
  const currentX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX
  const diff = currentX - startX.value
  currentTranslate.value = initialTranslate.value + diff
}

const handleDragEnd = () => {
  if (!isDragging.value) return
  
  isDragging.value = false
  
  if (carouselContainer.value) {
    carouselContainer.value.style.transition = 'transform 0.3s ease'
  }
  
  const threshold = 100
  if (currentTranslate.value > threshold) {
    prevSlide()
  } else if (currentTranslate.value < -threshold) {
    nextSlide()
  }
  
  currentTranslate.value = 0
}

// 鍵盤控制
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'ArrowLeft') {
    prevSlide()
  } else if (e.key === 'ArrowRight') {
    nextSlide()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.course-section {
  padding: 2rem;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow-x: hidden;
}

/* 內容容器 */
.course-content-wrapper {
  width: 100%;
  max-width: 1200px; /* 內容最大寬度 */
  margin: 0 auto;
  padding: 0 2rem; /* 內容的左右padding */
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 清理CSS */

.course-carousel-main {
  position: relative;
  width: 100%;
  max-width: 1000px; /* 保持輪播的最大寬度 */
  margin: 2rem 0;
  cursor: grab;
  user-select: none;
}

.course-header {
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
  z-index: 100;
  background: #f8f6f0;
  padding: 1rem 0; /* 移除額外的左右padding，使用父容器的padding */
}

.course-main-title {
  font-size: 3rem;
  font-weight: 300;
  color: #c4956c;
  letter-spacing: 8px;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}

.course-sub-title {
  font-size: 1.2rem;
  font-weight: 400;
  color: #8b7355;
  letter-spacing: 2px;
}

.course-carousel-main {
  position: relative;
  width: 100%;
  max-width: 1000px; /* 統一使用1000px作為輪播容器寬度 */
  min-height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: grab;
  user-select: none;
  margin: 2rem auto;
  z-index: 1;
  overflow: hidden;
}

.course-carousel-main:active {
  cursor: grabbing;
}

.course-carousel-item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  visibility: hidden;
  transition: all 0.8s ease-in-out;
  transform: translateX(50px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row-reverse; /* 圖片在右，卡片在左 */
  min-height: 450px;
  z-index: 1;
  overflow: hidden; /* 防止子元素溢出 */
}

.course-carousel-item.active {
  opacity: 1 !important;
  visibility: visible !important;
  transform: translateX(0) !important;
}

.course-info-section {
  flex: 0 0 45%; /* 固定卡片寬度為 200px */
  max-width: 480px; /* 最大寬度也設為 200px */
  background: #F5E9DAD4;
  padding: 1.5rem; /* 調整 padding 以適應較小寬度 */
  height: 160px;
  backdrop-filter: blur(10px);
  text-align: center;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem; /* 減少間距 */
  margin-right: -40px; /* 調整負margin */
  position: relative;
}

.course-info-content {
  margin-bottom: 0;
}

.course-title {
  font-size: 2rem; /* 從 3rem 減少到 2rem */
  font-weight: 300;
  color: #c4956c;
  text-transform: lowercase;
  letter-spacing: 1px; /* 從 2px 減少到 1px */
  margin-bottom: 0.5rem; /* 從 1rem 減少到 0.5rem */
  line-height: 1;
}

.course-subtitle {
  font-size: 1.2rem; /* 從 1.5rem 減少到 1.2rem */
  font-weight: 400;
  color: #5d4037;
  margin-bottom: 1rem; /* 從 2rem 減少到 1rem */
  letter-spacing: 0.5px; /* 從 1px 減少到 0.5px */
}

.course-btn {
  display: inline-flex;
  align-items: center;
  background: #c4956c;
  color: white;
  padding: 0.6rem 1.2rem; /* 從 0.8rem 2rem 調整為更小的padding */
  border-radius: 50px;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.8rem; /* 從 0.9rem 減少到 0.8rem */
  letter-spacing: 0.5px; /* 從 1px 減少到 0.5px */
  transition: all 0.3s ease;
}

.course-btn:hover {
  background: #b8895f;
  transform: translateY(-2px);
}

.btn-arrow {
  margin-left: 0.5rem;
  transition: transform 0.3s ease;
}

.course-btn:hover .btn-arrow {
  transform: translateX(5px);
}

.course-navigation-inline {
  position: absolute;
  bottom: -3rem; /* 調整位置讓按鈕也與卡片重疊 */
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 1rem;
  z-index: 15; /* 確保按鈕在最上層 */
}
.nav-btn {
  width: 40px;
  height: 40px;
  border: 2px solid #C9A48E;
  background: white;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #C9A48E;
}

.nav-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.nav-btn:hover:not(:disabled) {
  background: #C9A48E;
  color: white;
  transform: scale(1.1);
}

.course-carousel {
  flex: 1; /* 讓圖片區塊佔滿剩餘空間 */
  max-width: none; /* 移除最大寬度限制 */
  height: 420px;
  position: relative;
  z-index: 1;
  overflow: hidden;
  margin-left: -20px; /* 減少負margin */
}

.course-carousel img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.3s ease;
}

.course-description-area {
  text-align: center;
  padding: 2rem 0;
  margin-top: 2rem;
}

.description-title {
  font-size: 1.5rem;
  font-weight: 400;
  color: #5d4037;
  margin-bottom: 1rem;
  letter-spacing: 1px;
}

.description-text {
  font-size: 1rem;
  color: #6d6d6d;
  line-height: 1.6;
}

/* 響應式設計 */
@media (max-width: 1200px) {
  .course-info-section {
    min-width: 460px;
    margin-right: -40px;
  }

  .course-carousel {
    width: 620px;
    height: 400px;
    margin-left: -40px;
  }
}

/* 手機版RWD */
@media (max-width: 1024px) {
  .course-section {
    padding: 2rem 1rem; /* 手機版恢復左右padding */
    width: 100%; /* 手機版使用100% */
    margin-left: 0; /* 手機版重置margin */
  }

  .course-header {
    margin-bottom: 2rem;
  }

  .course-carousel-main {
    margin: 2rem auto;
  }

  .course-carousel-item {
    position: relative !important;
    opacity: 1 !important;
    visibility: visible !important;
    transform: none !important;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: auto;
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
  }

  .course-carousel-item:not(.active) {
    display: none;
  }

  .w-full {
    width: 100%;
    margin-bottom: 0;
  }

  .course-carousel {
    width: 100%;
    max-width: 450px; /* 設定圖片的最大寬度 */
    height: 350px;
    margin: 0 auto;
  }

    .course-info-section {
    position: relative;
    top: -30px;
    width: calc(min(450px, 100%) - 100px); /* 圖片實際寬度減去 50px */
    max-width: calc(min(450px, 100%) - 100px); /* 確保不會超過圖片寬度 */
    min-width: calc(100% - 100px);
    margin: 0 auto;
    padding: 1.5rem;
    background: #F5E9DAD4;
    backdrop-filter: blur(10px);
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .course-carousel {
    width: 100%;
    max-width: 450px; /* 與上面保持一致 */
    height: 350px;
    margin: 0 auto; /* 手機版恢復正常的margin */
  }

  .course-main-title {
    font-size: 2.5rem;
    letter-spacing: 4px;
  }

  .course-title {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }

  .course-subtitle {
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }

  .course-navigation-inline {
    margin-top: 0.5rem;
    position: relative; /* 手機版重置為相對定位 */
    bottom: auto;
    left: auto;
    transform: none;
  }
}

@media (max-width: 768px) {
  .course-section {
    padding: 1.5rem 1rem; /* 手機版上下左右padding */
    gap: 1.5rem;
    width: calc(100vw - 2rem); /* 手機版留出邊界空間 */
    margin-left: calc(-50vw + 50% + 1rem); /* 調整手機版定位 */
    border-radius: 30px;
    margin: 1rem calc(-50vw + 50% + 1rem);
  }

  .course-content-wrapper {
    padding: 0 1rem; /* 手機版內容padding */
  }

  .course-description-area {
    padding: 1rem;
  }

  .course-info-section {
    gap: 1rem; /* 卡片內部元素間距 */
    margin: 0 auto;
    width: calc(min(450px, 100%) - 100px); /* 圖片實際寬度減去 50px */
    max-width: calc(min(450px, 100%) - 100px); /* 確保不會超過圖片寬度 */
    min-width: calc(100% - 100px);
  }

  .course-carousel-main {
    padding: 1.5rem;
  }

  .course-carousel {
    max-width: 100%;
    height: 260px;
    margin: 0 auto; /* 确保居中 */
  }

  .course-info-section {
    max-width: calc(min(380px, 100%) - 50px); /* 根據圖片的實際最大寬度計算 */
    padding: 1.2rem;
    width: calc(min(380px, 100%) - 50px); /* 確保不會超過圖片寬度 */
    top: -26px; /* 覆蓋圖片 1/10 (260px 的 1/10) */
    border-radius: 0; /* 移除圓角 */
  }

  .course-carousel {
    border-radius: 0; /* 移除圓角 */
  }

  .course-main-title {
    font-size: 2rem;
    letter-spacing: 3px;
  }

  .course-title {
    font-size: 1.8rem;
    margin-bottom: 0.8rem;
  }

  .course-subtitle {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }

  .course-btn {
    padding: 0.7rem 1.5rem;
    font-size: 0.85rem;
  }

  .nav-btn {
    width: 35px;
    height: 35px;
  }

  .course-navigation-inline {
    position: relative; /* 手機版重置為相對定位 */
    bottom: auto;
    left: auto;
    transform: none;
  }
}

@media (max-width: 480px) {
  .course-section {
    padding: 1rem;
    gap: 1rem; /* 小螢幕緊密gap */
    width: 100%; /* 確保小螢幕正常寬度 */
    margin-left: 0; /* 重置margin */
  }

  .course-carousel-main {
    padding: 0;
  }

  .course-description-area {
    padding: 0.5rem;
  }

  .course-info-section {
    gap: 0.8rem;
    padding: 1rem;
    width: calc(min(450px, 100%) - 100px); /* 圖片實際寬度減去 50px */
    max-width: calc(min(450px, 100%) - 100px); /* 確保不會超過圖片寬度 */
    min-width: calc(100% - 100px);
  }

  .course-navigation-inline {
    gap: 0.8rem;
  }

  .course-carousel {
    max-width: 320px;
    height: 200px;
    border-radius: 8px;
    margin: 0 auto; /* 确保居中 */
  }

  .course-info-section {
    width: calc(min(450px, 100%) - 100px); /* 圖片實際寬度減去 50px */
    max-width: calc(min(450px, 100%) - 100px); /* 確保不會超過圖片寬度 */
    min-width: calc(100% - 100px);
    padding: 1rem;
    width: 85%;
    top: -20px; /* 覆蓋圖片 1/10 (200px 的 1/10) */
    border-radius: 0; /* 移除圓角 */
  }

  .course-carousel {
    border-radius: 0; /* 移除圓角 */
  }

  .course-main-title {
    font-size: 1.8rem;
    letter-spacing: 2px;
  }

  .course-title {
    font-size: 1.5rem;
  }

  .course-subtitle {
    font-size: 0.9rem;
  }

  .course-btn {
    padding: 0.6rem 1.2rem;
    font-size: 0.8rem;
  }

  .nav-btn {
    width: 32px;
    height: 32px;
  }

  .course-navigation-inline {
    gap: 0.8rem;
    margin-top: 1rem;
    position: relative; /* 手機版重置為相對定位 */
    bottom: auto;
    left: auto;
    transform: none;
  }

  .description-title {
    font-size: 1.2rem;
  }

  .description-text {
    font-size: 0.85rem;
  }

  .course-navigation-inline {
    margin-top: 0.8rem;
    position: relative; /* 小螢幕重置為相對定位 */
    bottom: auto;
    left: auto;
    transform: none;
  }
}
</style>