import {keepInRange} from '../utils/range-util';

const VELOCITY_THRESHOLD = .1;
const DRAG_TOLERANCE = 2;

export default {
  data () {
    return {
      currentOffset: 0,
      previousClientX: 0,
      startClientX: 0,
      velocity: 0,
      scrolling: false,
      previousTime: Date.now()
    };
  },
  computed: {
    closestSlideIndex () {
      let roundType = 'round';
      if (this.velocity >= VELOCITY_THRESHOLD) {
        roundType = 'floor';
      } else if (this.velocity <= -VELOCITY_THRESHOLD) {
        roundType = 'ceil';
      }
      // Move the slides back to the non-duplicated
      let index = Math[roundType](this.scrollPercentage * this.props.totalSlides);
      if (!this.props.infiniteScroll) {
        index = keepInRange(index, 0, this.props.totalSlides - 1);
      }
      return index;
    }
  },
  mounted () {
    this.$el.addEventListener('touchstart', this.dragStart);
    this.$el.addEventListener('touchend', this.dragEnd);
    this.$el.addEventListener('touchmove', this.dragAction);
    this.$el.addEventListener('mousedown', this.dragStart);
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
  
    // https://www.cssscript.com/draggable-touch-slider-carousel/
    dragStart(e) {
      // Cancel any previous scrolling
      this.scrolling = false;
    
      e.preventDefault();
      if (e.type === 'touchstart') {
        this.previousClientX = e.touches[0].clientX;
      } else {
        this.previousClientX = e.clientX;
        document.addEventListener('mousemove', this.dragAction);
        document.addEventListener('mouseup', this.dragEnd);
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
    
      if (this.props.infiniteScroll) {
        if (this.currentOffset >= 0) {
          this.currentOffset -= this.totalWidth;
        } else if (this.currentOffset <= this.duplicateRightStart) {
          this.currentOffset += this.totalWidth;
        }
      }
    },
  
    dragEnd(e) {
      document.removeEventListener('mousemove', this.dragAction);
      document.removeEventListener('mouseup', this.dragEnd);
      if (this.didDrag(this.currentPosition(e))) {
        this.props.activeIndex = this.closestSlideIndex;
        this.scrollToSlide(this.closestSlideIndex);
      }
      this.velocity = 0;
    },
  
    /**
     * If the user dragged, they likely don't want to click a link, so cancel any click listeners on children
     * @param e
     */
    cancelClicks(e) {
      // If moved more than 2px, cancel click events on children
      if (this.didDrag(this.currentPosition(e))) {
        e.stopPropagation();
      }
    },

    didDrag (currentClientX) {
      return Math.abs(currentClientX - this.startClientX) > DRAG_TOLERANCE;
    },
    
    currentPosition (e) {
      return e.type === 'touchmove'
        ? e.touches[0].clientX : e.clientX;
    }
  }
};
