import {throttle} from '../utils/throttle';

const SIZES = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280
};

/**
 *
 */
export default {
  data () {
    return {
      breakpointWidth: window.innerWidth
    }
  },
  mounted () {
    const vm = this;
    function setBreakpointWidth () {
      if (vm.props.breakpointElement) {
        vm.breakpointWidth = vm.props.breakpointElement().offsetWidth;
      } else {
        vm.breakpointWidth = window.innerWidth;
      }
    }
    
    window.addEventListener(
      'resize',
      throttle(setBreakpointWidth, 100),
      false
    );
    setBreakpointWidth();
    
    if (this.props.breakpoints) {
      this.props.currentSlidesPerView = this.getBreakpointValue(this.props.breakpoints, this.props.slidesPerView, 'slidesPerView');
      this.props.currentScrollIncrement = this.getBreakpointValue(this.props.breakpoints, this.props.scrollIncrement, 'scrollIncrement');
    }
  },
  watch: {
    breakpointWidth () {
      if (this.props.breakpoints) {
        this.props.currentSlidesPerView = this.getBreakpointValue(this.props.breakpoints, this.props.slidesPerView, 'slidesPerView');
        this.props.currentScrollIncrement = this.getBreakpointValue(this.props.breakpoints, this.props.scrollIncrement, 'scrollIncrement');
      }
    },
    'props.slidesPerView': function (slidesPerView) {
      this.props.currentSlidesPerView = this.getBreakpointValue(this.props.breakpoints, slidesPerView, 'slidesPerView');
    },
    'props.scrollIncrement': function (scrollIncrement) {
      this.props.currentSlidesPerView = this.getBreakpointValue(this.props.breakpoints, scrollIncrement, 'scrollIncrement');
    }
  },
  methods: {
    getBreakpointValue (breakpointMap, defaultValue, fieldName) {
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
        if (this.breakpointWidth <= breakpoint) {
          return computedBreakpoints[breakpoint][fieldName] || defaultValue;
        }
      }
      return defaultValue;
    }
  }
}

function breakpointComparator(a, b) {
  return a - b;
}