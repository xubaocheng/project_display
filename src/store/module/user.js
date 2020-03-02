import * as mUtils from '@/utils/mUtils'
import { login, logout } from '@/api/user' // 导入用户信息相关接口
import { setJSON, removeJSON } from '@/utils/auth'

const user = {
    state: {
        isLogin: false,
        name: '',
        avatar: '',
        // token: getToken('Token'),
        roles: [],
        browserHeaderTitle: mUtils.getStore('browserHeaderTitle') || 'Bates-'
    },
    getters: {
        isLogin: state => {
            if (!state.isLogin) {
                state.isLogin = sessionStorage.getItem('isLogin') //从sessionStorage中读取状态
            }
            return state.isLogin
        },
        avatar: state => {
            if (!state.avatar) {
                state.avatar = sessionStorage.getItem('avatar') //从sessionStorage中读取状态
            }
            return state.avatar
        },
        name: state => {
            if (!state.name) {
                state.name = sessionStorage.getItem('name') //从sessionStorage中读取状态
            }
            return state.name
        },
        token: state => state.token,
        roles: state => state.roles,
        browserHeaderTitle: state => state.browserHeaderTitle
    },
    mutations: {
        SET_ISLOGIN: (state, boolen) => {
            state.isLogin = boolen
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        },
        SET_BROWSERHEADERTITLE: (state, action) => {
            state.browserHeaderTitle = action.browserHeaderTitle
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        }
    },
    actions: {
        //登出
        LogOut({ commit }) {
            return new Promise(resolve => {
                logout()
                    .then(() => {
                        sessionStorage.removeItem('isLogin')
                        sessionStorage.removeItem('name')
                        sessionStorage.removeItem('avatar')
                        commit('SET_ISLOGIN', false)
                        commit('SET_ROLES', [])
                        removeJSON('userInfoData')
                        // removeToken('Token')
                        resolve()
                    })
                    .catch(function(reason) {
                        console.log('catch:', reason)
                    })
            })
        },
        //登录
        logIn({ commit }, params) {
            return new Promise((resolve, reject) => {
                login(params)
                    .then(res => {
                        if (res.code === '200') {
                            let name = res.data.name
                            let avatar = res.data.rname
                            let userInfoData = res.data
                            sessionStorage.setItem('isLogin', true)
                            sessionStorage.setItem('name', name)
                            sessionStorage.setItem('avatar', avatar)
                            setJSON('userInfoData', userInfoData)
                            commit('SET_ISLOGIN', true)
                            commit('SET_NAME', name)
                            commit('SET_AVATAR', avatar)

                            //   setToken(res.token)
                            //   commit('SET_TOKEN', res.token)
                            resolve(res)
                        } else {
                            reject(new Error('错误'))
                        }
                    })
                    .catch(res => {
                        console.log(res)
                        reject(new Error('错误'))
                    })
            })
        }
    }
}

export default user
