/**
 * Attach event listeners to all images inside a mutated div to run when they load (e.g. to re-calculate size)
 *
 * @param mutationList
 * @param callback
 */
export function listenToImagesLoad (mutationList, callback) {
  for(let mutation of mutationList) {
    const images = mutation.target.querySelectorAll('img');
    if (images && images.length > 0) {
      [...images]
        .filter(image => !image.complete)
        .forEach(image => image.addEventListener('load', callback));
    }
  }
}