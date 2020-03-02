import axios from './index'
// import qs from 'qs'
import publicUrl from './publicUrl'

//获取权限列表
export const authorityList = params => {
    return axios.request({
        url: `${publicUrl}/menu/queryMenuList`,
        method: 'post',
        data: params,
        headers: { 'Content-Type': ' application/json ' }
    })
}
//获取父级数据
export const parentData = () => {
    return axios.request({
        url: `${publicUrl}/menu/queryMenu`,
        method: 'post'
    })
}
//新增
export const add = params => {
    return axios.request({
        url: `${publicUrl}/menu/addMenuOrUpdate`,
        method: 'POST',
        data: params
    })
}
//删除
export const del = params => {
    return axios.request({
        url: `${publicUrl}/menu/deleteMenu`,
        method: 'POST',
        data: params
    })
}
//获取详情
export const getDetail = params => {
    return axios.request({
        url: `${publicUrl}/menu/queryMenuByid`,
        method: 'post',
        data: params
    })
}
export const edit = params => {
    return axios.request({
        url: `${publicUrl}/module/update`,
        method: 'POST',
        params
    })
}
export const selByExample = params => {
    return axios.request({
        url: `${publicUrl}/menu/moduleTree`,
        method: 'POST',
        data: params,
        headers: { 'Content-Type': ' application/json ' }
    })
}
