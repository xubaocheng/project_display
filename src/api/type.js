import axios from './index'
import publicUrl from './publicUrl'

//获取列表
export const getList = params => {
    return axios.request({
        url: `${publicUrl}/dataType/getDataType`,
        method: 'post',
        dataType: 'json',
        data: params
    })
}
//添加、编辑
export const add = params => {
    return axios.request({
        url: `${publicUrl}/dataType/addOrUpdateDateType`,
        method: 'post',
        dataType: 'json',
        data: params
    })
}

//获取详情
export const getDetail = params => {
    return axios.request({
        url: `${publicUrl}/dataType/getDataTypeById`,
        method: 'post',
        data: params
    })
}

//删除
export const del = params => {
    return axios.request({
        url: `${publicUrl}/dataType/deleteDataType`,
        method: 'post',
        data: params
    })
}
