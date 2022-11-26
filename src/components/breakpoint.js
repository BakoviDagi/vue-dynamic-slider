import {ref, computed, onMounted, onBeforeUnmount} from 'vue';
import {throttle} from './utils/throttle.js';

const SIZES = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280
};

export function useBreakpoint (props, totalSlides) {
  const windowWidth = ref(0);
  
  const resize = throttle(() => {
    windowWidth.value = window.innerWidth;
  }, 100);

  onMounted(() => {
    resize();
    window.addEventListener('resize', resize, { passive: true })
  });
  onBeforeUnmount(() => {
    window.removeEventListener('resize', resize);
  });
  
  function getBreakpointValue (breakpointMap, defaultValue, width, fieldName) {
    if (!breakpointMap) {
      return defaultValue;
    }
    let computedBreakpoints = {};
    // If the breakpoints are 'xl', 'md' etc instead of numbers, get their corresponding numbers
    Object.keys(breakpointMap).forEach(breakpoint => {
      let size = SIZES[breakpoint];
      if (size) {
        computedBreakpoints[size] = breakpointMap[breakpoint];
      } else {
        computedBreakpoints[breakpoint] = breakpointMap[breakpoint];
      }
    });
    
    for(let breakpoint of Object.keys(computedBreakpoints).sort(breakpointComparator)) {
      if (width <= breakpoint) {
        return computedBreakpoints[breakpoint][fieldName] || defaultValue;
      }
    }
    return defaultValue;
  }

  const currentSlidesPerView = computed(() => {
    return Math.min(getBreakpointValue(props.breakpoints, props.slidesPerView, windowWidth.value, 'slidesPerView'), totalSlides.value);
  });
  const currentScrollIncrement = computed(() => {
    return getBreakpointValue(props.breakpoints, props.scrollIncrement, windowWidth.value, 'scrollIncrement');
  });

  return {
    currentSlidesPerView,
    currentScrollIncrement
  };
}

function breakpointComparator(a, b) {
  return a - b;
}
