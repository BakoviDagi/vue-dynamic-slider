<script>
import "../scss/vue-dynamic-slider.scss";
import {keepInRange} from './utils/range-util';
import {easeOutCubic} from './utils/scroll';
import { h } from 'vue';

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
     * The number of slides to scroll by at a time
     */
    scrollIncrement: {
      type: Number,
      default: 1
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
    },

    /**
     * Set to true in order to automatically scroll through the slides. Change to false at any time to pause
     * @see autoplayInterval
     */
    autoplay: {
      type: Boolean,
      default: false
    },
    /**
     * The interval, in milliseconds to wait before going to the next slide group
     */
    autoplayInterval: {
      type: Number,
      default: 5000
    }
  },
  data: vm => ({
    activeIndex: 0,
    totalSlides: 0,
    currentSlidesPerView: vm.slidesPerView,
    currentScrollIncrement: vm.scrollIncrement,
    scrollDir: false,
    autoplayId: -1
  }),
  provide () {
    const props = {};
    const vm = this;
    function reactive (name, setter = undefined) {
      if (setter === true) {
        setter = (prop) => vm[name] = prop;
      }
      Object.defineProperty(props, name, {
        enumerable: true,
        get: () => vm[name],
        set: setter
      });
    }

    reactive('currentSlidesPerView', (currentSlidesPerView) => {
      this.currentSlidesPerView = Math.min(currentSlidesPerView, this.totalSlides)
    });
    reactive('currentScrollIncrement', true);
    reactive('activeIndex', this.setActiveIndex);
    reactive('totalSlides', true);
    reactive('scrollDir', (scrollDir) => {
      this.scrollDir = ['next', 'prev'].includes(scrollDir) ? scrollDir : false;
    });

    // Read-only
    reactive('slidesPerView');
    reactive('scrollIncrement');
    reactive('shouldInfiniteScroll');
    reactive('breakpoints');
    reactive('scrollingFunction');

    return {props}
  },
  computed: {
    canScrollNext () {
      return this.shouldInfiniteScroll || this.activeIndex < this.lastAllowedSlide;
    },
    canScrollPrev () {
      return this.shouldInfiniteScroll || this.activeIndex > 0;
    },
    shouldInfiniteScroll () {
      return this.infiniteScroll && this.totalSlides > this.currentSlidesPerView;
    },
    singleScroll () {
      return this.currentScrollIncrement === 1;
    },
    slidesInView () {
      const slidesInView = [];
      for (let i = this.activeIndex; i < this.activeIndex + this.currentSlidesPerView; i++) {
        if (this.shouldInfiniteScroll) {
          slidesInView.push(i >= this.totalSlides ? i - this.totalSlides : i);
        } else if (i < this.totalSlides) {
          slidesInView.push(i);
        }
      }
      return slidesInView;
    },
    currentPage () {
      return Math.floor(this.activeIndex / this.totalSlides * this.numPages);
    },
    numPages () {
      return Math.ceil(this.totalSlides / this.currentScrollIncrement);
    },
    lastAllowedSlide () {
      if (this.shouldInfiniteScroll) {
        return this.totalSlides - 1;
      }
      return Math.max(this.totalSlides - this.currentSlidesPerView, 0);
    }
  },
  watch: {
    activeIndex(activeIndex) {
      this.$emit('change', activeIndex);
    },
    autoplay (autoplay) {
      clearTimeout(this.autoplayId);
      if (autoplay) {
        this.startAutoplay();
      }
    }
  },
  mounted () {
    if (this.autoplay) {
      this.startAutoplay();
    }
  },
  methods: {
    startAutoplay () {
      this.autoplayId = setTimeout(() => {
        this.next();
      }, this.autoplayInterval);
    },

    goToIndex(index) {
      this.requestScrollToSlide(this.getNearestAllowedIndex(index));
    },
    goToPage (index) {
      this.requestScrollToSlide(this.getNearestAllowedIndex(this.currentScrollIncrement * index));
    },
    next() {
      this.scrollDir = 'next';
      this.requestScrollToSlide(this.getNearestAllowedIndex(this.activeIndex + 1));
    },
    prev() {
      this.scrollDir = 'prev';
      this.requestScrollToSlide(this.getNearestAllowedIndex(this.activeIndex - 1));
    },
    setActiveIndex (activeIndex) {
      this.requestScrollToSlide(this.getNearestAllowedIndex(activeIndex));
    },
    requestScrollToSlide (index) {
      // Reset any existing timer
      if (this.autoplay) {
        clearTimeout(this.autoplayId);
        this.startAutoplay();
      }

      if (this.shouldInfiniteScroll) {
        this.activeIndex = index < 0 ? index + this.totalSlides : index % this.totalSlides;
      } else {
        this.activeIndex = keepInRange(index, 0, this.lastAllowedSlide);
      }
    },
    /**
     * Takes the scrollIncrement into account and rounds to the nearest allowed slide
     */
    getNearestAllowedIndex (index) {
      if (this.singleScroll) {
        return index;
      }
      const dir = this.scrollDir || (index > this.activeIndex ? 'next' : 'prev');
      const round = dir === 'next' ? 'ceil' : 'floor';
      // Round to multiple of currentScrollIncrement
      const allowedIndex = Math[round](index / this.currentScrollIncrement) * this.currentScrollIncrement;
      return this.shouldInfiniteScroll && allowedIndex >= this.totalSlides ? 0 : allowedIndex;
    }
  },
  beforeDestroy () {
    clearTimeout(this.autoplayId);
  },
  render() {
    return h('div', this.$slots.default({
      // Data
      /** The current slide */
      activeIndex: this.activeIndex,
      /** Whether or not there is a next slide to scroll to */
      canScrollNext: this.canScrollNext,
      /** Whether or not there is a previous slide to scroll to */
      canScrollPrev: this.canScrollPrev,
      /** The array of all slide indices that are visible */
      slidesInView: this.slidesInView,
      /** Object that contains pagination information */
      pagination: {
        numPages: this.numPages,
        currentPage: this.currentPage
      },

      // Methods
      /** Function to scroll to the given slide */
      scrollToSlide: this.goToIndex,
      /** Function to scroll to the given page */
      scrollToPage: this.goToPage,
      /** Function to scroll to the next slide */
      next: this.next,
      /** Function to scroll to the previous slide */
      prev: this.prev
    }));
  },
};
</script>
