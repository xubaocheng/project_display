// const url = '/api' //开发时用的
// const url = '' //部署时要的

const url = process.env.NODE_ENV === 'production' ? '' : '/api'
export default url
