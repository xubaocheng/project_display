import axios from './index'
import publicUrl from './publicUrl'

//获取tab详情
export const getDetail = params => {
    return axios.request({
        url: `${publicUrl}/getDetail`,
        method: 'post',
        dataType: 'json',
        data: params
    })
}
