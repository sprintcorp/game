import Vue from 'vue';
import App from './App.vue';
import router from './route';
import store from './Store/store';
import Button from './components/UI/Button';
import { MdCard, MdButton , MdDialog, MdContent } from 'vue-material/dist/components';
import 'vue-material/dist/vue-material.min.css';
import VueResource from 'vue-resource';
import vuelidate from 'vuelidate';
import wysiwyg from 'vue-wysiwyg';

Vue.component('app-button',Button);

/*Vue Material*/
Vue.use(MdCard);
Vue.use(MdButton);
Vue.use(MdDialog);
Vue.use(MdContent);

/*Vue Resource*/
Vue.use(VueResource);

/*Misc*/
Vue.use(vuelidate);
Vue.use(wysiwyg,{});
Vue.http.options.root = 'https://gameapp-2a898.firebaseio.com/';
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
