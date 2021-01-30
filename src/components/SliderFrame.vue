<script>
  import "../scss/vue-dynamic-slider.scss";
  import {keepInRange} from './utils/range-util';
  import {easeOutCubic} from './utils/scroll';

  export default {
    props: {
      /**
       * The number of slides to show at a time
       */
      slidesPerView: {
        type: Number,
        default: 5
      },
      /**
       * True to enable infinite scrolling
       */
      infiniteScroll: {
        type: Boolean,
        default: false
      },
      /**
       * The breakpoints to change slides per view
       * @see breakpoint-mixin.js
       */
      breakpoints: {
        type: Object,
        default: null
      },
      /**
       * Override for the scrolling function.
       * @see easeOutCubic
       */
      scrollingFunction: {
        type: Function,
        default: easeOutCubic
      }
    },
    data() {
      return {
        activeIndex: 0,
        totalSlides: 0,
        currentSlidesPerView: this.slidesPerView,
      };
    },
    provide() {
      const props = {};
      Object.defineProperty(props, 'slidesPerView', {
        enumerable: true,
        get: () => this.slidesPerView,
        set: (slidesPerView) => {
          this.slidesPerView = slidesPerView
        }
      });
      Object.defineProperty(props, 'currentSlidesPerView', {
        enumerable: true,
        get: () => this.currentSlidesPerView,
        set: (currentSlidesPerView) => {
          this.currentSlidesPerView = currentSlidesPerView
        }
      });
      Object.defineProperty(props, 'activeIndex', {
        enumerable: true,
        get: () => this.activeIndex,
        set: this.setActiveIndex
      });
      Object.defineProperty(props, 'totalSlides', {
        enumerable: true,
        get: () => this.totalSlides,
        set: (totalSlides) => {
          this.totalSlides = totalSlides
        }
      });

      // Read-only
      Object.defineProperty(props, 'infiniteScroll', {
        enumerable: true,
        get: () => this.shouldInfiniteScroll,
      });
      Object.defineProperty(props, 'breakpoints', {
        enumerable: true,
        get: () => this.breakpoints,
      });
      Object.defineProperty(props, 'scrollingFunction', {
        enumerable: true,
        get: () => this.scrollingFunction,
      });

      return {props}
    },
    computed: {
      canScrollNext () {
        return this.shouldInfiniteScroll || this.activeIndex < this.totalSlides - 1;
      },
      canScrollPrev () {
        return this.shouldInfiniteScroll || this.activeIndex > 0;
      },
      shouldInfiniteScroll () {
        return this.infiniteScroll && this.totalSlides > this.currentSlidesPerView;
      }
    },
    watch: {
      activeIndex(activeIndex) {
        this.$emit('change', activeIndex);
      }
    },
    methods: {
      goToIndex(index) {
        this.activeIndex = index;
      },
      next() {
        if (this.canScrollNext) {
          this.activeIndex++;
        }
      },
      prev() {
        if (this.canScrollPrev) {
          this.activeIndex--;
        }
      },
      setActiveIndex (activeIndex) {
        if (this.shouldInfiniteScroll) {
          // TODO first scroll to slide outside of range, then update offset to absolute
          this.activeIndex = activeIndex % this.totalSlides;
        } else {
          this.activeIndex = keepInRange(activeIndex, 0, this.totalSlides - 1);
        }
      }
    },
    render() {
      return this.$scopedSlots.default({
        // Data
        /** The current slide */
        activeIndex: this.activeIndex,
        /** Whether or not there is a next slide to scroll to */
        canScrollNext: this.canScrollNext,
        /** Whether or not there is a previous slide to scroll to */
        canScrollPrev: this.canScrollPrev,

        // Methods
        /** Function to scroll to the given slide */
        scrollToSlide: this.goToIndex,
        /** Function to scroll to the next slide */
        next: this.next,
        /** Function to scroll to the previous slide */
        prev: this.prev
      });
    },
  };
</script>