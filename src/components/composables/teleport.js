import {computed, inject, watch} from 'vue';

export function useTeleport (currentOffset, elementWidth) {
  const scrollDir = inject('scrollDir');
  const activeIndex = inject('activeIndex');
  const totalSlides = inject('totalSlides');
  const currentSlidesPerView = inject('currentSlidesPerView');
  
  const slideOrder = computed(() => {
    let order = [];
    // If we don't need to rearrange the array, then don't
    if (activeIndex.value > 0 && activeIndex.value + currentSlidesPerView.value < totalSlides.value - 1) {
      for (let i = 0; i < totalSlides.value; i++) {
        order.push(i);
      }
      return order;
    }
  
    for (let i = 0; i < totalSlides.value; i++) {
      let slide = (i + activeIndex.value) % totalSlides.value;
      if (i === totalSlides.value - 1) {
        order.unshift(slide);
      } else {
        order.push(slide);
      }
    }
    return order;
  });
  
  watch(() => slideOrder.value, (order) => {
    const lowerBound = order.indexOf(activeIndex.value) * elementWidth.value;
    const upperBound = lowerBound + elementWidth.value - 1;
    let modifier = elementWidth.value;
    if (currentOffset.value > upperBound) {
      modifier = modifier * -1;
    }
    while (currentOffset.value > upperBound || currentOffset.value < lowerBound) {
      currentOffset.value = currentOffset.value + modifier;
    }
  });

  return {
    slideOrder
  };
}
