import axios from './index'
import publicUrl from './publicUrl'

//获取tab详情
export const getTabDetail = params => {
    return axios.request({
        url: `${publicUrl}/getTabDetail`,
        method: 'post',
        dataType: 'json',
        data: params
    })
}
