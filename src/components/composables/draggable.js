import { keepInRange } from '../utils/range-util';
import { inject, nextTick, onBeforeUnmount, onMounted } from 'vue';

const VELOCITY_THRESHOLD = .1;
const DRAG_TOLERANCE = 2;

function useListener (el, event, callback, passive = false) {
  onMounted(() => el.value.addEventListener(event, callback, { passive }));
  onBeforeUnmount(() => el.value && el.value.removeEventListener(event, callback));
}

export function useDraggable (el, currentOffset, scrollToSlide, scrollPercentage, totalWidth, cancelScroll) {
  let previousClientX = 0;
  let previousClientY = 0;
  let startClientX = 0;
  let velocity = 0;
  let previousTime = performance.now();
  
  const shouldInfiniteScroll = inject('shouldInfiniteScroll');
  const activeIndex = inject('activeIndex');
  const scrollDir = inject('scrollDir');
  const totalSlides = inject('totalSlides');

  useListener(el, 'touchstart', dragStart);
  useListener(el, 'touchend', dragEnd);
  useListener(el, 'touchmove', dragAction);
  useListener(el, 'mousedown', dragStart);
  
  onBeforeUnmount(() => {
    // In case the component is destroyed before dragEnd
    document.removeEventListener('mousemove', dragAction);
    document.removeEventListener('mouseup', dragEnd);
  });
  
  function dragStart(e) {
    cancelScroll(true);
    
    if (e.type === 'touchstart') {
      previousClientX = e.touches[0].clientX;
      previousClientY = e.touches[0].clientY;
    } else {
      e.preventDefault();
      previousClientX = e.clientX;
      document.addEventListener('mousemove', dragAction, { passive: false });
      document.addEventListener('mouseup', dragEnd, { passive: false });
    }
    startClientX = previousClientX;
  }
  
  function dragAction(e) {
    const currentPosition = getCurrentPosition(e);
    
    // Calculate velocity so we can go to the next slide if the user slides fast enough
    const currentTime = performance.now();
    velocity = (currentPosition - previousClientX) / (currentTime - previousTime);
    previousTime = currentTime;
    
    currentOffset.value -= previousClientX - currentPosition;
    previousClientX = currentPosition;
    
    if (shouldInfiniteScroll.value) {
      if (currentOffset.value >= 0) {
        currentOffset.value -= totalWidth.value;
      } else if (currentOffset.value <= (totalWidth.value * -2)) {
        currentOffset.value += totalWidth.value;
      }
    }
  }
  
  function closestSlideIndex () {
    let roundType = 'round';
    if (velocity >= VELOCITY_THRESHOLD) {
      roundType = 'floor';
      scrollDir.value = 'prev';
    } else if (velocity <= -VELOCITY_THRESHOLD) {
      roundType = 'ceil';
      scrollDir.value = 'next';
    }
    // Move the slides back to the non-duplicated
    let index = Math[roundType](scrollPercentage.value * totalSlides.value);
    if (!shouldInfiniteScroll.value) {
      index = keepInRange(index, 0, totalSlides.value - 1);
    }
    return index;
  }
  
  async function dragEnd(e) {
    document.removeEventListener('mousemove', dragAction);
    document.removeEventListener('mouseup', dragEnd);
    let originalIndex, newIndex = originalIndex = activeIndex.value;
    if (didDrag(getCurrentPosition(e))) {
      e.preventDefault();
      e.stopPropagation();
      newIndex = closestSlideIndex();
    }
    velocity = 0;
    
    activeIndex.value = newIndex;
    await nextTick();
    // If active index is unchanged, scroll back to start
    if (activeIndex.value === originalIndex) {
      // Reverse the direction so it's smoother and scroll to it
      await scrollToSlide(activeIndex.value);
    }
    scrollDir.value = false;
  }
  
  /**
   * If the user dragged, they likely don't want to click a link, so cancel any click listeners on children
   * @param e
   */
  function cancelClicks(e) {
    // If moved more than 2px, cancel click events on children
    if (didDrag(getCurrentPosition(e))) {
      e.stopPropagation();
      e.preventDefault();
    }
  }
  
  function didDrag (currentClientX) {
    return Math.abs(currentClientX - startClientX) > DRAG_TOLERANCE;
  }
  
  function getCurrentPosition (e) {
    switch (e.type) {
      case 'touchmove':
        return e.touches[0].clientX;
      case 'touchend':
        return e.changedTouches[0].clientX;
      default:
        return e.clientX;
    }
  }

  return {
    cancelClicks
  }
}
