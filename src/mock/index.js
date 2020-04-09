// 使用 Mock
import Mock from 'mockjs'
import { getDetail } from './response/mockData'

const baseUrl2mock =
    process.env.NODE_ENV === 'production' ? process.env.BASE_URL : '/api'

Mock.mock(`${baseUrl2mock}/getDetail`, getDetail) //推荐词条

export default Mock
