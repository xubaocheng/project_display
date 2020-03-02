import axios from './index'
import publicUrl from './publicUrl'

//获取标签列表
export const getTagList = () => {
    return axios.request({
        url: `${publicUrl}/label/getAllLabel`,
        method: 'post',
        dataType: 'json'
    })
}
//上传文件
export const uploadFile = params => {
    return axios.request({
        url: `${publicUrl}/file/uploadFile`,
        method: 'post',
        headers: { 'Content-Type': 'multipart/form-data' },
        data: params
    })
}
//新建表单
export const addContent = params => {
    return axios.request({
        url: `${publicUrl}/content/addContent`,
        method: 'post',
        data: params
    })
}
//获取表单列表
export const contentList = params => {
    return axios.request({
        url: `${publicUrl}/content/getContentList`,
        method: 'post',
        data: params
    })
}
//获取表单内容
export const contentDetail = params => {
    return axios.request({
        url: `${publicUrl}/content/getContentById`,
        method: 'post',
        data: params
    })
}
//删除
export const del = params => {
    return axios.request({
        url: `${publicUrl}/content/deleteContent`,
        method: 'post',
        data: params
    })
}
