
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
      // TODO below two statements don't really belong here
      // Just to make sure that that active slide is correct
      vm.props.activeIndex = slideIndex;
      // Move the slides back to the non-duplicated
      vm.updateOffsetToBeAbsolute();

      // Calculate the position, and then shift it over to the non-duplicated slides
      const slideOffset = vm.getSlideOffset(slideIndex);
    
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
  
      vm.currentOffset = easeOutCubic(currentTime - vm.scrollStartTime, from, to, duration);
    
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

function easeOutCubic (currentTime, initialValue, finalValue, duration) {
  let changeInValue = finalValue - initialValue;
  currentTime /= duration;
  currentTime--;
  return changeInValue * (currentTime * currentTime * currentTime + 1) + initialValue;
}
