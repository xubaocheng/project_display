import axios from './index'
import publicUrl from './publicUrl'

//获取轮播图分类
export const getClassifcaList = params => {
    return axios.request({
        url: `${publicUrl}/laboratory/getLaboratoryListByRecommend1`,
        method: 'post',
        dataType: 'json',
        data: params
    })
}
//获取轮播图列表
export const getTabList = () => {
    return axios.request({
        url: `${publicUrl}/laboratoryType/getAllLaboratoryType`,
        method: 'post'
    })
}
