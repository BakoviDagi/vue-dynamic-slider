<template>
  <slider-frame
    :slides-per-view="5"
    :breakpoints="{sm: 1, md: 2, lg: 3, xl: 4}"
  >
    <div class="slider d-inline-flex" slot-scope="{ next, prev, scrollToSlide, activeIndex, canScrollNext, canScrollPrev }">
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
    </div>
  </slider-frame>
</template>

<script>
import SliderFrame from '../components/SliderFrame';
import SliderSlide from '../components/SliderSlide.vue';
import SliderSlides from '../components/SliderSlides.vue';

export default {
  name: 'DemoSliderPagination',
  components: {
    SliderFrame,
    SliderSlide,
    SliderSlides,
  },
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