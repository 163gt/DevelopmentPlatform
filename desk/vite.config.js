import { defineConfig } from 'vite'
import path from 'path';
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  server: {
    host: '0.0.0.0', // 监听所有网络接口
    port: 8011, // 你可以选择其他端口
    https: false, // 是否启用HTTPS
    open: false, // 自动打开浏览器
  },
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
})
