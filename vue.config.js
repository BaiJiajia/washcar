module.exports = {
    configureWebpack: { // webpack 设置,可覆盖默认配置
        externals: {
            'AMap': 'AMap'
        },
    },
}
