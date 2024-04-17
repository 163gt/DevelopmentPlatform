const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  //忽略eslintrc大小写报错
  lintOnSave: false,
})
