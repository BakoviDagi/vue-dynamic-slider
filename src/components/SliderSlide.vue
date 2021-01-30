<template>
  <div
    v-show="active"
    :class="slideClass"
    :style="{'width': widthPercent}"
  >
    <slot/>
  </div>
</template>

<script>
  export default {
    name: 'SliderSlide',
    props: {
      slideClass: {
        type: [String, Object, Array],
        default: 'dynamic-slider-slide'
      }
    },
    data() {
      return {
        active: true
      };
    },
    inject: [
      'props'
    ],
    computed: {
      widthPercent() {
        return (100 / this.props.currentSlidesPerView) + '%'
      }
    }
  };
</script>