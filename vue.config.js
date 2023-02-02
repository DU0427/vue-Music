const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true,
//   configureWebpack: { externals: 'hls.js' },
//   publicPath:'/music/',
//   outputDir:'dist/music',

//   devServer: {
//     host: 'amunsen.asuscomm.com'
//   }
// })

module.exports = {
  configureWebpack: { externals: 'hls.js' },
  publicPath:'/music/',
  outputDir:'dist/music',
  devServer: {
    historyApiFallback: true,
    allowedHosts: 'all',
  }
}

