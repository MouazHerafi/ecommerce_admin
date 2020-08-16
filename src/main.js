import Vue from "vue";
import App from "./App.vue";
import VueResource from "vue-resource";

Vue.use(VueResource);
import Vuelidate from "vuelidate";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import ToggleButton from "vue-js-toggle-button";
import VueLoading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
Vue.use(VueLoading);
Vue.component("loading", VueLoading);

Vue.use(ToggleButton);
Vue.use(VueSweetalert2);
import vSelect from "vue-select";

Vue.component("v-select", vSelect);
import "vue-select/dist/vue-select.css";
import { HTTP } from "./http-common";

Vue.use(Vuelidate);

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

router.beforeEach((to, from, next) => {
  var token = localStorage.getItem("token");
  HTTP.defaults.headers.common["Authorization"] = token;
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (token) {
      HTTP.get("checkToken").then(res => {
        if (res.data.message === "your token is valid") {
          next();
          return;
        }
      });
    }else {
        router.replace({
        path: "/pages/login"
        //query: { redirect: router.currentRoute.fullPath }
    });
    }
  } else {
    next();
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
