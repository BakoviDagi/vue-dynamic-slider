<template>
  <div>
    <slider-frame
        v-slot="{ activeIndex }"
        :slides-per-view="slidesPerView"
        :scroll-increment="scrollIncrement"
        :infinite-scroll="infiniteScroll"
        :breakpoints="breakpoints"
        :autoplay="autoplay"
        :autoplayInterval="autoplayInteval"
        class="slider"
    >
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

        <label
          for="scrollIncrement"
          class="font-weight-bold"
        >
          Scroll Incremenmt
        </label>
        <input
          v-model.number="scrollIncrement"
          id="scrollIncrement"
          type="number"
        >
      </div>
      <div>
        <label
          for="infiniteScroll"
          class="font-weight-bold"
        >
          <input
            v-model="infiniteScroll"
            id="infiniteScroll"
            type="checkbox"
          >
          Infinite Scroll
        </label>

        <label
          for="autoplay"
          class="font-weight-bold"
        >
          <input
            v-model="autoplay"
            id="autoplay"
            type="checkbox"
          >
          Autoplay
        </label>

        <label
          for="autoplayInteval"
          class="font-weight-bold"
        >
          Autoplay Interval
        </label>
        <input
          v-model.number="autoplayInteval"
          id="autoplayInteval"
          type="number"
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DemoFullExample',
  data: () => ({
    numSlides: 10,
    slidesPerView: 5,
    scrollIncrement: 1,
    infiniteScroll: true,
    breakpoints: null,
    autoplay: false,
    autoplayInteval: 5000
  })
}
</script>