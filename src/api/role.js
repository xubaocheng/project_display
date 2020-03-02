import axios from './index'
// import qs from 'qs'
import publicUrl from './publicUrl'
//获取角色列表
export const rolesList = params => {
    return axios.request({
        url: `${publicUrl}/role/getRoleList`,
        method: 'post',
        dataType: 'json',
        data: params
    })
}
//删除角色
export const del = params => {
    return axios.request({
        url: `${publicUrl}/role/deleteRole`,
        method: 'post',
        data: params
    })
}
//新增角色
export const add = params => {
    return axios.request({
        url: `${publicUrl}/role/addRole`,
        method: 'post',
        data: params
    })
}
//获取详情
export const getDetail = params => {
    return axios.request({
        url: `${publicUrl}/role/queryRoleByid`,
        method: 'post',
        data: params
    })
}
//获取当前角色已有的权限
export const getRoleModule = params => {
    return axios.request({
        url: `${publicUrl}/menu/getUserMenu`,
        method: 'post',
        data: params,
        headers: { 'Content-Type': ' application/json ' }
    })
}
//获取所有权限 树形
export const moduleTree = () => {
    return axios.request({
        url: `${publicUrl}/menu/moduleTree`,
        method: 'post',
        headers: { 'Content-Type': ' application/json ' }
    })
}
//权限配置
export const saveRoleModule = params => {
    return axios.request({
        url: `${publicUrl}/role/addRoleMenu`,
        method: 'post',
        data: params
    })
}
