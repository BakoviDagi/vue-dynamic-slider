<script setup>
import "../scss/vue-dynamic-slider.scss";
import { ref, computed, watch, useSlots, h } from 'vue';
import { useAutoplay } from './autoplay.js';
import { easeOutCubic } from './utils/scroll.js';
import { keepInRange } from './utils/range-util.js';
import { useProvide } from './provide.js';

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

// Data
const scrollDir = ref(null);
const activeIndex = ref(0);
const totalSlides = ref(0);
const currentSlidesPerView = ref(props.slidesPerView);
const currentScrollIncrement = ref(props.scrollIncrement);

// Computed
const numPages = computed(() => Math.ceil(totalSlides.value / currentScrollIncrement.value));
const shouldInfiniteScroll = computed(() => props.infiniteScroll && totalSlides.value > currentSlidesPerView.value);
const lastAllowedSlide = computed(() => {
  if (shouldInfiniteScroll.value) {
    return totalSlides.value - 1;
  }
  return Math.max(totalSlides.value - currentSlidesPerView.value, 0);
});
const canScrollNext = computed(() => shouldInfiniteScroll.value || activeIndex.value < lastAllowedSlide.value);
const canScrollPrev = computed(() => shouldInfiniteScroll.value || activeIndex.value > 0);
const singleScroll = computed(() => currentScrollIncrement.value === 1);
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

watch(activeIndex, val => emit('change', val));

// Methods
function goToIndex(index) {
  requestScrollToSlide(getNearestAllowedIndex(index));
}
function goToPage (index) {
  requestScrollToSlide(getNearestAllowedIndex(currentScrollIncrement.value * index));
}
function prev() {
  scrollDir.value = 'prev';
  requestScrollToSlide(getNearestAllowedIndex(activeIndex.value - 1));
}
function setActiveIndex (activeIndex) {
  requestScrollToSlide(getNearestAllowedIndex(activeIndex));
}
function requestScrollToSlide (index) {
  if (shouldInfiniteScroll.value) {
    activeIndex.value = index < 0 ? index + totalSlides.value : index % totalSlides.value;
  } else {
    activeIndex.value = keepInRange(index, 0, lastAllowedSlide.value);
  }
}
/**
 * Takes the scrollIncrement into account and rounds to the nearest allowed slide
 */
function getNearestAllowedIndex (index) {
  if (singleScroll.value) {
    return index;
  }
  const dir = scrollDir.value || (index > activeIndex.value ? 'next' : 'prev');
  const round = dir === 'next' ? 'ceil' : 'floor';
  // Round to multiple of currentScrollIncrement
  const allowedIndex = Math[round](index / currentScrollIncrement.value) * currentScrollIncrement.value;
  return shouldInfiniteScroll.value && allowedIndex >= totalSlides.value ? 0 : allowedIndex;
}
function next () {
  scrollDir.value = 'next';
  requestScrollToSlide(getNearestAllowedIndex(activeIndex.value + 1));
}

useProvide (currentSlidesPerView, currentScrollIncrement, activeIndex, totalSlides, scrollDir, props.slidesPerView,
    props.scrollIncrement, shouldInfiniteScroll, props.breakpoints, props.scrollingFunction, setActiveIndex)

useAutoplay(props, scrollDir, activeIndex, next);

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
