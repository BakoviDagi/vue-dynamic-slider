import { ref, nextTick, inject } from 'vue';

export function useScrollable (totalWidth, slideWidth, slideOffsetModifier, updateOffsetToBeAbsolute) {
  const currentOffset = ref(0);
  const scrollStartTime = ref(0);
  const dragging = ref(false);

  const shouldInfiniteScroll = inject('shouldInfiniteScroll');
  const activeIndex = inject('activeIndex');
  const scrollDir = inject('scrollDir');
  const scrollingFunction = inject('scrollingFunction');

  // const currentOffset = shouldInfiniteScroll.value ? ref(slideWidth.value) : ref(0);

  let promiseResolve = null;
  let animationId = -1;

  function cancelScroll (startDrag = false) {
    cancelAnimationFrame(animationId);
    if (startDrag) {
      dragging.value = true;
    }
  }
  
  function getSlideOffset (slideIndex) {
    return -slideIndex * slideWidth.value + slideOffsetModifier.value;
  }

  function scroll (from, to, currentTime, duration, resolve) {
    currentOffset.value = scrollingFunction(currentTime - scrollStartTime.value, from, to, duration);
    
    animationId = requestAnimationFrame((timestamp) => {
      if (currentTime < scrollStartTime.value + duration) {
        scroll(from, to, timestamp, duration, resolve);
      } else {
        currentOffset.value = to;
        resolve();
      }
    });
  }
  
  async function jumpToSlide (slideIndex) {
    activeIndex.value = slideIndex;
    currentOffset.value = getSlideOffset(slideIndex);
    await nextTick();
  }
  
  async function scrollToSlide (slideIndex) {
    cancelScroll();
    promiseResolve && promiseResolve();
    
    // Calculate the position, and then shift it over to the non-duplicated slides
    const slideOffset = getSlideOffset(slideIndex);
    updateOffsetToBeAbsolute();

    if (slideOffset === currentOffset.value) {
      return;
    }
    if (dragging.value && !shouldInfiniteScroll.value) {
      // If we're done dragging, set the direction so we take the shortest route possible
      dragging.value = false;
      scrollDir.value = currentOffset.value > slideOffset ? 'next' : 'prev';
    }
    // Move the current offset to so we end on the original slides and scroll in the correct direction
    if (currentOffset.value <= slideOffset && scrollDir.value === 'next') {
      currentOffset.value = currentOffset.value + totalWidth.value;
    } else if (currentOffset.value > slideOffset && scrollDir.value === 'prev') {
      currentOffset.value = currentOffset.value - totalWidth.value;
    }
    
    try {
      await new Promise(resolve => {
        promiseResolve = resolve;
        scrollStartTime.value = performance.now();
        scroll(currentOffset.value, slideOffset, scrollStartTime.value, 500, resolve);
      });
    } catch (ignore) {
      // ignore
    }
    scrollDir.value = false;
  }

  return {
    currentOffset,
    scrollToSlide,
    jumpToSlide,
    cancelScroll
  }
}
