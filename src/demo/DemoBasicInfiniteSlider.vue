<template>
  <div>
    <slider-frame
      :slides-per-view="slidesPerView"
      :scroll-increment="slidesPerView"
      :infinite-scroll="true"
    >
      <div class="slider" slot-scope="{ activeIndex }">
        <slider-slides>
          <slider-slide
            :key="ix"
            v-for="ix in numSlides"
          >
            <img
              :src="`https://via.placeholder.com/300x300.png?text=${ix}`"
              :alt="`Image ${ix}`"
              class="w-100 px-1"
            >
          </slider-slide>
        </slider-slides>
        <div class="font-weight-bold">
          Active slide: {{ activeIndex + 1 }}
        </div>
      </div>
    </slider-frame>
    <div class="py-3">
      <div>
        <label
          for="numSlides"
          class="font-weight-bold"
        >
          Number of slides
        </label>
        <input
          v-model.number="numSlides"
          id="numSlides"
          type="number"
        >

        <label
          for="slidesPerView"
          class="font-weight-bold"
        >
          Slides per Page
        </label>
        <input
          v-model.number="slidesPerView"
          id="slidesPerView"
          type="number"
        >
      </div>
    </div>
  </div>
</template>

<script>
import SliderFrame from '../components/SliderFrame';
import SliderSlide from '../components/SliderSlide.vue';
import SliderSlides from '../components/SliderSlides.vue';

export default {
  name: 'DemoBasicInfiniteSlider',
  components: {
    SliderFrame,
    SliderSlide,
    SliderSlides,
  },
  data() {
    return {
      numSlides: 7,
      slidesPerView: 5,
    };
  }
}
</script>
