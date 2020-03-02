import axios from './index'
import publicUrl from './publicUrl'

//获取日志列表
export const getList = params => {
    return axios.request({
        url: `${publicUrl}/log/selByPage`,
        method: 'post',
        dataType: 'json',
        data: params
    })
}
