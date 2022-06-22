import Vue from 'vue'
import App from './App'

// 将封装的网络请求导入
import 'utils/request.js'

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
  ...App
})
app.$mount()
