import Vue from "vue";
import Vuerouter from "vue-router"
Vue.use(Vuerouter)


import Home from "@/pages/home/index.vue"
import Login from "@/pages/login/index.vue"
import Register from "@/pages/register/index.vue"
import Search from "@/pages/search/index.vue"
export default new Vuerouter({
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            component: Home,
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
            path: '/search',
            component: Search,
           
            name:'search',
            meta: {
                show: true
            }
        },
    ]

})

