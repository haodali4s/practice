import Vue from "vue";
import Vuerouter from "vue-router"
Vue.use(Vuerouter)


import addcartsuccess from "@/pages/addcartsuccess/index.vue"
import Home from "@/pages/home/index.vue"
import Login from "@/pages/login/index.vue"
import Register from "@/pages/register/index.vue"
import Search from "@/pages/search/index.vue"
import Detail from "@/pages/detail/index.vue"
import Shopcart from "@/pages/shopcart/index.vue"

export default new Vuerouter({
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            component: Home,
            name: 'home',
            meta: {
                show: true
            }
        },
        {
            path: '/login',
            component: Login,
            meta: {
                show: false
            }
        },
        {
            path: '/register',
            component: Register,
            meta: {
                show: false
            }
        },
        {
            path: '/search/:keyword?',
            component: Search,

            name: 'search',
            meta: {
                show: true
            }
        },
        {
            path: '/detail/:spid',
            component: Detail,

            name: 'detail',
            meta: {
                show: true
            }
        },
        {
            path: '/addcartsuccess',
            component: addcartsuccess,

            name: 'addcartsuccess',
            meta: {
                show: true
            }
        },
        {
            path: '/shopcart',
            component: Shopcart,

            name: 'shopcart',
            meta: {
                show: true
            }
        }
    ],
    scrollBehavior() {
        return { x: 0, y: 0 }
    }

})

