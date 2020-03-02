import axios from './index'
import qs from 'qs'
import publicUrl from './publicUrl'

// export const getHotName = () => {
//     // 获取热词(简单搜索)
//     return axios.request({
//         url: `${publicUrl}/keyword/getHotName`,
//         method: 'post',
//         dataType: 'json',
//         data: qs.stringify({ num: 8 })
//     })
// }
//获取用户列表
export const userList = params => {
    return axios.request({
        url: `${publicUrl}/user/queryUserList`,
        method: 'post',
        dataType: 'json',
        data: params
    })
}
//获取菜单路由
export const pageMenu = () => {
    return axios.request({
        url: `${publicUrl}/login/getModulesAll`,
        method: 'get'
    })
}
//添加用户、编辑用户
export const add = params => {
    return axios.request({
        url: `${publicUrl}/user/addUser`,
        method: 'post',
        dataType: 'json',
        data: params
    })
}

//获取详情
export const getDetail = params => {
    return axios.request({
        url: `${publicUrl}/user/queryUserByid`,
        method: 'post',
        data: params
    })
}

//删除用户
export const del = params => {
    return axios.request({
        url: `${publicUrl}/user/deleteUser`,
        method: 'post',
        data: params
    })
}
// 修改密码
export function changeUserPassword(params) {
    return axios.request({
        url: `${publicUrl}/user/updatePassword`,
        method: 'POST',
        data: params
    })
}
//修改状态
export const changeState = params => {
    return axios.request({
        url: `${publicUrl}/user/updateState`,
        method: 'post',
        data: params
    })
}
//获取角色列表
export const rolesList = params => {
    return axios.request({
        url: `${publicUrl}/user/getRole`,
        method: 'post',
        data: params
    })
}
//获取用户的角色
export const getUserRolesList = params => {
    return axios.request({
        url: `${publicUrl}/user/getRoleByUserid`,
        method: 'post',
        data: params
    })
}
//用户添加角色
export const addUserRoles = params => {
    return axios.request({
        url: `${publicUrl}/user/addUserRole`,
        method: 'post',
        data: params
    })
}

export function login(params) {
    return axios.request({
        url: `${publicUrl}/login/userLogin`,
        method: 'post',
        data: qs.stringify(params)
    })
}
export function logout() {
    return axios.request({
        url: `${publicUrl}/login/logOut`,
        method: 'post'
    })
}
