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
      duplicateRightStart() {
        return this.totalWidth * -2;
      },
      slideWidth() {
        return this.elementWidth / this.props.currentSlidesPerView;
      },
      totalWidth() {
        return this.slideWidth * this.props.totalSlides;
      },
      /**
       * On infinite scroll, with 5 slides 100px wide, index 3 would normally be -300 offset,
       * but since there's duplicate slides, that should really be -800 offset (5*100)
       */
      slideOffsetModifier () {
        if (this.props.infiniteScroll) {
          return -this.totalWidth;
        }
        return 0;
      },
    },
    render(createElement) {
      const slides = [this.$slots.default];
      this.props.totalSlides = this.$slots.default.length;

      // Duplicate slides for infinite sliding, but only if there's more slides than in view
      if(this.props.infiniteScroll) {
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
      this.updateWidth();
    },
    watch: {
      currentOffset(currentOffset) {
        // Save the scroll percentage so that the current position can be held when resizing
        // Use nextTick so that the resize listener uses the old percentage
        const offset = this.props.infiniteScroll ? -(currentOffset % this.totalWidth) : -currentOffset;
        this.scrollPercentage = offset / this.totalWidth;
      },
      'props.currentSlidesPerView': function () {
        this.jumpToSlide(this.props.activeIndex);
      },
      'props.totalSlides': function () {
        this.jumpToSlide(this.props.activeIndex);
      },
      'props.activeIndex': function (activeIndex) {
        // Move the slides back to the non-duplicated
        this.updateOffsetToBeAbsolute();
        this.scrollToSlide(activeIndex);
      }
    },
    beforeDestroy() {
      this.observer.disconnect();
    },
    methods: {

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
