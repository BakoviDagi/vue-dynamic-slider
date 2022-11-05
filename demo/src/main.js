import { createApp } from 'vue'
import Demo from './Demo.vue'
import VueDynamicSlider from '../../src/index';

createApp(Demo)
  .use(VueDynamicSlider)
  .mount('#app')
