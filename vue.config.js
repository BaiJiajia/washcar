const vuxLoader = require('vux-loader')
module.exports = {
    configureWebpack: config => {
        vuxLoader.merge(config, {
            options: {},
            plugins: ['vux-ui']
        })
    },
}
