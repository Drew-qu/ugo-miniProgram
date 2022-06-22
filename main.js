import Vue from 'vue'
import App from './App'

// 将封装的网络请求导入
import 'utils/request.js'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
