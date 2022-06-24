import Vue from 'vue'
import App from './App'

// 将封装的网络请求导入
import 'utils/request.js'
// 导入 store
import store from './store/store'

uni.$showToast = (title = '获取数据失败!', duration = 1500) => {
	uni.showToast({
		title,
		duration,
		icon: 'none'
	})
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App,
  // 注入 store
  store
})
app.$mount()
