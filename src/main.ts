import Vue from 'vue';
import App from './TheLayout.vue';
import router from './router';
import './assets/css/style.css';
import './assets/css/vue-datetime.css';

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
