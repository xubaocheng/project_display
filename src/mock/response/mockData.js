import Mock from 'mockjs'

//获取tab详情
export const getDetail = () => {
    const template = {
        code: 200,
        data: {
            'list|6': [
                {
                    content: Mock.mock('@cparagraph(20, 30)')
                }
            ]
        },
        message: 'Success'
    }
    return Mock.mock(template)
}
