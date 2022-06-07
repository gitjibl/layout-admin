import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueCookies from 'vue-cookies'
import './config/permission' // permission control
import "@/utils/sso-login";
import axios from 'axios'

Vue.prototype.$axios = axios
Vue.use(VueCookies)
Vue.use(ElementUI, {
  size: 'mini'
});
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");