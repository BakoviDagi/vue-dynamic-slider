<script>
  import "../scss/vue-dynamic-slider.scss";
  export default {
    props: {
      slidesPerView: {
        type: Number,
        default: 5
      },
      infiniteScroll: {
        type: Boolean,
        default: false
      },
      breakpoints: {
        type: Object,
        default: null
      }
    },
    data() {
      return {
        activeIndex: 0,
        totalSlides: 0,
        currentSlidesPerView: this.slidesPerView,

        canScrollPrev: false,
        canScrollNext: true
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
        set: (activeIndex) => {
          this.activeIndex = activeIndex
        }
      });
      Object.defineProperty(props, 'totalSlides', {
        enumerable: true,
        get: () => this.totalSlides,
        set: (totalSlides) => {
          this.totalSlides = totalSlides
        }
      });
      Object.defineProperty(props, 'infiniteScroll', {
        enumerable: true,
        get: () => this.infiniteScroll,
      });
      Object.defineProperty(props, 'breakpoints', {
        enumerable: true,
        get: () => this.breakpoints,
      });

      Object.defineProperty(props, 'canScrollNext', {
        enumerable: true,
        get: () => this.canScrollNext,
        set: (canScrollNext) => {
          this.canScrollNext = canScrollNext
        }
      });
      Object.defineProperty(props, 'canScrollPrev', {
        enumerable: true,
        get: () => this.canScrollPrev,
        set: (canScrollPrev) => {
          this.canScrollPrev = canScrollPrev
        }
      });
      return {props}
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
        this.activeIndex++;
      },
      prev() {
        this.activeIndex--;
      },
    },
    render() {
      return this.$scopedSlots.default({
        // Data
        activeIndex: this.activeIndex,
        canScrollNext: this.canScrollNext,
        canScrollPrev: this.canScrollPrev,
        // Methods
        scrollToSlide: this.goToIndex,
        next: this.next,
        prev: this.prev
      });
    },
  };
</script>