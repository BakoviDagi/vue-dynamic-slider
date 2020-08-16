const VELOCITY_THRESHOLD = .1;

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
      let currentPosition;
      if (e.type === 'touchmove') {
        currentPosition = e.touches[0].clientX;
      } else {
        currentPosition = e.clientX;
      }
    
      // Calculate velocity so we can go to the next slide if the user slides fast enough
      const currentTime = Date.now();
      this.velocity = (currentPosition - this.previousClientX) / (currentTime - this.previousTime);
      this.previousTime = currentTime;
    
      this.currentOffset -= this.previousClientX - currentPosition;
      this.previousClientX = currentPosition;
    
      if (this.infiniteScroll) {
        if (this.currentOffset >= 0) {
          this.currentOffset -= this.totalWidth;
        } else if (this.currentOffset <= this.duplicateRightStart) {
          this.currentOffset += this.totalWidth;
        }
      }
    },
  
    dragEnd() {
      document.removeEventListener('mousemove', this.dragAction);
      document.removeEventListener('mouseup', this.dragEnd);
    
      this.scrollToSlide(getClosestSlideIndex(this.totalSlides, this.scrollPercentage, this.velocity));
    },
  
    /**
     * If the user dragged, they likely don't want to click a link, so cancel any click listeners on children
     * @param e
     */
    cancelClicks(e) {
      const currentClientX = e.clientX || e.touches[0].clientX;
      // If moved more than 2px, cancel click events on children
      if (Math.abs(currentClientX - this.startClientX) > 2) {
        e.stopPropagation();
      }
    }
  }
};

/**
 * Get the closest slide index based on the scroll percentage. If scroll velocity is given, take it into account for the rounding type
 *
 * @param {number} totalNumSlides The total number of slides
 * @param {number} scrollPercent the scroll percentage
 * @param {number} velocity the speed of the scrolling; used to modify the rounding type (floor vs ceil based on direction)
 * @returns {number} the index of the closest slide
 */
function getClosestSlideIndex (totalNumSlides, scrollPercent, velocity=0) {
  let roundType = 'round';
  if (velocity >= VELOCITY_THRESHOLD) {
    roundType = 'floor';
  } else if (velocity <= -VELOCITY_THRESHOLD) {
    roundType = 'ceil';
  }
  // Move the slides back to the non-duplicated
  return Math[roundType](scrollPercent * totalNumSlides);
}
