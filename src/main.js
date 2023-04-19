import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
import typenav from '@/pages/home/typenav.vue'
Vue.component('typenav', typenav)
import router from "@/router/router.js"
import store from './store'
import '@/mock/mockServe'
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
