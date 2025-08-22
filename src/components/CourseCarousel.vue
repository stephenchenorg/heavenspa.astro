<template>
  <section class="course-section">
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
        :style="{ transform: `translateX(${currentTranslate}px)` }"
      >
        <div class="course-info-section">
          <div class="course-info-content">
            <h3 class="course-title">{{ course.title }}</h3>
            <h4 class="course-subtitle">{{ course.subtitle }}</h4>
            <div class="absolute -bottom-8">
              <a :href="course.link" class="course-btn">
                課程介紹 <span class="btn-arrow">→</span>
              </a>
            </div>
            
            <!-- 導航按鈕 -->
            <div class="course-navigation-inline">
              <button class="nav-btn prev-btn" @click="prevSlide" :disabled="currentIndex === 0">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="15,18 9,12 15,6"></polyline>
                </svg>
              </button>
              <div class="carousel-dots">
                <button 
                  v-for="(_, index) in courses" 
                  :key="index"
                  class="dot"
                  :class="{ active: index === currentIndex }"
                  @click="currentIndex = index"
                ></button>
              </div>
              <button class="nav-btn next-btn" @click="nextSlide" :disabled="currentIndex === courses.length - 1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="9,18 15,12 9,6"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div class="course-carousel">
          <img :src="course.image" :alt="course.subtitle" />
        </div>
      </div>
    </div>

    <!-- 底部描述區域 -->
    <div class="course-description-area">
      <h3 class="description-title">在我們的店中另有一區「女性專屬空間」</h3>
      <p class="description-text">讓女性貴賓能夠在空間中享受我們的課程</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

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
    id: 'other6',
    title: 'other6',
    subtitle: '加點項目',
    image: 'https://hamahairspa.com/wp-content/uploads/2024/06/%E5%A4%A7treating-facial-skin-by-massage-cosmetological-clinic.jpeg',
    link: '/courses/relax'
  },
  {
    id: 'massage',
    title: 'massage',
    subtitle: '專業按摩',
    image: '/api/placeholder/600/400',
    link: '/courses/massage'
  },
  {
    id: 'beauty',
    title: 'beauty',
    subtitle: '美容護理',
    image: '/api/placeholder/600/400',
    link: '/courses/beauty'
  },
  {
    id: 'relax',
    title: 'relax',
    subtitle: '放鬆體驗',
    image: '/api/placeholder/600/400',
    link: '/courses/relax'
  }
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
  background: #f8f6f0;
  padding: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
}

.course-section > * {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

.course-header {
  text-align: center;
  flex-shrink: 0;
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
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 420px;
  cursor: grab;
  user-select: none;
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
}

.course-carousel-item.active {
  opacity: 1 !important;
  visibility: visible !important;
  transform: translateX(0) !important;
}

.course-info-section {
  width: 446.391px;
  height: 161.938px;
  background: #F5E9DAD4;
  padding: 2rem;
  backdrop-filter: blur(10px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  text-align: center;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 100px;
  position: relative;
}

.course-info-content {
  margin-bottom: 0;
}

.course-title {
  font-size: 3rem;
  font-weight: 300;
  color: #c4956c;
  text-transform: lowercase;
  letter-spacing: 2px;
  margin-bottom: 1rem;
  line-height: 1;
}

.course-subtitle {
  font-size: 1.5rem;
  font-weight: 400;
  color: #5d4037;
  margin-bottom: 2rem;
  letter-spacing: 1px;
}

.course-btn {
  display: inline-flex;
  align-items: center;
  background: #c4956c;
  color: white;
  padding: 0.8rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(196, 149, 108, 0.3);
}

.course-btn:hover {
  background: #b8895f;
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(196, 149, 108, 0.4);
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
  bottom: -4rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 1rem;
}

.carousel-dots {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: rgba(196, 149, 108, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
}

.dot.active {
  background: #c4956c;
  transform: scale(1.2);
}

.dot:hover {
  background: rgba(196, 149, 108, 0.6);
}

.nav-btn {
  width: 40px;
  height: 40px;
  border: 2px solid #c4956c;
  background: white;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #c4956c;
}

.nav-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.nav-btn:hover:not(:disabled) {
  background: #c4956c;
  color: white;
  transform: scale(1.1);
}

.course-carousel {
  width: 639.609px;
  height: 420px;
  position: relative;
  z-index: 1;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  margin-left: -20px;
}

.course-carousel img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.course-carousel:hover img {
  transform: scale(1.05);
}

.course-description-area {
  text-align: center;
  padding: 2rem 0;
  flex-shrink: 0;
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
@media (max-width: 1024px) {
  .course-section {
    padding: 6rem 0 2rem 0;
  }

  .course-carousel-main {
    flex-direction: column;
    text-align: center;
    padding: 2rem;
  }

  .course-info-section {
    position: relative;
    top: auto;
    left: auto;
    transform: none;
    width: 100%;
    max-width: 350px;
    height: auto;
    margin: 0 auto 2rem auto;
    padding: 1.5rem;
    border-radius: 0;
  }

  .course-section > * {
    max-width: 100%;
    padding: 0 1rem;
  }

  .course-carousel {
    width: 100%;
    max-width: 400px;
    height: 250px;
    margin: 0 auto;
  }

  .course-main-title {
    font-size: 2rem;
    letter-spacing: 4px;
  }

  .course-title {
    font-size: 2rem;
  }

  .course-subtitle {
    font-size: 1rem;
  }

  .course-description-area {
    margin-top: 2rem;
    padding: 0 1rem;
  }

  .description-title {
    font-size: 1.4rem;
  }

  .description-text {
    font-size: 0.9rem;
  }
}
</style>