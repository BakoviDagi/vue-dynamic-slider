import { provide } from 'vue';

export function useProvide (currentSlidesPerView, currentScrollIncrement, activeIndex, totalSlides, scrollDir, slidesPerView,
    scrollIncrement, shouldInfiniteScroll, breakpoints, scrollingFunction, setActiveIndex) {
  const props = {};
  const vm = this;
  function reactive (name, ref, setter = undefined) {
    if (setter === true) {
      setter = (prop) => ref.value = prop;
    }
    Object.defineProperty(props, name, {
      enumerable: true,
      get: () => ref && typeof ref.value !== 'undefined' ? ref.value : ref,
      set: setter
    });
  }
  
  reactive('currentSlidesPerView', currentSlidesPerView, (currentSlidesPerViewV) => {
    currentSlidesPerView.value = Math.min(currentSlidesPerViewV, totalSlides.value)
  });
  reactive('currentScrollIncrement', currentScrollIncrement, true);
  reactive('activeIndex', activeIndex, setActiveIndex);
  reactive('totalSlides', totalSlides, true);
  reactive('scrollDir', scrollDir, (scrollDirV) => {
    scrollDir.value = ['next', 'prev'].includes(scrollDirV) ? scrollDirV : null;
  });
  
  // Read-only
  reactive('slidesPerView', slidesPerView);
  reactive('scrollIncrement', scrollIncrement);
  reactive('shouldInfiniteScroll', shouldInfiniteScroll);
  reactive('breakpoints', breakpoints);
  reactive('scrollingFunction', scrollingFunction);
  
  provide('props', props);
}