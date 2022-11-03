import { createApp } from 'vue'
import Demo from './Demo.vue'
import VueDynamicSlider from '../../src/index';

const faScript = document.createElement('script');
faScript.src = 'https://kit.fontawesome.com/290d2b5cc0.js';
faScript.crossOrigin = 'anonymous';
document.body.append(faScript);

createApp(Demo)
  .use(VueDynamicSlider)
  .mount('#app')
