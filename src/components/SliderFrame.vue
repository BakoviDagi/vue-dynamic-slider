<script setup>
import '../scss/vue-dynamic-slider.scss';
import { ref, computed, watch, useSlots, h } from 'vue';
import { useAutoplay } from './composables/autoplay.js';
import { easeOutCubic } from './utils/scroll.js';
import { keepInRange } from './utils/range-util.js';
import { useProvide } from './composables/provide.js';
import {useBreakpoint} from './composables/breakpoint.js';

const props = defineProps({
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
});
const emit = defineEmits(['change']);

const scrollDir = ref(null);
const totalSlides = ref(0);

const {
  currentSlidesPerView,
  currentScrollIncrement
} = useBreakpoint(props, totalSlides);

// Computed
const numPages = computed(() => Math.ceil(totalSlides.value / currentScrollIncrement.value));
const shouldInfiniteScroll = computed(() => props.infiniteScroll && totalSlides.value > currentSlidesPerView.value);
const lastAllowedSlide = computed(() => {
  if (shouldInfiniteScroll.value) {
    return totalSlides.value - 1;
  }
  return Math.max(totalSlides.value - currentSlidesPerView.value, 0);
});

function getNearestAllowedIndex (index) {
  if (currentScrollIncrement.value === 1) {
    return index;
  }
  const dir = scrollDir.value || (index > activeIndex.value ? 'next' : 'prev');
  const round = dir === 'next' ? 'ceil' : 'floor';
  // Round to multiple of currentScrollIncrement
  const allowedIndex = Math[round](index / currentScrollIncrement.value) * currentScrollIncrement.value;
  return shouldInfiniteScroll.value && allowedIndex >= totalSlides.value ? 0 : allowedIndex;
}

const activeIndexValue = ref(0);
const activeIndex = computed({
  get: () => activeIndexValue.value,
  set: ix => {
    const nearest = getNearestAllowedIndex(ix);
    if (shouldInfiniteScroll.value) {
      activeIndexValue.value = nearest < 0 ? nearest + totalSlides.value : nearest % totalSlides.value;
    } else {
      activeIndexValue.value = keepInRange(nearest, 0, lastAllowedSlide.value);
    }
  }
})

watch(activeIndex, val => emit('change', val));

function next () {
  scrollDir.value = 'next';
  activeIndex.value = activeIndex.value + 1;
}

useProvide(currentSlidesPerView, activeIndex, totalSlides, scrollDir, shouldInfiniteScroll, props);

useAutoplay(props, scrollDir, activeIndex, next);

// Exposed
const canScrollNext = computed(() => shouldInfiniteScroll.value || activeIndex.value < lastAllowedSlide.value);
const canScrollPrev = computed(() => shouldInfiniteScroll.value || activeIndex.value > 0);
const slidesInView = computed(() => {
  const slidesInView = [];
  for (let i = activeIndex.value; i < activeIndex.value + currentSlidesPerView.value; i++) {
    if (shouldInfiniteScroll.value) {
      slidesInView.push(i >= totalSlides.value ? i - totalSlides.value : i);
    } else if (i < totalSlides.value) {
      slidesInView.push(i);
    }
  }
  return slidesInView;
});
const currentPage = computed(() => Math.floor(activeIndex.value / totalSlides.value * numPages.value));
function goToIndex(index) {
  activeIndex.value = index;
}
function goToPage (index) {
  activeIndex.value = currentScrollIncrement.value * index;
}
function prev() {
  scrollDir.value = 'prev';
  activeIndex.value = activeIndex.value - 1;
}

const slots = useSlots();
const root = () => h('div', slots.default({
  // Data
  activeIndex: activeIndex.value,
  canScrollNext: canScrollNext.value,
  canScrollPrev: canScrollPrev.value,
  slidesInView: slidesInView.value,
  pagination: {
    numPages: numPages.value,
    currentPage: currentPage.value
  },

  // Methods
  scrollToSlide: goToIndex,
  scrollToPage: goToPage,
  next,
  prev
}));
</script>

<template>
  <root />
</template>
