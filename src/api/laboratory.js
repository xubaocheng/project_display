import axios from './index'
import publicUrl from './publicUrl'

//获取列表
export const getList = params => {
    return axios.request({
        url: `${publicUrl}/laboratory/getLaboratoryList`,
        method: 'post',
        dataType: 'json',
        data: params
    })
}

//添加、编辑
export const add = params => {
    return axios.request({
        url: `${publicUrl}/laboratory/addLaboratory`,
        method: 'post',
        dataType: 'json',
        data: params
    })
}

//获取详情
export const getDetail = params => {
    return axios.request({
        url: `${publicUrl}/laboratory/getLaboratoryById`,
        method: 'post',
        data: params
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

//删除
export const del = params => {
    return axios.request({
        url: `${publicUrl}/laboratory/deleteLaboratoryByIds`,
        method: 'post',
        data: params
    })
}

//删除上传文件
// export const delUpload = params => {
//     return axios.request({
//         url: `${publicUrl}/file/deleteFile`,
//         method: 'post',
//         data: params
//     })
// }

//获取轮播图列表
export const getTabList = () => {
    return axios.request({
        url: `${publicUrl}/laboratory/getLaboratoryListByRecommend1`,
        method: 'post'
    })
}
//获取分类列表
export const getLabClassifca = () => {
    return axios.request({
        url: `${publicUrl}/laboratoryType/getAllLaboratoryType`,
        method: 'post'
    })
}
