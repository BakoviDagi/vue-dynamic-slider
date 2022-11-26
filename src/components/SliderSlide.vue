<script setup>
import { inject } from 'vue';

const { slideClass } = defineProps({
  slideClass: {
    type: [String, Object, Array],
    default: 'dynamic-slider-slide'
  }
})

const currentSlidesPerView = inject('currentSlidesPerView')
</script>

<template>
  <div
    class="dynamic-slider-slide"
    :class="slideClass"
  >
    <slot/>
  </div>
</template>

<style>
.dynamic-slider-slide {
  width: calc(1 / v-bind('currentSlidesPerView') * 100%);
}
</style>