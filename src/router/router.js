import Vue from "vue";
import Vuerouter from "vue-router"
Vue.use(Vuerouter)

import store from '../store'
import addcartsuccess from "@/pages/addcartsuccess/index.vue"
import Home from "@/pages/home/index.vue"
import Trade from "@/pages/trade/index.vue"
import Login from "@/pages/login/index.vue"
import Register from "@/pages/register/index.vue"
import Search from "@/pages/search/index.vue"
import Detail from "@/pages/detail/index.vue"
import Shopcart from "@/pages/shopcart/index.vue"
import Pay from "@/pages/pay/index.vue"
let router = new Vuerouter({
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
            path: '/trade',
            component: Trade,
            beforeEnter(to, from, next) {
                if (localStorage.getItem('TOKEN')) {
                    next()
                }
                else {
                    alert('请先登录')
                }
            },
            meta: {
                show: true
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
        },
        {
            path: '/pay',
            component: Pay,

            name: 'pay',
            meta: {
                show: false
            }
        }
    ],
    scrollBehavior() {
        return { x: 0, y: 0 }
    }

})

router.beforeEach(async (to, from, next) => {
    //to:去的那个路由的信息
    //from:从那个路由而来的信息
    //next:放行函数!!!!!! 
    //第一种：next(),放行函数，放行到它想去的路由！！！
    //第二种:next(path),守卫指定放行到那个路由去?

    //用户是否登录:取决于仓库里面是否有token！！！
    //每一次路由跳转之前需要用有用户信息在跳转,没有发请求获取用户信息在跳转！！！！
    //token
    let hasToken = store.state.user.token;
    //用户信息
    let hasNickName = store.state.user.userdata.nickName;
    //用户登录
    if (hasToken) {
        //用户登录了,不能去login
        if (to.path == "/login") {

            next(from.fullPath);
        } else {
            //用户登陆了,而且还有用户信息【去的并非是login】
            if (hasNickName) {
                next();
            } else {
                //用户登陆了,但是没有用户信息 
                try {
                    //发请求获取用户信息以后在放行
                    await store.dispatch('getUserInfo');
                    next();
                } catch (error) {
                    //用户没有信息，还携带token发请求获取用户信息【失败】
                    //token【学生证失效了】
                    //token失效:本地清空数据、服务器的token通知服务器清除
                    await store.dispatch('logout');
                    //回到登录页，重新获取一个新的学生证
                    next('/login');
                }
            }
        }
    } else {
        next()
        //用户未登录||目前的判断都是放行.将来这里会'回手掏'增加一些判断
        //用户未登录:不能进入/trade、/pay、/paysuccess、/center、/center/myorder  /center/teamorder
        // let toPath = to.path;
        // if (toPath.indexOf('trade') != -1 || toPath.indexOf('pay') != -1 || toPath.indexOf('center') != -1) {
        //     next('/login?redirect=' + toPath);
        // } else {
        //     next();
        // }
    }
});

export default router