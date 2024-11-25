import './assets/main.css'

import { createApp } from 'vue'
import store from './store'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import vSelect from '../node_modules/vue-select/src/index.js';

const app = createApp(App)



app.use(ElementPlus)
app.use(store)
app.use(router)
// app.use('v-select', vSelect)

app.mount('#app')