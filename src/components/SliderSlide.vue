<template>
  <transition :name="transition">
    <div
      v-show="active"
      class="SliderSlide d-inline-block"
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