import axios from './index'
import publicUrl from './publicUrl'

//获取标签列表
export const getList = params => {
    return axios.request({
        url: `${publicUrl}/label/getLabel`,
        method: 'post',
        dataType: 'json',
        data: params
    })
}
//添加、编辑
export const add = params => {
    return axios.request({
        url: `${publicUrl}/label/addLabel`,
        method: 'post',
        dataType: 'json',
        data: params
    })
}

//获取详情
export const getDetail = params => {
    return axios.request({
        url: `${publicUrl}/label/getLabelById`,
        method: 'post',
        data: params
    })
}

//删除
export const del = params => {
    return axios.request({
        url: `${publicUrl}/label/deleteLabel`,
        method: 'post',
        data: params
    })
}
