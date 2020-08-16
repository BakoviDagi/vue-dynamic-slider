<template>
  <div class="App o-container o-container--s o-vertical-spacing o-vertical-spacing--xl">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
          integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
          crossorigin="anonymous">
    <h1>Building a Simple Content Slider with Vue.js</h1>

    <section class="App__example o-vertical-spacing o-vertical-spacing--l">
      <h2>Basic Slider</h2>

      <slider-frame
        :slides-per-view="5"
        :infinite-scroll="true"
        :breakpoints="{sm: 1, md: 2, lg: 3, xl: 4}"
      >
        <div class="d-inline-flex border p-2" slot-scope="{ next, prev, scrollToSlide, activeIndex, canScrollNext, canScrollPrev }">
          <div
            @click="prev"
            class="mr-2 my-auto"
            style="cursor: pointer;"
          >
<!--            <i aria-hidden="true" class="fas fa-3x fa-chevron-left"></i>-->
<!--            <span class="sr-only">Previous</span>-->
            &lt;
            {{ canScrollPrev ? '' : '!!!' }}
          </div>
          <slider-slides>
            <slider-slide
              :key="ix"
              v-for="(ix, iter) in [1, 2, 3, 4, 5, 6, 7]"
            >
              <img
                :alt="`Image ${ix}`"
                :class="{
                      'border border-thick border-dark' : activeIndex === iter,
                      'px-1': activeIndex !== iter
                    }"
                :src="`https://via.placeholder.com/300x300.png?text=${ix}`"
                @click="scrollToSlide(iter)"
                class="w-100"
              >
            </slider-slide>
          </slider-slides>
          <div
            @click="next"
            class="ml-2 my-auto"
            style="cursor: pointer;"
          >
<!--            <i aria-hidden="true" class="fas fa-3x fa-chevron-right"></i>-->
<!--            <span class="sr-only">Next</span>-->
            {{ canScrollNext ? '' : '!!!' }}
            &gt;
          </div>
        </div>
      </slider-frame>
      <button @click="param1 = !param1">Toggle color</button>
    </section>
  </div>
</template>

<script>
  import SliderFrame from './components/SliderFrame';
  import SliderSlide from './components/SliderSlide.vue';
  import SliderSlides from './components/SliderSlides.vue';

  export default {
    name: 'App',
    components: {
      SliderFrame,
      SliderSlide,
      SliderSlides,
    },
    data() {
      return {
        param1: false
      };
    }
  };
</script>