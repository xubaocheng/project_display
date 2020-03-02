/**
 * 设置浏览器头部标题
 */
export const setTitle = function(title) {
    title = title ? `${title}` : 'Bates-tools-项目成果'
    window.document.title = title
}
