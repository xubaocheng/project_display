/**
 * 设置浏览器头部标题
 */
export const setTitle = function(title) {
    title = title ? `${title}` : 'Bates-tools-项目成果'
    window.document.title = title
}

/**
 * 获取当前时间
 */
export const getDate = () => {
    var data = new Date()
    var month =
        data.getMonth() < 9 ? '0' + (data.getMonth() + 1) : data.getMonth() + 1
    var date = data.getDate() <= 9 ? '0' + data.getDate() : data.getDate()
    return data.getFullYear() + '-' + month + '-' + date
}
