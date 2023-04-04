import { watch, onBeforeUnmount, onMounted } from 'vue';

export function useAutoplay (props, scrollDir, activeIndex, next) {
  let autoplayId = -1;
  
  function autoplay () {
    clearTimeout(autoplayId);
    autoplayId = setTimeout(() => {
      next();
    }, props.autoplayInterval);
  }

  watch(activeIndex, () => {
    if (props.autoplay) {
      autoplay();
    }
  });
  watch(() => props.autoplay, value => {
    if (value) {
      autoplay();
    } else {
      clearTimeout(autoplayId);
    }
  });
  
  onMounted(() => {
    if (props.autoplay) {
      autoplay();
    }
  });

  onBeforeUnmount(() => clearTimeout(autoplayId));
}