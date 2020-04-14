// 使用 Mock
import Mock from 'mockjs'
import { getTabDetail } from './response/mockData'

const baseUrl2mock =
    process.env.NODE_ENV === 'production' ? process.env.BASE_URL : '/api'

Mock.mock(`${baseUrl2mock}/getTabDetail`, getTabDetail) //推荐词条

export default Mock
