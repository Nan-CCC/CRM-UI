const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
        @import "@/assets/scss/public.scss";
        @import "@/assets/scss/modify.scss";
        `
      }
    }
  },

  // configureWebpack: {
  //   devServer: {
  //     port: 3000,
  //     proxy: {
  //       '/api': {
  //         target: 'http://localhost:8080/1026text',
  //         changeOrigin: true,
  //         pathRewrite: {
  //           '^/api': ''
  //         }
  //       },
  //     }
  //   },
  // }

})

