const { defineConfig } = require('@vue/cli-service')


module.exports = defineConfig({
  //修改网页标题
  pages: {
    index: {
      entry: "src/main.js", //配置title必须
      title: "合集",
    },
  },
  transpileDependencies: true,
  //忽略eslintrc大小写报错
  lintOnSave: false,
  devServer: {
    host:"0.0.0.0",
    port:8081,        //本地启动端口
    historyApiFallback: true,
    allowedHosts: "all",
  }
})
