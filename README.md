# vue-dynamic-slider
Dynamic and light-weight slider for Vue

Note: This is in beta and is subject to change.

### Installing
  - Yarn: `yarn add vue-dynamic-slider`
  - or NPM: `npm install vue-dynamic-slider`

### Usage:

##### Template
```html
<slider-frame>
  <div slot-scope="{ next, prev, scrollToSlide, activeIndex, canScrollNext, canScrollPrev }">
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
  </div>
</slider-frame>
```

##### Script
```js
  import {SliderFrame, SliderSlides, SliderSlide} from 'vue-dynamic-slider';

  export default {
    components: {SliderSlide, SliderSlides, SliderFrame}
  }
```
