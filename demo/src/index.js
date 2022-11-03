import Vue from 'vue';
import Demo from './Demo';

Vue.config.productionTip = false;

const faScript = document.createElement('script');
faScript.src = 'https://kit.fontawesome.com/290d2b5cc0.js';
faScript.crossOrigin = 'anonymous';
document.body.append(faScript);

new Vue({
  render: h => h(Demo),
}).$mount('#app');
