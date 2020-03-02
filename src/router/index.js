import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import { Message } from 'element-ui'
import { constantRouterMap } from './router'
import { setTitle } from '@/lib/tools' // 设置浏览器头部标题
Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject)
        return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}

const whiteList = ['/login', '/home', '/404', '/401'] // 不重定向白名单
const router = new VueRouter({
    routes: constantRouterMap
})
router.beforeEach((to, from, next) => {
    NProgress.start()
    // 设置浏览器头部标题
    const browserHeaderTitle = to.meta.title
    store.commit('SET_BROWSERHEADERTITLE', {
        browserHeaderTitle: browserHeaderTitle
    })
    if (store.getters.isLogin) {
        /* has token*/
        if (to.path === '/login') {
            next({ path: '/' })
            NProgress.done()
        } else {
            if (store.getters.addRouters.length === 0) {
                store
                    .dispatch('GenerateRoutes')
                    .then(() => {
                        // 根据roles权限生成可访问的路由表
                        router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
                        next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
                    })
                    .catch(res => {
                        console.log(res)
                        store.dispatch('LogOut').then(() => {
                            Message.error('服务超时，请重新登录')
                            location.reload() // 为了重新实例化vue-router对象 避免bug
                        })
                        next({ name: 'login' })
                    })
            } else {
                next()
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next({ path: '/login' })
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    NProgress.done() // 结束Progress
    setTimeout(() => {
        const browserHeaderTitle = store.getters.browserHeaderTitle
        setTitle(browserHeaderTitle)
    }, 0)
})
export default router
