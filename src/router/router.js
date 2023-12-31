import Vue from "vue";
import Vuerouter from "vue-router"
Vue.use(Vuerouter)

import store from '../store'

import myorder from "@/pages/center/myOrder/index.vue"
import teamorder from "@/pages/center/teamOrder/index.vue"

let router = new Vuerouter({
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            component: () => import("@/pages/home/index.vue"),
            name: 'home',
            meta: {
                show: true
            }
        },
        {
            path: '/login',
            component: () => import("@/pages/login/index.vue"),
            meta: {
                show: false
            }
        },
        {
            path: '/trade',
            component: () => import("@/pages/trade/index.vue"),
            beforeEnter(to, from, next) {
                console.log(from.path)
                if (from.path == '/shopcart' || from.path == '/login') {
                    next()
                }
                else {
                    next(false)
                }
            },
            meta: {
                show: true
            }
        },
        {
            path: '/register',
            component: () => import("@/pages/register/index.vue"),
            meta: {
                show: false
            }
        },
        {
            path: '/search/:keyword?',
            component: () => import("@/pages/search/index.vue"),

            name: 'search',
            meta: {
                show: true
            }
        },
        {
            path: '/detail/:spid',
            component: () => import("@/pages/detail/index.vue"),

            name: 'detail',
            meta: {
                show: true
            }
        },
        {
            path: '/addcartsuccess',
            component: () => import("@/pages/addcartsuccess/index.vue"),

            name: 'addcartsuccess',
            meta: {
                show: true
            }
        },
        {
            path: '/shopcart',
            component: () => import("@/pages/shopcart/index.vue"),

            name: 'shopcart',
            meta: {
                show: true
            }
        },
        {
            path: '/pay',
            component: () => import("@/pages/pay/index.vue"),

            name: 'pay',
            beforeEnter(to, from, next) {
                if (from.path == '/trade') {
                    next()
                }
                else {
                    next(false)
                }
            },
            meta: {
                show: false
            }
        },
        {
            path: '/success',
            component: () => import("@/pages/paysuccess/index.vue"),

            name: 'success',
            meta: {
                show: false
            },
            beforeEnter(to, from, next) {
                if (from.path == '/pay') {
                    next()
                }
                else {
                    next(false)
                }
            },
        },
        {
            path: '/center',
            component: () => import("@/pages/center/index.vue"),

            name: 'center',
            meta: {
                show: true
            },
            children: [
                {
                    path: "myorder",
                    component: myorder
                },
                {
                    path: "teamorder",
                    component: teamorder
                },
                {
                    path: "/center",
                    redirect: "/center/myorder"
                },
            ]
        },
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
                // await store.dispatch('logout');
            }
        }
    } else {
        if (to.path.indexOf('trade') != -1 || to.path.indexOf('pay') != -1 || to.path.indexOf('center') != -1) {
            next('/login?redirect=' + to.path);
        }
        else {
            next()
        }
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