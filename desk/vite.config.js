import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0', // 监听所有网络接口
    port: 8080, // 你可以选择其他端口
    https: false, // 是否启用HTTPS
    open: true, // 自动打开浏览器
  },
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
})
