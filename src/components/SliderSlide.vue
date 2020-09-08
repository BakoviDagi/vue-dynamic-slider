<template>
  <transition :name="transition">
    <div
      v-show="active"
      class="dynamic-slider-slide"
      :style="{'width': widthPercent}"
    >
      <slot/>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'SliderSlide',
    data() {
      return {
        active: true,
        transition: '',
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