const path = require('path')
const webpack = require('webpack')

const resolve = dir => path.join(__dirname, dir)

//项目基本路径  process.env.NODE_ENV 判断当前是开发环境还是要打包编译  production 是生产环境要开始编译
const BASE_URL = process.env.NODE_ENV === 'production' ? '/' : '/'

let TARGET = 'http://127.0.0.1:8080/'
// let TARGET = 'http://192.168.1.182:8080'

module.exports = {
    lintOnSave: true,
    publicPath: BASE_URL,
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('_c', resolve('src/components'))
    },

    //打包时不生成map文件
    productionSourceMap: false,

    // 配置代理
    devServer: {
        open: true,
        host: 'localhost',
        port: 3000,
        https: false,
        hotOnly: false,
        proxy: {
            '/api': {
                target: TARGET, // 设置你调用的接口域名和端口号 别忘了加http
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '' // 这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
                }
            }
        }
    },

    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [path.resolve(__dirname, './src/assets/css/common.less')]
        }
    },
    configureWebpack: config => {
        // config.resolve.alias['@'] = resolve('src');
        // config.resolve.alias['@c'] = resolve('src/components');
        // config.resolve.alias['@data'] = resolve('example/data');
        // config.resolve.alias['@less'] = resolve('example/less');

        config.plugins.push(
            new webpack.ProvidePlugin({
                $: 'jquery',
                jquery: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery'
            })
        )
    }
}
