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
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    }
  },
  mounted () {
    const vm = this;
    window.addEventListener(
      'resize',
      throttle(() => {
        vm.windowWidth = window.innerWidth;
        vm.windowHeight = window.innerHeight;
      }, 100),
      false
    );
  
    if (this.props.breakpoints) {
      this.props.currentSlidesPerView = this.getBreakpointValue(this.props.breakpoints, this.props.slidesPerView);
    }
  },
  watch: {
    windowWidth () {
      if (this.props.breakpoints) {
        this.props.currentSlidesPerView = this.getBreakpointValue(this.props.breakpoints, this.props.slidesPerView);
      }
    },
    'props.slidesPerView': function (slidesPerView) {
      this.props.currentSlidesPerView = this.getBreakpointValue(this.props.breakpoints, slidesPerView);
    }
  },
  methods: {
    getBreakpointValue (breakpointMap, defaultValue) {
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
        if (this.windowWidth <= breakpoint) {
          return computedBreakpoints[breakpoint];
        }
      }
      return defaultValue;
    }
  }
}

function breakpointComparator(a, b) {
  return a - b;
}
