console.log(process.env.NODE_ENV);

const port = process.env.port || 8080;
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const path = require('path'); //引入node.js中的 path核心
function resolved(dir) { //封装一个自定义路径的函数 =》@=src
    return path.join(__dirname); // 找到当前项目的绝对根路径 ‘dapp’
}
module.exports = {
    lintOnSave: false,
    // lintOnSave:process.env.NODE_ENV === "development", //开发环境才启用 jslint
    devServer: {
        port,
        open: false, // 运行时 是否自动打开浏览器
        overlay: { // 报错在屏幕遮罩上显示
            warnings: false,
            errors: true
        },
        proxy: {
            [process.env.VUE_APP_BASE_API]: {
                target: '',
                changeOrigin: true,
                pathRewrite: {
                    [process.env.VUE_APP_BASE_API]: ""
                }
            }
        }
    },
    configureWebpack: {
        name: "dapp",
        resolve: {
            alias: {
                '@': resolved('src'),
                'views': resolved('src/views'),
                'components': resolved('src/components'),
                'utils': resolved('src/utils'), //封装的公共的js方法
                'asstes': resolved('src/assets'),
            }
        }
    }

};