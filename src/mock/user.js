import Mock from 'mockjs'
// import * as mUtils from '@/utils/mUtils'

let List = []
const count = 1000
let typelist = ['联通', '移动', '电信', '铁通']

for (let i = 0; i < count; i++) {
    List.push(
        Mock.mock({
            id: Mock.Random.guid(),
            sortnum: i + 1,
            username: Mock.Random.cname(),
            address: Mock.mock('@county(true)'),
            createTime: Mock.Random.datetime(),
            updateTime: Mock.Random.now(),
            ip: Mock.mock('@ip'),
            region: Mock.mock('@region'),
            areaId: /\d{7}/,
            email: Mock.Random.email(),
            'isp|1': typelist
        })
    )
}

export default {
    // 用户登录
    login: config => {
        let data = JSON.parse(config.body)
        let userList = {}
        if (data.username === 'admin') {
            userList = {
                token: 'admin',
                name: '管理员'
            }
        } else if (data.username === 'editor') {
            userList = {
                token: 'editor',
                name: '赵晓编'
            }
        } else {
            return {
                code: -1,
                data: {
                    msg: '用户名错误',
                    status: 'fail'
                }
            }
        }
        return {
            code: 200,
            data: {
                userList: userList
            }
        }
    },
    // 用户登出
    logout: config => {
        console.log(config)
        return {
            code: 200,
            data: {
                userList: ''
            }
        }
    }
}
