//留做主题色
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.mount('#app')

// 禁用双击缩放
document.addEventListener('dblclick', function(event) {
    event.preventDefault();
  }, { passive: false });
