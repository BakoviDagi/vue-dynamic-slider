import SliderFrame from './components/SliderFrame';
import SliderSlide from './components/SliderSlide';
import SliderSlides from './components/SliderSlides';

export default {
  install (app) {
    app.component('slider-frame', SliderFrame)
      .component('slider-slides', SliderSlides)
      .component('slider-slide', SliderSlide);
  }
}

export {
  SliderFrame,
  SliderSlide,
  SliderSlides
};
