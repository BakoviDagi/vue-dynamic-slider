/**
 * A mixin to handle scrolling login in a Vue component.
 * Expects: a 'props.activeIndex', and 'getSlideOffset' method
 *
 * @type {{}}
 */
export default {
  data () {
    return {
      currentOffset: 0,
      scrollStartTime: 0,
      animationId: -1,
      promiseResolve: null,
      dragging: false
    }
  },
  methods: {
    async jumpToSlide (slideIndex) {
      this.props.activeIndex = slideIndex;
      this.currentOffset = this.getSlideOffset(slideIndex);
      await this.$nextTick();
    },
    
    async scrollToSlide(slideIndex) {
      // Cancel and resolve previous scrolling attempts
      cancelAnimationFrame(this.animationId);
      this.promiseResolve && this.promiseResolve();
      
      // Calculate the position, and then shift it over to the non-duplicated slides
      const slideOffset = this.getSlideOffset(slideIndex);
      this.updateOffsetToBeAbsolute();
      
      if (slideOffset === this.currentOffset) {
        return;
      }
      if (this.dragging && !this.props.shouldInfiniteScroll) {
        // If we're done dragging, set the direction so we take the shortest route possible
        this.dragging = false;
        this.props.scrollDir = this.currentOffset > slideOffset ? 'next' : 'prev';
      }
      // Move the current offset to so we end on the original slides and scroll in the correct direction
      if (this.currentOffset <= slideOffset && this.props.scrollDir === 'next') {
        this.currentOffset = this.currentOffset + this.totalWidth;
      } else if (this.currentOffset > slideOffset && this.props.scrollDir === 'prev') {
        this.currentOffset = this.currentOffset - this.totalWidth;
      }
      
      try {
        await new Promise(resolve => {
          this.promiseResolve = resolve;
          this.scrollStartTime = performance.now();
          this.scroll(this.currentOffset, slideOffset, this.scrollStartTime, 500, resolve);
        });
      } catch (ignore) {
        // ignore
      }
      this.props.scrollDir = false;
    },
    
    scroll(from, to, currentTime, duration, resolve) {
      const vm = this;
      vm.currentOffset = this.props.scrollingFunction(currentTime - vm.scrollStartTime, from, to, duration);
      
      this.animationId = requestAnimationFrame((timestamp) => {
        if (currentTime < vm.scrollStartTime + duration) {
          vm.scroll(from, to, timestamp, duration, resolve);
        } else {
          vm.currentOffset = to;
          resolve();
        }
      });
    }
  }
};