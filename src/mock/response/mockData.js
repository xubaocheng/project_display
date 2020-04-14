import Mock from 'mockjs'
const Random = Mock.Random
//获取tab详情
export const getTabDetail = () => {
    const template = {
        code: 200,
        data: {
            content: Mock.mock('@cparagraph(200, 30)'),
            img: Random.image('1014x300', Random.color(), Random.color(), '2')
        },
        message: 'Success'
    }
    return Mock.mock(template)
}
