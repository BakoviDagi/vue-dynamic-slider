<template>
  <slider-frame
    v-slot="{ next, prev, scrollToSlide, activeIndex, canScrollNext, canScrollPrev }"
    :slides-per-view="5"
    :scroll-increment="3"
    :infinite-scroll="true"
    :breakpoints="{
      sm: { slidesPerView: 1 },
      md: { slidesPerView: 2 },
      lg: { slidesPerView: 3 },
      xl: { slidesPerView: 4 }
    }"
    class="slider d-inline-flex"
  >
    <button
      class="mr-2 my-auto button"
      :disabled="!canScrollPrev"
      @click="prev"
    >
      <i aria-hidden="true" class="fas fa-3x fa-chevron-left"></i>
      <span class="sr-only">Previous</span>
    </button>
    <slider-slides>
      <slider-slide
        :key="ix"
        v-for="(ix, iter) in numSlides"
      >
        <img
          :src="`https://via.placeholder.com/300x300.png?text=${ix}`"
          :alt="`Image ${ix}`"
          :class="{
                    'active-slide' : activeIndex === iter,
                    'px-1': activeIndex !== iter
                  }"
          class="w-100"
          @click="scrollToSlide(iter)"
        >
      </slider-slide>
    </slider-slides>
    <button
      class="button ml-2 my-auto"
      :disabled="!canScrollNext"
      @click="next"
    >
      <i aria-hidden="true" class="fas fa-3x fa-chevron-right"></i>
      <span class="sr-only">Next</span>
    </button>
  </slider-frame>
</template>

<script>
export default {
  name: 'DemoSliderPagination',
  data() {
    return {
      infiniteScroll: false,
      numSlides: 10
    };
  }
}
</script>

<style scoped>

</style>