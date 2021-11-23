import { createApp } from 'vue'
import  router from './router/index.js'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

// import './styles/style.css'
import './styles/main.css'

const vue = createApp(App)
vue.use(VueAxios, axios)
vue.use(router)
vue.mount('#app')