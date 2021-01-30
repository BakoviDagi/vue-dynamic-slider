
/**
 * A mixin to handle scrolling login in a Vue component.
 * Expects: a 'props.activeIndex', and 'getSlideOffset' method
 *
 * @type {{}}
 */
export default {
  data () {
    return {
      scrolling: false,
      currentOffset: 0,
      scrollStartTime: 0
    }
  },
  methods: {
    jumpToSlide (slideIndex) {
      this.props.activeIndex = slideIndex;
      this.currentOffset = this.getSlideOffset(slideIndex);
    },

    scrollToSlide(slideIndex) {
      const vm = this;

      // Calculate the position, and then shift it over to the non-duplicated slides
      const slideOffset = vm.getSlideOffset(slideIndex);

      if (slideOffset === vm.currentOffset) {
        return;
      }

      requestAnimationFrame(function (timestamp) {
        vm.scrolling = true;
        vm.scrollStartTime = timestamp;
        vm.scroll(vm.currentOffset, slideOffset, vm.scrollStartTime, 500);
      });
    },
  
    scroll(from, to, currentTime, duration) {
      const vm = this;
      if (!vm.scrolling) {
        return;
      }
  
      vm.currentOffset = this.props.scrollingFunction(currentTime - vm.scrollStartTime, from, to, duration);
    
      requestAnimationFrame((timestamp) => {
        if (currentTime < vm.scrollStartTime + duration) {
          vm.scroll(from, to, timestamp, duration);
        } else {
          vm.currentOffset = to;
        }
      });
    }
  }
};
