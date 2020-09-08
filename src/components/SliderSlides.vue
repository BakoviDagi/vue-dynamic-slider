<script>
  import {deepClone} from './utils/vue-util';
  import {throttle} from './utils/throttle';
  import {listenToImagesLoad} from './utils/mutations';
  import ScrollableMixin from './mixins/scrollable-mixin';
  import DraggableMixin from './mixins/draggable-mixin';
  import BreakpointMixin from './mixins/breakpoint-mixin';

  export default {
    name: 'SliderSlides',
    mixins: [ScrollableMixin, DraggableMixin, BreakpointMixin],
    data() {
      return {
        elementWidth: -1,
        currentOffset: 0,
        scrollPercentage: 0,

        observer: null
      }
    },
    inject: [
      'props'
    ],
    computed: {
      totalSlides() {
        return this.$slots.default.length;
      },
      duplicateRightStart() {
        return this.totalWidth * -2;
      },
      slideWidth() {
        return this.elementWidth / this.props.currentSlidesPerView;
      },
      totalWidth() {
        return this.slideWidth * this.totalSlides;
      },
      infiniteScroll () {
        return this.props.infiniteScroll && this.totalSlides > this.props.currentSlidesPerView;
      },
      /**
       * On infinite scroll, with 5 slides 100px wide, index 3 would normally be -300 offset,
       * but since there's duplicate slides, that should really be -800 offset (5*100)
       */
      slideOffsetModifier () {
        if (this.infiniteScroll) {
          return -this.totalWidth;
        }
        return 0;
      }
    },
    render(createElement) {
      const slides = [this.$slots.default];

      // Duplicate slides for infinite sliding, but only if there's more slides than in view
      if(this.infiniteScroll) {
        slides.unshift(...deepClone(this.$slots.default, createElement, 'prevDup'));
        slides.push(...deepClone(this.$slots.default, createElement, 'nextDup'));
      }
      return createElement('div', {class: 'dynamic-slider'}, [
        createElement('div', {
            class: 'dynamic-slider-slides',
            style: `left: ${this.currentOffset}px`,
            // Add a "capture" click listener https://vuejs.org/v2/guide/render-function.html#Event-amp-Key-Modifiers
            on: { '!click': this.cancelClicks }
          },
          slides),
      ]);
    },
    mounted() {
      window.addEventListener('scroll', this.updateWidth);
      window.addEventListener('resize', this.updateWidth);
      window.addEventListener('resize', this.updateOffsetToBeAbsolute);

      // Add a new mutation observer to update the width on DOM changes
      // TODO look into the efficiency of this
      this.observer = new MutationObserver(throttle(this.mutationObserverCallback, 20));
      this.observer.observe(this.$el, {attributes: true, childList: true, subtree: true});

      this.props.totalSlides = this.totalSlides;
      this.updateCanScroll();
    },
    watch: {
      currentOffset(currentOffset) {
        this.$nextTick(() => {
          // Save the scroll percentage so that the current position can be held when resizing
          // Use nextTick so that the resize listener uses the old percentage
          const offset = this.infiniteScroll ? -(currentOffset % this.totalWidth) : -currentOffset;
          this.scrollPercentage = offset / this.totalWidth;
        });
      },
      totalSlides(totalSlides) {
        this.props.totalSlides = totalSlides;
      },
      'props.currentSlidesPerView': function () {
        // Once the DOM updates, re-calculate the width and scroll to the closest slide
        this.$nextTick(() => {
          this.updateWidth();
          this.jumpToSlide(this.props.activeIndex);
        });
      },
      'props.activeIndex': function (activeIndex) {
        // TODO this is pretty messy and long...
        this.$nextTick(() => {
          // TODO this is basically only needed the first time...
          this.updateWidth();
        });

        this.updateCanScroll();

        if (this.infiniteScroll) {
          // TODO first scroll to slide outside of range, then update offset to absolute
          if (activeIndex < 0) {
            this.props.activeIndex = activeIndex + this.totalSlides;
            return;
          } else if (activeIndex >= this.totalSlides) {
            this.props.activeIndex = activeIndex - this.totalSlides;
            return;
          }
        } else {
          if (activeIndex < 0) {
            this.props.activeIndex = 0;
            return;
          } else if (activeIndex >= this.totalSlides) {
            this.props.activeIndex = this.totalSlides - 1;
            return;
          }
        }
        this.$nextTick(() => {
          this.scrollToSlide(activeIndex);
        });
      }
    },
    beforeDestroy() {
      this.observer.disconnect();
    },
    methods: {

      updateCanScroll () {
        this.props.canScrollNext = true;
        this.props.canScrollPrev = true;
        if (this.infiniteScroll) {
          return;
        }

        if (this.props.activeIndex <= 0) {
          this.props.canScrollPrev = false;
        } else if (this.props.activeIndex >= this.totalSlides - 1) {
          this.props.canScrollNext = false;
        }
      },

      updateWidth() {
        this.elementWidth = this.$el.offsetWidth;
      },

      updateOffsetToBeAbsolute () {
        this.currentOffset = -this.scrollPercentage * this.totalWidth + this.slideOffsetModifier;
      },

      getSlideOffset (slideIndex) {
        return -slideIndex * this.slideWidth + this.slideOffsetModifier;
      },

      mutationObserverCallback(mutationsList) {
        this.$nextTick(() => {
          this.updateWidth();
        });
        listenToImagesLoad(mutationsList, () => {
          // TODO update these to be automated (shouldn't have to call keep position?)
          this.updateWidth();
          this.updateOffsetToBeAbsolute();
        });
      }
    }
  };
</script>
