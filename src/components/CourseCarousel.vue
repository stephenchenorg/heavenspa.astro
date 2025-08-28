<template>
  <section class="p-8 w-full h-full flex flex-col justify-center items-center relative overflow-x-hidden">
    <div class="w-full max-w-6xl mx-auto px-8 flex flex-col items-center">
      <div class="text-center mb-12 relative z-[100] bg-[#f8f6f0] py-4">
        <h1 class="text-5xl font-light text-[#c4956c] tracking-[8px] uppercase mb-2">COURSE</h1>
        <h2 class="text-xl font-normal text-[#8b7355] tracking-[2px]">課程介紹</h2>
      </div>

      <div
        ref="carouselContainer"
        class="relative w-full max-w-4xl min-h-[500px] flex items-center justify-center cursor-grab select-none my-8 mx-auto z-[1] overflow-hidden active:cursor-grabbing"
        @click="handleClick"
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
          class="absolute top-0 left-0 w-full h-full opacity-0 invisible transition-all duration-[800ms] ease-in-out translate-x-[50px] flex items-center justify-between flex-row-reverse min-h-[450px] z-[1] overflow-hidden"
          :class="{ '!opacity-100 !visible !translate-x-0': index === currentIndex }"
          :data-index="index"
          :style="isDragging ? { transform: `translateX(${currentTranslate}px)` } : {}"
        >
          <!-- 圖片在上 -->
          <div class="w-full">
            <div class="flex-1 h-[420px] relative z-[1] overflow-hidden -ml-5">
              <img
                :src="course.image" :alt="course.subtitle"
                class="w-full h-full object-cover object-center transition-transform duration-300"
              >
            </div>
          </div>

          <!-- 卡片在下，並壓在圖片上 -->
          <div
            class="flex-[0_0_45%] max-w-[480px] bg-[#F5E9DAD4] p-6 min-h-[160px] h-auto backdrop-blur-[10px] text-center z-10 flex flex-col justify-center items-center gap-4 -mr-10 relative"
          >
            <div class="mb-0">
              <h3 class="text-3xl font-light text-[#c4956c] lowercase tracking-[1px] mb-2 leading-none">
                {{
                  course.title
                }}
              </h3>
              <h4 class="text-xl font-normal text-[#5d4037] mb-4 tracking-[0.5px]">{{ course.subtitle }}</h4>
              <div>
                <a
                  :href="course.link"
                  class="inline-flex items-center bg-[#c4956c] text-white px-5 py-2.5 rounded-full no-underline font-medium text-sm tracking-[0.5px] transition-all duration-300 hover:bg-[#b8895f] hover:-translate-y-0.5"
                >
                  課程介紹 <span class="ml-2 transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                </a>
              </div>
            </div>
            <!-- 導航按鈕 -->
            <div class="absolute -bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4 z-15">
              <button
                class="w-10 h-10 border-2 border-[#C9A48E] bg-white rounded-full cursor-pointer transition-all duration-300 p-0 flex items-center justify-center text-[#C9A48E] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#C9A48E] hover:text-white hover:scale-110"
                :disabled="currentIndex === 0" @click="prevSlide"
              >
                <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 263.77 49.1">
                  <g id="圖層_2" data-name="圖層 2">
                    <g id="圖層_1-2" data-name="圖層 1">
                      <g id="_0pqL0h.tif" data-name="0pqL0h.tif">
                        <path
                          fill="currentColor"
                          d="M263.77,49.1Q141.45,49,19.13,48.8c-3.23,0-10.37,0-16.71.05a2.4,2.4,0,0,1-1-4.61C10,40.58,26.69,33.75,30.08,32.39c27.29-12.21,39.49-18,65.69-29.27,15.47-6.64,13.25-2.38,13.7,9.81,1,26.27,1,29.12,27.76,29.15q63.27.08,126.54.23Z"
                        ></path>
                      </g>
                    </g>
                  </g>
                </svg>
              </button>
              <button
                class="w-10 h-10 border-2 border-[#C9A48E] bg-white rounded-full cursor-pointer transition-all duration-300 p-0 flex items-center justify-center text-[#C9A48E] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#C9A48E] hover:text-white hover:scale-110"
                :disabled="currentIndex === courses.length - 1" @click="nextSlide"
              >
                <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 263.82 49.1">
                  <g id="圖層_2" data-name="圖層 2">
                    <g id="圖層_1-2" data-name="圖層 1">
                      <g id="圖層_2-2" data-name="圖層 2">
                        <g id="圖層_1-2-2" data-name="圖層 1-2">
                          <g id="_0pqL0h.tif" data-name=" 0pqL0h.tif">
                            <path
                              fill="currentColor"
                              d="M0,49.1q122.32-.09,244.64-.3c3.23,0,10.37,0,16.71.05a2.4,2.4,0,0,0,1-4.61c-8.58-3.66-25.27-10.49-28.66-11.85C206.4,20.18,194.2,14.39,168,3.12c-15.47-6.64-13.25-2.38-13.7,9.81-1,26.27-1,29.12-27.76,29.15Q63.27,42.17,0,42.31Z"
                            ></path>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
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

function nextSlide() {
  currentIndex.value = (currentIndex.value + 1) % courses.length
}

function prevSlide() {
  currentIndex.value = (currentIndex.value - 1 + courses.length) % courses.length
}

// 點擊測試
function handleClick() {
  console.log('CourseCarousel clicked!')
}

// 拖拽功能
function handleDragStart(e: MouseEvent | TouchEvent) {
  console.log('CourseCarousel handleDragStart triggered:', e.type)
  isDragging.value = true
  startX.value = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX
  initialTranslate.value = currentTranslate.value

  if (carouselContainer.value) {
    carouselContainer.value.style.transition = 'none'
  }
}

function handleDragMove(e: MouseEvent | TouchEvent) {
  if (!isDragging.value) return

  console.log('CourseCarousel handleDragMove triggered:', e.type)
  e.preventDefault()
  const currentX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX
  const diff = currentX - startX.value
  currentTranslate.value = initialTranslate.value + diff
}

function handleDragEnd() {
  console.log('CourseCarousel handleDragEnd triggered')
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
function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'ArrowLeft') {
    prevSlide()
  } else if (e.key === 'ArrowRight') {
    nextSlide()
  }
}

onMounted(() => {
  console.log('CourseCarousel component mounted')
  console.log('CarouselContainer ref:', carouselContainer.value)
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>
