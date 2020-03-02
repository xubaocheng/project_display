import { asyncRouterMap, constantRouterMap } from '../../router/router'

import { pageMenu } from '@/api/user'

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param getAccesRouterList
 * @param roles
 */
const getAccesRouterList = (routes, rules) => {
    //routes 是 路由动态列表 rules 是接口返回的路由列表是否是true
    return routes.filter(item => {
        if (rules[item.name]) {
            if (item.children)
                item.children = getAccesRouterList(item.children, rules)
            return true
        } else {
            return false
        }
    })
}
const permission = {
    state: {
        routers: constantRouterMap,
        addRouters: []
    },
    getters: {
        permission_routers: state => state.routers, // 所有路由
        addRouters: state => state.addRouters // 权限过滤路由
    },
    mutations: {
        SET_ROUTERS: (state, routers) => {
            state.addRouters = routers // 权限路由
            state.routers = constantRouterMap.concat(routers) // 总路由
        }
    },
    actions: {
        GenerateRoutes({ commit }) {
            return new Promise((resolve, reject) => {
                pageMenu()
                    .then(res => {
                        if (res.message !== 'success') {
                            reject(new Error(res.message))
                        } else {
                            if (Object.keys(res.data).length > 0) {
                                let rules = res.data
                                try {
                                    let routerList = []
                                    if (
                                        Object.entries(rules).every(
                                            item => item[1]
                                        )
                                    ) {
                                        routerList = asyncRouterMap
                                    } else {
                                        routerList = getAccesRouterList(
                                            asyncRouterMap,
                                            rules
                                        )
                                    }
                                    commit('SET_ROUTERS', routerList)

                                    resolve(res)
                                } catch (err) {
                                    reject(err)
                                }
                            } else {
                                resolve(res)
                            }
                        }
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        }
    }
}

export default permission
