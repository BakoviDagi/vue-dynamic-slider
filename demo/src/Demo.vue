<template>
  <div>
    <h1>vue-dynamic-slider Examples</h1>

    <section>
      <h2>Basic Touch Slider</h2>
      <div>
        <div>
          The slider is made up of three components:
          <ul>
            <li>SliderFrame as a way of setting props and exposing key variables and functions</li>
            <li>SliderSlides which does most of the work of scrolling, figuring out breakpoints, etc</li>
            <li>SliderSlide which is to provide additional markup to the slide and keep the correct width</li>
          </ul>
        </div>
        <div>
          <pre class="border"><code>
            &lt;slider-frame :slides-per-view="5">
              &lt;div class="slider" slot-scope="{ activeIndex }">
                &lt;slider-slides>
                  &lt;slider-slide
                    :key="ix"
                    v-for="ix in numSlides"
                  >
                    &lt;img
                      :src="`https://via.placeholder.com/300x300.png?text=${ix}`"
                      :alt="`Image ${ix}`"
                      class="w-100 px-1"
                    >
                  &lt;/slider-slide>
                &lt;/slider-slides>
              &lt;/div>
            &lt;/slider-frame>
          </code></pre>
        </div>
      </div>
      <demo-basic-slider />

      <h2>Basic Touch Infinite Slider</h2>
      <div>
        To enable infinite scrolling, all that needs to be done is to enable it via the prop on &lt;slider-frame>
        <pre><code>
          &lt;slider-frame :slides-per-view="5" :infinite-scroll="true">
        </code></pre>
      </div>
      <demo-basic-infinite-slider />

      <h2>Adding pagination</h2>
      <div>
        Using the variables and functions exposed via slot props, implementing custom pagination is simple.
      </div>
      <pre class="border"><code>
        &lt;slider-frame
          :slides-per-view="5"
          :breakpoints="{
            sm: { slidesPerView: 1 },
            md: { slidesPerView: 2 },
            lg: { slidesPerView: 3 },
            xl: { slidesPerView: 4 }
          }"
        >
          &lt;div class="slider d-inline-flex" slot-scope="{ next, prev, scrollToSlide, activeIndex, canScrollNext, canScrollPrev }">
            &lt;button
              class="mr-2 my-auto button"
              :disabled="!canScrollPrev"
              @click="prev"
            >
              &lt;i aria-hidden="true" class="fas fa-3x fa-chevron-left">&lt;/i>
              &lt;span class="sr-only">Previous&lt;/span>
            &lt;/button>
            &lt;slider-slides>
              &lt;slider-slide
                :key="ix"
                v-for="(ix, iter) in numSlides"
              >
                &lt;img
                  :src="`https://via.placeholder.com/300x300.png?text=${ix}`"
                  :alt="`Image ${ix}`"
                  :class="{
                            'active-slide' : activeIndex === iter,
                            'px-1': activeIndex !== iter
                          }"
                  class="w-100"
                  @click="scrollToSlide(iter)"
                >
              &lt;/slider-slide>
            &lt;/slider-slides>
            &lt;button
              class="button ml-2 my-auto"
              :disabled="!canScrollNext"
              @click="next"
            >
              &lt;i aria-hidden="true" class="fas fa-3x fa-chevron-right">&lt;/i>
              &lt;span class="sr-only">Next&lt;/span>
            &lt;/button>
          &lt;/div>
        &lt;/slider-frame>
      </code></pre>
      <demo-slider-pagination />

      <h2>Full Demo</h2>
      <demo-full-example />
    </section>
  </div>
</template>

<script>
  import DemoBasicSlider from './DemoBasicSlider';
  import DemoBasicInfiniteSlider from './DemoBasicInfiniteSlider';
  import DemoSliderPagination from './DemoSliderPagination';
  import DemoFullExample from './DemoFullExample.vue';

  export default {
    name: 'Demo',
    components: {
      DemoFullExample,
      DemoSliderPagination,
      DemoBasicInfiniteSlider,
      DemoBasicSlider
    },
    data() {
      return {
        infiniteScroll: false,
        numSlides: 7
      };
    }
  };
</script>

<style lang="scss">
  .slider {
    padding: .5rem;
    border: 1px solid #dee2e6;
  }
  .active-slide {
    border: 1px solid #343a40;
  }
  .button {
    background-color: white;
    border: none;
    padding: 0;
    margin: 0;
  }
  .d-inline-flex {
    display: inline-flex;
  }
  .my-auto {
    margin-top: auto;
    margin-bottom: auto;
  }
  .mr-2 {
    margin-right: .5rem;
  }
  .ml-2 {
    margin-left: .5rem;
  }
  .px-1 {
    padding-left: .25rem;
    padding-right: .25rem;
  }
  .py-3 {
    padding-bottom: 1rem;
    padding-top: 1rem;
  }
  .w-100 {
    width: 100%;
  }
  .border {
    border: 1px solid #dee2e6;
  }
  .font-weight-bold {
    font-weight: bold;
  }
  *, ::after, ::before {
    box-sizing: border-box;
  }
</style>