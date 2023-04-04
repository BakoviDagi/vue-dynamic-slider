import { provide } from 'vue';

export function useProvide (currentSlidesPerView, activeIndex, totalSlides, scrollDir,
    shouldInfiniteScroll, props) {
  provide('currentSlidesPerView', currentSlidesPerView);
  provide('activeIndex', activeIndex);
  provide('totalSlides', totalSlides);
  provide('scrollDir', scrollDir);
  
  // TODO readonly?
  provide('shouldInfiniteScroll', shouldInfiniteScroll);
  provide('breakpoints', props.breakpoints);
  provide('scrollingFunction', props.scrollingFunction);
}
