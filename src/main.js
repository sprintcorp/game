import Vue from 'vue';
import App from './App.vue';
import router from './route';
import store from './Store/store';
import Button from './components/UI/Button';
import { MdCard } from 'vue-material/dist/components';
import 'vue-material/dist/vue-material.min.css';
import VueResource from 'vue-resource';
Vue.component('app-button',Button);

/*Vue Material*/
Vue.use(MdCard);

/*Vue Resource*/
Vue.use(VueResource);
Vue.http.options.root = '';
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
