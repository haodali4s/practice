const { defineConfig } = require('@vue/cli-service')
module.exports = {
  productionSourceMap: false,
  lintOnSave: false,
  devServer: {
    port:"1234",
    proxy: {
      "/api": {
        target: "http://gmall-h5-api.atguigu.cn",
      },
      "/local": {
        target: "http://127.0.0.1:8888",
        pathRewrite: {
          "/local": ""
        }
      },
    },
  },
}
