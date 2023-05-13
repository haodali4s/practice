import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false
import typenav from '@/pages/home/typenav.vue'
Vue.component('typenav', typenav)
import router from "@/router/router.js"
import store from './store'
import pagination from "@/components/pagination"
import '@/mock/mockServe'
import carousel from '@/components/carousel/carousel.vue'
Vue.component('carousel', carousel)
Vue.component('pagination', pagination)

import { MessageBox } from 'element-ui'
import "swiper/swiper-bundle.min.css";
Vue.prototype.$alert = MessageBox.alert
new Vue({

  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  router,
  store
}).$mount('#app')
