import Mock from 'mockjs'

//测试mock数据
import userAPI from './user'
// user相关
Mock.mock(/\/user\/login/, 'get', userAPI.login)
Mock.mock(/\/user\/logout/, 'get', userAPI.logout)

export default Mock
