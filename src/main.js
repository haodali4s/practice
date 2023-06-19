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
import VeeValidate from 'vee-validate';
import zh_CN from 'vee-validate/dist/locale/zh_CN'
Vue.use(VeeValidate);
VeeValidate.Validator.localize('zh_CN', {
  messages: {
    ...zh_CN.messages,
    is: (field) => `${field}必须与密码相同`
  },//
  attributes: {
    phone: '手机号',
    code: '验证码',
    password: '密码',
    password1: '确认密码',
    agree: '协议'
  }
})
VeeValidate.Validator.extend("tongyi", {
  validate: (value) => value,
  getMessage: (field) => field + '必须同意'
})
Vue.component('pagination', pagination)
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload)
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
