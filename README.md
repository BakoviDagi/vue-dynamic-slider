# vue-dynamic-slider
Dynamic and light-weight slider for Vue

### Installing
  - Yarn: `yarn add vue-dynamic-slider`
  - or NPM: `npm install vue-dynamic-slider`

### Demos:
Please visit the demo site: https://bakovidagi.github.io/vue-dynamic-slider/demo/

### Usage:

##### Template
```html
<slider-frame v-slot="{ next, prev, scrollToSlide, activeIndex, canScrollNext, canScrollPrev }">
  <!-- With the exposed variables and methods it's simple to make your own pagination -->
  <div @click="prev">&lt;</div>

  <slider-slides>
    <!-- SliderSlide is currently needed for even sizing, but seems redundant so will likely be replaced with Flexbox CSS -->
    <slider-slide
      :key="ix"
      v-for="(ix, iter) in [1, 2, 3, 4, 5, 6, 7]"
    >
      <img
        :alt="`Image ${ix}`"
        :src="`https://via.placeholder.com/300x300.png?text=${ix}`"
        style="width: 100%;"
        @click="scrollToSlide(iter)"
      >
    </slider-slide>
  </slider-slides>

  <div @click="next">&gt;</div>
</slider-frame>
```

##### Script
```js
  import {SliderFrame, SliderSlides, SliderSlide} from 'vue-dynamic-slider';

  export default {
    components: {SliderSlide, SliderSlides, SliderFrame}
  }
```

### Slot API
Props:
- `slidesPerView`: The number of slides to show at a time. Default: `5`
- `scrollIncrement`: The number of slides to scroll by at a time. If set, creates pages. Default: `1`
- `infiniteScroll`: True to enable infinite scrolling. Duplicate slides are created. Default: `false`
- `breakpoints`: Object of screen width to override props. Can adjust `slidesPerView` and `scrollIncrement` based on screen width. See below for more info.
- `scrollingFunction`: Custom function for scrolling slides. Defaults to a cubic function
- `autoplay`: Boolean that automatically scrolls through the slides when `true`. Toggle this to start/stop the autoplay
- `autoplayInterval`: Number of milliseconds to wait before autoplaying

The following methods and properties are exposed via slots.

Properties:
- `activeIndex`: The current active slide, zero based
- `canScrollNext`: A boolean that is true if it's possible to scroll to the right
- `canScrollPrev`: A boolean that is true if it's possible to scroll to the left
- `slidesInView`: An array of all slides that are visible, zero based
- `pagination.numPages`: The total number of pages, used for creating pagination dots
- `pagination.currentPage`: The current page that is visible, zero based

Methods:
- `scrollToSlide`: A function that takes a zero-based slide number and scrolls to either that or the closest one based on page
- `scrollToPage`: A function that takes a zero-based page number and scrolls to the first slide in that page
- `next`: Scroll to the next slide or page
- `prev`: Scroll to the previous slide or page

### Breakpoints
Breakpoints are an object of screen width to an override at that width.
Accepts a number for px width, or one of `sm`, `md`, `lg`, `xl` that maps to Bootstrap's breakpoint widths

Example:
```json
{
  "320": { "slidesPerView": 1 },
  "md": { "slidesPerView": 2 },
  "lg": { "slidesPerView": 3 }
}
```
