import {onBeforeUnmount, onMounted, ref} from 'vue';

/**
 * @param el {Ref} the ref for the element
 * @param callback {Function} the callback for resizing
 * @returns {Ref<ResizeObserver>} the resize observer
 */
export function useResizeObserver(el, callback) {
  const resizeObserver = ref(null);
  onMounted(() => {
    resizeObserver.value = new ResizeObserver(callback);
    resizeObserver.value.observe(el.value);
  });
  onBeforeUnmount(() => {
    resizeObserver.value.disconnect();
  });
  return resizeObserver;
}
