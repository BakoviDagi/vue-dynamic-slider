<script>
import {deepClone} from './utils/vue-util';
import ScrollableMixin from './mixins/scrollable-mixin';
import DraggableMixin from './mixins/draggable-mixin';
import BreakpointMixin from './mixins/breakpoint-mixin';
import { h } from 'vue';

export default {
  name: 'SliderSlides',
  mixins: [ScrollableMixin, DraggableMixin, BreakpointMixin],
  props: {
    classes: {
      type: [Array, Object, String],
      default: ''
    }
  },
  data() {
    return {
      elementWidth: -1,
      currentOffset: 0,
      scrollPercentage: 0,

      resizeObserver: null
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
      if (this.props.shouldInfiniteScroll) {
        return -this.totalWidth;
      }
      return 0;
    },
  },
  render() {
    const slides = [...this.$slots.default()[0].children];
    this.props.totalSlides = slides.length;

    // Duplicate slides for infinite sliding, but only if there's more slides than in view
    if(this.props.shouldInfiniteScroll) {
      slides.unshift(...deepClone(slides, h, 'prevDup'));
      slides.push(...deepClone(slides, h, 'nextDup'));
    }
    return h('div', { class: 'dynamic-slider' }, [
      h('div', {
            class: ['dynamic-slider-slides', this.classes],
            onClickCapture: this.cancelClicks
          },
          slides),
    ]);
  },
  mounted() {
    this.resizeObserver = new ResizeObserver(this.updateWidth);
    this.resizeObserver.observe(this.$el);
  },
  watch: {
    currentOffset(currentOffset) {
      // Save the scroll percentage so that the current position can be held when resizing
      // Use nextTick so that the resize listener uses the old percentage
      const offset = this.props.shouldInfiniteScroll ? -(currentOffset % this.totalWidth) : -currentOffset;
      this.scrollPercentage = offset / this.totalWidth;
    },
    'props.currentSlidesPerView': function () {
      this.jumpToSlide(this.props.activeIndex);
    },
    'props.totalSlides': function () {
      this.jumpToSlide(this.props.activeIndex);
    },
    'props.activeIndex': async function (activeIndex) {
      await this.scrollToSlide(activeIndex);
    },
    elementWidth () {
      this.jumpToSlide(this.props.activeIndex);
    }
  },
  beforeDestroy() {
    this.resizeObserver.disconnect();
  },
  methods: {
    updateWidth() {
      this.elementWidth = this.$el.offsetWidth;
      this.updateOffsetToBeAbsolute();
    },

    updateOffsetToBeAbsolute () {
      this.currentOffset = -this.scrollPercentage * this.totalWidth + this.slideOffsetModifier;
    },

    getSlideOffset (slideIndex) {
      return -slideIndex * this.slideWidth + this.slideOffsetModifier;
    }
  }
};
</script>

<style>
.dynamic-slider-slides {
  left: calc(v-bind(currentOffset) * 1px);
}
</style>