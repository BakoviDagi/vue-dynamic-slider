<script setup>
import { computed, h, inject, ref, useSlots, watch } from 'vue';
import { deepCloneComponent } from './utils/vue-util.js';
import { useResizeObserver } from './composables/resize-observer.js';
import { useScrollable } from './composables/scrollable.js';
import { useDraggable } from './composables/draggable.js';
import { useTeleport } from './composables/teleport.js';

const props = defineProps({
  classes: {
    type: [Array, Object, String],
    default: ''
  }
});

const el = ref(null);
const elementWidth = ref(-1);
const scrollPercentage = ref(0);

const currentSlidesPerView = inject('currentSlidesPerView');
const totalSlides = inject('totalSlides');
const shouldInfiniteScroll = inject('shouldInfiniteScroll');
const activeIndex = inject('activeIndex');

const slideWidth = computed(() => {
  return elementWidth.value / currentSlidesPerView.value;
});
const totalWidth = computed(() => {
  return slideWidth.value * totalSlides.value;
});

/**
 * On infinite scroll, with 5 slides 100px wide, index 3 would normally be -300 offset,
 * but since there's duplicate slides, that should really be -800 offset (5*100)
 */
const slideOffsetModifier = computed(() => {
  // if (shouldInfiniteScroll.value) {
  //   return -totalWidth.value;
  // }
  return 0;
});


function updateOffsetToBeAbsolute () {
  // currentOffset.value = -scrollPercentage.value * totalWidth.value + slideOffsetModifier.value;
}
const {
  currentOffset,
  scrollToSlide,
  jumpToSlide,
  cancelScroll
} = useScrollable(totalWidth, slideWidth, slideOffsetModifier, updateOffsetToBeAbsolute);

const { cancelClicks } = useDraggable(el, currentOffset, scrollToSlide, scrollPercentage, totalWidth, cancelScroll);

useResizeObserver(el, () => {
  elementWidth.value = el.value.offsetWidth;
  updateOffsetToBeAbsolute();
});

watch(currentOffset, (value) => {
  // Save the scroll percentage so that the current position can be held when resizing
  const offset = shouldInfiniteScroll.value ? -(value % totalWidth.value) : -value;
  scrollPercentage.value = offset / totalWidth.value;
});
watch(activeIndex, () => {
  scrollToSlide(activeIndex.value);
});

function jumpWatcher () {
  jumpToSlide(activeIndex.value);
}
watch(currentSlidesPerView, jumpWatcher);
watch(totalSlides, jumpWatcher);
watch(elementWidth, jumpWatcher);
const slots = useSlots();

const { slideOrder } = useTeleport(currentOffset, elementWidth);

const root = () => {
  let slides = slots.default()[0].children;
  totalSlides.value = slides.length;

  activeIndex.value; // Make this rerun on active index change

  // Duplicate slides for infinite sliding, but only if there's more slides than in view
  if(shouldInfiniteScroll.value) {
    slides = slideOrder.value.map(o => slides[o]);
    // const prev = deepCloneComponent(slides, 'prevDup');
    // const next = deepCloneComponent(slides, 'nextDup');
    // slides.unshift(...prev);
    // slides.push(...next);
  }

  return h('div', { class: 'dynamic-slider' }, [
    h('div', {
        class: ['dynamic-slider-slides', props.classes],
        onClickCapture: cancelClicks
      },
      slides
    ),
  ]);
}
</script>

<template>
  <root ref="el" />
</template>

<style>
.dynamic-slider-slides {
  left: calc(v-bind(currentOffset) * 1px);
}
</style>