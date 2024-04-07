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

  configureWebpack: {
    devServer: {
      proxy: {
        '/api': {
          target: 'http://localhost:8088/crm-api/',
          changeOrigin: true,
          pathRewrite: {
            '^/api': ''
          }
        },
      }
    },
  }

})

