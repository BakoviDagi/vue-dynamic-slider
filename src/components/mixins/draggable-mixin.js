import {keepInRange} from '../utils/range-util';

const VELOCITY_THRESHOLD = .1;
const DRAG_TOLERANCE = 2;

export default {
  data () {
    return {
      currentOffset: 0,
      previousClientX: 0,
      previousClientY: 0,
      startClientX: 0,
      velocity: 0,
      previousTime: Date.now(),
      dragging: false
    };
  },
  mounted () {
    this.$el.addEventListener('touchstart', this.dragStart, { passive: false });
    this.$el.addEventListener('touchend', this.dragEnd, { passive: false });
    this.$el.addEventListener('touchmove', this.dragAction, { passive: false });
    this.$el.addEventListener('mousedown', this.dragStart, { passive: false });
  },
  beforeDestroy () {
    this.$el.removeEventListener('touchstart', this.dragStart);
    this.$el.removeEventListener('touchend', this.dragEnd);
    this.$el.removeEventListener('touchmove', this.dragAction);
    this.$el.removeEventListener('mousedown', this.dragStart);
    
    // In case the component is destroyed before dragEnd
    document.removeEventListener('mousemove', this.dragAction);
    document.removeEventListener('mouseup', this.dragEnd);
  },
  methods: {
    closestSlideIndex () {
      let roundType = 'round';
      if (this.velocity >= VELOCITY_THRESHOLD) {
        roundType = 'floor';
        this.props.scrollDir = 'prev';
      } else if (this.velocity <= -VELOCITY_THRESHOLD) {
        roundType = 'ceil';
        this.props.scrollDir = 'next';
      }
      // Move the slides back to the non-duplicated
      let index = Math[roundType](this.scrollPercentage * this.props.totalSlides);
      if (!this.props.shouldInfiniteScroll) {
        index = keepInRange(index, 0, this.props.totalSlides - 1);
      }
      return index;
    },
    
    // https://www.cssscript.com/draggable-touch-slider-carousel/
    dragStart(e) {
      // Cancel any previous scrolling
      cancelAnimationFrame(this.animationId || -1);
      this.dragging = true;
      
      if (e.type === 'touchstart') {
        this.previousClientX = e.touches[0].clientX;
        this.previousClientY = e.touches[0].clientY;
      } else {
        e.preventDefault();
        this.previousClientX = e.clientX;
        document.addEventListener('mousemove', this.dragAction, { passive: false });
        document.addEventListener('mouseup', this.dragEnd, { passive: false });
      }
      this.startClientX = this.previousClientX;
    },
    
    dragAction(e) {
      const currentPosition = this.currentPosition(e);
      
      // Calculate velocity so we can go to the next slide if the user slides fast enough
      const currentTime = Date.now();
      this.velocity = (currentPosition - this.previousClientX) / (currentTime - this.previousTime);
      this.previousTime = currentTime;
      
      this.currentOffset -= this.previousClientX - currentPosition;
      this.previousClientX = currentPosition;
      
      if (this.props.shouldInfiniteScroll) {
        if (this.currentOffset >= 0) {
          this.currentOffset -= this.totalWidth;
        } else if (this.currentOffset <= this.duplicateRightStart) {
          this.currentOffset += this.totalWidth;
        }
      }
    },
    
    async dragEnd(e) {
      document.removeEventListener('mousemove', this.dragAction);
      document.removeEventListener('mouseup', this.dragEnd);
      let originalIndex, newIndex = originalIndex = this.props.activeIndex;
      if (this.didDrag(this.currentPosition(e))) {
        e.preventDefault();
        e.stopPropagation();
        newIndex = this.closestSlideIndex();
      }
      this.velocity = 0;
      
      this.props.activeIndex = newIndex;
      await this.$nextTick();
      // If active index is unchanged, scroll back to start
      if (this.props.activeIndex === originalIndex) {
        // Reverse the direction so it's smoother and scroll to it
        await this.scrollToSlide(this.props.activeIndex);
      }
      this.props.scrollDir = false;
    },
    
    /**
     * If the user dragged, they likely don't want to click a link, so cancel any click listeners on children
     * @param e
     */
    cancelClicks(e) {
      // If moved more than 2px, cancel click events on children
      if (this.didDrag(this.currentPosition(e))) {
        e.stopPropagation();
        e.preventDefault();
      }
    },
    
    didDrag (currentClientX) {
      return Math.abs(currentClientX - this.startClientX) > DRAG_TOLERANCE;
    },
    
    currentPosition (e) {
      switch (e.type) {
        case 'touchmove':
          return e.touches[0].clientX;
        case 'touchend':
          return e.changedTouches[0].clientX;
        default:
          return e.clientX;
      }
    }
  }
};