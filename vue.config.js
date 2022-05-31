const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  //开启代理服务器
  devServer:{

    proxy:{
      '/api':{
        target:'http://localhost:3000',
        changeOrigin:'true',
        secure:true,
        pathRewrite: { '^/api': '' } 
      }
    }
  }
})
