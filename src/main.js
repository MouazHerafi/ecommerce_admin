import Vue from "vue";
import App from "./App.vue";
import Vuelidate from 'vuelidate';
import router from "./router";
import store from "./store";
import axios from "axios";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import ToggleButton from 'vue-js-toggle-button';

Vue.use(ToggleButton);
Vue.use(VueSweetalert2);
import vSelect from 'vue-select';

Vue.component('v-select', vSelect);
import 'vue-select/dist/vue-select.css';
//import LiquorTree from 'liquor-tree';







Vue.use(Vuelidate);



Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
//Vue.use(LiquorTree);



axios.defaults.headers.get['content-type'] = 'application/json;charset=UTF-8';

router.beforeEach((to,from,next) => {
  //console.log(to);
  //axios.defaults.headers.common['Authorization'] = "Token " + localStorage.getItem("token");
  next();
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
