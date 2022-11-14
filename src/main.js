import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueCardCarousel from "vue-card-carousel";

Vue.config.productionTip = false
Vue.use(VueCardCarousel)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
